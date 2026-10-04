"""Data update coordinator for the ABRP Mate integration."""

from __future__ import annotations

import asyncio
import logging
import time
from datetime import timedelta
from typing import Any

from homeassistant.config_entries import ConfigEntry
from homeassistant.core import HomeAssistant
from homeassistant.exceptions import HomeAssistantError
from homeassistant.helpers import device_registry as dr
from homeassistant.helpers.aiohttp_client import async_get_clientsession
from homeassistant.helpers.dispatcher import async_dispatcher_send
from homeassistant.helpers.update_coordinator import DataUpdateCoordinator, UpdateFailed

from .api import AbrpApi, AbrpApiError, Snapshot, Vehicle, build_snapshot, merge_tlm
from .const import (
    CONF_POLL_ACTIVE,
    CONF_POLL_IDLE,
    CONF_POLL_STREAMING,
    DOMAIN,
    MODEL_INFO_RETRY,
    POLL_INTERVAL_ACTIVE,
    POLL_INTERVAL_ACTIVE_STREAMING,
    POLL_INTERVAL_IDLE,
    SETTINGS_REFRESH_INTERVAL,
)
from .metadata import (
    AbrpMetadata,
    OemIcons,
    async_get_metadata,
    async_get_oem_icons,
    resolve_oem_icon,
)
from .oauth import AbrpOAuth
from .stream import AbrpLiveStream
from .token_manager import TokenManager

_LOGGER = logging.getLogger(__name__)


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
        # Poll cadences, overridable (in seconds) through the options flow.
        def _opt_interval(key: str, default: timedelta) -> timedelta:
            value = entry.options.get(key)
            if isinstance(value, (int, float)) and not isinstance(value, bool):
                if value > 0:
                    return timedelta(seconds=value)
            return default

        self._interval_active = _opt_interval(CONF_POLL_ACTIVE, POLL_INTERVAL_ACTIVE)
        self._interval_streaming = _opt_interval(
            CONF_POLL_STREAMING, POLL_INTERVAL_ACTIVE_STREAMING
        )
        self._interval_idle = _opt_interval(CONF_POLL_IDLE, POLL_INTERVAL_IDLE)
        # Snapshot of the options this coordinator was built with, so the
        # entry update listener can tell an options change (reload) apart
        # from the routine refresh-token rotation (no reload).
        self.applied_options: dict[str, Any] = dict(entry.options)

        super().__init__(
            hass,
            _LOGGER,
            name=DOMAIN,
            update_interval=self._interval_idle,
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
        # The running per-vehicle telemetry (with per-field timestamps) and the
        # latest poll payload (vehicle-level status). Both the poll and the SSE
        # stream merge into ``_tlm``; snapshots are rebuilt from the result.
        self._tlm: dict[int, dict[str, Any]] = {}
        self._items: dict[int, dict[str, Any]] = {}
        self._streams: dict[int, AbrpLiveStream] = {}
        # vehicle_id -> whether its realtime SSE stream is currently connected.
        self.stream_connected: dict[int, bool] = {}
        # typecode -> ABRP's display info for the model (make, model, trim,
        # years), plus when a failed lookup may be retried.
        self.models: dict[str, dict[str, Any]] = {}
        self._model_retry: dict[str, float] = {}
        # Car-brand logo URLs scraped from the web app, fetched in the
        # background and only on behalf of an enabled Brand sensor (the
        # scrape reads ~8 MB of bundle); their arrival is signalled to those
        # sensors alone.
        self.oem_icons: OemIcons = {}
        self._icons_task: asyncio.Task[None] | None = None
        self._icons_checked: float = 0.0
        self.brand_logos_signal = f"{DOMAIN}_{entry.entry_id}_brand_logos"

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
        await self._async_update_models(api)

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

        # Merge each poll's telemetry onto the running per-vehicle record
        # field-by-field (newest per-field timestamp wins), then rebuild the
        # snapshots — mirroring how the ABRP web app reconciles its poll with
        # the realtime stream.
        now = time.time()
        merged: dict[int, Snapshot] = {}
        for item in refresh.items:
            vehicle_id = item.get("vehicle_id")
            if not isinstance(vehicle_id, int):
                continue
            self._items[vehicle_id] = item
            poll_tlm = item.get("tlm") if isinstance(item.get("tlm"), dict) else {}
            self._tlm[vehicle_id] = merge_tlm(self._tlm.get(vehicle_id), poll_tlm, now)
            merged[vehicle_id] = build_snapshot(item, self._tlm[vehicle_id])

        self._sync_streams(merged)
        self.update_interval = self._poll_interval(merged)
        return merged

    def _poll_interval(self, snapshots: dict[int, Snapshot]) -> timedelta:
        """Pick the get_tlm cadence for the current vehicle state.

        Idle vehicles barely change, so poll slowly. An active vehicle only
        needs the fast poll while its SSE stream is down; with the stream
        delivering live telemetry the poll is just a baseline and can stay
        near the idle cadence.
        """
        active_ids = [vid for vid, s in snapshots.items() if _is_active(s)]
        if not active_ids:
            return self._interval_idle
        if all(self.stream_connected.get(vid) for vid in active_ids):
            return self._interval_streaming
        return self._interval_active

    def _sync_streams(self, snapshots: dict[int, Snapshot]) -> None:
        """Ensure a realtime SSE stream is running for each known vehicle."""
        for vehicle_id in snapshots:
            if vehicle_id in self._streams:
                continue
            assert self.metadata is not None  # set by _async_ensure_api
            stream = AbrpLiveStream(
                self._client,
                self.metadata,
                self.tokens.async_get_token,
                vehicle_id,
                self._handle_stream_tlm,
                base_provider=lambda vid=vehicle_id: self._tlm.get(vid),
                on_state=lambda connected, vid=vehicle_id: (
                    self._handle_stream_state(vid, connected)
                ),
            )
            self._streams[vehicle_id] = stream
            stream.start()

    def _handle_stream_state(self, vehicle_id: int, connected: bool) -> None:
        """Reflect a realtime stream (dis)connecting in the entities."""
        self.stream_connected[vehicle_id] = connected
        # A dropped stream re-arms the fast poll for an active vehicle; a
        # (re)connected stream lets it relax again.
        self.update_interval = self._poll_interval(self.data or {})
        self.async_update_listeners()

    async def _async_update_models(self, api: AbrpApi) -> None:
        """Look up the display info of every vehicle model not seen yet."""
        now = time.monotonic()
        changed = False
        for typecode in {v.car_model for v in self.vehicles.values() if v.car_model}:
            if typecode in self.models or now < self._model_retry.get(typecode, 0):
                continue
            try:
                self.models[typecode] = await api.get_model_display(typecode)
                changed = True
            except AbrpApiError as err:
                _LOGGER.debug("%s", err)
                self._model_retry[typecode] = now + MODEL_INFO_RETRY.total_seconds()
        if changed:
            self._update_device_models()

    def model_info(self, vehicle_id: int) -> dict[str, Any] | None:
        """ABRP's display info for a vehicle's model, once looked up."""
        vehicle = self.vehicles.get(vehicle_id)
        if vehicle is None or not vehicle.car_model:
            return None
        return self.models.get(vehicle.car_model)

    def device_fields(self, vehicle_id: int) -> dict[str, str | None]:
        """Manufacturer/model for the vehicle's device, from its model info.

        e.g. "Tesla" / "Model 3 Long Range (2021)", with the raw typecode as
        model id; "ABRP" / the typecode until the model has been looked up.
        """
        vehicle = self.vehicles.get(vehicle_id)
        typecode = vehicle.car_model if vehicle else None
        info = self.model_info(vehicle_id) or {}
        name = " ".join(
            part
            for part in (info.get("model"), info.get("title"))
            if isinstance(part, str)
        )
        years = info.get("years")
        if name and isinstance(years, str) and years:
            name = f"{name} ({years})"
        manufacturer = info.get("manufacturer")
        return {
            "manufacturer": manufacturer if isinstance(manufacturer, str) else "ABRP",
            "model": name or typecode or "Electric Vehicle",
            "model_id": typecode,
        }

    def brand_logo(self, vehicle_id: int) -> dict[str, str] | None:
        """The vehicle brand's light/dark logo URLs, as ABRP shows them."""
        info = self.model_info(vehicle_id) or {}
        return resolve_oem_icon(info.get("manufacturer"), self.oem_icons)

    def _update_device_models(self) -> None:
        """Push freshly looked-up model names onto existing vehicle devices."""
        registry = dr.async_get(self.hass)
        for vehicle_id in self.vehicles:
            device = registry.async_get_device(identifiers={(DOMAIN, str(vehicle_id))})
            if device is None:
                continue  # not registered yet; its entities set device_info
            fields = self.device_fields(vehicle_id)
            if any(getattr(device, key) != value for key, value in fields.items()):
                registry.async_update_device(device.id, **fields)

    def ensure_brand_logos(self) -> None:
        """Fetch the brand logos in the background (cached for a day).

        Called on every update of a Brand sensor, so it re-checks the cache at
        most every 10 minutes rather than per realtime event.
        """
        if not any(info.get("manufacturer") for info in self.models.values()):
            return
        now = time.monotonic()
        if self._icons_task is not None and (
            not self._icons_task.done() or now - self._icons_checked < 600
        ):
            return
        self._icons_checked = now
        self._icons_task = self.entry.async_create_background_task(
            self.hass, self._async_refresh_oem_icons(), f"{DOMAIN} brand logos"
        )

    async def _async_refresh_oem_icons(self) -> None:
        icons = await async_get_oem_icons(self._client)
        if icons != self.oem_icons:
            self.oem_icons = icons
            async_dispatcher_send(self.hass, self.brand_logos_signal)

    def active_plan(self, vehicle_id: int) -> dict[str, Any] | None:
        """The account's active navigation plan, if it belongs to this vehicle.

        ABRP stores the active plan's uuid in ``settings.plan_uuid`` (null
        when not navigating) and keeps the plan's summary — destinations with
        coordinates and names, distance, duration — in ``recent_plans`` /
        ``plan_history``. Plans are account-level; ``selected_vehicle_id``
        says which vehicle they are for.
        """
        settings = self.settings
        uuid = settings.get("plan_uuid")
        if not isinstance(uuid, str) or not uuid:
            return None
        selected = settings.get("selected_vehicle_id")
        if isinstance(selected, int) and selected != vehicle_id:
            return None
        for entry in (settings.get("recent_plans") or []) + (
            settings.get("plan_history") or []
        ):
            if isinstance(entry, dict) and entry.get("plan_uuid") == uuid:
                return entry
        return None

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

    def _handle_stream_tlm(self, vehicle_id: int, update: dict[str, Any]) -> None:
        """Merge a partial telemetry update pushed by the SSE stream."""
        now = time.time()
        self._tlm[vehicle_id] = merge_tlm(self._tlm.get(vehicle_id), update, now)
        item = self._items.get(vehicle_id) or {"vehicle_id": vehicle_id}
        snapshot = build_snapshot(item, self._tlm[vehicle_id])
        data = dict(self.data or {})
        data[vehicle_id] = snapshot
        self.async_set_updated_data(data)
        # A live event may mean a vehicle just became active; re-pick the
        # cadence (still relaxed here, since this event came from the stream).
        interval = self._poll_interval(data)
        if self.update_interval != interval:
            self.update_interval = interval

    async def async_shutdown(self) -> None:
        """Stop all realtime streams when the entry unloads."""
        for stream in self._streams.values():
            await stream.stop()
        self._streams.clear()
        await super().async_shutdown()
