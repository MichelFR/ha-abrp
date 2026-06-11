"""Access-token lifecycle for the ABRP Mate integration.

Holds the short-lived OAuth access token, refreshes it on demand using the
stored refresh token, and persists the rotated refresh token back to the
config entry so it survives restarts.
"""

from __future__ import annotations

import asyncio
import time

from homeassistant.config_entries import ConfigEntry
from homeassistant.core import HomeAssistant
from homeassistant.exceptions import ConfigEntryAuthFailed

from .const import CONF_REFRESH_TOKEN
from .oauth import AbrpOAuth, AbrpOAuthError

# Refresh a little before the ~15 min access token actually expires.
_EXPIRY_MARGIN_SECONDS = 60


class TokenManager:
    """Provides a valid ABRP access token, refreshing as needed."""

    def __init__(
        self, hass: HomeAssistant, entry: ConfigEntry, oauth: AbrpOAuth
    ) -> None:
        self._hass = hass
        self._entry = entry
        self._oauth = oauth
        self._refresh_token: str = entry.data[CONF_REFRESH_TOKEN]
        self._access_token: str | None = None
        self._expires_at: float = 0.0
        self._lock = asyncio.Lock()

    async def async_get_token(self, *, force_refresh: bool = False) -> str:
        """Return a valid access token, refreshing if expired or forced."""
        async with self._lock:
            now = time.monotonic()
            if (
                not force_refresh
                and self._access_token is not None
                and now < self._expires_at - _EXPIRY_MARGIN_SECONDS
            ):
                return self._access_token

            try:
                tokens = await self._oauth.async_refresh(self._refresh_token)
            except AbrpOAuthError as err:
                raise ConfigEntryAuthFailed(
                    f"ABRP token refresh failed: {err}"
                ) from err

            self._access_token = tokens.access_token
            self._expires_at = time.monotonic() + tokens.expires_in

            # Refresh tokens rotate; persist the new one.
            if tokens.refresh_token != self._refresh_token:
                self._refresh_token = tokens.refresh_token
                self._hass.config_entries.async_update_entry(
                    self._entry,
                    data={**self._entry.data, CONF_REFRESH_TOKEN: tokens.refresh_token},
                )

            return self._access_token
