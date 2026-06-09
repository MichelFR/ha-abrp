"""Data update coordinator for the ABRP Mate integration."""

from __future__ import annotations

import logging
import time
from typing import Any

from homeassistant.config_entries import ConfigEntry
from homeassistant.core import HomeAssistant
from homeassistant.exceptions import HomeAssistantError
from homeassistant.helpers.aiohttp_client import async_get_clientsession
from homeassistant.helpers.update_coordinator import DataUpdateCoordinator, UpdateFailed

from .api import AbrpApi, AbrpApiError, Snapshot, Vehicle
from .const import DEFAULT_POLL_INTERVAL, DOMAIN, SETTINGS_REFRESH_INTERVAL
from .metadata import AbrpMetadata, async_get_metadata
from .oauth import AbrpOAuth
from .stream import AbrpLiveStream
from .token_manager import TokenManager

_LOGGER = logging.getLogger(__name__)


class AbrpMateCoordinator(DataUpdateCoordinator[dict[int, Snapshot]]):
    """Polls ``get_tlm`` for base + realtime data and merges the SSE stream.

    ``data`` maps ``vehicle_id`` -> latest :class:`Snapshot`. Vehicle metadata
    (base data) is kept in :attr:`vehicles`.
    """

    def __init__(self, hass: HomeAssistant, entry: ConfigEntry) -> None:
        super().__init__(
            hass,
            _LOGGER,
            name=DOMAIN,
            update_interval=DEFAULT_POLL_INTERVAL,
        )
        self.entry = entry
        self._client = async_get_clientsession(hass)
        self.tokens = TokenManager(hass, entry, AbrpOAuth(self._client))
        self.metadata: AbrpMetadata | None = None
        self.api: AbrpApi | None = None
        self.vehicles: dict[int, Vehicle] = {}
        self.settings: dict[str, Any] = {}
        self._settings_fetched_at: float = 0.0
        self._streams: dict[int, AbrpLiveStream] = {}

    async def _async_ensure_api(self) -> AbrpApi:
        """Discover ABRP metadata and build the API client (once)."""
        if self.api is None:
            self.metadata = await async_get_metadata(self._client)
            self.api = AbrpApi(self._client, self.metadata)
        return self.api

    async def _async_update_data(self) -> dict[int, Snapshot]:
        api = await self._async_ensure_api()
        try:
            access_token = await self.tokens.async_get_token()
            refresh = await api.refresh_vehicles(access_token)
        except AbrpApiError as err:
            raise UpdateFailed(str(err)) from err

        self.vehicles = {vehicle.vehicle_id: vehicle for vehicle in refresh.vehicles}

        # Refresh account settings occasionally so externally-made changes show.
        if (time.monotonic() - self._settings_fetched_at) > (
            SETTINGS_REFRESH_INTERVAL.total_seconds()
        ):
            try:
                self.settings = await api.get_settings(access_token)
                self._settings_fetched_at = time.monotonic()
            except AbrpApiError as err:
                _LOGGER.debug("ABRP settings refresh failed: %s", err)

        # Merge polled snapshots onto whatever the realtime stream has pushed,
        # keeping the most recently recorded value per vehicle.
        merged: dict[int, Snapshot] = dict(self.data or {})
        for snapshot in refresh.snapshots:
            existing = merged.get(snapshot.vehicle_id)
            if existing is None or snapshot.recorded_at >= existing.recorded_at:
                merged[snapshot.vehicle_id] = snapshot

        self._sync_streams(merged)
        return merged

    def _sync_streams(self, snapshots: dict[int, Snapshot]) -> None:
        """Ensure a realtime SSE stream is running for each known vehicle."""
        for vehicle_id, snapshot in snapshots.items():
            if vehicle_id in self._streams:
                continue
            assert self.metadata is not None  # set by _async_ensure_api
            stream = AbrpLiveStream(
                self._client,
                self.metadata,
                self.tokens.async_get_token,
                vehicle_id,
                self._handle_stream_snapshot,
                seed=snapshot,
            )
            self._streams[vehicle_id] = stream
            stream.start()

    async def async_set_settings(self, changes: dict[str, Any]) -> None:
        """Update one or more account planning settings and reflect them locally."""
        api = await self._async_ensure_api()
        access_token = await self.tokens.async_get_token()
        try:
            await api.set_settings(access_token, changes)
        except AbrpApiError as err:
            raise HomeAssistantError(f"Failed to update ABRP settings: {err}") from err
        self.settings = {**self.settings, **changes}
        self.async_update_listeners()

    async def async_set_setting(self, key: str, value: Any) -> None:
        """Update a single account planning setting."""
        await self.async_set_settings({key: value})

    async def async_set_active_config(self, vehicle_id: int, config_id: str) -> None:
        """Switch a vehicle's active drive-profile configuration."""
        vehicle = self.vehicles.get(vehicle_id)
        if vehicle is None:
            raise HomeAssistantError(f"Unknown vehicle {vehicle_id}")
        api = await self._async_ensure_api()
        access_token = await self.tokens.async_get_token()
        try:
            await api.set_active_config(access_token, vehicle.raw, config_id)
        except AbrpApiError as err:
            raise HomeAssistantError(f"Failed to set drive profile: {err}") from err
        await self.async_request_refresh()

    def _handle_stream_snapshot(self, snapshot: Snapshot) -> None:
        """Apply a realtime snapshot pushed by the SSE stream."""
        data = dict(self.data or {})
        existing = data.get(snapshot.vehicle_id)
        # Stream events carry partial state already merged onto the seed, so
        # we trust them as the freshest view.
        if existing is None or snapshot.recorded_at >= existing.recorded_at:
            data[snapshot.vehicle_id] = snapshot
            self.async_set_updated_data(data)

    async def async_shutdown(self) -> None:
        """Stop all realtime streams when the entry unloads."""
        for stream in self._streams.values():
            await stream.stop()
        self._streams.clear()
        await super().async_shutdown()
