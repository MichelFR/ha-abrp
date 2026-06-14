"""Async client for the ABRP / Iternio telemetry API.

Fetches vehicle metadata and the latest telemetry snapshot via ``get_tlm``
(the live SSE stream lives in ``stream.py``). Authentication is handled by
``oauth.py`` / ``token_manager.py``; the OAuth access token is passed here as
the ``session_id``.
"""

from __future__ import annotations

import time
from dataclasses import dataclass, field
from datetime import datetime, timezone
from typing import Any

import aiohttp

from .const import (
    ABRP_CLIENT,
    ABRP_COUNTRY_3,
    GET_SESSION_URL,
    GET_TLM_URL,
    SET_SETTINGS_URL,
    SET_VEHICLE_DATA_URL,
    web_request_headers,
)
from .metadata import AbrpMetadata


class AbrpApiError(Exception):
    """Raised when the ABRP API returns an error or unexpected payload."""


@dataclass
class Vehicle:
    """Static-ish metadata about a vehicle (base data)."""

    vehicle_id: int
    name: str | None = None
    car_model: str | None = None
    paint: str | None = None
    active_config: str | None = None
    # config id -> {"name": ..., "config_type": ...}
    configurations: dict[str, Any] = field(default_factory=dict)
    tlm_type: str | None = None
    raw: dict[str, Any] = field(default_factory=dict)


@dataclass
class Snapshot:
    """A normalized telemetry snapshot for a vehicle (realtime data)."""

    vehicle_id: int
    source: str
    recorded_at: datetime
    soc_percent: float | None = None
    is_charging: bool | None = None
    is_driving: bool | None = None
    is_dcfc: bool | None = None
    is_parked: bool | None = None
    charging_state: str | None = None
    driving_state: str | None = None
    power_kw: float | None = None
    voltage_v: float | None = None
    current_a: float | None = None
    odometer_km: float | None = None
    speed_kmh: float | None = None
    latitude: float | None = None
    longitude: float | None = None
    heading_deg: float | None = None
    ext_temp_c: float | None = None
    cabin_temp_c: float | None = None
    batt_temp_c: float | None = None
    vehicle_temp_c: float | None = None
    battery_capacity_kwh: float | None = None
    estimated_range_km: float | None = None
    hvac_power_kw: float | None = None
    charging_energy_added_kwh: float | None = None
    soe_kwh: float | None = None  # state of energy: usable kWh left in the pack
    soh_percent: float | None = None  # state of health
    elevation_m: float | None = None
    cabin_set_point_c: float | None = None
    plugged_in: bool | None = None  # charge cable connected
    speed_factor: float | None = None  # ABRP's learned real-vs-planned speed
    calib_confidence_percent: float | None = None  # trust in calib_ref_cons
    timezone: str | None = None
    country3: str | None = None
    charger_id: int | None = None
    # Where ABRP's data comes from: tlm_type is the overall source
    # (e.g. "enode", an OBD dongle, ...); providers maps each signal to its
    # own source.
    tlm_source: str | None = None
    providers: dict[str, Any] | None = None
    is_connected: bool | None = None
    is_asleep: bool | None = None
    cloud_connected: bool | None = None  # via a connected cloud provider (OTA)
    obd_connected: bool | None = None  # via a local OBD dongle
    cloud_source: str | None = None  # the cloud provider's name (e.g. "enode")
    cloud_last_seen: datetime | None = None  # last telemetry via the cloud provider
    obd_last_seen: datetime | None = None  # last telemetry via the OBD dongle
    soc_last_seen: datetime | None = None  # when the SoC reading was measured
    ref_consumption_wh_km: float | None = None
    max_speed_kmh: float | None = None
    weight_kg: float | None = None
    raw: dict[str, Any] = field(default_factory=dict)


@dataclass
class VehicleRefresh:
    """Result of a ``get_tlm`` call: per-vehicle metadata + raw payloads.

    ``items`` are the raw per-vehicle payloads (vehicle-level status fields plus
    the ``tlm`` telemetry block); the coordinator merges each ``tlm`` onto its
    running per-vehicle telemetry and builds the snapshots from the result.
    """

    fetched_at: datetime
    vehicles: list[Vehicle]
    items: list[dict[str, Any]]
    # Bumps whenever account settings change (on any device); used to know
    # when to re-fetch settings.
    settings_version: int | None = None


class AbrpApi:
    """Thin async wrapper around the ABRP telemetry API."""

    def __init__(self, session: aiohttp.ClientSession, metadata: AbrpMetadata) -> None:
        self._session = session
        self._metadata = metadata

    async def _post(
        self, url: str, body: dict[str, Any], headers: dict[str, str]
    ) -> dict[str, Any]:
        try:
            async with self._session.post(url, json=body, headers=headers) as response:
                response.raise_for_status()
                return await response.json()
        except aiohttp.ClientError as err:
            raise AbrpApiError(f"ABRP request to {url} failed: {err}") from err

    async def refresh_vehicles(self, access_token: str) -> VehicleRefresh:
        """Fetch vehicle metadata and the latest telemetry snapshot.

        The OAuth ``access_token`` is used directly as the iternio session id.
        """
        headers = {**web_request_headers(self._metadata.api_key), "accept": "*/*"}
        response = await self._post(GET_TLM_URL, {"session_id": access_token}, headers)
        if response.get("status") != "ok":
            raise AbrpApiError(f"get_tlm returned status {response.get('status')!r}")

        result = response.get("result") or []
        items = [item for item in result if isinstance(item, dict)]
        vehicles = [_normalize_vehicle(item) for item in items]
        extra = response.get("extra") or {}
        version = extra.get("settings_version")
        return VehicleRefresh(
            fetched_at=datetime.now(timezone.utc),
            vehicles=vehicles,
            items=items,
            settings_version=version if isinstance(version, int) else None,
        )

    async def get_settings(self, access_token: str) -> dict[str, Any]:
        """Return the account's planning settings."""
        response = await self._post(
            GET_SESSION_URL,
            {
                "session_id": access_token,
                "client": ABRP_CLIENT,
                "version": self._metadata.app_build_number,
                "country_3": ABRP_COUNTRY_3,
            },
            web_request_headers(self._metadata.api_key),
        )
        if response.get("status") != "ok":
            raise AbrpApiError(f"get_session returned {response.get('status')!r}")
        result = response.get("result") or {}
        settings = result.get("settings")
        return settings if isinstance(settings, dict) else {}

    async def set_settings(
        self, access_token: str, changes: dict[str, Any]
    ) -> int | None:
        """Apply a partial update to settings; return the new settings_version."""
        # The web app stamps each change with a client time (ms) used for
        # last-write-wins conflict resolution; include it so our changes win.
        settings = {**changes, "settings_update_time": int(time.time() * 1000)}
        response = await self._post(
            SET_SETTINGS_URL,
            {"session_id": access_token, "settings": settings},
            web_request_headers(self._metadata.api_key),
        )
        if response.get("status") != "ok":
            raise AbrpApiError(f"set_settings returned {response.get('status')!r}")
        version = response.get("settings_version")
        return version if isinstance(version, int) else None

    async def set_active_config(
        self, access_token: str, vehicle_id: int, config_id: str
    ) -> None:
        """Switch a vehicle's active drive-profile configuration.

        set_vehicle_data merges, so only the changed fields need to be sent.
        """
        body = {
            "wait": True,
            "session_id": access_token,
            "vehicle_id": vehicle_id,
            "active_config": config_id,
            "config": config_id,
        }
        response = await self._post(
            SET_VEHICLE_DATA_URL, body, web_request_headers(self._metadata.api_key)
        )
        if response.get("status") != "ok":
            raise AbrpApiError(f"set_vehicle_data returned {response.get('status')!r}")


# --- normalization helpers ------------------------------------------------


def _as_dict(value: Any) -> dict[str, Any]:
    return value if isinstance(value, dict) else {}


def _as_float(value: Any) -> float | None:
    return (
        float(value)
        if isinstance(value, (int, float)) and not isinstance(value, bool)
        else None
    )


def _first_float(*values: Any) -> float | None:
    """First value that is actually a number — 0.0 counts, unlike with ``or``."""
    for value in values:
        result = _as_float(value)
        if result is not None:
            return result
    return None


def _as_bool(value: Any) -> bool | None:
    return value if isinstance(value, bool) else None


def _as_str(value: Any) -> str | None:
    return value if isinstance(value, str) else None


def _optional_unix_seconds(value: Any) -> datetime | None:
    seconds = _as_float(value)
    if seconds is None or seconds <= 0:
        return None
    return datetime.fromtimestamp(seconds, tz=timezone.utc)


def _normalize_vehicle(item: dict[str, Any]) -> Vehicle:
    vehicle_id = item.get("vehicle_id")
    if not isinstance(vehicle_id, int):
        raise AbrpApiError("ABRP payload is missing numeric vehicle_id")
    return Vehicle(
        vehicle_id=vehicle_id,
        name=_as_str(item.get("name")),
        car_model=_as_str(item.get("car_model")),
        paint=_as_str(item.get("paint")),
        active_config=_as_str(item.get("active_config")),
        configurations=_as_dict(item.get("configurations")),
        tlm_type=_as_str(item.get("tlm_type")),
        raw=item,
    )


# --- telemetry merge (mirrors the ABRP web app) ---------------------------
#
# ABRP keeps one telemetry record per vehicle and reconciles every incoming
# source (the periodic get_tlm poll and the realtime SSE stream) into it
# *field by field*, keeping whichever source carries the newer per-field
# timestamp. Each field also has its own staleness window: a value whose
# measurement is older than its window is dropped (shown as unknown). This is
# why e.g. SoC keeps updating from the poll while a charging burst floods the
# stream with power readings — and why a finished charge clears instead of
# sticking. We replicate that exactly here.

_HOUR = 3600
_DAY = 86400
_WEEK = 604800
_MONTH = 2592000

# Per-field staleness windows in seconds. A field older than its window is
# blanked. Fields absent here never go stale on their own.
_FIELD_TTL: dict[str, int] = {
    "soc": _WEEK,
    "soe": _DAY,
    "power": 300,
    "hvac_power": 300,
    "speed": 30,
    "is_charging": _HOUR,
    "is_dcfc": _DAY,
    "is_parked": 300,
    "capacity": _MONTH,
    "kwh_charged": 300,
    "soh": _MONTH,
    "voltage": 300,
    "current": 300,
    "odometer": _WEEK,
    "est_battery_range": _DAY,
    "ext_temp": _HOUR,
    "batt_temp": _HOUR,
    "cabin_temp": _HOUR,
}
# Calibration values ABRP keeps "sticky": an update only replaces them if its
# timestamp is strictly newer (never on a tie).
_STICKY_FIELDS = frozenset(
    {"calib_ref_cons", "calib_confidence", "calib_max_speed", "speed_factor"}
)
# tlm sub-keys that are bookkeeping, not telemetry values.
_META_KEYS = frozenset({"timestamps", "providers", "utc"})


def _num0(value: Any) -> float:
    """A numeric value as float; anything non-numeric counts as 0."""
    if isinstance(value, (int, float)) and not isinstance(value, bool):
        return float(value)
    return 0.0


def _blank_if_stale(
    tlm: dict[str, Any],
    timestamps: dict[str, float],
    providers: dict[str, Any],
    key: str,
    field_ts: float,
    now: float,
) -> None:
    """Drop a field whose measurement is older than its staleness window."""
    if tlm.get(key) is None:
        return
    if key == "soh" and tlm.get(key) == 0:
        tlm[key] = None
        timestamps.pop(key, None)
        providers.pop(key, None)
        return
    ttl = _FIELD_TTL.get(key)
    # A quick DC session ages out after an hour; slow AC (or unknown) charging
    # lingers for a day, matching ABRP.
    if key == "is_charging" and not tlm.get("is_dcfc"):
        ttl = _DAY
    if ttl is not None and (now - field_ts) > ttl:
        tlm[key] = None
        timestamps.pop(key, None)
        providers.pop(key, None)


def merge_tlm(
    store: dict[str, Any] | None, update: dict[str, Any], now: float
) -> dict[str, Any]:
    """Merge ``update`` onto ``store`` field-by-field by per-field timestamp.

    ``store``/``update`` are tlm dicts carrying ``timestamps`` (field -> unix
    seconds) and ``providers`` (field -> source) maps. For each field the value
    with the newer timestamp wins; stale fields are dropped. Returns a fresh
    merged tlm whose ``utc`` is the newest field timestamp seen.
    """
    store = store or {}
    s_ts = _as_dict(store.get("timestamps"))
    u_ts = _as_dict(update.get("timestamps"))
    s_prov = _as_dict(store.get("providers"))
    u_prov = _as_dict(update.get("providers"))
    s_utc = _num0(store.get("utc"))
    u_utc = _num0(update.get("utc"))

    merged: dict[str, Any] = {}
    timestamps: dict[str, float] = {}
    providers: dict[str, Any] = {}
    chosen_ts: dict[str, float] = {}
    newest = max(s_utc, u_utc)

    for key in (set(store) | set(update)) - _META_KEYS:
        if key not in update:
            value, ts, prov = store.get(key), _num0(s_ts.get(key)), s_prov.get(key)
        else:
            ts_store = _num0(s_ts.get(key, s_utc)) if key in store else 0.0
            ts_update = _num0(u_ts.get(key, u_utc))
            # ABRP prefers an OBD SoC over a coarser Android-Auto one when the
            # two are within 30 s of each other.
            soc_tiebreak = (
                key == "soc"
                and s_prov.get("soc") == "android_auto"
                and u_prov.get("soc") == "obdble"
                and ts_store - ts_update < 30
            )
            store_wins = (
                key in store
                and ts_store > ts_update
                and key not in _STICKY_FIELDS
                and not soc_tiebreak
            )
            if store_wins:
                value, ts, prov = store.get(key), ts_store, s_prov.get(key)
            else:
                value, ts, prov = update.get(key), ts_update, u_prov.get(key)
        merged[key] = value
        chosen_ts[key] = ts
        if ts > 0:
            timestamps[key] = ts
            newest = max(newest, ts)
        if prov is not None:
            providers[key] = prov

    # Apply staleness once everything is in place (so is_charging can see the
    # merged is_dcfc). Fields with no own timestamp fall back to the freshest
    # so a just-polled value isn't wrongly aged out.
    for key in list(merged):
        _blank_if_stale(
            merged, timestamps, providers, key, chosen_ts.get(key) or newest, now
        )

    merged["utc"] = newest or u_utc or s_utc
    merged["timestamps"] = timestamps
    merged["providers"] = providers
    return merged


def build_snapshot(item: dict[str, Any], tlm: dict[str, Any] | None) -> Snapshot:
    """Build a :class:`Snapshot` from a vehicle payload and its merged tlm."""
    tlm = tlm or {}
    location = _as_dict(tlm.get("location"))
    providers = _as_dict(tlm.get("providers"))
    # calib_confidence comes as a 0..1 fraction.
    confidence = _as_float(tlm.get("calib_confidence"))
    # A non-positive speed factor marks an invalid calibration (ABRP drops it).
    speed_factor = _as_float(tlm.get("speed_factor"))
    if speed_factor is not None and speed_factor <= 0:
        speed_factor = None

    # ABRP's "last seen" is the newest of the cloud time, the local/OBD time
    # and the merged telemetry time; the displayed data source is whichever of
    # those is currently freshest.
    ota_time = _num0(item.get("ota_tlm_time"))
    tlm_time = _num0(item.get("tlm_time"))
    last_seen = max(ota_time, tlm_time, _num0(tlm.get("utc")))
    ota_type = _as_str(item.get("ota_tlm_type"))
    tlm_type = _as_str(item.get("tlm_type"))
    source = ota_type if (ota_time == last_seen and ota_type) else (tlm_type or ota_type)
    recorded_at = (
        datetime.fromtimestamp(last_seen, tz=timezone.utc)
        if last_seen > 0
        else datetime.now(timezone.utc)
    )
    soc_ts = _num0(_as_dict(tlm.get("timestamps")).get("soc"))
    soc_last_seen = (
        datetime.fromtimestamp(soc_ts, tz=timezone.utc) if soc_ts > 0 else None
    )

    return Snapshot(
        vehicle_id=item["vehicle_id"],
        source="get_tlm",
        recorded_at=recorded_at,
        soc_percent=_as_float(tlm.get("soc")),
        is_charging=_as_bool(tlm.get("is_charging")),
        is_driving=_as_bool(tlm.get("is_driving")),
        is_dcfc=_as_bool(tlm.get("is_dcfc")),
        is_parked=_as_bool(tlm.get("is_parked")),
        power_kw=_as_float(tlm.get("power")),
        voltage_v=_as_float(tlm.get("voltage")),
        current_a=_as_float(tlm.get("current")),
        odometer_km=_as_float(tlm.get("odometer")),
        latitude=_as_float(tlm.get("lat")),
        longitude=_as_float(tlm.get("lon")),
        heading_deg=_as_float(tlm.get("heading")),
        ext_temp_c=_as_float(tlm.get("ext_temp")),
        cabin_temp_c=_as_float(tlm.get("cabin_temp")),
        batt_temp_c=_as_float(tlm.get("batt_temp")),
        vehicle_temp_c=_as_float(tlm.get("vehicle_temp")),
        # ABRP hides GPS-derived speed; only surface a non-GPS reading.
        speed_kmh=_as_float(tlm.get("speed"))
        if providers.get("speed") != "gps"
        else None,
        estimated_range_km=_as_float(tlm.get("est_battery_range")),
        battery_capacity_kwh=_first_float(
            tlm.get("battery_capacity"), tlm.get("capacity")
        ),
        charging_energy_added_kwh=_first_float(
            tlm.get("charge_energy_added"), tlm.get("kwh_charged")
        ),
        soe_kwh=_as_float(tlm.get("soe")),
        soh_percent=_as_float(tlm.get("soh")),
        elevation_m=_as_float(tlm.get("elevation")),
        cabin_set_point_c=_as_float(tlm.get("cabin_set_point")),
        plugged_in=_as_bool(tlm.get("is_charger_connected")),
        speed_factor=speed_factor,
        calib_confidence_percent=None if confidence is None else confidence * 100,
        hvac_power_kw=_as_float(tlm.get("hvac_power")),
        timezone=_as_str(location.get("timezone")),
        country3=_as_str(location.get("country_3")),
        charger_id=tlm.get("charger_id")
        if isinstance(tlm.get("charger_id"), int)
        else None,
        tlm_source=source,
        providers=providers or None,
        is_connected=_as_bool(item.get("is_connected")),
        is_asleep=_as_bool(item.get("is_asleep")),
        cloud_connected=_as_bool(item.get("ota_is_connected")),
        obd_connected=_as_bool(item.get("local_is_connected")),
        cloud_source=ota_type,
        cloud_last_seen=_optional_unix_seconds(item.get("ota_tlm_time")),
        obd_last_seen=_optional_unix_seconds(item.get("tlm_time")),
        soc_last_seen=soc_last_seen,
        ref_consumption_wh_km=_as_float(tlm.get("calib_ref_cons")),
        max_speed_kmh=_as_float(tlm.get("max_speed")),
        weight_kg=_as_float(tlm.get("weight")),
        raw=item,
    )
