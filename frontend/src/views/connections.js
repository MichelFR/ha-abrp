/* The live data footer's connection rows, ported from ABRP 7.1.8: the cloud
 * (OTA) link with its full status, the paired OBD dongle, and any other
 * source that delivered data within the last five minutes. */

import { html } from "lit";
import { deltaShort, hoursSince, providerName } from "../format.js";
import { localize } from "../localize.js";

// ABRP's recentTelemetryTimeSpan: a source counts as connected while its
// newest reading is younger than this (seconds).
const RECENT = 300;
const OBD = new Set(["obdble", "abrpobd"]);

function toUnix(value) {
  if (value == null || value === "") return null;
  const n = Number(value);
  if (Number.isFinite(n)) return n > 0 ? n : null;
  const ms = new Date(value).getTime();
  return Number.isNaN(ms) ? null : ms / 1000;
}

// Whole days elapsed, truncated like hoursSince.
const daysSince = (ts, now) => Math.floor((now - ts) / 86400);

/* Each provider's newest field timestamp, newest first
 * (ABRP's getRecentTelemetryProviders). */
function recentProviders(providers, timestamps) {
  const newest = {};
  for (const [field, provider] of Object.entries(providers || {})) {
    if (provider == null) continue;
    const ts = Number(timestamps?.[field]) || 0;
    if (ts > (newest[provider] ?? 0)) newest[provider] = ts;
  }
  return Object.entries(newest)
    .map(([provider, timestamp]) => ({ provider, timestamp }))
    .sort((a, b) => b.timestamp - a.timestamp);
}

/* ABRP's getOtaConnectionStatus for the cloud provider. */
function otaStatus({ type, authorized, connected, time, asleep, now }) {
  if (type == null) return null;
  if (authorized === false && type !== "api") return { kind: "unauthorized" };
  if (connected) return { kind: "connected" };
  if (connected === false && time && hoursSince(time, now) <= 3) {
    return { kind: "lastSeen", lastSeen: time };
  }
  if (asleep) return { kind: "sleeping" };
  if (connected === false && time) {
    return type === "api" && daysSince(time, now) <= 3
      ? { kind: "sleeping" }
      : { kind: "notConnected" };
  }
  if (connected === false && !time) return { kind: "registering" };
  return null;
}

export function renderConnections(card) {
  const t = (key, vars) => localize(card.hass, key, vars);
  const attrs = card._vs("sensor.data_source")?.attributes || {};
  const providers = attrs.providers || {};
  const now = Date.now() / 1000;
  const recent = recentProviders(providers, attrs.timestamps).filter(
    (p) => p.provider !== "gps" && p.provider !== "derived"
  );
  const live = (ts) => ts != null && ts > now - RECENT;
  const ago = (ts) => t("connection.ago", { time: deltaShort(ts, card.hass) });
  const rows = [];

  // The cloud provider; ABRP falls back to "api" while the API pushes data.
  const ota =
    attrs.cloud_source ??
    (Object.values(providers).includes("api") ? "api" : null);
  const status = otaStatus({
    type: ota,
    authorized: attrs.tlm_authorized,
    connected: attrs.cloud_connected,
    time:
      recent.find((p) => p.provider === ota)?.timestamp ??
      toUnix(attrs.cloud_last_seen),
    asleep: attrs.asleep,
    now,
  });
  if (status) {
    rows.push({
      dot:
        status.kind === "connected"
          ? "green pulse"
          : status.kind === "unauthorized"
            ? "red"
            : "gray",
      title: providerName(ota),
      text:
        status.kind === "lastSeen"
          ? ago(status.lastSeen)
          : t(`connection.${status.kind}`),
      key: "sensor.source_last_refresh",
    });
  }

  // The paired OBD dongle.
  const obd = OBD.has(attrs.tlm_type) ? attrs.tlm_type : null;
  if (obd) {
    const ts = recent.find((p) => p.provider === obd)?.timestamp;
    rows.push({
      dot: live(ts) ? "green pulse" : "gray",
      title: providerName(obd),
      text: live(ts)
        ? t("connection.connected")
        : ts && hoursSince(ts, now) <= 3
          ? ago(ts)
          : t("connection.notConnected"),
      key: "sensor.obd_last_refresh",
    });
  }

  // Any other source delivering data right now (e.g. Android Auto).
  for (const p of recent) {
    if (p.provider === ota || p.provider === obd || OBD.has(p.provider)) continue;
    if (!live(p.timestamp)) continue;
    rows.push({
      dot: "green pulse",
      title: t("connection.connected"),
      text: providerName(p.provider),
      key: "sensor.data_source",
    });
  }

  if (!rows.length) return "";
  return html`<div class="conns">
    ${rows.map(
      (row) => html`<div
        class="conn clickable"
        @click=${() => card._moreInfo(row.key)}
      >
        <span class="dot ${row.dot}"></span>
        <span class="conn-text">
          <span class="conn-title">${row.title}</span>
          <span class="conn-sub">${row.text}</span>
        </span>
      </div>`
    )}
  </div>`;
}
