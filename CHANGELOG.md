# Changelog

## 1.2.6

The card's Live data view is now a faithful copy of ABRP's own live data
screen — same tiles, same values, same rules — after comparing it item by
item against the current ABRP web app.

### Added

- **Live data tiles for everything ABRP shows** that the card was missing:
  Power (shown positive while charging, attributed like ABRP), HVAC power,
  Voltage, Battery temperature, Degradation (100 − SoH), Remaining energy
  (SoE), Inside/Outside temperature, and Firmware version. Tiles without a
  value are hidden, exactly like in ABRP.
- **Street address and speed limit while navigating.** The realtime stream's
  `mapInfo` events (address, region, speed limit — or "no limit") are now
  decoded; the Location tile shows the live street address like ABRP, and the
  location tracker exposes `address`, `region`, and `speed_limit` attributes.
- **New sensors:** "Calibrated maximum speed" (the value ABRP's live data
  actually shows as Maximum speed) and "Firmware version".

### Fixed

- **Remaining energy (SoE) was 1000× too high.** ABRP's telemetry carries SoE
  in Wh and converts at display; the sensor treated it as kWh.
- **The Maximum speed tile showed the drive profile's configured limit**, not
  ABRP's calibrated maximum speed. It now shows the calibrated value and only
  falls back to the configured one.
- **Reference consumption now needs a calibration confidence**, like in ABRP.
- **SoC from the realtime stream is rounded** like ABRP rounds it, instead of
  showing values like 80.60000000000001.
- **The stream ignored `calibratedMaxSpeed` and `mapInfo` events** entirely.

## 1.2.5

This release re-verifies our telemetry handling against the current ABRP web
app and fixes every deviation found — and where ABRP silently *hides* data,
it is now surfaced through separate entities instead of dropped.

### Added

- **New "GPS speed" sensor.** The speed measured by the phone while navigating
  in the ABRP app. ABRP itself never displays GPS-derived speed, and the
  regular Speed sensor mirrors that — but for vehicles whose only data source
  is the app, this was live data being thrown away. It now has its own sensor.

### Fixed

- **SoC could show a week-old reading.** ABRP now ages a SoC reading out after
  one day; ours still used the old one-week window.
- **Location, heading, and elevation never went stale.** ABRP blanks them
  after one week without a fix; ours kept them forever.
- **Speed showed readings up to 30 s old.** ABRP only displays a speed whose
  measurement is under 10 s old (it keeps flowing live from the realtime
  stream while driving); ours now matches.
- **OBD-vs-Android-Auto SoC tiebreak matched ABRP only in one direction.**
  ABRP keeps an already-held OBD SoC unless an incoming Android-Auto reading
  is at least 30 s newer — and also treats the standalone ABRP OBD dongle
  (`abrpobd`) as OBD. Ours had the rule inverted and only knew `obdble`.
- **"Data source" now uses ABRP's exact rule** (the cloud provider only while
  it is the freshest source, the direct source otherwise) instead of extra
  fallbacks ABRP doesn't have.
- **Car Scanner telemetry events from the realtime stream were dropped** —
  the stream's provider map was missing `CARSCANNER`.

## 1.2.4

### Fixed

- **Metadata scrape silently failing since ABRP split its web bundle.** The
  API key, app version (`x-abrp-version`), and build number are scraped from
  the ABRP web app at runtime. ABRP recently split its formerly single web
  bundle into several script bundles plus lazy-loaded chunks, and the values
  now live in an `App-*.js` chunk that only the entry bundle references — so
  the scraper found nothing and the integration silently ran on stale
  fallbacks. The scraper now scans every script bundle from the index page
  and follows chunk URLs discovered inside them until the values are found.
- **Updated fallback metadata** to the current live values (app version
  7.1.7, build 5980; the API key is unchanged), used if scraping ever fails.

## 1.2.3

### Changed

- **Far fewer API requests while driving or charging.** The integration used to
  poll `get_tlm` every 10 seconds whenever a vehicle was active, even though the
  realtime SSE stream already delivers the same live telemetry. While the
  stream is connected for every active vehicle, the poll now relaxes to every
  5 minutes (it only needs to catch what the stream doesn't carry: the vehicle
  list, settings version, and vehicle-level status). The 10-second poll remains
  as a fallback whenever an active vehicle's stream drops. Thanks to
  [@frenck](https://github.com/frenck) for pointing this out in the
  [HACS review](https://github.com/hacs/default/pull/8362#pullrequestreview-4990044409).

## 1.2.2

### Added

- **MIT license.** The repository now ships a LICENSE file, as required for
  inclusion in the HACS default catalog.

## 1.2.1

### Fixed

- **Status stuck on "Offline" when the "Last update" sensor is disabled.** The
  card derived its status from that sensor, so disabling it (a common cleanup)
  made the status read Offline even when telemetry was minutes old. The card
  now reads last-seen and SoC-seen times from the always-available data-source
  sensor, so the status (and "Last seen X ago") works regardless of which
  diagnostic entities are enabled.

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
