# ABRP Mate

[![hacs_badge](https://img.shields.io/badge/HACS-Custom-41BDF5.svg)](https://github.com/hacs/integration)

A Home Assistant custom integration for [A Better Route Planner](https://abetterrouteplanner.com)
(ABRP).

> **This integration reads data *from* ABRP — it does not send anything to it.**
> It is the opposite of the well-known "send telemetry to ABRP" setups. Instead,
> it takes the live telemetry your vehicle already reports to ABRP — whether via
> an OBD2 dongle or a connected cloud provider (Tesla, Enode, etc.) — and shows
> it as Home Assistant entities, in realtime, just like the ABRP app does.

It connects to your ABRP account and exposes each vehicle as a device with live
telemetry — state of charge, power, speed, odometer, range, temperatures,
charging state and location.

## Features

- One device per vehicle on your ABRP account.
- Realtime telemetry via ABRP's live stream, with polling as a fallback.
- Sensors: state of charge, power, speed, odometer, estimated range, voltage,
  current, charge energy added, external/battery/cabin temperature.
- Binary sensors: charging, driving, parked, fast charging.
- Device tracker for the vehicle's GPS location.

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
2. Open the link shown in the dialog in a browser where you are signed in to
   ABRP, approve the connection, then press **Submit**.

The integration discovers your vehicles automatically once the connection is
approved.

## Entities

For each vehicle on the account:

| Type | Entities |
| --- | --- |
| Sensor | State of charge, power, speed, odometer, estimated range, voltage, current, charge energy added, external/battery/cabin temperature |
| Binary sensor | Charging, driving, parked, fast charging |
| Device tracker | Vehicle GPS location |

## Notes

- This integration uses ABRP's web API with a session you explicitly approve;
  only your own account's vehicles are accessed.
- There is no official public ABRP API, so endpoints may change without notice.
