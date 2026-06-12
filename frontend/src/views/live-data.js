/* The "Live data" dialog: telemetry grid with per-signal providers, plus a
 * per-source freshness footer — mirroring the ABRP app's live data view. */

import { html } from "lit";
import { cap, num, relTime } from "../format.js";

export function renderLiveData(card) {
  const providers =
    card._vs("sensor.data_source")?.attributes?.providers || {};
  const provider = (key, fallback = "ABRP Estimate") =>
    cap(providers[key]) || fallback;
  const unit = (key, fallback) =>
    card._vs(key)?.attributes?.unit_of_measurement ?? fallback;

  const speedFactor = Number(card._vs("sensor.speed_factor")?.state);
  // [title, value, unit, provider, entity key for more-info]
  const tiles = [
    ["SoC", num(card._vs("sensor.soc")), "%", provider("soc"), "sensor.soc"],
    [
      "Range",
      num(card._vs("sensor.range")),
      unit("sensor.range", "km"),
      provider("est_battery_range"),
      "sensor.range",
    ],
    [
      "Calibrated reference consumption",
      num(card._vs("sensor.reference_consumption")),
      unit("sensor.reference_consumption", "Wh/km"),
      provider("calib_ref_cons"),
      "sensor.reference_consumption",
    ],
    [
      "Battery capacity",
      num(card._vs("sensor.battery_capacity")),
      "kWh",
      provider("battery_capacity", provider("capacity")),
      "sensor.battery_capacity",
    ],
    [
      "Odometer",
      num(card._vs("sensor.odometer")),
      unit("sensor.odometer", "km"),
      provider("odometer"),
      "sensor.odometer",
    ],
    [
      "Location",
      card._vs("device_tracker.location")?.state,
      "",
      provider("lat", ""),
      "device_tracker.location",
    ],
    [
      "Reference speed",
      Number.isFinite(speedFactor) ? Math.round(speedFactor * 100) : null,
      "%",
      provider("speed_factor"),
      "sensor.speed_factor",
    ],
    [
      "Maximum speed",
      num(card._vs("sensor.max_speed")),
      unit("sensor.max_speed", "km/h"),
      provider("max_speed"),
      "sensor.max_speed",
    ],
    [
      "Elevation",
      num(card._vs("sensor.elevation")),
      unit("sensor.elevation", "m"),
      provider("elevation", ""),
      "sensor.elevation",
    ],
  ];

  const cloudName = cap(card._vs("sensor.data_source")?.state);
  const sources = [
    [cloudName, card._vs("sensor.source_last_refresh")?.state, "sensor.source_last_refresh"],
    ["Obdble", card._vs("sensor.obd_last_refresh")?.state, "sensor.obd_last_refresh"],
  ].filter(([n, t]) => n && t && t !== "unknown" && t !== "unavailable");

  return html`<div class="grid">
      ${tiles.map(
        ([title, value, unitLabel, prov, key]) => html`<div
          class="tile clickable"
          @click=${() => card._moreInfo(key)}
        >
          <div class="tile-title">${title}</div>
          <div class="tile-value">
            ${value ?? "–"}<span class="tile-unit"> ${unitLabel}</span>
          </div>
          ${prov ? html`<div class="tile-prov">${prov}</div>` : ""}
        </div>`
      )}
    </div>
    ${sources.length
      ? html`<div class="sources">
          ${sources.map(
            ([name, t, key]) => html`<span
              class="seen clickable"
              @click=${() => card._moreInfo(key)}
            >
              <span class="dot"></span>${name}
              <span class="src-time">${relTime(t)}</span>
            </span>`
          )}
        </div>`
      : ""}`;
}
