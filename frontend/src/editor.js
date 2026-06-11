/* Visual editor: just pick the vehicle (device) when more than one exists. */

import { LitElement, html } from "lit";
import { CARD_TYPE } from "./const.js";
import { vehicleDevices } from "./entities.js";
import { ensureHaComponents } from "./ha-components.js";
import { editorStyles } from "./styles.js";

export class AbrpVehicleCardEditor extends LitElement {
  static styles = editorStyles;

  static get properties() {
    return { hass: {}, _config: {} };
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
    const vehicles = vehicleDevices(this.hass);
    return html`<ha-select
      label="Vehicle"
      naturalMenuWidth
      fixedMenuPosition
      .value=${this._config.device || ""}
      @selected=${this._deviceChanged}
      @closed=${(ev) => ev.stopPropagation()}
    >
      <mwc-list-item value="">Automatic (first ABRP vehicle)</mwc-list-item>
      ${vehicles.map(
        (v) =>
          html`<mwc-list-item .value=${v.deviceId}>
            ${v.device?.name_by_user || v.device?.name || v.deviceId}
          </mwc-list-item>`
      )}
    </ha-select>`;
  }

  _deviceChanged(ev) {
    const config = { ...this._config, type: `custom:${CARD_TYPE}` };
    if (ev.target.value) config.device = ev.target.value;
    else delete config.device;
    if (config.device === this._config.device) return;
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
