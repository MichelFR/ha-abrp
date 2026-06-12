/* Visual editor with two tabs: General (title + vehicle) and Display
 * (which card sections are shown). Uses ha-form so selection/saving behaves
 * exactly like core card editors. */

import { LitElement, html, css } from "lit";
import { CARD_TYPE, PLATFORM } from "./const.js";

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

// Config key -> editor label. Everything defaults to shown; only an
// explicit `false` is stored in the card config.
export const DISPLAY_OPTIONS = [
  ["show_image", "Car image"],
  ["show_profile", "Drive profile selector"],
  ["show_charge_speed", "Charging speed badge"],
  ["show_last_seen", "Last seen line"],
  ["show_live_data", "Live data link"],
  ["show_options", "Options button"],
];

const DISPLAY_SCHEMA = DISPLAY_OPTIONS.map(([name]) => ({
  name,
  selector: { boolean: {} },
}));

const LABELS = {
  title: "Title (empty = ABRP vehicle name)",
  device: "Vehicle (empty = first ABRP vehicle)",
  ...Object.fromEntries(DISPLAY_OPTIONS),
};

export class AbrpVehicleCardEditor extends LitElement {
  static get properties() {
    return { hass: {}, _config: {}, _tab: { state: true } };
  }

  constructor() {
    super();
    this._tab = "general";
  }

  setConfig(config) {
    this._config = config || {};
  }

  render() {
    if (!this.hass) return html``;
    const general = this._tab === "general";
    return html`<div class="tabs">
        <button
          class="tab ${general ? "on" : ""}"
          @click=${() => (this._tab = "general")}
        >
          General
        </button>
        <button
          class="tab ${general ? "" : "on"}"
          @click=${() => (this._tab = "display")}
        >
          Display
        </button>
      </div>
      <ha-form
        .hass=${this.hass}
        .data=${general ? this._config : this._displayData()}
        .schema=${general ? GENERAL_SCHEMA : DISPLAY_SCHEMA}
        .computeLabel=${(schema) => LABELS[schema.name] ?? schema.name}
        @value-changed=${this._valueChanged}
      ></ha-form>`;
  }

  _displayData() {
    return Object.fromEntries(
      DISPLAY_OPTIONS.map(([key]) => [key, this._config[key] !== false])
    );
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
    // Shown is the default; only persist explicit "hidden".
    for (const [key] of DISPLAY_OPTIONS) {
      if (config[key] !== false) delete config[key];
    }
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
      .tabs {
        display: flex;
        border-bottom: 1px solid var(--divider-color);
        margin-bottom: 16px;
      }
      .tab {
        flex: 1;
        border: none;
        background: transparent;
        color: var(--secondary-text-color);
        font-size: 1em;
        padding: 10px 0;
        cursor: pointer;
        border-bottom: 2px solid transparent;
        transition: color 0.15s ease, border-color 0.15s ease;
      }
      .tab:hover {
        color: var(--primary-text-color);
      }
      .tab.on {
        color: var(--primary-color);
        border-bottom-color: var(--primary-color);
        font-weight: 600;
      }
    `;
  }
}
