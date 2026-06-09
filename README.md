# ABRP Mate for Home Assistant

A Home Assistant custom integration that brings the same ABRP (A Better Route
Planner) data exposed by the [ABRP Mate](../) collector into Home Assistant:

- **Base data** — vehicle metadata (name, model) discovered from your ABRP
  account, surfaced as a Home Assistant device per vehicle.
- **Realtime data** — live telemetry (state of charge, power, speed, odometer,
  range, temperatures, voltage/current, charging state, location) via ABRP's
  polled `get_tlm` endpoint plus the `/2/tlm` server-sent-events stream.

It is a Python port of the data layer in the Node ABRP Mate project: see
[`api.py`](custom_components/abrp_mate/api.py) (auth + `get_tlm`) and
[`stream.py`](custom_components/abrp_mate/stream.py) (realtime SSE stream).

## How it works

| Concern | ABRP endpoint | File |
| --- | --- | --- |
| Login (connect link) | `new_session` → `connect_session_request` → poll `get_session` | [`config_flow.py`](custom_components/abrp_mate/config_flow.py) |
| Base + polled telemetry | `get_tlm` | [`coordinator.py`](custom_components/abrp_mate/coordinator.py) |
| Realtime telemetry | `/2/tlm` (SSE) | [`stream.py`](custom_components/abrp_mate/stream.py) |

## Installation

1. Copy `custom_components/abrp_mate` into your Home Assistant `config/custom_components/` directory (or add this repository to HACS as a custom repository).
2. Restart Home Assistant.
3. Go to **Settings → Devices & Services → Add Integration** and search for **ABRP Mate**.
4. Open the connect link shown in the dialog in a browser where you are signed in to ABRP, approve the connection, then press **Submit**.

## Entities

For each vehicle on the account:

- **Sensors:** state of charge, power, speed, odometer, estimated range, voltage, current, charge energy added, external/battery/cabin temperature.
- **Binary sensors:** charging, driving, parked, fast charging.
- **Device tracker:** vehicle GPS location.

## Notes

- This integration talks to ABRP's private web API using the same headers and
  flow as the ABRP web app. There is no official public API, so endpoints may
  change without notice.
- Only your own account's vehicles are accessed, using a session you explicitly
  approve.
