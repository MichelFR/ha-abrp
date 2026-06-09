"""Config flow for the ABRP Mate integration.

Implements the ABRP connect-session ("QR") login:

1. ``new_session`` + ``connect_session_request`` produce a connect link.
2. The user opens the link (or scans the QR code) and approves the session
   in ABRP.
3. A background task polls ``get_session`` until the session becomes
   authenticated, then the flow stores the ``session_id`` automatically.
"""

from __future__ import annotations

import asyncio
import base64
import io
import logging
from typing import Any
from uuid import uuid4

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
        self._auth_task: asyncio.Task[dict[str, Any] | None] | None = None
        self._session_state: dict[str, Any] | None = None

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
        """Show the connect link/QR and wait for the user to approve it."""
        api = await self._get_api()

        if self._pending is None:
            try:
                self._pending = await api.create_pending_session()
            except AbrpApiError as err:
                _LOGGER.error("Failed to start ABRP login: %s", err)
                return self.async_abort(reason="cannot_connect")

        if self._auth_task is None:
            self._auth_task = self.hass.async_create_task(
                self._async_wait_for_authorization(api)
            )

        if not self._auth_task.done():
            qr = await self.hass.async_add_executor_job(
                _qr_data_uri, self._pending.connect_url
            )
            return self.async_show_progress(
                step_id="user",
                progress_action="waiting_for_authorization",
                description_placeholders={
                    "connect_url": self._pending.connect_url,
                    "qr": f"![ABRP login QR code]({qr})",
                },
                progress_task=self._auth_task,
            )

        try:
            self._session_state = self._auth_task.result()
        except AbrpApiError as err:
            _LOGGER.error("Failed while waiting for ABRP authorization: %s", err)
            return self.async_show_progress_done(next_step_id="failed")

        if self._session_state is None:
            return self.async_show_progress_done(next_step_id="failed")
        return self.async_show_progress_done(next_step_id="finish")

    async def async_step_finish(
        self, user_input: dict[str, Any] | None = None
    ) -> ConfigFlowResult:
        """Create the config entry once the session is authenticated."""
        assert self._pending is not None and self._session_state is not None
        user = self._session_state.get("user") or {}
        user_id = user.get("id")
        if user_id is not None:
            await self.async_set_unique_id(str(user_id))
            self._abort_if_unique_id_configured()
        title = user.get("fullname") or user.get("email") or "ABRP Mate"
        return self.async_create_entry(
            title=title,
            data={CONF_SESSION_ID: self._pending.session_id},
        )

    async def async_step_failed(
        self, user_input: dict[str, Any] | None = None
    ) -> ConfigFlowResult:
        """Abort when the connection was not approved in time."""
        return self.async_abort(reason="not_authorized")

    async def _async_wait_for_authorization(
        self, api: AbrpApi
    ) -> dict[str, Any] | None:
        """Poll get_session in the background until the session is approved."""
        assert self._pending is not None
        session_id = self._pending.session_id

        for _ in range(SESSION_POLL_ATTEMPTS):
            try:
                state = await api.get_session_state(session_id)
            except AbrpApiError as err:
                # Transient errors shouldn't abort the wait; log and retry.
                _LOGGER.debug("ABRP session poll error (will retry): %s", err)
                state = None
            if state is not None:
                return state
            await asyncio.sleep(SESSION_POLL_INTERVAL_SECONDS)

        return None


def _qr_data_uri(data: str) -> str:
    """Render ``data`` as a QR code and return it as a PNG data URI."""
    import qrcode  # imported lazily; provided via manifest requirements

    image = qrcode.make(data, box_size=8, border=2)
    buffer = io.BytesIO()
    image.save(buffer, format="PNG")
    encoded = base64.b64encode(buffer.getvalue()).decode("ascii")
    return f"data:image/png;base64,{encoded}"
