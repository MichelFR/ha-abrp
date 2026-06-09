# ABRP Mate

[![hacs_badge](https://img.shields.io/badge/HACS-Custom-41BDF5.svg)](https://github.com/hacs/integration)

A Home Assistant custom integration for [A Better Route Planner](https://abetterrouteplanner.com)
(ABRP).

> **This integration reads your vehicle telemetry *from* ABRP — it does not push
> telemetry to it.** It is the opposite of the well-known "send data to ABRP"
> setups: it takes the live data your vehicle already reports to ABRP (via an
> OBD2 dongle or a connected cloud provider such as Tesla or Enode) and shows it
> as Home Assistant entities, just like the ABRP app. It can also read and edit
> your ABRP **route-planning preferences** (these are settings, not telemetry).

## Features

- One device per vehicle on your ABRP account, plus an account device for
  planning preferences.
- Realtime telemetry via ABRP's live stream, with adaptive polling as a
  fallback (fast while the car is active, slow while it's parked).
- Connection diagnostics (online / asleep, cloud vs. OBD) and the data source.
- View **and edit** your route-planning preferences from Home Assistant.
- QR-code login (OAuth2) — no password is entered or stored.

## Installation

### HACS (recommended)

1. In HACS, add this repository as a custom repository (category: *Integration*).
2. Install **ABRP Mate** and restart Home Assistant.

### Manual

1. Copy `custom_components/abrp_mate` into your Home Assistant
   `config/custom_components/` directory.
2. Restart Home Assistant.

## Configuration

1. Go to **Settings → Devices & Services → Add Integration** and search for
   **ABRP Mate**.
2. **Scan the QR code** (or open the link) shown in the dialog on a device that
   is signed in to ABRP, and approve the connection.
3. That's it — the dialog continues **automatically** once approved (there is no
   button to press), and your vehicles are discovered.

If the stored login ever expires, Home Assistant prompts you to re-authenticate
with the same QR step.

## Entities

### Per vehicle

| Type | Entities |
| --- | --- |
| Sensor | State of charge, Power, Charging power, Speed, Odometer, Estimated range, Voltage, Current, Charge energy added, External / Battery / Cabin / Vehicle temperature, Reference consumption, Max speed, Weight, Last update, Data source |
| Binary sensor | Charging, Driving, Parked, DC fast charging, Online, Asleep, Cloud connected, OBD connected |
| Device tracker | GPS location (with heading, speed, country, timezone attributes) |
| Select | Drive profile (the vehicle's ABRP configurations, e.g. Standard / winter tyres) |

### Account ("ABRP Mate" device) — route-planning preferences

| Type | Entities |
| --- | --- |
| Number | Destination SoC, Minimum charger stalls, Extra weight |
| Switch | Avoid tolls, Avoid ferries, Avoid border crossings, Avoid motorways, Realtime traffic, Realtime weather, Adjust speed to limits |
| Select | Charge stops (Optimal / Fewer / Fewest) |

These are account-wide ABRP settings; changes made here sync to the ABRP app
(and vice-versa) within a short interval.

## How it works

- **Login:** OAuth2 with a QR/connect link; only the (rotating) refresh token is
  stored, and the access token is used to talk to ABRP's API.
- **Telemetry:** a live server-sent-events stream delivers updates while the car
  is active, backed by an adaptive `get_tlm` poll (faster when active, ~10 min
  when idle).
- **Settings:** read via `get_session`, written via `set_settings`, and kept in
  sync near-realtime by watching ABRP's settings version.

## Notes

- This integration uses ABRP's private web API with a session you explicitly
  approve; only your own account's vehicles are accessed. There is no official
  public ABRP API, so endpoints may change without notice.
- Some values read **unknown** while the vehicle is asleep/parked (e.g. speed,
  power, voltage) — ABRP only reports them while the car is active, and they
  populate again once it is. Driving/parked is inferred from charging, sleep and
  speed when ABRP doesn't report it directly.

## Disclaimer

This is an unofficial, community-built project. It is **not affiliated with,
endorsed by, or associated with** A Better Route Planner, Iternio, or Rivian in
any way. "A Better Route Planner", "ABRP", "Iternio" and "Rivian" are
trademarks of their respective owners and are used here only to describe what
this integration interoperates with. Use at your own risk.
