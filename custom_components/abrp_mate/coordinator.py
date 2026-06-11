"""Data update coordinator for the ABRP Mate integration."""

from __future__ import annotations

import logging
import time
from dataclasses import replace
from typing import Any

from homeassistant.config_entries import ConfigEntry
from homeassistant.core import HomeAssistant
from homeassistant.exceptions import HomeAssistantError
from homeassistant.helpers.aiohttp_client import async_get_clientsession
from homeassistant.helpers.update_coordinator import DataUpdateCoordinator, UpdateFailed

from .api import AbrpApi, AbrpApiError, Snapshot, Vehicle
from .const import (
    DOMAIN,
    POLL_INTERVAL_ACTIVE,
    POLL_INTERVAL_IDLE,
    SETTINGS_REFRESH_INTERVAL,
)
from .metadata import AbrpMetadata, async_get_metadata
from .oauth import AbrpOAuth
from .stream import AbrpLiveStream
from .token_manager import TokenManager

_LOGGER = logging.getLogger(__name__)

# Cumulative counters (state_class TOTAL_INCREASING) whose value can briefly
# dip when the winning snapshot flips between sources (REST poll vs SSE
# stream, or ABRP's own providers disagreeing slightly). A real decrease is
# only ever a reset, so small dips are held at the previous high-water mark;
# drops below 90% pass through as genuine resets, mirroring Home Assistant's
# reset heuristic for this state class.
_MONOTONIC_FIELDS = ("odometer_km", "charging_energy_added_kwh")

# Vehicle-level status only the ``get_tlm`` poll provides (the SSE stream
# carries telemetry records exclusively). Stream snapshots usually win the
# recency merge, so these fields are always grafted from the latest poll —
# otherwise online/OBD/cloud status would freeze at the stream's seed values.
_POLL_STATUS_FIELDS = (
    "is_connected",
    "is_asleep",
    "cloud_connected",
    "obd_connected",
    "cloud_source",
    "cloud_last_seen",
    "obd_last_seen",
    "tlm_source",
    "providers",
)


def _hold_monotonic(previous: Snapshot, snapshot: Snapshot) -> None:
    """Carry the high-water mark forward over small source-jitter dips."""
    for field in _MONOTONIC_FIELDS:
        last = getattr(previous, field)
        new = getattr(snapshot, field)
        if last is not None and new is not None and 0.9 * last <= new < last:
            setattr(snapshot, field, last)


def _is_active(snapshot: Snapshot) -> bool:
    """Whether a vehicle is doing something worth polling quickly for."""
    return bool(
        snapshot.is_connected
        or snapshot.is_charging
        or snapshot.is_driving
        or (snapshot.speed_kmh is not None and snapshot.speed_kmh > 2)
    )


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
            update_interval=POLL_INTERVAL_IDLE,
        )
        self.entry = entry
        self._client = async_get_clientsession(hass)
        self.tokens = TokenManager(hass, entry, AbrpOAuth(self._client))
        self.metadata: AbrpMetadata | None = None
        self.api: AbrpApi | None = None
        self.vehicles: dict[int, Vehicle] = {}
        self.settings: dict[str, Any] = {}
        self._settings_version: int | None = None
        self._settings_fetched_at: float = 0.0
        self._streams: dict[int, AbrpLiveStream] = {}
        # vehicle_id -> whether its realtime SSE stream is currently connected.
        self.stream_connected: dict[int, bool] = {}

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

        # Re-fetch settings when their version bumps (changed on any device),
        # so external edits sync within one poll. A long interval is a safety
        # net in case a version change is ever missed.
        version_changed = (
            refresh.settings_version is not None
            and refresh.settings_version != self._settings_version
        )
        stale = (time.monotonic() - self._settings_fetched_at) > (
            SETTINGS_REFRESH_INTERVAL.total_seconds()
        )
        if not self.settings or version_changed or stale:
            try:
                self.settings = await api.get_settings(access_token)
                self._settings_version = refresh.settings_version
                self._settings_fetched_at = time.monotonic()
            except AbrpApiError as err:
                _LOGGER.debug("ABRP settings refresh failed: %s", err)

        # Merge polled snapshots onto whatever the realtime stream has pushed,
        # keeping the most recently recorded telemetry per vehicle. The poll
        # is always authoritative for vehicle-level status fields the stream
        # never carries.
        merged: dict[int, Snapshot] = dict(self.data or {})
        for snapshot in refresh.snapshots:
            existing = merged.get(snapshot.vehicle_id)
            if existing is None or snapshot.recorded_at >= existing.recorded_at:
                if existing is not None:
                    _hold_monotonic(existing, snapshot)
                merged[snapshot.vehicle_id] = snapshot
            else:
                merged[snapshot.vehicle_id] = replace(
                    existing,
                    **{f: getattr(snapshot, f) for f in _POLL_STATUS_FIELDS},
                )

        self._sync_streams(merged)
        # Poll faster only while a vehicle is active; idle vehicles barely change.
        self.update_interval = (
            POLL_INTERVAL_ACTIVE
            if any(_is_active(s) for s in merged.values())
            else POLL_INTERVAL_IDLE
        )
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
                base_provider=lambda vid=vehicle_id: (self.data or {}).get(vid),
                on_state=lambda connected, vid=vehicle_id: (
                    self._handle_stream_state(vid, connected)
                ),
            )
            self._streams[vehicle_id] = stream
            stream.start()

    def _handle_stream_state(self, vehicle_id: int, connected: bool) -> None:
        """Reflect a realtime stream (dis)connecting in the entities."""
        self.stream_connected[vehicle_id] = connected
        self.async_update_listeners()

    async def async_set_settings(self, changes: dict[str, Any]) -> None:
        """Update one or more account planning settings and reflect them locally."""
        api = await self._async_ensure_api()
        access_token = await self.tokens.async_get_token()
        try:
            new_version = await api.set_settings(access_token, changes)
        except AbrpApiError as err:
            raise HomeAssistantError(f"Failed to update ABRP settings: {err}") from err
        self.settings = {**self.settings, **changes}
        # Track the version from our own write so it isn't seen as an external
        # change on the next poll.
        if new_version is not None:
            self._settings_version = new_version
        self.async_update_listeners()

    async def async_set_setting(self, key: str, value: Any) -> None:
        """Update a single account planning setting."""
        await self.async_set_settings({key: value})

    async def async_set_active_config(self, vehicle_id: int, config_id: str) -> None:
        """Switch a vehicle's active drive-profile configuration."""
        api = await self._async_ensure_api()
        access_token = await self.tokens.async_get_token()
        try:
            await api.set_active_config(access_token, vehicle_id, config_id)
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
            if existing is not None:
                _hold_monotonic(existing, snapshot)
            data[snapshot.vehicle_id] = snapshot
            self.async_set_updated_data(data)
            # A live event means the vehicle just became active; speed up polling.
            if _is_active(snapshot) and self.update_interval != POLL_INTERVAL_ACTIVE:
                self.update_interval = POLL_INTERVAL_ACTIVE

    async def async_shutdown(self) -> None:
        """Stop all realtime streams when the entry unloads."""
        for stream in self._streams.values():
            await stream.stop()
        self._streams.clear()
        await super().async_shutdown()
