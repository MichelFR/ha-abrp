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

# Transient signals (speed, power, ...) carry the per-field timestamp from when
# they were last measured. ABRP only treats them as "live" while they keep up
# with the newest telemetry; once a vehicle parks/sleeps they go stale (the last
# value lingers for hours). We blank a transient field if its own timestamp lags
# the newest telemetry (tlm.utc) by more than this, mirroring the ABRP app which
# hides stale speed rather than showing the last driving value.
_TRANSIENT_STALE_SECONDS = 300


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
    ref_consumption_wh_km: float | None = None
    max_speed_kmh: float | None = None
    weight_kg: float | None = None
    raw: dict[str, Any] = field(default_factory=dict)


@dataclass
class VehicleRefresh:
    """Result of a ``get_tlm`` call: per-vehicle metadata + latest snapshot."""

    fetched_at: datetime
    vehicles: list[Vehicle]
    snapshots: list[Snapshot]
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
        vehicles = [_normalize_vehicle(item) for item in result]
        snapshots = [_normalize_snapshot(item) for item in result]
        extra = response.get("extra") or {}
        version = extra.get("settings_version")
        return VehicleRefresh(
            fetched_at=datetime.now(timezone.utc),
            vehicles=vehicles,
            snapshots=snapshots,
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


def _from_unix_seconds(value: Any) -> datetime:
    seconds = _as_float(value)
    if seconds is None:
        return datetime.now(timezone.utc)
    return datetime.fromtimestamp(seconds, tz=timezone.utc)


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


def _normalize_snapshot(item: dict[str, Any]) -> Snapshot:
    tlm = _as_dict(item.get("tlm"))
    location = _as_dict(tlm.get("location"))
    timestamps = _as_dict(tlm.get("timestamps"))
    reference_ts = _as_float(tlm.get("utc"))
    # calib_confidence comes as a 0..1 fraction.
    confidence = _as_float(tlm.get("calib_confidence"))
    # A non-positive speed factor marks an invalid calibration (the ABRP app
    # drops it too).
    speed_factor = _as_float(tlm.get("speed_factor"))
    if speed_factor is not None and speed_factor <= 0:
        speed_factor = None

    def live(field: str, value: float | None) -> float | None:
        """Blank a transient field if its timestamp lags the newest telemetry."""
        if value is None or reference_ts is None:
            return value
        field_ts = _as_float(timestamps.get(field))
        if field_ts is None:
            return value
        return value if (reference_ts - field_ts) <= _TRANSIENT_STALE_SECONDS else None

    return Snapshot(
        vehicle_id=item["vehicle_id"],
        source="get_tlm",
        recorded_at=_from_unix_seconds(tlm.get("utc")),
        soc_percent=_as_float(tlm.get("soc")),
        is_charging=_as_bool(tlm.get("is_charging")),
        is_driving=_as_bool(tlm.get("is_driving")),
        is_dcfc=_as_bool(tlm.get("is_dcfc")),
        is_parked=_as_bool(tlm.get("is_parked")),
        power_kw=live("power", _as_float(tlm.get("power"))),
        voltage_v=live("voltage", _as_float(tlm.get("voltage"))),
        current_a=live("current", _as_float(tlm.get("current"))),
        odometer_km=_as_float(tlm.get("odometer")),
        latitude=_as_float(tlm.get("lat")),
        longitude=_as_float(tlm.get("lon")),
        heading_deg=live("heading", _as_float(tlm.get("heading"))),
        ext_temp_c=_as_float(tlm.get("ext_temp")),
        cabin_temp_c=_as_float(tlm.get("cabin_temp")),
        batt_temp_c=_as_float(tlm.get("batt_temp")),
        vehicle_temp_c=_as_float(tlm.get("vehicle_temp")),
        # ABRP also hides GPS-derived speed; only show a non-GPS live value.
        speed_kmh=live("speed", _as_float(tlm.get("speed")))
        if _as_dict(tlm.get("providers")).get("speed") != "gps"
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
        hvac_power_kw=live("hvac_power", _as_float(tlm.get("hvac_power"))),
        timezone=_as_str(location.get("timezone")),
        country3=_as_str(location.get("country_3")),
        charger_id=tlm.get("charger_id")
        if isinstance(tlm.get("charger_id"), int)
        else None,
        tlm_source=_as_str(tlm.get("tlm_type")) or _as_str(item.get("ota_tlm_type")),
        providers=tlm.get("providers")
        if isinstance(tlm.get("providers"), dict)
        else None,
        is_connected=_as_bool(item.get("is_connected")),
        is_asleep=_as_bool(item.get("is_asleep")),
        cloud_connected=_as_bool(item.get("ota_is_connected")),
        obd_connected=_as_bool(item.get("local_is_connected")),
        cloud_source=_as_str(item.get("ota_tlm_type")),
        cloud_last_seen=_optional_unix_seconds(item.get("ota_tlm_time")),
        obd_last_seen=_optional_unix_seconds(item.get("tlm_time")),
        ref_consumption_wh_km=_as_float(tlm.get("calib_ref_cons")),
        max_speed_kmh=_as_float(tlm.get("max_speed")),
        weight_kg=_as_float(tlm.get("weight")),
        raw=item,
    )
