/* The "Live data" dialog: telemetry grid with per-signal providers, plus a
 * per-source freshness footer — mirroring the ABRP app's live data view
 * (same tiles, values, and rules; tiles without a value are hidden). */

import { html } from "lit";
import { cap, num, relTime } from "../format.js";
import { localize } from "../localize.js";

export function renderLiveData(card) {
  const t = (key) => localize(card.hass, key);
  const providers =
    card._vs("sensor.data_source")?.attributes?.providers || {};
  const provider = (key, fallback = t("live.estimate")) =>
    cap(providers[key]) || fallback;
  const unit = (key, fallback) =>
    card._vs(key)?.attributes?.unit_of_measurement ?? fallback;
  const val = (key) => {
    const v = Number(card._vs(key)?.state);
    return Number.isFinite(v) ? v : null;
  };
  // ABRP shows one decimal for small magnitudes, none otherwise.
  const fmt = (v) => (Math.abs(v) < 10 ? v.toFixed(1) : v.toFixed(0));

  // Power: like ABRP, shown positive while charging, and when the reading is
  // derived, attributed to the current sensor's source instead.
  const rawPower = val("sensor.power");
  const charging = card._vs("binary_sensor.charging")?.state === "on";
  const power = rawPower == null ? null : charging ? -rawPower : rawPower;
  const powerProv =
    providers.power === "derived" && providers.current != null
      ? providers.current
      : providers.power;

  // Degradation = 100 - SoH, exactly what ABRP's live data shows.
  const soh = val("sensor.soh");
  const degradation = soh == null ? null : 100 - soh;

  // ABRP shows the calibrated reference consumption only alongside a
  // calibration confidence.
  const refConsumption =
    val("sensor.calibration_confidence") == null
      ? null
      : num(card._vs("sensor.reference_consumption"));

  // ABRP's "Maximum speed" is the calibrated one; fall back to the drive
  // profile's configured value when no calibration exists.
  const calMax = num(card._vs("sensor.calibrated_max_speed"));
  const maxSpeed = calMax ?? num(card._vs("sensor.max_speed"));
  const maxSpeedProv = calMax != null ? provider("calib_max_speed") : provider("max_speed");

  // Location: the street address from ABRP's mapInfo (live while
  // navigating); the tracker zone as fallback.
  const tracker = card._vs("device_tracker.location");
  const address = tracker?.attributes?.address;
  const location =
    address || (tracker?.state && tracker.state !== "unknown" ? tracker.state : null);

  const speedFactor = val("sensor.speed_factor");
  const firmware = card._vs("sensor.firmware_version")?.state;

  // [title, value, unit, provider, entity key for more-info] — ABRP's live
  // data items in its order; null values drop the tile like ABRP does.
  const tiles = [
    [t("live.soc"), num(card._vs("sensor.soc")), "%", provider("soc"), "sensor.soc"],
    [
      t("live.power"),
      power == null ? null : fmt(power),
      "kW",
      cap(powerProv) || t("live.estimate"),
      "sensor.power",
    ],
    [
      t("live.hvac_power"),
      val("sensor.hvac_power") == null ? null : fmt(val("sensor.hvac_power")),
      "kW",
      provider("hvac_power"),
      "sensor.hvac_power",
    ],
    [
      t("live.range"),
      num(card._vs("sensor.range")),
      unit("sensor.range", "km"),
      provider("est_battery_range"),
      "sensor.range",
    ],
    [
      t("live.voltage"),
      num(card._vs("sensor.voltage")),
      "V",
      provider("voltage"),
      "sensor.voltage",
    ],
    [
      t("live.ref_consumption"),
      refConsumption,
      unit("sensor.reference_consumption", "Wh/km"),
      provider("calib_ref_cons"),
      "sensor.reference_consumption",
    ],
    [
      t("live.batt_temp"),
      num(card._vs("sensor.battery_temp")),
      unit("sensor.battery_temp", "°C"),
      provider("batt_temp"),
      "sensor.battery_temp",
    ],
    [
      t("live.degradation"),
      degradation == null ? null : fmt(degradation),
      "%",
      provider("soh"),
      "sensor.soh",
    ],
    [
      t("live.capacity"),
      num(card._vs("sensor.battery_capacity")),
      "kWh",
      provider("battery_capacity", provider("capacity")),
      "sensor.battery_capacity",
    ],
    [
      t("live.ref_speed"),
      speedFactor == null ? null : Math.round(speedFactor * 100),
      "%",
      provider("speed_factor"),
      "sensor.speed_factor",
    ],
    [t("live.max_speed"), maxSpeed, unit("sensor.calibrated_max_speed", "km/h"), maxSpeedProv, "sensor.calibrated_max_speed"],
    [
      t("live.soe"),
      num(card._vs("sensor.soe"), 1),
      "kWh",
      provider("soe"),
      "sensor.soe",
    ],
    [
      t("live.inside_temp"),
      num(card._vs("sensor.cabin_temp")),
      unit("sensor.cabin_temp", "°C"),
      provider("cabin_temp"),
      "sensor.cabin_temp",
    ],
    [
      t("live.outside_temp"),
      num(card._vs("sensor.external_temp")),
      unit("sensor.external_temp", "°C"),
      provider("ext_temp"),
      "sensor.external_temp",
    ],
    [
      t("live.odometer"),
      num(card._vs("sensor.odometer")),
      unit("sensor.odometer", "km"),
      provider("odometer"),
      "sensor.odometer",
    ],
    [t("live.location"), location, "", provider("lat", ""), "device_tracker.location"],
    [
      t("live.elevation"),
      num(card._vs("sensor.elevation")),
      unit("sensor.elevation", "m"),
      provider("elevation", ""),
      "sensor.elevation",
    ],
    [
      t("live.firmware"),
      firmware && firmware !== "unknown" && firmware !== "unavailable" ? firmware : null,
      "",
      "",
      "sensor.firmware_version",
    ],
  ].filter(([, value]) => value != null);

  const cloudName = cap(card._vs("sensor.data_source")?.state);
  const ok = (ts) => ts && ts !== "unknown" && ts !== "unavailable";
  // The cloud provider and the OBD dongle can be the same source (e.g. both
  // "Obdble"); collapse same-named sources to a single dot, keeping the
  // freshest timestamp so we never show one source twice.
  const byName = new Map();
  for (const [name, ts, key] of [
    [cloudName, card._vs("sensor.source_last_refresh")?.state, "sensor.source_last_refresh"],
    ["Obdble", card._vs("sensor.obd_last_refresh")?.state, "sensor.obd_last_refresh"],
  ]) {
    if (!name || !ok(ts)) continue;
    const prev = byName.get(name.toLowerCase());
    if (!prev || new Date(ts) > new Date(prev[1])) byName.set(name.toLowerCase(), [name, ts, key]);
  }
  const sources = [...byName.values()];

  return html`<div class="grid">
      ${tiles.map(
        ([title, value, unitLabel, prov, key]) => html`<div
          class="tile clickable"
          @click=${() => card._moreInfo(key)}
        >
          <div class="tile-title">${title}</div>
          <div class="tile-value">
            ${value}<span class="tile-unit"> ${unitLabel}</span>
          </div>
          ${prov ? html`<div class="tile-prov">${prov}</div>` : ""}
        </div>`
      )}
    </div>
    ${sources.length
      ? html`<div class="sources">
          ${sources.map(
            ([name, ts, key]) => html`<span
              class="seen clickable"
              @click=${() => card._moreInfo(key)}
            >
              <span class="dot"></span>${name}
              <span class="src-time">${relTime(ts, card.hass)}</span>
            </span>`
          )}
        </div>`
      : ""}`;
}
