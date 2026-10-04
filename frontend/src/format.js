/* Value formatting helpers. */

import { localize } from "./localize.js";

export function relTime(iso, hass) {
  if (!iso) return null;
  const secs = (Date.now() - new Date(iso).getTime()) / 1000;
  if (Number.isNaN(secs)) return null;
  if (secs < 90) return localize(hass, "time.just_now");
  if (secs < 5400) {
    return localize(hass, "time.min_ago", { n: Math.round(secs / 60) });
  }
  if (secs < 129600) {
    return localize(hass, "time.h_ago", { n: Math.round(secs / 3600) });
  }
  return localize(hass, "time.d_ago", { n: Math.round(secs / 86400) });
}

// Whole hours elapsed between two unix times, truncated like the moment
// diff() ABRP uses — so its "within 3 hours" really means "less than 4".
export function hoursSince(ts, now = Date.now() / 1000) {
  return Math.floor((now - ts) / 3600);
}

// ABRP's compact age ("< 1 min", "5 min", "2 h", "3 days", ...) used in its
// live data captions — a port of its formatDateTimeDelta. Takes unix seconds.
const DELTA_STEPS = [
  [3600, 60, "min", "min"],
  [86400, 3600, "h", "h"],
  [604800, 86400, "day", "days"],
  [2630016, 604800, "week", "weeks"],
  [31557600, 2630016, "month", "months"],
  [Infinity, 31557600, "year", "years"],
];

export function deltaShort(ts, hass) {
  const secs = Date.now() / 1000 - Number(ts);
  if (!Number.isFinite(secs)) return null;
  if (secs < 60) return localize(hass, "time.lt_min");
  const [, unit, one, other] = DELTA_STEPS.find(([limit]) => secs < limit);
  const n = Math.round(secs / unit);
  return localize(hass, `time.${n === 1 ? one : other}`, { n });
}

// ABRP's display names for telemetry providers (its formatProviderName);
// anything else is title-cased with underscores as spaces.
const PROVIDER_NAMES = {
  api: "API",
  gps: "GPS",
  obdble: "OBD",
  abrpobd: "ABRP OBD",
  carscanner: "Car Scanner",
  highmobility: "High Mobility",
  derived: "ABRP estimate",
};

export function providerName(id) {
  if (!id) return id;
  return (
    PROVIDER_NAMES[id.toLowerCase()] ??
    id.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase())
  );
}

export function cap(s) {
  return s ? s.charAt(0).toUpperCase() + s.slice(1) : s;
}

export function num(state, digits = 0) {
  const v = Number(state?.state);
  return Number.isFinite(v) ? v.toFixed(digits) : null;
}

export function isTemplate(value) {
  return typeof value === "string" && /\{[{%]/.test(value);
}

export function isEntityId(value) {
  return (
    typeof value === "string" && /^[a-z_]+\.[a-zA-Z0-9_]+$/.test(value)
  );
}
