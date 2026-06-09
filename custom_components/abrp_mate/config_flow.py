"""Config flow for the ABRP Mate integration.

Implements the ABRP OAuth2 + QR ("remote app") login:

1. Start an OAuth login and mint a connect token (shown as a QR code / link).
2. The user opens it on a device already signed in to ABRP and approves it.
3. A background task polls until approved, completes the login, and stores the
   resulting (rotating) refresh token.
"""

from __future__ import annotations

import asyncio
import base64
import binascii
import io
import json
import logging
from collections.abc import Mapping
from typing import Any

from homeassistant.config_entries import SOURCE_REAUTH, ConfigFlow, ConfigFlowResult
from homeassistant.helpers.aiohttp_client import async_get_clientsession

from .const import (
    CONF_REFRESH_TOKEN,
    DOMAIN,
    SESSION_POLL_ATTEMPTS,
    SESSION_POLL_INTERVAL_SECONDS,
)
from .oauth import AbrpOAuth, AbrpOAuthError, LoginHandle, Tokens

_LOGGER = logging.getLogger(__name__)


class AbrpMateConfigFlow(ConfigFlow, domain=DOMAIN):
    """Handle the ABRP Mate OAuth2 + QR login flow."""

    VERSION = 1

    def __init__(self) -> None:
        self._oauth: AbrpOAuth | None = None
        self._handle: LoginHandle | None = None
        self._auth_task: asyncio.Task[Tokens | None] | None = None
        self._tokens: Tokens | None = None

    async def async_step_reauth(
        self, entry_data: Mapping[str, Any]
    ) -> ConfigFlowResult:
        """Re-run the login when the stored refresh token stops working."""
        return await self.async_step_user()

    async def async_step_user(
        self, user_input: dict[str, Any] | None = None
    ) -> ConfigFlowResult:
        """Show the connect link/QR and wait for the user to approve it."""
        if self._oauth is None:
            self._oauth = AbrpOAuth(async_get_clientsession(self.hass))

        if self._handle is None:
            try:
                self._handle = await self._oauth.async_start_login()
            except AbrpOAuthError as err:
                _LOGGER.error("Failed to start ABRP login: %s", err)
                return self.async_abort(reason="cannot_connect")

        if self._auth_task is None:
            self._auth_task = self.hass.async_create_task(self._async_wait_for_login())

        if not self._auth_task.done():
            qr = await self.hass.async_add_executor_job(
                _qr_data_uri, self._handle.connect_url
            )
            return self.async_show_progress(
                step_id="user",
                progress_action="waiting_for_authorization",
                description_placeholders={
                    "connect_url": self._handle.connect_url,
                    "qr": f"![ABRP login QR code]({qr})",
                },
                progress_task=self._auth_task,
            )

        try:
            self._tokens = self._auth_task.result()
        except AbrpOAuthError as err:
            _LOGGER.error("ABRP login failed: %s", err)
            return self.async_show_progress_done(next_step_id="failed")

        if self._tokens is None:
            return self.async_show_progress_done(next_step_id="failed")
        return self.async_show_progress_done(next_step_id="finish")

    async def async_step_finish(
        self, user_input: dict[str, Any] | None = None
    ) -> ConfigFlowResult:
        """Create or update the config entry once login succeeds."""
        assert self._tokens is not None
        data = {CONF_REFRESH_TOKEN: self._tokens.refresh_token}

        unique_id = _jwt_subject(self._tokens.access_token)
        if unique_id is not None:
            await self.async_set_unique_id(unique_id)

        if self.source == SOURCE_REAUTH:
            entry = self._get_reauth_entry()
            self._abort_if_unique_id_mismatch(reason="wrong_account")
            return self.async_update_reload_and_abort(entry, data=data)

        self._abort_if_unique_id_configured()
        return self.async_create_entry(title="ABRP Mate", data=data)

    async def async_step_failed(
        self, user_input: dict[str, Any] | None = None
    ) -> ConfigFlowResult:
        """Abort when the connection was not approved in time."""
        return self.async_abort(reason="not_authorized")

    async def _async_wait_for_login(self) -> Tokens | None:
        """Poll for approval in the background, then complete the login."""
        assert self._oauth is not None and self._handle is not None
        for _ in range(SESSION_POLL_ATTEMPTS):
            try:
                if await self._oauth.async_is_approved(self._handle):
                    return await self._oauth.async_complete_login(self._handle)
            except AbrpOAuthError as err:
                _LOGGER.debug("ABRP login poll error (will retry): %s", err)
            await asyncio.sleep(SESSION_POLL_INTERVAL_SECONDS)
        return None


def _jwt_subject(token: str) -> str | None:
    """Best-effort decode of the JWT ``sub`` claim (for the unique id)."""
    try:
        payload = token.split(".")[1]
        payload += "=" * (-len(payload) % 4)
        claims = json.loads(base64.urlsafe_b64decode(payload))
    except (IndexError, ValueError, binascii.Error, json.JSONDecodeError):
        return None
    sub = claims.get("sub")
    return str(sub) if sub is not None else None


def _qr_data_uri(data: str) -> str:
    """Render ``data`` as a QR code and return it as a PNG data URI."""
    import qrcode  # imported lazily; provided via manifest requirements

    image = qrcode.make(data, box_size=8, border=2)
    buffer = io.BytesIO()
    image.save(buffer, format="PNG")
    encoded = base64.b64encode(buffer.getvalue()).decode("ascii")
    return f"data:image/png;base64,{encoded}"
