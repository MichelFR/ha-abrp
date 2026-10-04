/* The current road's speed-limit sign, drawn like ABRP's navigation view:
 * a round European sign, or the US "SPEED LIMIT" banner while the route is
 * in North America; a derestriction sign (or "NO SPEED LIMIT") where there
 * is no limit. */

import { html, svg } from "lit";

// ABRP's derestriction sign: white disc, black diagonal stripes.
const NO_LIMIT_EU = svg`<svg viewBox="0 0 80 80" class="sl-svg">
  <path fill="#fff" d="M80 40c0 22.092-17.909 40-40 40C17.908 80 0 62.092 0 40 0 17.909 17.908 0 40 0c22.091 0 40 17.909 40 40Z"/>
  <path fill="#000" d="M39.999 1.342C18.66 1.342 1.342 18.662 1.342 40s17.32 38.657 38.657 38.657c21.338 0 38.657-17.32 38.657-38.657 0-21.338-17.32-38.658-38.657-38.658Zm0 2a36.497 36.497 0 0 1 20.779 6.45L9.792 60.78A36.499 36.499 0 0 1 3.342 40c0-20.256 16.4-36.657 36.657-36.657Zm21.987 7.317c.403.303.799.614 1.189.933L11.59 63.176a37.64 37.64 0 0 1-.933-1.19L61.986 10.66Zm2.309 1.886c.375.332.743.67 1.105 1.017L13.56 65.4c-.346-.36-.685-.73-1.017-1.104l51.751-51.75Zm2.141 2.055c.347.36.686.73 1.018 1.104l-51.75 51.75a36.15 36.15 0 0 1-1.105-1.017L66.436 14.6Zm1.972 2.224c.318.39.63.786.932 1.189L18.012 69.34c-.403-.303-.799-.614-1.189-.932l51.585-51.585Zm1.799 2.397A36.497 36.497 0 0 1 76.657 40c0 20.257-16.401 36.657-36.658 36.657a36.497 36.497 0 0 1-20.779-6.45L70.207 19.22Z"/>
</svg>`;

export function renderSpeedLimit(card) {
  const state = card._vs("sensor.speed_limit");
  if (!state) return "";
  const unlimited = state.attributes?.unlimited === true;
  const value = Number(state.state);
  if (!unlimited && !(Number.isFinite(value) && value > 0)) return "";
  // The sensor is already in the user's unit system (km/h or mph).
  const limit = unlimited ? null : Math.round(value);
  const us =
    card._vs("device_tracker.location")?.attributes?.region === "northamerica";
  const dark = card.hass.themes?.darkMode ? " dark" : "";
  const open = (ev) => {
    ev.stopPropagation();
    card._moreInfo("sensor.speed_limit");
  };

  if (us) {
    return html`<span class="sl-us${dark} clickable" @click=${open}>
      ${unlimited ? html`<b class="sl-us-num">NO</b>` : ""}
      <span>SPEED</span><span>LIMIT</span>
      ${unlimited ? "" : html`<b class="sl-us-num">${limit}</b>`}
    </span>`;
  }
  if (unlimited) {
    return html`<span class="sl-none clickable" @click=${open}>${NO_LIMIT_EU}</span>`;
  }
  return html`<span
    class="sl-eu${dark}${limit >= 100 ? " wide" : ""} clickable"
    @click=${open}
    >${limit}</span
  >`;
}
