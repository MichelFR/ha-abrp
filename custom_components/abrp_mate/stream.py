"""Realtime telemetry stream for the ABRP Mate integration.

Opens the ABRP server-sent-events endpoint (``/2/tlm``) for a vehicle and
decodes the unit-tagged event payloads into :class:`Snapshot` updates that get
merged onto the latest known snapshot.
"""

from __future__ import annotations

import asyncio
import json
import logging
from collections.abc import Awaitable, Callable
from dataclasses import replace
from datetime import datetime, timezone
from typing import Any

import aiohttp

from .api import Snapshot
from .const import TLM_EVENTS_URL, stream_headers
from .metadata import AbrpMetadata

_LOGGER = logging.getLogger(__name__)

# Reconnect backoff bounds (seconds).
_RECONNECT_MIN = 5
_RECONNECT_MAX = 60

SnapshotCallback = Callable[[Snapshot], Awaitable[None] | None]


class AbrpLiveStream:
    """Consume the ABRP realtime SSE stream for a single vehicle."""

    def __init__(
        self,
        session: aiohttp.ClientSession,
        metadata: AbrpMetadata,
        session_id: str,
        vehicle_id: int,
        on_snapshot: SnapshotCallback,
        seed: Snapshot | None = None,
    ) -> None:
        self._session = session
        self._metadata = metadata
        self._session_id = session_id
        self._vehicle_id = vehicle_id
        self._on_snapshot = on_snapshot
        self._current = seed
        self._task: asyncio.Task | None = None
        self._stopping = False

    def start(self) -> None:
        """Start the background reconnect loop."""
        if self._task is None:
            self._stopping = False
            self._task = asyncio.create_task(self._run())

    async def stop(self) -> None:
        """Stop the stream and wait for the task to finish."""
        self._stopping = True
        if self._task is not None:
            self._task.cancel()
            try:
                await self._task
            except asyncio.CancelledError:
                pass
            self._task = None

    async def _run(self) -> None:
        backoff = _RECONNECT_MIN
        while not self._stopping:
            try:
                await self._consume()
                backoff = _RECONNECT_MIN
            except asyncio.CancelledError:
                raise
            except Exception as err:  # noqa: BLE001 - log and reconnect
                _LOGGER.debug(
                    "ABRP stream for vehicle %s dropped: %s; reconnecting in %ss",
                    self._vehicle_id,
                    err,
                    backoff,
                )
            if self._stopping:
                break
            await asyncio.sleep(backoff)
            backoff = min(backoff * 2, _RECONNECT_MAX)

    async def _consume(self) -> None:
        headers = stream_headers(
            self._metadata.api_key, self._metadata.app_version, self._session_id
        )
        url = f"{TLM_EVENTS_URL}?vehicleIds={self._vehicle_id}"
        async with self._session.get(headers=headers, url=url) as response:
            response.raise_for_status()
            buffer = ""
            async for chunk in response.content.iter_any():
                buffer += chunk.decode("utf-8", errors="replace")
                payloads, buffer = _extract_payloads(buffer)
                for payload in payloads:
                    snapshot = self._apply_payload(payload)
                    if snapshot is not None:
                        result = self._on_snapshot(snapshot)
                        if asyncio.iscoroutine(result):
                            await result

    def _apply_payload(self, payload: str) -> Snapshot | None:
        try:
            event = json.loads(payload)
        except json.JSONDecodeError:
            return None
        if not isinstance(event, dict):
            return None

        vehicle_id = event.get("vehicleId")
        if not isinstance(vehicle_id, int):
            vehicle_id = self._current.vehicle_id if self._current else None
        if not isinstance(vehicle_id, int):
            return None

        base = self._current or Snapshot(
            vehicle_id=vehicle_id,
            source="tlm_event",
            recorded_at=datetime.now(timezone.utc),
        )
        snapshot = replace(
            base,
            vehicle_id=vehicle_id,
            source="tlm_event",
            recorded_at=_event_timestamp(event),
            raw=event,
        )
        _update_from_event(snapshot, event)
        self._current = snapshot
        return snapshot


def _extract_payloads(buffer: str) -> tuple[list[str], str]:
    """Split an SSE buffer into complete payloads, returning the remainder."""
    normalized = buffer.replace("\r\n", "\n")
    parts = normalized.split("\n\n")
    rest = parts.pop() if parts else ""
    payloads = []
    for part in parts:
        decoded = _parse_sse_block(part)
        if decoded:
            payloads.append(decoded)
    return payloads, rest


def _parse_sse_block(block: str) -> str | None:
    if not block.strip():
        return None
    data_lines = []
    for raw_line in block.split("\n"):
        line = raw_line.strip()
        if not line or line.startswith(":"):
            continue
        if line.startswith("data:"):
            line = line[5:].strip()
        if line:
            data_lines.append(line)
    return "\n".join(data_lines) if data_lines else None


def _event_timestamp(event: dict[str, Any]) -> datetime:
    """Pick the latest ``time`` field across the event's sub-objects."""
    times = sorted(
        value["time"]
        for value in event.values()
        if isinstance(value, dict) and isinstance(value.get("time"), str)
    )
    if times:
        try:
            return datetime.fromisoformat(times[-1].replace("Z", "+00:00"))
        except ValueError:
            pass
    return datetime.now(timezone.utc)


def _scale(record: dict[str, Any], key: str, divisor: float) -> float | None:
    value = record.get(key)
    if isinstance(value, (int, float)) and not isinstance(value, bool):
        return value / divisor
    return None


def _num(record: dict[str, Any], key: str) -> float | None:
    value = record.get(key)
    if isinstance(value, (int, float)) and not isinstance(value, bool):
        return float(value)
    return None


def _rec(event: dict[str, Any], key: str) -> dict[str, Any]:
    value = event.get(key)
    return value if isinstance(value, dict) else {}


def _choose(current: Any, nxt: Any) -> Any:
    return nxt if nxt is not None else current


def _update_from_event(snapshot: Snapshot, event: dict[str, Any]) -> None:
    """Merge a decoded SSE event onto the snapshot."""
    snapshot.battery_capacity_kwh = _choose(
        snapshot.battery_capacity_kwh,
        _scale(_rec(event, "batteryCapacity"), "wh", 1000),
    )
    snapshot.batt_temp_c = _choose(
        snapshot.batt_temp_c, _num(_rec(event, "batteryTemperature"), "c")
    )
    snapshot.cabin_temp_c = _choose(
        snapshot.cabin_temp_c, _num(_rec(event, "cabinTemperature"), "c")
    )
    snapshot.charging_energy_added_kwh = _choose(
        snapshot.charging_energy_added_kwh,
        _scale(_rec(event, "chargingEnergyAdded"), "wh", 1000),
    )
    snapshot.current_a = _choose(snapshot.current_a, _num(_rec(event, "current"), "a"))
    snapshot.estimated_range_km = _choose(
        snapshot.estimated_range_km,
        _scale(_rec(event, "estimatedBatteryRange"), "m", 1000),
    )
    snapshot.ext_temp_c = _choose(
        snapshot.ext_temp_c, _num(_rec(event, "externalTemperature"), "c")
    )
    snapshot.heading_deg = _choose(
        snapshot.heading_deg, _num(_rec(event, "heading"), "degrees")
    )
    snapshot.hvac_power_kw = _choose(
        snapshot.hvac_power_kw, _scale(_rec(event, "hvacPower"), "w", 1000)
    )
    location = _rec(event, "location")
    snapshot.latitude = _choose(snapshot.latitude, _num(location, "lat"))
    snapshot.longitude = _choose(snapshot.longitude, _num(location, "long"))
    snapshot.odometer_km = _choose(
        snapshot.odometer_km, _scale(_rec(event, "odometer"), "m", 1000)
    )
    snapshot.power_kw = _choose(
        snapshot.power_kw, _scale(_rec(event, "power"), "w", 1000)
    )
    # soc.frac is a 0..1 fraction; /0.01 converts it to a percentage.
    snapshot.soc_percent = _choose(
        snapshot.soc_percent, _scale(_rec(event, "soc"), "frac", 0.01)
    )
    # speed.ms is metres/second; /(1/3.6) converts to km/h.
    snapshot.speed_kmh = _choose(
        snapshot.speed_kmh, _scale(_rec(event, "speed"), "ms", 1 / 3.6)
    )
    snapshot.voltage_v = _choose(snapshot.voltage_v, _num(_rec(event, "voltage"), "v"))

    charging_state = _rec(event, "chargingState").get("state")
    if isinstance(charging_state, str):
        snapshot.charging_state = charging_state
        snapshot.is_charging = charging_state != "NOT_CHARGING"

    driving_state = _rec(event, "drivingState").get("state")
    if isinstance(driving_state, str):
        snapshot.driving_state = driving_state
        snapshot.is_driving = driving_state in ("DRIVE", "DRIVING")
        snapshot.is_parked = driving_state in ("PARK", "PARKED")
