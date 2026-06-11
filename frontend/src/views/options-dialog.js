/* The "Plan options" dialog: every planning setting the integration exposes. */

import { html } from "lit";
import { cap } from "../format.js";

const STOP_LABELS = { optimal: "Optimal", fewer: "Fewer", least: "Fewest" };

const AVOID_CHIPS = [
  ["switch.avoid_tolls", "mdi:cash-multiple", "Tolls"],
  ["switch.avoid_motorways", "mdi:highway", "Highways"],
  ["switch.avoid_ferries", "mdi:ferry", "Ferries and car trains"],
  ["switch.avoid_borders", "mdi:boom-gate", "Borders"],
];

const REALTIME_SWITCHES = [
  ["switch.realtime_traffic", "Realtime traffic"],
  ["switch.realtime_weather", "Realtime weather"],
  ["switch.adjust_speed", "Adjust speed to limits"],
];

export function renderOptionsDialog(card) {
  const chargeStops = card._as("select.charge_stops");
  const profile = card._vs("select.drive_profile");

  return html`
    ${chargeStops ? renderChargeStops(card, chargeStops) : ""}
    ${renderSliderRow(card, "Destination arrival SoC", card._as("number.arrival_soc"), "%")}
    <div class="section">Avoid on route</div>
    <div class="chips">
      ${AVOID_CHIPS.map(([key, icon, label]) => renderChip(card, key, icon, label))}
    </div>
    <div class="section">Realtime</div>
    ${REALTIME_SWITCHES.map(([key, label]) => renderSwitchRow(card, key, label))}
    ${renderSliderRow(card, "Minimum charger stalls", card._as("number.min_charger_stalls"), "")}
    ${renderSliderRow(card, "Extra weight", card._as("number.extra_weight"), " kg")}
    ${renderDriveProfile(card, profile)}
  `;
}

function renderChargeStops(card, chargeStops) {
  return html`<div class="section">Charge stops</div>
    <div class="segments">
      ${(chargeStops.attributes.options || []).map(
        (opt) => html`<button
          class="segment ${chargeStops.state === opt ? "on" : ""}"
          @click=${() =>
            card._call("select", "select_option", chargeStops, { option: opt })}
        >
          ${STOP_LABELS[opt] || cap(opt)}
        </button>`
      )}
    </div>`;
}

function renderSliderRow(card, label, state, unit) {
  if (!state) return "";
  const a = state.attributes;
  const value = Number(state.state);
  return html`<div class="section">${label}</div>
    <div class="slider-row">
      <span class="slider-value"
        >${Number.isFinite(value) ? value : "–"}${unit}</span
      >
      <ha-slider
        pin
        min=${a.min ?? 0}
        max=${a.max ?? 100}
        step=${a.step ?? 1}
        .value=${value}
        @change=${(ev) => {
          card._call("number", "set_value", state, {
            value: Number(ev.target.value),
          });
          ev.target
            .closest(".slider-row")
            .querySelector(".slider-value").textContent =
            `${ev.target.value}${unit}`;
        }}
      ></ha-slider>
    </div>`;
}

function renderChip(card, key, icon, label) {
  const state = card._as(key);
  if (!state) return "";
  const on = state.state === "on";
  return html`<button
    class="chip ${on ? "on" : ""}"
    @click=${() => card._call("switch", "toggle", state)}
  >
    <ha-icon icon="${icon}"></ha-icon>${label}
  </button>`;
}

function renderSwitchRow(card, key, label) {
  const state = card._as(key);
  if (!state) return "";
  return html`<div class="switch-row">
    <span>${label}</span>
    <ha-switch
      .checked=${state.state === "on"}
      @change=${() => card._call("switch", "toggle", state)}
    ></ha-switch>
  </div>`;
}

function renderDriveProfile(card, profile) {
  if (!profile?.attributes?.options?.length) return "";
  return html`<div class="section">Drive profile</div>
    <ha-select
      naturalMenuWidth
      fixedMenuPosition
      .value=${profile.state}
      @selected=${(ev) => {
        const option = ev.target.value;
        if (option && option !== profile.state) {
          card._call("select", "select_option", profile, { option });
        }
      }}
      @closed=${(ev) => ev.stopPropagation()}
    >
      ${profile.attributes.options.map(
        (opt) => html`<mwc-list-item .value=${opt}>${opt}</mwc-list-item>`
      )}
    </ha-select>`;
}
