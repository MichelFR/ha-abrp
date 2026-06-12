/* Visual editor with subpages: the root shows the vehicle picker and a list
 * of settings groups. Each subpage carries its display toggles plus the
 * entity slots it covers; every slot offers Automatic (discovered entity),
 * Entity (any entity) or Custom (fixed value / Jinja template) — the same
 * pattern core cards like tile use for composite/custom values. */

import { LitElement, html, css } from "lit";
import { CARD_TYPE, PLATFORM } from "./const.js";
import { accountEntities, entityMap, vehicleDevices } from "./entities.js";
import { isEntityId, isTemplate } from "./format.js";
import { ensureHaComponents } from "./ha-components.js";
import { localize } from "./localize.js";

const DEVICE_SCHEMA = [
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

// Toggles: [config key, default, icon]. Labels come from translations
// (toggle.<key> / short.<key>); only deviations from the default are stored.
const TOGGLES = {
  illustration: [["show_image", true, "mdi:image-outline"]],
  profile: [
    ["show_profile", true, "mdi:car-cog"],
    ["confirm_profile_change", true, "mdi:shield-check-outline"],
  ],
  battery: [["show_charge_speed", true, "mdi:flash"]],
  status: [
    ["show_last_seen", true, "mdi:clock-outline"],
    ["show_live_data", true, "mdi:link-variant"],
  ],
  buttons: [
    ["show_options", true, "mdi:tune-variant"],
    ["show_live_data_button", false, "mdi:chart-box-outline"],
  ],
};

// Entity slots per subpage: [slot key, icon]; labels from slot.<key>.
const PAGE_SLOTS = {
  illustration: [["image.car_image", "mdi:image-outline"]],
  profile: [["select.drive_profile", "mdi:car-cog"]],
  battery: [
    ["sensor.soc", "mdi:battery-high"],
    ["binary_sensor.charging", "mdi:battery-charging"],
    ["sensor.charging_power", "mdi:flash"],
  ],
  status: [["sensor.last_update", "mdi:clock-outline"]],
  livedata: [
    ["sensor.soc", "mdi:battery-high"],
    ["sensor.range", "mdi:map-marker-distance"],
    ["sensor.reference_consumption", "mdi:lightning-bolt-outline"],
    ["sensor.battery_capacity", "mdi:battery"],
    ["sensor.odometer", "mdi:counter"],
    ["device_tracker.location", "mdi:map-marker"],
    ["sensor.speed_factor", "mdi:speedometer"],
    ["sensor.max_speed", "mdi:speedometer-medium"],
    ["sensor.elevation", "mdi:image-filter-hdr"],
    ["sensor.data_source", "mdi:database-outline"],
    ["sensor.source_last_refresh", "mdi:cloud-outline"],
    ["sensor.obd_last_refresh", "mdi:car-connected"],
  ],
};

const PAGES = [
  { id: "title", icon: "mdi:format-title" },
  { id: "illustration", icon: "mdi:image-outline" },
  { id: "profile", icon: "mdi:car-cog" },
  { id: "battery", icon: "mdi:battery-charging" },
  { id: "status", icon: "mdi:clock-outline" },
  { id: "buttons", icon: "mdi:gesture-tap-button" },
  { id: "livedata", icon: "mdi:chart-box-outline" },
];

const TITLE_SLOT = "sensor.vehicle_name";

export class AbrpVehicleCardEditor extends LitElement {
  static get properties() {
    return {
      hass: {},
      _config: {},
      _page: { state: true },
      _modes: { state: true },
    };
  }

  constructor() {
    super();
    this._page = null; // null = root, otherwise a PAGES id
    this._modes = {}; // slot key -> "auto" | "entity" | "custom" (UI state)
  }

  connectedCallback() {
    super.connectedCallback();
    ensureHaComponents();
  }

  setConfig(config) {
    this._config = config || {};
  }

  _t(key, vars) {
    return localize(this.hass, key, vars);
  }

  render() {
    if (!this.hass) return html``;
    const page = PAGES.find((p) => p.id === this._page);
    return page ? this._renderSubpage(page) : this._renderRoot();
  }

  /* Auto-discovered entity map for the selected (or first) vehicle. */
  _defaults() {
    const vehicles = vehicleDevices(this.hass);
    const vehicle =
      (this._config.device &&
        vehicles.find((v) => v.deviceId === this._config.device)) ||
      vehicles[0];
    return {
      ...(vehicle ? entityMap(this.hass, vehicle.ents) : {}),
      ...entityMap(this.hass, accountEntities(this.hass)),
    };
  }

  /* -- root: vehicle picker + settings list -- */

  _renderRoot() {
    return html`<ha-form
        .hass=${this.hass}
        .data=${this._config}
        .schema=${DEVICE_SCHEMA}
        .computeLabel=${() => this._t("editor.vehicle")}
        @value-changed=${this._valueChanged}
      ></ha-form>
      <div class="nav">
        ${PAGES.map(
          (page) => html`<button
            class="nav-row"
            @click=${() => (this._page = page.id)}
          >
            <ha-icon class="nav-icon" icon=${page.icon}></ha-icon>
            <span class="nav-labels">
              <span class="nav-label">${this._t(`page.${page.id}`)}</span>
              <span class="nav-secondary">${this._summary(page.id)}</span>
            </span>
            <ha-icon icon="mdi:chevron-right"></ha-icon>
          </button>`
        )}
      </div>`;
  }

  _summary(pageId) {
    if (pageId === "title") {
      return (
        this._config.title ||
        (this._config.entities?.[TITLE_SLOT] ?? this._t("editor.auto_name"))
      );
    }
    const overridden = (PAGE_SLOTS[pageId] || []).filter(
      ([key]) => this._config.entities?.[key]
    ).length;
    const suffix = overridden
      ? ` · ${this._t("editor.overridden", { n: overridden })}`
      : "";
    const toggles = TOGGLES[pageId] || [];
    if (!toggles.length) {
      return overridden
        ? this._t("editor.overridden", { n: overridden })
        : this._t("editor.automatic");
    }
    const shown = toggles.filter(([key, def]) => this._config[key] ?? def);
    if (!shown.length) return `${this._t("editor.nothing_shown")}${suffix}`;
    if (shown.length === toggles.length && toggles.length === 1) {
      return `${this._t("editor.shown")}${suffix}`;
    }
    return shown.map(([key]) => this._t(`short.${key}`)).join(", ") + suffix;
  }

  /* -- subpages -- */

  _renderSubpage(page) {
    return html`<div class="subpage-head">
        <button class="back" @click=${() => (this._page = null)}>
          <ha-icon icon="mdi:chevron-left"></ha-icon>
        </button>
        <span class="subpage-title">${this._t(`page.${page.id}`)}</span>
      </div>
      ${(TOGGLES[page.id] || []).map(([key, def, icon]) =>
        this._renderToggle(key, def, icon)
      )}
      ${page.id === "title"
        ? this._renderTitleSlot()
        : (PAGE_SLOTS[page.id] || []).map(([key, icon]) =>
            this._renderSlot(key, icon)
          )}`;
  }

  _renderToggle(key, def, icon) {
    return html`<div class="row">
      <ha-icon icon=${icon}></ha-icon>
      <span class="row-label">${this._t(`toggle.${key}`)}</span>
      <ha-switch
        .checked=${this._config[key] ?? def}
        @change=${(ev) => this._toggleDisplay(key, def, ev.target.checked)}
      ></ha-switch>
    </div>`;
  }

  /* -- slot editors: Automatic / Entity / Custom -- */

  _slotMode(key, override) {
    if (this._modes[key]) return this._modes[key];
    if (!override) return "auto";
    return isEntityId(override) && !isTemplate(override) ? "entity" : "custom";
  }

  _renderModeChips(key, mode, onMode) {
    return html`<div class="modes">
      ${["auto", "entity", "custom"].map(
        (id) => html`<button
          class="mode ${mode === id ? "on" : ""}"
          @click=${() => onMode(id)}
        >
          ${this._t(`editor.mode_${id}`)}
        </button>`
      )}
    </div>`;
  }

  _renderSlot(key, icon) {
    const override = this._config.entities?.[key] || "";
    const mode = this._slotMode(key, override);
    const def = this._defaults()[key];

    return html`<div class="section">
        <ha-icon icon=${icon}></ha-icon>${this._t(`slot.${key}`)}
      </div>
      ${this._renderModeChips(key, mode, (id) => {
        this._modes = { ...this._modes, [key]: id };
        if (id === "auto") this._setOverride(key, "");
      })}
      ${mode === "auto"
        ? html`<div class="hint">
            ${this._t("editor.auto_value", {
              value: def || this._t("editor.not_found"),
            })}
          </div>`
        : mode === "entity"
          ? html`<ha-form
              .hass=${this.hass}
              .data=${{
                value:
                  isEntityId(override) && !isTemplate(override)
                    ? override
                    : "",
              }}
              .schema=${[{ name: "value", selector: { entity: {} } }]}
              .computeLabel=${() => this._t("editor.entity")}
              @value-changed=${(ev) => {
                ev.stopPropagation();
                this._setOverride(key, ev.detail.value.value || "");
              }}
            ></ha-form>`
          : html`<ha-form
              .hass=${this.hass}
              .data=${{
                value:
                  isEntityId(override) && !isTemplate(override)
                    ? ""
                    : override,
              }}
              .schema=${[{ name: "value", selector: { template: {} } }]}
              .computeLabel=${() => this._t("editor.value_template")}
              @value-changed=${(ev) => {
                ev.stopPropagation();
                this._setOverride(key, ev.detail.value.value || "");
              }}
            ></ha-form>`}`;
  }

  /* Title: Custom edits config.title (text or template); Entity overrides
   * the vehicle-name slot; Automatic clears both. */
  _renderTitleSlot() {
    const override = this._config.entities?.[TITLE_SLOT] || "";
    const custom = this._config.title || "";
    const mode =
      this._modes.__title || (custom ? "custom" : override ? "entity" : "auto");
    const def = this._defaults()[TITLE_SLOT];

    return html`<div class="section">
        <ha-icon icon="mdi:format-title"></ha-icon>${this._t("editor.name")}
      </div>
      ${this._renderModeChips("__title", mode, (id) => {
        this._modes = { ...this._modes, __title: id };
        if (id === "auto") {
          this._dispatch(this._withoutTitle(this._withOverride(TITLE_SLOT, "")));
        } else if (id === "entity") {
          this._dispatch(this._withoutTitle(this._config));
        } else if (id === "custom") {
          this._dispatch(this._withOverride(TITLE_SLOT, ""));
        }
      })}
      ${mode === "auto"
        ? html`<div class="hint">
            ${this._t("editor.auto_value", {
              value: def || this._t("editor.auto_name"),
            })}
          </div>`
        : mode === "entity"
          ? html`<ha-form
              .hass=${this.hass}
              .data=${{ value: override }}
              .schema=${[{ name: "value", selector: { entity: {} } }]}
              .computeLabel=${() => this._t("editor.entity")}
              @value-changed=${(ev) => {
                ev.stopPropagation();
                this._setOverride(TITLE_SLOT, ev.detail.value.value || "");
              }}
            ></ha-form>`
          : html`<ha-form
              .hass=${this.hass}
              .data=${{ value: custom }}
              .schema=${[{ name: "value", selector: { template: {} } }]}
              .computeLabel=${() => this._t("editor.custom_name")}
              @value-changed=${(ev) => {
                ev.stopPropagation();
                const config = {
                  ...this._config,
                  type: `custom:${CARD_TYPE}`,
                };
                if (ev.detail.value.value) {
                  config.title = ev.detail.value.value;
                } else {
                  delete config.title;
                }
                this._dispatch(config);
              }}
            ></ha-form>`}`;
  }

  /* -- config plumbing -- */

  _withOverride(key, value) {
    const entities = { ...(this._config.entities || {}) };
    if (!value) delete entities[key];
    else entities[key] = value;
    const config = { ...this._config, entities, type: `custom:${CARD_TYPE}` };
    if (!Object.keys(entities).length) delete config.entities;
    return config;
  }

  _withoutTitle(config) {
    const next = { ...config };
    delete next.title;
    return next;
  }

  _setOverride(key, value) {
    this._dispatch(this._withOverride(key, value));
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
      .nav {
        display: flex;
        flex-direction: column;
        margin-top: 16px;
      }
      .nav-row {
        display: flex;
        align-items: center;
        gap: 14px;
        border: none;
        background: transparent;
        padding: 12px 6px;
        cursor: pointer;
        text-align: left;
        border-radius: 10px;
        color: var(--primary-text-color);
        transition: background-color 0.15s ease;
      }
      .nav-row:hover {
        background: var(--secondary-background-color);
      }
      .nav-row ha-icon {
        color: var(--secondary-text-color);
        --mdc-icon-size: 20px;
      }
      .nav-labels {
        flex: 1;
        display: flex;
        flex-direction: column;
        gap: 2px;
      }
      .nav-label {
        font-size: 1em;
      }
      .nav-secondary {
        font-size: 0.85em;
        color: var(--secondary-text-color);
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        max-width: 280px;
      }
      .subpage-head {
        display: flex;
        align-items: center;
        gap: 8px;
        margin-bottom: 12px;
        position: sticky;
        top: 0;
        z-index: 2;
        background: var(--card-background-color, var(--ha-card-background));
        padding: 8px 0;
        margin-top: -8px;
      }
      .back {
        display: flex;
        align-items: center;
        justify-content: center;
        border: none;
        background: transparent;
        color: var(--primary-text-color);
        cursor: pointer;
        border-radius: 50%;
        width: 36px;
        height: 36px;
        transition: background-color 0.15s ease;
      }
      .back:hover {
        background: var(--secondary-background-color);
      }
      .subpage-title {
        font-size: 1.1em;
        font-weight: 600;
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
      .section {
        display: flex;
        align-items: center;
        gap: 8px;
        font-weight: 600;
        margin: 18px 0 8px;
        color: var(--primary-text-color);
      }
      .section ha-icon {
        --mdc-icon-size: 18px;
        color: var(--secondary-text-color);
      }
      .modes {
        display: flex;
        background: var(--secondary-background-color);
        border-radius: 10px;
        padding: 3px;
        margin-bottom: 10px;
      }
      .mode {
        flex: 1;
        border: none;
        background: transparent;
        color: var(--primary-text-color);
        padding: 8px 0;
        border-radius: 8px;
        cursor: pointer;
        font-size: 0.9em;
        transition: background-color 0.15s ease, color 0.15s ease;
      }
      .mode:hover:not(.on) {
        background: rgba(127, 127, 127, 0.18);
      }
      .mode.on {
        background: var(--primary-color);
        color: var(--text-primary-color, #fff);
        font-weight: 600;
      }
      .hint {
        color: var(--secondary-text-color);
        font-size: 0.85em;
        margin: 4px 4px 12px;
      }
      ha-form {
        display: block;
        margin-bottom: 12px;
      }
    `;
  }
}
