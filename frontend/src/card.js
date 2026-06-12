/* The main ABRP vehicle card element. */

import { LitElement, html } from "lit";
import { CARD_TYPE } from "./const.js";
import { accountEntities, entityMap, vehicleDevices } from "./entities.js";
import { isEntityId, isTemplate, num, relTime } from "./format.js";
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
      _confirmProfile: { state: true },
    };
  }

  constructor() {
    super();
    this._dialog = null; // null | "options" | "live"
    this._profileMenu = false;
    this._confirmProfile = null; // { state, option } awaiting confirmation
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

  /* Resolve a card slot: a per-slot override (entity id, Jinja template or
   * literal value) wins over the auto-discovered entity. */
  _resolve(key, map) {
    const override = this._config.entities?.[key];
    if (override) {
      if (isTemplate(override)) {
        const result = this._templateResults?.[override];
        return {
          state: result === undefined ? "unknown" : String(result),
          attributes: {},
        };
      }
      if (isEntityId(override)) return this.hass.states[override];
      return { state: override, attributes: {} };
    }
    const id = map?.[key];
    return id ? this.hass.states[id] : undefined;
  }

  _vs(key) {
    return this._resolve(key, this._vmap);
  }

  _as(key) {
    return this._resolve(key, this._amap);
  }

  /* -- live template rendering for overrides -- */

  updated(changed) {
    super.updated(changed);
    if (changed.has("hass") || changed.has("_config")) this._syncTemplates();
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    for (const unsub of Object.values(this._tmplUnsub || {})) {
      if (typeof unsub === "function") unsub();
    }
    this._tmplUnsub = {};
  }

  async _syncTemplates() {
    if (!this.hass?.connection) return;
    this._tmplUnsub = this._tmplUnsub || {};
    this._templateResults = this._templateResults || {};
    const templates = [
      ...Object.values(this._config.entities || {}),
      this._config.title,
    ].filter((value) => isTemplate(value));
    for (const template of templates) {
      if (this._tmplUnsub[template]) continue;
      this._tmplUnsub[template] = true; // claim before the async subscribe
      try {
        this._tmplUnsub[template] = await this.hass.connection.subscribeMessage(
          (msg) => {
            this._templateResults[template] = msg.result;
            this.requestUpdate();
          },
          { type: "render_template", template }
        );
      } catch (e) {
        this._templateResults[template] = "error";
        this.requestUpdate();
      }
    }
    for (const known of Object.keys(this._tmplUnsub)) {
      if (!templates.includes(known)) {
        const unsub = this._tmplUnsub[known];
        if (typeof unsub === "function") unsub();
        delete this._tmplUnsub[known];
        delete this._templateResults[known];
      }
    }
  }

  /* Open the standard more-info dialog for a slot's entity. */
  _moreInfo(key) {
    const override = this._config.entities?.[key];
    const entityId =
      override && isEntityId(override) && !isTemplate(override)
        ? override
        : this._vmap?.[key] || this._amap?.[key];
    if (!entityId || (override && !isEntityId(override))) return;
    this.dispatchEvent(
      new CustomEvent("hass-more-info", {
        detail: { entityId },
        bubbles: true,
        composed: true,
      })
    );
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
      ${this._confirmProfile ? this._renderConfirmProfile() : ""}
    </ha-card>`;
  }

  _renderMain(vehicle) {
    const abrpName = this._vs("sensor.vehicle_name")?.state;
    const rawTitle = this._config.title;
    const titleValue =
      rawTitle && isTemplate(rawTitle)
        ? String(this._templateResults?.[rawTitle] ?? "")
        : rawTitle;
    const name =
      titleValue ||
      (abrpName && abrpName !== "unknown" && abrpName !== "unavailable"
        ? abrpName
        : null) ||
      vehicle.device?.name_by_user ||
      vehicle.device?.name ||
      "Vehicle";
    const socState = this._vs("sensor.soc");
    const soc = num(socState);
    const image = this._vs("image.car_image");
    const imageSrc =
      image?.attributes?.entity_picture ||
      (typeof image?.state === "string" &&
      (image.state.startsWith("http") || image.state.startsWith("/"))
        ? image.state
        : null);
    const lastSeen = relTime(this._vs("sensor.last_update")?.state);
    const charging = this._vs("binary_sensor.charging")?.state === "on";
    const power = Number(this._vs("sensor.charging_power")?.state);
    const chargeSpeed =
      charging && Number.isFinite(power) && power > 0
        ? `${power < 10 ? power.toFixed(1) : Math.round(power)} kW`
        : null;

    const show = (key) => this._config[key] !== false;

    return html`<div class="main">
      <div class="head">
        <div class="head-left">
          <div class="name">${name}</div>
          ${show("show_profile") ? this._renderProfile() : ""}
        </div>
        ${show("show_image") && imageSrc
          ? html`<img
              class="car clickable"
              src="${imageSrc}"
              alt="${name}"
              @click=${() => this._moreInfo("image.car_image")}
            />`
          : ""}
      </div>
      <div class="soc-row clickable" @click=${() => this._moreInfo("sensor.soc")}>
        ${socState
          ? html`<ha-state-icon
              .hass=${this.hass}
              .stateObj=${socState}
            ></ha-state-icon>`
          : html`<ha-icon icon="mdi:battery"></ha-icon>`}
        <span class="soc">${soc ?? "–"}%</span>
        ${show("show_charge_speed") && chargeSpeed
          ? html`<span
              class="charge-speed clickable"
              @click=${(ev) => {
                ev.stopPropagation();
                this._moreInfo("sensor.charging_power");
              }}
            >
              <ha-icon icon="mdi:flash"></ha-icon>${chargeSpeed}
            </span>`
          : show("show_charge_speed") && charging
            ? html`<span class="charge-speed">
                <ha-icon icon="mdi:flash"></ha-icon>Charging
              </span>`
            : ""}
      </div>
      <div class="bar clickable" @click=${() => this._moreInfo("sensor.soc")}>
        <div class="fill ${charging ? "charging" : ""}" style="width:${soc ?? 0}%"></div>
      </div>
      ${show("show_last_seen") || show("show_live_data")
        ? html`<div class="meta">
            ${show("show_last_seen")
              ? html`<span
                  class="seen clickable"
                  @click=${() => this._moreInfo("sensor.last_update")}
                >
                  <span class="dot"></span>
                  ${lastSeen ? `Last seen ${lastSeen}` : "Never seen"}
                </span>`
              : html`<span></span>`}
            ${show("show_live_data")
              ? html`<a class="link" @click=${() => (this._dialog = "live")}
                  >Live data</a
                >`
              : ""}
          </div>`
        : ""}
      ${show("show_options") || this._config.show_live_data_button === true
        ? html`<div class="buttons">
            ${show("show_options")
              ? html`<button
                  class="btn"
                  @click=${() => (this._dialog = "options")}
                >
                  <ha-icon icon="mdi:tune-variant"></ha-icon>Options
                </button>`
              : ""}
            ${this._config.show_live_data_button === true
              ? html`<button class="btn" @click=${() => (this._dialog = "live")}>
                  <ha-icon icon="mdi:chart-box-outline"></ha-icon>Live data
                </button>`
              : ""}
          </div>`
        : ""}
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
    this._requestProfileChange(profileState, option);
  }

  /* Change the drive profile, asking for confirmation unless disabled. */
  _requestProfileChange(profileState, option) {
    if (option === profileState.state) return;
    if (this._config.confirm_profile_change === false) {
      this._call("select", "select_option", profileState, { option });
    } else {
      this._confirmProfile = { state: profileState, option };
    }
  }

  _renderConfirmProfile() {
    const { state, option } = this._confirmProfile;
    return html`<ha-dialog
      open
      class="confirm"
      width="small"
      header-title="Switch drive profile?"
      @closed=${() => (this._confirmProfile = null)}
    >
      <div class="confirm-body">
        <div class="confirm-text">
          This changes the active drive profile from "${state.state}" to
          "${option}" in ABRP.
        </div>
        <div class="confirm-actions">
          <button
            class="text-btn"
            @click=${() => (this._confirmProfile = null)}
          >
            Cancel
          </button>
          <button
            class="filled-btn"
            @click=${() => {
              this._call("select", "select_option", state, { option });
              this._confirmProfile = null;
            }}
          >
            Switch
          </button>
        </div>
      </div>
    </ha-dialog>`;
  }

  _dialogFrame(title, body) {
    return html`<ha-dialog
      open
      header-title=${title}
      @closed=${() => (this._dialog = null)}
    >
      <div class="dlg-body">${body}</div>
    </ha-dialog>`;
  }
}
