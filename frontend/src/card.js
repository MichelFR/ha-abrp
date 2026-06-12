/* The main ABRP vehicle card element. */

import { LitElement, html } from "lit";
import { CARD_TYPE } from "./const.js";
import { accountEntities, entityMap, vehicleDevices } from "./entities.js";
import { num, relTime } from "./format.js";
import { ensureHaComponents } from "./ha-components.js";
import { cardStyles } from "./styles.js";
import { renderLiveData } from "./views/live-data.js";
import { renderOptionsDialog } from "./views/options-dialog.js";

export class AbrpVehicleCard extends LitElement {
  static styles = cardStyles;

  static get properties() {
    return {
      hass: {},
      _config: {},
      _dialog: { state: true },
      _profileMenu: { state: true },
    };
  }

  constructor() {
    super();
    this._dialog = null; // null | "options" | "live"
    this._profileMenu = false;
  }

  connectedCallback() {
    super.connectedCallback();
    ensureHaComponents();
  }

  setConfig(config) {
    this._config = config || {};
  }

  static getConfigElement() {
    return document.createElement(`${CARD_TYPE}-editor`);
  }

  static getStubConfig() {
    return {};
  }

  getCardSize() {
    return 5;
  }

  /* -- entity resolution -- */

  get _vehicle() {
    const vehicles = vehicleDevices(this.hass);
    if (!vehicles.length) return null;
    if (this._config.device) {
      // Fall back to the first vehicle if the configured device is not a
      // vehicle (e.g. the account device was picked in the selector).
      return (
        vehicles.find((v) => v.deviceId === this._config.device) || vehicles[0]
      );
    }
    return vehicles[0];
  }

  _vs(key) {
    const id = this._vmap?.[key];
    return id ? this.hass.states[id] : undefined;
  }

  _as(key) {
    const id = this._amap?.[key];
    return id ? this.hass.states[id] : undefined;
  }

  _call(domain, service, state, data = {}) {
    this.hass.callService(domain, service, {
      entity_id: state.entity_id,
      ...data,
    });
  }

  /* -- rendering -- */

  render() {
    if (!this.hass) return html``;
    const vehicle = this._vehicle;
    if (!vehicle) {
      return html`<ha-card>
        <div class="empty">
          No ABRP vehicle found — set up the ABRP integration first.
        </div>
      </ha-card>`;
    }
    this._vmap = entityMap(this.hass, vehicle.ents);
    this._amap = entityMap(this.hass, accountEntities(this.hass));

    return html`<ha-card>
      ${this._renderMain(vehicle)}
      ${this._dialog === "options"
        ? this._dialogFrame("Plan options", renderOptionsDialog(this))
        : ""}
      ${this._dialog === "live"
        ? this._dialogFrame("Live data", renderLiveData(this))
        : ""}
    </ha-card>`;
  }

  _renderMain(vehicle) {
    const name =
      vehicle.device?.name_by_user || vehicle.device?.name || "Vehicle";
    const socState = this._vs("sensor.soc");
    const soc = num(socState);
    const image = this._vs("image.car_image");
    const lastSeen = relTime(this._vs("sensor.last_update")?.state);
    const charging = this._vs("binary_sensor.charging")?.state === "on";
    const power = Number(this._vs("sensor.charging_power")?.state);
    const chargeSpeed =
      charging && Number.isFinite(power) && power > 0
        ? `${power < 10 ? power.toFixed(1) : Math.round(power)} kW`
        : null;

    return html`<div class="main">
      <div class="head">
        <div class="head-left">
          <div class="name">${name}</div>
          ${this._renderProfile()}
        </div>
        ${image?.attributes?.entity_picture
          ? html`<img
              class="car"
              src="${image.attributes.entity_picture}"
              alt="${name}"
            />`
          : ""}
      </div>
      <div class="soc-row">
        ${socState
          ? html`<ha-state-icon
              .hass=${this.hass}
              .stateObj=${socState}
            ></ha-state-icon>`
          : html`<ha-icon icon="mdi:battery"></ha-icon>`}
        <span class="soc">${soc ?? "–"}%</span>
        ${chargeSpeed
          ? html`<span class="charge-speed">
              <ha-icon icon="mdi:flash"></ha-icon>${chargeSpeed}
            </span>`
          : charging
            ? html`<span class="charge-speed">
                <ha-icon icon="mdi:flash"></ha-icon>Charging
              </span>`
            : ""}
      </div>
      <div class="bar">
        <div class="fill ${charging ? "charging" : ""}" style="width:${soc ?? 0}%"></div>
      </div>
      <div class="meta">
        <span class="seen">
          <span class="dot"></span>
          ${lastSeen ? `Last seen ${lastSeen}` : "Never seen"}
        </span>
        <a class="link" @click=${() => (this._dialog = "live")}>Live data</a>
      </div>
      <div class="buttons">
        <button class="btn" @click=${() => (this._dialog = "options")}>
          <ha-icon icon="mdi:tune-variant"></ha-icon>Options
        </button>
      </div>
    </div>`;
  }

  /* Drive profile under the name: chevron opens a selection menu. */
  _renderProfile() {
    const profileState = this._vs("select.drive_profile");
    const profile = profileState?.state;
    if (!profile || profile === "unknown") return "";
    const options = profileState.attributes?.options || [];

    return html`<div
        class="profile selectable"
        @click=${() => (this._profileMenu = !this._profileMenu)}
      >
        ${profile}
        <ha-icon
          icon="mdi:chevron-${this._profileMenu ? "up" : "down"}"
        ></ha-icon>
      </div>
      ${this._profileMenu
        ? html`<div
              class="menu-backdrop"
              @click=${() => (this._profileMenu = false)}
            ></div>
            <div class="menu">
              ${options.map(
                (opt) => html`<button
                  class="menu-item ${opt === profile ? "on" : ""}"
                  @click=${() => this._selectProfile(profileState, opt)}
                >
                  ${opt}
                  ${opt === profile
                    ? html`<ha-icon icon="mdi:check"></ha-icon>`
                    : ""}
                </button>`
              )}
            </div>`
        : ""}`;
  }

  _selectProfile(profileState, option) {
    this._profileMenu = false;
    if (option !== profileState.state) {
      this._call("select", "select_option", profileState, { option });
    }
  }

  _dialogFrame(title, body) {
    return html`<ha-dialog
      open
      hideActions
      .heading=${title}
      @closed=${() => (this._dialog = null)}
    >
      <div slot="heading" class="dlg-head">
        <span class="dlg-title">${title}</span>
        <a class="link" @click=${() => (this._dialog = null)}>Done</a>
      </div>
      <div class="dlg-body">${body}</div>
    </ha-dialog>`;
  }
}
