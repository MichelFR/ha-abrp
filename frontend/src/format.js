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
