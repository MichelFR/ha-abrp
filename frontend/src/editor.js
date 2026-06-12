/* Visual editor with a segmented button group: General (title + vehicle)
 * and Display (which card sections are shown, with one switch row each). */

import { LitElement, html, css } from "lit";
import { CARD_TYPE, PLATFORM } from "./const.js";
import { ensureHaComponents } from "./ha-components.js";

const GENERAL_SCHEMA = [
  { name: "title", selector: { text: {} } },
  {
    name: "device",
    selector: {
      device: {
        integration: PLATFORM,
        // Only vehicles carry a device tracker; this hides the account
        // (planning settings) device from the picker.
        entity: [{ integration: PLATFORM, domain: "device_tracker" }],
      },
    },
  },
];

const GENERAL_LABELS = {
  title: "Title (empty = ABRP vehicle name)",
  device: "Vehicle (empty = first ABRP vehicle)",
};

// [config key, label, default, icon] — only deviations from the default are
// stored in the card config.
export const DISPLAY_OPTIONS = [
  ["show_image", "Car image", true, "mdi:image-outline"],
  ["show_profile", "Drive profile selector", true, "mdi:car-cog"],
  ["show_charge_speed", "Charging speed badge", true, "mdi:flash"],
  ["show_last_seen", "Last seen line", true, "mdi:clock-outline"],
  ["show_live_data", "Live data link", true, "mdi:link-variant"],
  ["show_options", "Options button", true, "mdi:tune-variant"],
  [
    "show_live_data_button",
    "Live data button (alternative to the link)",
    false,
    "mdi:chart-box-outline",
  ],
];

export class AbrpVehicleCardEditor extends LitElement {
  static get properties() {
    return { hass: {}, _config: {}, _tab: { state: true } };
  }

  constructor() {
    super();
    this._tab = "general";
  }

  connectedCallback() {
    super.connectedCallback();
    ensureHaComponents();
  }

  setConfig(config) {
    this._config = config || {};
  }

  render() {
    if (!this.hass) return html``;
    const general = this._tab === "general";
    return html`<div class="segments">
        <button
          class="segment ${general ? "on" : ""}"
          @click=${() => (this._tab = "general")}
        >
          <ha-icon icon="mdi:tune"></ha-icon>General
        </button>
        <button
          class="segment ${general ? "" : "on"}"
          @click=${() => (this._tab = "display")}
        >
          <ha-icon icon="mdi:eye-outline"></ha-icon>Display
        </button>
      </div>
      ${general ? this._renderGeneral() : this._renderDisplay()}`;
  }

  _renderGeneral() {
    return html`<ha-form
      .hass=${this.hass}
      .data=${this._config}
      .schema=${GENERAL_SCHEMA}
      .computeLabel=${(schema) => GENERAL_LABELS[schema.name] ?? schema.name}
      @value-changed=${this._valueChanged}
    ></ha-form>`;
  }

  _renderDisplay() {
    return html`${DISPLAY_OPTIONS.map(
      ([key, label, def, icon]) => html`<div class="row">
        <ha-icon icon=${icon}></ha-icon>
        <span class="row-label">${label}</span>
        <ha-switch
          .checked=${this._config[key] ?? def}
          @change=${(ev) => this._toggleDisplay(key, def, ev.target.checked)}
        ></ha-switch>
      </div>`
    )}`;
  }

  _toggleDisplay(key, def, checked) {
    const config = { ...this._config, type: `custom:${CARD_TYPE}` };
    // Only persist deviations from the option's default.
    if (checked === def) delete config[key];
    else config[key] = checked;
    this._dispatch(config);
  }

  _valueChanged(ev) {
    ev.stopPropagation();
    const config = {
      ...this._config,
      ...ev.detail.value,
      type: `custom:${CARD_TYPE}`,
    };
    if (!config.device) delete config.device;
    if (!config.title) delete config.title;
    this._dispatch(config);
  }

  _dispatch(config) {
    this._config = config;
    this.dispatchEvent(
      new CustomEvent("config-changed", {
        detail: { config },
        bubbles: true,
        composed: true,
      })
    );
  }

  static get styles() {
    return css`
      .segments {
        display: flex;
        background: var(--secondary-background-color);
        border-radius: 12px;
        padding: 4px;
        margin-bottom: 16px;
      }
      .segment {
        flex: 1;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 6px;
        border: none;
        background: transparent;
        color: var(--primary-text-color);
        padding: 10px 0;
        border-radius: 9px;
        cursor: pointer;
        font-size: 0.95em;
        transition: background-color 0.15s ease, color 0.15s ease;
      }
      .segment:hover:not(.on) {
        background: rgba(127, 127, 127, 0.18);
      }
      .segment.on {
        background: var(--primary-text-color);
        color: var(--card-background-color);
        font-weight: 600;
      }
      .segment ha-icon {
        --mdc-icon-size: 18px;
      }
      .row {
        display: flex;
        align-items: center;
        gap: 12px;
        padding: 10px 4px;
      }
      .row ha-icon {
        --mdc-icon-size: 20px;
        color: var(--secondary-text-color);
      }
      .row-label {
        flex: 1;
        color: var(--primary-text-color);
      }
    `;
  }
}
