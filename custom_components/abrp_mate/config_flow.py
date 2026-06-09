"""Config flow for the ABRP Mate integration.

Implements the ABRP connect-session ("QR") login:

1. ``new_session`` + ``connect_session_request`` produce a connect link.
2. The user opens the link (or scans it) and approves the session in ABRP.
3. We poll ``get_session`` until the session becomes authenticated, then
   store the ``session_id`` in the config entry.
"""

from __future__ import annotations

import asyncio
import logging
from typing import Any
from uuid import uuid4

import voluptuous as vol
from homeassistant.config_entries import ConfigFlow, ConfigFlowResult
from homeassistant.helpers.aiohttp_client import async_get_clientsession

from .api import AbrpApi, AbrpApiError, PendingSession
from .const import (
    CONF_SESSION_ID,
    DOMAIN,
    SESSION_POLL_ATTEMPTS,
    SESSION_POLL_INTERVAL_SECONDS,
)
from .metadata import async_get_metadata

_LOGGER = logging.getLogger(__name__)


class AbrpMateConfigFlow(ConfigFlow, domain=DOMAIN):
    """Handle the ABRP Mate connect-session login flow."""

    VERSION = 1

    def __init__(self) -> None:
        self._pending: PendingSession | None = None
        self._api: AbrpApi | None = None

    async def _get_api(self) -> AbrpApi:
        """Build the API client once, with discovered metadata + device id."""
        if self._api is None:
            session = async_get_clientsession(self.hass)
            metadata = await async_get_metadata(session)
            self._api = AbrpApi(session, metadata, device_id=uuid4().hex)
        return self._api

    async def async_step_user(
        self, user_input: dict[str, Any] | None = None
    ) -> ConfigFlowResult:
        """Create a pending session and show the connect link."""
        errors: dict[str, str] = {}
        api = await self._get_api()

        if self._pending is None:
            try:
                self._pending = await api.create_pending_session()
            except AbrpApiError as err:
                _LOGGER.error("Failed to start ABRP login: %s", err)
                return self.async_abort(reason="cannot_connect")

        if user_input is not None:
            # The user pressed submit after opening the connect link; poll
            # get_session for a short while waiting for approval.
            result = await self._poll_for_authentication(api)
            if result is not None:
                return result
            errors["base"] = "not_authorized"

        return self.async_show_form(
            step_id="user",
            data_schema=vol.Schema({}),
            description_placeholders={"connect_url": self._pending.connect_url},
            errors=errors,
        )

    async def _poll_for_authentication(self, api: AbrpApi) -> ConfigFlowResult | None:
        """Poll get_session; return a created entry once authenticated."""
        assert self._pending is not None
        session_id = self._pending.session_id

        for _ in range(SESSION_POLL_ATTEMPTS):
            try:
                state = await api.get_session_state(session_id)
            except AbrpApiError as err:
                _LOGGER.error("Failed to poll ABRP session: %s", err)
                return self.async_abort(reason="cannot_connect")

            if state is not None:
                user = state.get("user") or {}
                user_id = user.get("id")
                if user_id is not None:
                    await self.async_set_unique_id(str(user_id))
                    self._abort_if_unique_id_configured()
                title = user.get("fullname") or user.get("email") or "ABRP Mate"
                return self.async_create_entry(
                    title=title,
                    data={CONF_SESSION_ID: session_id},
                )

            await asyncio.sleep(SESSION_POLL_INTERVAL_SECONDS)

        return None
