"""Data update coordinator for the ABRP Mate integration."""

from __future__ import annotations

import logging

from homeassistant.config_entries import ConfigEntry
from homeassistant.core import HomeAssistant
from homeassistant.helpers.aiohttp_client import async_get_clientsession
from homeassistant.helpers.update_coordinator import DataUpdateCoordinator, UpdateFailed

from .api import AbrpApi, AbrpApiError, Snapshot, Vehicle
from .const import CONF_SESSION_ID, DEFAULT_POLL_INTERVAL, DOMAIN
from .stream import AbrpLiveStream

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
        self.session_id: str = entry.data[CONF_SESSION_ID]
        self._client = async_get_clientsession(hass)
        self.api = AbrpApi(self._client)
        self.vehicles: dict[int, Vehicle] = {}
        self._streams: dict[int, AbrpLiveStream] = {}

    async def _async_update_data(self) -> dict[int, Snapshot]:
        try:
            refresh = await self.api.refresh_vehicles(self.session_id)
        except AbrpApiError as err:
            raise UpdateFailed(str(err)) from err

        self.vehicles = {vehicle.vehicle_id: vehicle for vehicle in refresh.vehicles}

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
            stream = AbrpLiveStream(
                self._client,
                self.session_id,
                vehicle_id,
                self._handle_stream_snapshot,
                seed=snapshot,
            )
            self._streams[vehicle_id] = stream
            stream.start()

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
