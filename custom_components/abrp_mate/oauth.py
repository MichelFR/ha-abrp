"""ABRP OAuth2 + QR ("remote app") login.

ABRP authenticates through an OAuth2/OIDC service. A new device logs in by:

1. Starting an authorization request (PKCE) which yields a login ``session``.
2. Minting a ``connect_session_token`` for that session and showing it as a
   QR code / link.
3. The user opens it on a device already signed in to ABRP and approves it.
4. Once approved, the authorization request completes with an OAuth ``code``,
   which is exchanged for access + refresh tokens.

The resulting ``access_token`` is used directly as the iternio ``session_id``
for the telemetry API; the long-lived (rotating) ``refresh_token`` is what the
integration persists.
"""

from __future__ import annotations

import base64
import hashlib
import os
import re
import secrets
from dataclasses import dataclass
from urllib.parse import parse_qs, urlencode, urlparse

import aiohttp

from .const import (
    ABRP_CONNECT_SESSION_URL_PREFIX,
    LOGIN_ABRP_STATUS_URL,
    LOGIN_ABRP_URL,
    OAUTH_AUTHORIZE_URL,
    OAUTH_CLIENT_ID,
    OAUTH_REDIRECT_URI,
    OAUTH_SCOPE,
    OAUTH_TOKEN_URL,
    USER_AGENT,
)

_TOKEN_RE = re.compile(r"connect_session_token=([A-Za-z0-9\-]+)")


class AbrpOAuthError(Exception):
    """Raised when an ABRP OAuth/login request fails."""


@dataclass
class Tokens:
    """OAuth tokens returned by the token endpoint."""

    access_token: str
    refresh_token: str
    expires_in: int


@dataclass
class LoginHandle:
    """In-progress QR login: what to show the user + what to poll/complete."""

    connect_url: str
    code: str  # connect_session_token, polled for approval
    session: str  # OAuth login session
    csrf: str
    code_verifier: str


def _pkce_pair() -> tuple[str, str]:
    verifier = base64.urlsafe_b64encode(os.urandom(32)).rstrip(b"=").decode("ascii")
    digest = hashlib.sha256(verifier.encode("ascii")).digest()
    challenge = base64.urlsafe_b64encode(digest).rstrip(b"=").decode("ascii")
    return verifier, challenge


class AbrpOAuth:
    """Drives the ABRP OAuth2 + QR login and token refresh."""

    def __init__(self, session: aiohttp.ClientSession) -> None:
        self._session = session
        self._headers = {"user-agent": USER_AGENT}

    async def async_start_login(self) -> LoginHandle:
        """Begin a login and mint the connect token to show as a QR/link."""
        verifier, challenge = _pkce_pair()
        params = {
            "response_type": "code",
            "client_id": OAUTH_CLIENT_ID,
            "redirect_uri": OAUTH_REDIRECT_URI,
            "scope": OAUTH_SCOPE,
            "state": secrets.token_hex(8),
            "nonce": secrets.token_hex(8),
            "code_challenge": challenge,
            "code_challenge_method": "S256",
        }
        url = f"{OAUTH_AUTHORIZE_URL}?{urlencode(params)}"
        async with self._session.get(
            url, headers=self._headers, allow_redirects=False
        ) as response:
            location = response.headers.get("location")
        if not location or "session=" not in location:
            raise AbrpOAuthError("authorize did not return a login session")
        session = parse_qs(urlparse(location).query)["session"][0]

        csrf = next(
            (c.value for c in self._session.cookie_jar if c.key == "_csrf"), None
        )
        if not csrf:
            raise AbrpOAuthError("authorize did not set a CSRF cookie")

        async with self._session.get(
            f"{LOGIN_ABRP_URL}?session={session}", headers=self._headers
        ) as response:
            html = await response.text()
        match = _TOKEN_RE.search(html)
        if not match:
            raise AbrpOAuthError("could not mint a connect token")
        code = match.group(1)

        return LoginHandle(
            connect_url=f"{ABRP_CONNECT_SESSION_URL_PREFIX}{code}",
            code=code,
            session=session,
            csrf=csrf,
            code_verifier=verifier,
        )

    async def async_is_approved(self, handle: LoginHandle) -> bool:
        """Return True once the connect token has been approved."""
        async with self._session.get(
            f"{LOGIN_ABRP_STATUS_URL}?code={handle.code}", headers=self._headers
        ) as response:
            if response.status != 200:
                return False
            data = await response.json()
        return bool(data.get("approved"))

    async def async_complete_login(self, handle: LoginHandle) -> Tokens:
        """Finish the approved login and exchange the code for tokens."""
        async with self._session.post(
            LOGIN_ABRP_URL,
            data={"session": handle.session, "csrf": handle.csrf},
            headers=self._headers,
            allow_redirects=False,
        ) as response:
            location = response.headers.get("location")
        if not location or "code=" not in location:
            raise AbrpOAuthError(
                "login completion did not return an authorization code"
            )
        code = parse_qs(urlparse(location).query)["code"][0]

        return await self._async_exchange(
            {
                "grant_type": "authorization_code",
                "code": code,
                "redirect_uri": OAUTH_REDIRECT_URI,
                "client_id": OAUTH_CLIENT_ID,
                "code_verifier": handle.code_verifier,
            }
        )

    async def async_refresh(self, refresh_token: str) -> Tokens:
        """Exchange a refresh token for a fresh access token."""
        return await self._async_exchange(
            {
                "grant_type": "refresh_token",
                "refresh_token": refresh_token,
                "client_id": OAUTH_CLIENT_ID,
            }
        )

    async def _async_exchange(self, body: dict[str, str]) -> Tokens:
        try:
            async with self._session.post(
                OAUTH_TOKEN_URL, data=body, headers=self._headers
            ) as response:
                if response.status != 200:
                    text = await response.text()
                    raise AbrpOAuthError(
                        f"token endpoint returned {response.status}: {text[:200]}"
                    )
                data = await response.json()
        except aiohttp.ClientError as err:
            raise AbrpOAuthError(f"token request failed: {err}") from err

        access = data.get("access_token")
        refresh = data.get("refresh_token")
        if not access or not refresh:
            raise AbrpOAuthError("token response missing access or refresh token")
        return Tokens(
            access_token=access,
            refresh_token=refresh,
            expires_in=int(data.get("expires_in", 900)),
        )
