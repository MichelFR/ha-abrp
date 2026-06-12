/* Visual editor: just pick the vehicle (device) when more than one exists.
 * Uses ha-form with a device selector so selection/saving behaves exactly
 * like core card editors. */

import { LitElement, html } from "lit";
import { CARD_TYPE, PLATFORM } from "./const.js";

const SCHEMA = [
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

export class AbrpVehicleCardEditor extends LitElement {
  static get properties() {
    return { hass: {}, _config: {} };
  }

  setConfig(config) {
    this._config = config || {};
  }

  render() {
    if (!this.hass) return html``;
    return html`<ha-form
      .hass=${this.hass}
      .data=${this._config}
      .schema=${SCHEMA}
      .computeLabel=${(schema) =>
        schema.name === "title"
          ? "Title (empty = ABRP vehicle name)"
          : "Vehicle (empty = first ABRP vehicle)"}
      @value-changed=${this._valueChanged}
    ></ha-form>`;
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
    this._config = config;
    this.dispatchEvent(
      new CustomEvent("config-changed", {
        detail: { config },
        bubbles: true,
        composed: true,
      })
    );
  }
}
