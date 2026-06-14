# Changelog

## 1.2.0

This release reworks how telemetry from the periodic poll and the realtime
stream is reconciled so it matches the ABRP web app exactly. The previous code
kept whichever *snapshot* was most recently recorded and dropped the rest;
ABRP instead merges **every field independently**, keeping whichever source saw
that field last and ageing each field out on its own schedule. Reproducing that
fixes a cluster of long-standing glitches.

### Fixed

- **SoC froze while charging.** During a charge the stream floods power/voltage
  readings with fresh timestamps, which made the whole poll look "older" and
  got discarded — so the SoC stopped advancing until the integration was
  reloaded. Telemetry now merges per field, so the SoC keeps updating from the
  poll while the stream drives the fast-changing values.
- **Charging stuck "on" after a session ended.** The stream's charging flag was
  treated as "anything that isn't `NOT_CHARGING`", so unexpected end-of-charge
  states left it stuck on. It now uses ABRP's exact rule (charging only for
  `CHARGING_AC` / `CHARGING_DC` / `CHARGING_UNKNOWN`) and a finished charge also
  ages out on its own (1 h for DC, 1 day for AC).
- **"Last seen" showed *Never* despite recent data.** Last-seen now follows
  ABRP and reports the newest of the cloud time, the local/OBD time and the
  telemetry time, instead of only the telemetry time.
- **The same source listed twice in Live data** (e.g. two "Obdble" rows). Same-
  named sources are now collapsed to a single entry, keeping the freshest time.

### Changed

- **Per-field staleness, matching ABRP.** Each value now disappears on its own
  schedule rather than a single 5-minute rule for everything: speed after 30 s,
  power/voltage/current after 5 min, SoC after a week, etc. Stale values are
  shown as *unknown* instead of lingering at their last reading.
- **Data source reflects the freshest provider.** The reported data source is
  now whichever of the cloud or local source last delivered data, as in ABRP.
- **Connection-status indicator on the card.** The status dot and label now
  reproduce the ABRP app: green + pulse while telemetry is live (SoC seen in
  the last 5 min, "Charging" when charging, otherwise "Connected"), a grey
  "Last seen X ago" for up to 3 hours, then "Sleeping" / "Offline".
- Per-signal sources in **Live data** are now labelled with ABRP's own provider
  names (Enode, Obdble, Tesla, …), taken from the merged telemetry.

## 1.1.0

- Editor subpages with per-slot overrides, profile confirmation dialog, German
  translations.
</content>
</invoke>
