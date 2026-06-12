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
  ["switch.realtime_traffic", "mdi:traffic-light", "Realtime traffic"],
  ["switch.realtime_weather", "mdi:weather-partly-cloudy", "Realtime weather"],
  ["switch.adjust_speed", "mdi:speedometer", "Adjust speed to limits"],
];

const section = (icon, label) =>
  html`<div class="section"><ha-icon icon=${icon}></ha-icon>${label}</div>`;

export function renderOptionsDialog(card) {
  const chargeStops = card._as("select.charge_stops");
  const profile = card._vs("select.drive_profile");

  return html`
    ${chargeStops ? renderChargeStops(card, chargeStops) : ""}
    ${renderSliderRow(card, "Destination arrival SoC", "mdi:battery-low", card._as("number.arrival_soc"), "%")}
    ${section("mdi:cancel", "Avoid on route")}
    <div class="chips">
      ${AVOID_CHIPS.map(([key, icon, label]) => renderChip(card, key, icon, label))}
    </div>
    ${section("mdi:update", "Realtime")}
    ${REALTIME_SWITCHES.map(([key, icon, label]) =>
      renderSwitchRow(card, key, icon, label)
    )}
    ${renderSliderRow(card, "Minimum charger stalls", "mdi:counter", card._as("number.min_charger_stalls"), "")}
    ${renderSliderRow(card, "Extra weight", "mdi:weight-kilogram", card._as("number.extra_weight"), " kg")}
    ${renderDriveProfile(card, profile)}
  `;
}

function renderChargeStops(card, chargeStops) {
  return html`${section("mdi:ev-station", "Charge stops")}
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

function renderSliderRow(card, label, icon, state, unit) {
  if (!state) return "";
  const a = state.attributes;
  const value = Number(state.state);
  return html`${section(icon, label)}
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

function renderSwitchRow(card, key, icon, label) {
  const state = card._as(key);
  if (!state) return "";
  return html`<div class="switch-row">
    <span class="switch-label"><ha-icon icon=${icon}></ha-icon>${label}</span>
    <ha-switch
      .checked=${state.state === "on"}
      @change=${() => card._call("switch", "toggle", state)}
    ></ha-switch>
  </div>`;
}

function renderDriveProfile(card, profile) {
  if (!profile?.attributes?.options?.length) return "";
  return html`${section("mdi:car-cog", "Drive profile")}
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
