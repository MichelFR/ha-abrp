"""Async client for the ABRP / Iternio telemetry API.

Fetches vehicle metadata and the latest telemetry snapshot via ``get_tlm``
(the live SSE stream lives in ``stream.py``). Authentication is handled by
``oauth.py`` / ``token_manager.py``; the OAuth access token is passed here as
the ``session_id``.
"""

from __future__ import annotations

from dataclasses import dataclass, field
from datetime import datetime, timezone
from typing import Any

import aiohttp

from .const import GET_TLM_URL, web_request_headers
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
    timezone: str | None = None
    country3: str | None = None
    charger_id: int | None = None
    raw: dict[str, Any] = field(default_factory=dict)


@dataclass
class VehicleRefresh:
    """Result of a ``get_tlm`` call: per-vehicle metadata + latest snapshot."""

    fetched_at: datetime
    vehicles: list[Vehicle]
    snapshots: list[Snapshot]


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
        return VehicleRefresh(
            fetched_at=datetime.now(timezone.utc),
            vehicles=vehicles,
            snapshots=snapshots,
        )


# --- normalization helpers ------------------------------------------------


def _as_dict(value: Any) -> dict[str, Any]:
    return value if isinstance(value, dict) else {}


def _as_float(value: Any) -> float | None:
    return (
        float(value)
        if isinstance(value, (int, float)) and not isinstance(value, bool)
        else None
    )


def _as_bool(value: Any) -> bool | None:
    return value if isinstance(value, bool) else None


def _as_str(value: Any) -> str | None:
    return value if isinstance(value, str) else None


def _from_unix_seconds(value: Any) -> datetime:
    seconds = _as_float(value)
    if seconds is None:
        return datetime.now(timezone.utc)
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
        tlm_type=_as_str(item.get("tlm_type")),
        raw=item,
    )


def _normalize_snapshot(item: dict[str, Any]) -> Snapshot:
    tlm = _as_dict(item.get("tlm"))
    location = _as_dict(tlm.get("location"))
    return Snapshot(
        vehicle_id=item["vehicle_id"],
        source="get_tlm",
        recorded_at=_from_unix_seconds(tlm.get("utc")),
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
        battery_capacity_kwh=_as_float(tlm.get("battery_capacity"))
        or _as_float(tlm.get("capacity")),
        charging_energy_added_kwh=_as_float(tlm.get("charge_energy_added"))
        or _as_float(tlm.get("kwh_charged")),
        timezone=_as_str(location.get("timezone")),
        country3=_as_str(location.get("country_3")),
        charger_id=tlm.get("charger_id")
        if isinstance(tlm.get("charger_id"), int)
        else None,
        raw=item,
    )
