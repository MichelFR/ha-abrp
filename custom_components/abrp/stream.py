"""Realtime telemetry stream for the ABRP Mate integration.

Opens the ABRP server-sent-events endpoint (``/2/tlm``) for a vehicle and
decodes the unit-tagged event payloads into partial telemetry (``tlm``) updates
that the coordinator merges onto its running per-vehicle record — exactly the
shape the periodic poll produces, so the two reconcile field-by-field.
"""

from __future__ import annotations

import asyncio
import json
import logging
import time
from collections.abc import Awaitable, Callable
from datetime import datetime
from typing import Any

import aiohttp

from .api import _num0
from .const import TLM_EVENTS_URL, stream_headers
from .metadata import AbrpMetadata

_LOGGER = logging.getLogger(__name__)

# Reconnect backoff bounds (seconds). The minimum matches the official ABRP
# client's 5 s reconnect interval; unlike it we back off on repeated errors.
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

Tlm = dict[str, Any]
TlmCallback = Callable[[int, Tlm], Awaitable[None] | None]
TokenProvider = Callable[[], Awaitable[str]]
BaseProvider = Callable[[], Tlm | None]
StateCallback = Callable[[bool], None]


class AbrpLiveStream:
    """Consume the ABRP realtime SSE stream for a single vehicle."""

    def __init__(
        self,
        session: aiohttp.ClientSession,
        metadata: AbrpMetadata,
        token_provider: TokenProvider,
        vehicle_id: int,
        on_tlm: TlmCallback,
        base_provider: BaseProvider | None = None,
        on_state: StateCallback | None = None,
    ) -> None:
        self._session = session
        self._metadata = metadata
        self._token_provider = token_provider
        self._vehicle_id = vehicle_id
        self._on_tlm = on_tlm
        # The vehicle's current merged tlm, used as the base for the few fields
        # an event doesn't carry (e.g. the is_charging timestamp).
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
            clean_close = False
            try:
                await self._consume()
                # The server routinely ends idle streams (~3 minutes without
                # events); the official ABRP client treats this as normal and
                # quietly reopens, so we stay "connected" through the gap.
                clean_close = True
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
            if self._stopping:
                self._set_connected(False)
                break
            if clean_close:
                backoff = _RECONNECT_MIN
            else:
                self._set_connected(False)
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
                    update = self._apply_payload(payload)
                    if update is not None:
                        result = self._on_tlm(self._vehicle_id, update)
                        if asyncio.iscoroutine(result):
                            await result

    def _apply_payload(self, payload: str) -> Tlm | None:
        try:
            event = json.loads(payload)
        except json.JSONDecodeError:
            return None
        if not isinstance(event, dict):
            return None
        current = self._base_provider() if self._base_provider else None
        update = _event_to_tlm(event, current)
        # Nothing recognized in this event -> nothing to merge.
        if not update.get("timestamps"):
            return None
        return update


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


def _sub_value(sub: dict[str, Any], key: str) -> float | None:
    value = sub.get(key)
    if isinstance(value, (int, float)) and not isinstance(value, bool):
        return float(value)
    return None


def _time_unix(value: Any) -> float:
    """An ISO-8601 ``time`` string as unix seconds, 0 if unparseable."""
    if not isinstance(value, str):
        return 0.0
    try:
        return datetime.fromisoformat(value.replace("Z", "+00:00")).timestamp()
    except ValueError:
        return 0.0


# ABRP's realtime "internal provider" codes mapped to the source names that the
# poll's ``providers`` map already uses (so streamed and polled fields agree on
# their source). From ProviderToInternalProviderMap in the ABRP web bundle.
_PROVIDER_MAP = {
    "RIVIAN_PLAN": "rivian",
    "RIVIAN_STREAM": "rivian",
    "RIVIAN_POLL": "rivian",
    "TESLA_FLEET_STREAM": "tesla",
    "TESLA_FLEET_POLL": "tesla",
    "APP_AUTO": "android_auto",
    "APP_AUTOMOTIVE": "automotive",
    "APP_LOCATION": "gps",
    "APP_OBD": "obdble",
    "HIGHMOBILITY_MQTT": "highmobility",
    "ENODE_PUSH": "enode",
    "TLM_API": "api",
    "TRONITY_POLL": "tronity",
    "DERIVED": "derived",
}

# event sub-object -> (tlm field, converter from the sub-object to a value in
# the same units the poll's tlm uses). Mirrors the decode in the ABRP bundle.
_EVENT_FIELDS: dict[str, tuple[str, Callable[[dict[str, Any]], float | None]]] = {
    "batteryCapacity": ("capacity", lambda s: _div(_sub_value(s, "wh"), 1000)),
    "batteryTemperature": ("batt_temp", lambda s: _sub_value(s, "c")),
    "cabinSetPoint": ("cabin_set_point", lambda s: _sub_value(s, "c")),
    "cabinTemperature": ("cabin_temp", lambda s: _sub_value(s, "c")),
    "calibratedConfidence": ("calib_confidence", lambda s: _sub_value(s, "frac")),
    "calibratedRefCons": ("calib_ref_cons", lambda s: _pos(_sub_value(s, "wh_per_km"))),
    "chargingEnergyAdded": ("kwh_charged", lambda s: _div(_sub_value(s, "wh"), 1000)),
    "current": ("current", lambda s: _sub_value(s, "a")),
    "elevation": ("elevation", lambda s: _sub_value(s, "m")),
    "estimatedBatteryRange": ("est_battery_range", lambda s: _div(_sub_value(s, "m"), 1000)),
    "externalTemperature": ("ext_temp", lambda s: _sub_value(s, "c")),
    "heading": ("heading", lambda s: _sub_value(s, "degrees")),
    "hvacPower": ("hvac_power", lambda s: _div(_sub_value(s, "w"), 1000)),
    "odometer": ("odometer", lambda s: _div(_sub_value(s, "m"), 1000)),
    "power": ("power", lambda s: _div(_sub_value(s, "w"), 1000)),
    "soc": ("soc", lambda s: _mul(_sub_value(s, "frac"), 100)),
    "soe": ("soe", lambda s: _div(_sub_value(s, "wh"), 1000)),
    "soh": ("soh", lambda s: _mul(_sub_value(s, "frac"), 100)),
    "speed": ("speed", lambda s: _mul(_sub_value(s, "ms"), 3.6)),
    "speedFactor": ("speed_factor", lambda s: _pos(_sub_value(s, "frac"))),
    "voltage": ("voltage", lambda s: _sub_value(s, "v")),
}


def _div(value: float | None, divisor: float) -> float | None:
    return value / divisor if value is not None else None


def _mul(value: float | None, factor: float) -> float | None:
    return value * factor if value is not None else None


def _pos(value: float | None) -> float | None:
    """Keep a value only if strictly positive (an invalid calibration is 0)."""
    return value if value is not None and value > 0 else None


def _event_to_tlm(event: dict[str, Any], current: Tlm | None) -> Tlm:
    """Decode an SSE event into a partial tlm update the coordinator can merge.

    The result carries only the fields the event actually touched, each with
    its own measurement timestamp (and source provider) so the coordinator's
    per-field merge can reconcile it with the poll.
    """
    cur_ts = (current or {}).get("timestamps") if current else None
    cur_ts = cur_ts if isinstance(cur_ts, dict) else {}

    values: dict[str, Any] = {}
    timestamps: dict[str, float] = {}
    providers: dict[str, Any] = {}
    utc = 0.0

    for ekey, sub in event.items():
        if not isinstance(sub, dict):
            continue
        ts = _time_unix(sub.get("time"))
        utc = max(utc, ts)
        provider_key = sub.get("provider")
        provider = (
            _PROVIDER_MAP.get(provider_key) if isinstance(provider_key, str) else None
        )

        if ekey == "location":
            for field, src in (("lat", "lat"), ("lon", "long")):
                value = _sub_value(sub, src)
                if value is not None:
                    values[field] = value
                    timestamps[field] = ts
                    if provider is not None:
                        providers[field] = provider
            continue

        if ekey == "chargingState":
            state = sub.get("state")
            if isinstance(state, str):
                charging = state in ("CHARGING_AC", "CHARGING_DC", "CHARGING_UNKNOWN")
                dcfc = state == "CHARGING_DC"
                values["is_charging"] = charging
                values["is_dcfc"] = dcfc
                # ABRP only advances these timestamps while actually charging,
                # so a finished charge ages out from when it last charged.
                timestamps["is_charging"] = ts if charging else _num0(cur_ts.get("is_charging"))
                timestamps["is_dcfc"] = ts if dcfc else _num0(cur_ts.get("is_dcfc"))
                if provider is not None:
                    if charging:
                        providers["is_charging"] = provider
                    if dcfc:
                        providers["is_dcfc"] = provider
            continue

        if ekey == "drivingState":
            state = sub.get("state")
            if isinstance(state, str):
                values["is_driving"] = state == "DRIVE"
                timestamps["is_driving"] = ts
                if provider is not None:
                    providers["is_driving"] = provider
            continue

        mapping = _EVENT_FIELDS.get(ekey)
        if mapping is None:
            continue
        field, convert = mapping
        value = convert(sub)
        if value is not None:
            values[field] = value
            timestamps[field] = ts
            if provider is not None:
                providers[field] = provider

    values["timestamps"] = timestamps
    values["providers"] = providers
    values["utc"] = utc
    return values
