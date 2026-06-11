"""Realtime telemetry stream for the ABRP Mate integration.

Opens the ABRP server-sent-events endpoint (``/2/tlm``) for a vehicle and
decodes the unit-tagged event payloads into :class:`Snapshot` updates that get
merged onto the latest known snapshot.
"""

from __future__ import annotations

import asyncio
import json
import logging
import time
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
# A connection that lived at least this long counts as healthy, so the next
# reconnect starts from the minimum backoff again.
_HEALTHY_CONNECTION_SECONDS = 60
# Reconnect if the stream goes completely silent for this long. The access
# token used as the session id expires after ~15 minutes anyway, so a periodic
# reconnect also keeps the session fresh; quiet (parked) vehicles just cycle
# the connection cheaply.
_IDLE_TIMEOUT_SECONDS = 600

SnapshotCallback = Callable[[Snapshot], Awaitable[None] | None]
TokenProvider = Callable[[], Awaitable[str]]
BaseProvider = Callable[[], Snapshot | None]
StateCallback = Callable[[bool], None]


class AbrpLiveStream:
    """Consume the ABRP realtime SSE stream for a single vehicle."""

    def __init__(
        self,
        session: aiohttp.ClientSession,
        metadata: AbrpMetadata,
        token_provider: TokenProvider,
        vehicle_id: int,
        on_snapshot: SnapshotCallback,
        seed: Snapshot | None = None,
        base_provider: BaseProvider | None = None,
        on_state: StateCallback | None = None,
    ) -> None:
        self._session = session
        self._metadata = metadata
        self._token_provider = token_provider
        self._vehicle_id = vehicle_id
        self._on_snapshot = on_snapshot
        self._current = seed
        # Latest merged snapshot to use as the merge base for partial events
        # (typically the coordinator's view, which includes poll updates).
        self._base_provider = base_provider
        self._on_state = on_state
        self._connected = False
        self._connected_at: float | None = None
        self._task: asyncio.Task | None = None
        self._stopping = False

    @property
    def connected(self) -> bool:
        """Whether the SSE connection is currently established."""
        return self._connected

    def _set_connected(self, connected: bool) -> None:
        if self._connected == connected:
            return
        self._connected = connected
        if self._on_state is not None:
            self._on_state(connected)

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
        self._set_connected(False)

    async def _run(self) -> None:
        backoff = _RECONNECT_MIN
        while not self._stopping:
            self._connected_at = None
            try:
                await self._consume()
            except asyncio.CancelledError:
                self._set_connected(False)
                raise
            except Exception as err:  # noqa: BLE001 - log and reconnect
                _LOGGER.debug(
                    "ABRP stream for vehicle %s dropped: %s; reconnecting in %ss",
                    self._vehicle_id,
                    err,
                    backoff,
                )
            self._set_connected(False)
            if self._stopping:
                break
            lived_long_enough = (
                self._connected_at is not None
                and (time.monotonic() - self._connected_at)
                >= _HEALTHY_CONNECTION_SECONDS
            )
            backoff = (
                _RECONNECT_MIN
                if lived_long_enough
                else min(backoff * 2, _RECONNECT_MAX)
            )
            await asyncio.sleep(backoff)

    async def _consume(self) -> None:
        # Fetch a fresh access token for each (re)connect; it is used as the
        # iternio session id and expires every ~15 minutes.
        access_token = await self._token_provider()
        headers = stream_headers(
            self._metadata.api_key, self._metadata.app_version, access_token
        )
        url = f"{TLM_EVENTS_URL}?vehicleIds={self._vehicle_id}"
        # The session's default timeout would kill a long-lived SSE response;
        # disable the total deadline and instead reconnect when the stream
        # goes silent (sock_read) or the connect hangs.
        timeout = aiohttp.ClientTimeout(
            total=None, sock_connect=30, sock_read=_IDLE_TIMEOUT_SECONDS
        )
        async with self._session.get(
            url, headers=headers, timeout=timeout
        ) as response:
            response.raise_for_status()
            self._connected_at = time.monotonic()
            self._set_connected(True)
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

        # Merge onto the freshest full snapshot available: the coordinator's
        # (which carries poll-only fields like connection status) over our own
        # last merge result.
        latest = self._base_provider() if self._base_provider else None
        base = latest or self._current

        vehicle_id = event.get("vehicleId")
        if not isinstance(vehicle_id, int):
            vehicle_id = base.vehicle_id if base else None
        if not isinstance(vehicle_id, int):
            return None

        base = base or Snapshot(
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


# Transient signals are only meaningful while fresh; a parked/asleep vehicle's
# event still carries the last driving value with an old per-field timestamp.
_TRANSIENT_STALE_SECONDS = 300


def _field_time(record: dict[str, Any]) -> datetime | None:
    value = record.get("time")
    if not isinstance(value, str):
        return None
    try:
        return datetime.fromisoformat(value.replace("Z", "+00:00"))
    except ValueError:
        return None


def _apply_transient(
    snapshot: Snapshot,
    attr: str,
    record: dict[str, Any],
    value: float | None,
    now: datetime,
) -> None:
    """Apply a transient field only if its event timestamp is fresh.

    present & fresh -> value; present & stale -> None; absent -> left unchanged.
    """
    if not record:
        return
    field_time = _field_time(record)
    fresh = (
        field_time is not None
        and (now - field_time).total_seconds() <= _TRANSIENT_STALE_SECONDS
    )
    setattr(snapshot, attr, value if fresh else None)


def _update_from_event(snapshot: Snapshot, event: dict[str, Any]) -> None:
    """Merge a decoded SSE event onto the snapshot."""
    now = datetime.now(timezone.utc)
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
    current = _rec(event, "current")
    _apply_transient(snapshot, "current_a", current, _num(current, "a"), now)
    snapshot.estimated_range_km = _choose(
        snapshot.estimated_range_km,
        _scale(_rec(event, "estimatedBatteryRange"), "m", 1000),
    )
    snapshot.ext_temp_c = _choose(
        snapshot.ext_temp_c, _num(_rec(event, "externalTemperature"), "c")
    )
    heading = _rec(event, "heading")
    _apply_transient(snapshot, "heading_deg", heading, _num(heading, "degrees"), now)
    snapshot.hvac_power_kw = _choose(
        snapshot.hvac_power_kw, _scale(_rec(event, "hvacPower"), "w", 1000)
    )
    location = _rec(event, "location")
    snapshot.latitude = _choose(snapshot.latitude, _num(location, "lat"))
    snapshot.longitude = _choose(snapshot.longitude, _num(location, "long"))
    snapshot.odometer_km = _choose(
        snapshot.odometer_km, _scale(_rec(event, "odometer"), "m", 1000)
    )
    power = _rec(event, "power")
    _apply_transient(snapshot, "power_kw", power, _scale(power, "w", 1000), now)
    # soc.frac is a 0..1 fraction; /0.01 converts it to a percentage.
    snapshot.soc_percent = _choose(
        snapshot.soc_percent, _scale(_rec(event, "soc"), "frac", 0.01)
    )
    # speed.ms is metres/second; /(1/3.6) converts to km/h.
    speed = _rec(event, "speed")
    _apply_transient(snapshot, "speed_kmh", speed, _scale(speed, "ms", 1 / 3.6), now)
    voltage = _rec(event, "voltage")
    _apply_transient(snapshot, "voltage_v", voltage, _num(voltage, "v"), now)

    charging_state = _rec(event, "chargingState").get("state")
    if isinstance(charging_state, str):
        snapshot.charging_state = charging_state
        snapshot.is_charging = charging_state != "NOT_CHARGING"

    driving_state = _rec(event, "drivingState").get("state")
    if isinstance(driving_state, str):
        snapshot.driving_state = driving_state
        snapshot.is_driving = driving_state in ("DRIVE", "DRIVING")
        snapshot.is_parked = driving_state in ("PARK", "PARKED")
