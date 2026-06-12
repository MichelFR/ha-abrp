/* Visual editor with subpages: the root shows the vehicle picker and a list
 * of settings groups; each row opens a subpage with its own options. */

import { LitElement, html, css } from "lit";
import { CARD_TYPE, PLATFORM } from "./const.js";
import {
  OVERRIDABLE_KEYS,
  accountEntities,
  entityMap,
  vehicleDevices,
} from "./entities.js";
import { isEntityId, isTemplate } from "./format.js";
import { ensureHaComponents } from "./ha-components.js";

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

const TITLE_SCHEMA = [{ name: "title", selector: { text: {} } }];

// Toggles: [config key, label, default, icon]. Only deviations from the
// default are stored in the card config.
const TOGGLES = {
  illustration: [["show_image", "Show car image", true, "mdi:image-outline"]],
  profile: [
    ["show_profile", "Show drive profile selector", true, "mdi:car-cog"],
  ],
  battery: [
    ["show_charge_speed", "Show charging speed badge", true, "mdi:flash"],
  ],
  status: [
    ["show_last_seen", "Show last seen", true, "mdi:clock-outline"],
    ["show_live_data", "Show Live data link", true, "mdi:link-variant"],
  ],
  buttons: [
    ["show_options", "Show Options button", true, "mdi:tune-variant"],
    [
      "show_live_data_button",
      "Show Live data button",
      false,
      "mdi:chart-box-outline",
    ],
  ],
};

const PAGES = [
  { id: "title", icon: "mdi:format-title", label: "Title" },
  { id: "entities", icon: "mdi:shape-outline", label: "Entities" },
  {
    id: "illustration",
    icon: "mdi:image-outline",
    label: "Vehicle illustration",
  },
  { id: "profile", icon: "mdi:car-cog", label: "Drive profile" },
  { id: "battery", icon: "mdi:battery-charging", label: "Battery & charging" },
  { id: "status", icon: "mdi:clock-outline", label: "Status line" },
  { id: "buttons", icon: "mdi:gesture-tap-button", label: "Buttons" },
];

export class AbrpVehicleCardEditor extends LitElement {
  static get properties() {
    return { hass: {}, _config: {}, _page: { state: true } };
  }

  constructor() {
    super();
    this._page = null; // null = root, otherwise a PAGES id
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
    if (this._page?.startsWith("entity:")) {
      return this._renderEntityDetail(this._page.slice(7));
    }
    if (this._page === "entities") return this._renderEntities();
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
        .computeLabel=${() => "Vehicle (empty = first ABRP vehicle)"}
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
              <span class="nav-label">${page.label}</span>
              <span class="nav-secondary">${this._summary(page.id)}</span>
            </span>
            <ha-icon icon="mdi:chevron-right"></ha-icon>
          </button>`
        )}
      </div>`;
  }

  _summary(pageId) {
    if (pageId === "title") {
      return this._config.title || "ABRP vehicle name";
    }
    if (pageId === "entities") {
      const count = Object.keys(this._config.entities || {}).length;
      return count ? `${count} overridden` : "Automatic";
    }
    const toggles = TOGGLES[pageId] || [];
    const shown = toggles.filter(([key, , def]) => this._config[key] ?? def);
    if (!shown.length) return "Nothing shown";
    if (shown.length === toggles.length && toggles.length === 1) {
      return "Shown";
    }
    return shown
      .map(([, label]) => label.replace(/^Show /, ""))
      .join(", ");
  }

  /* -- subpages -- */

  _renderSubpage(page) {
    return html`${this._subpageHead(page.label, () => (this._page = null))}
      ${page.id === "title"
        ? html`<ha-form
            .hass=${this.hass}
            .data=${this._config}
            .schema=${TITLE_SCHEMA}
            .computeLabel=${() => "Title (empty = ABRP vehicle name)"}
            @value-changed=${this._valueChanged}
          ></ha-form>`
        : (TOGGLES[page.id] || []).map(([key, label, def, icon]) =>
            this._renderToggle(key, label, def, icon)
          )}`;
  }

  _renderToggle(key, label, def, icon) {
    return html`<div class="row">
      <ha-icon icon=${icon}></ha-icon>
      <span class="row-label">${label}</span>
      <ha-switch
        .checked=${this._config[key] ?? def}
        @change=${(ev) => this._toggleDisplay(key, def, ev.target.checked)}
      ></ha-switch>
    </div>`;
  }

  /* -- entities: list + per-slot detail -- */

  _renderEntities() {
    const defaults = this._defaults();
    const overrides = this._config.entities || {};
    return html`${this._subpageHead("Entities", () => (this._page = null))}
      <div class="nav">
        ${OVERRIDABLE_KEYS.map(
          ([key, label]) => html`<button
            class="nav-row"
            @click=${() => (this._page = `entity:${key}`)}
          >
            <ha-icon
              class="nav-icon"
              icon=${overrides[key]
                ? "mdi:pencil-circle"
                : "mdi:circle-small"}
            ></ha-icon>
            <span class="nav-labels">
              <span class="nav-label">${label}</span>
              <span class="nav-secondary"
                >${overrides[key] || defaults[key] || "not found"}</span
              >
            </span>
            <ha-icon icon="mdi:chevron-right"></ha-icon>
          </button>`
        )}
      </div>`;
  }

  _renderEntityDetail(key) {
    const label =
      OVERRIDABLE_KEYS.find(([k]) => k === key)?.[1] || key;
    const override = this._config.entities?.[key] || "";
    const isEntity = !!override && isEntityId(override) && !isTemplate(override);
    const defaults = this._defaults();
    return html`${this._subpageHead(label, () => (this._page = "entities"))}
      <div class="hint">
        Default: ${defaults[key] || "none discovered"}
      </div>
      <ha-form
        .hass=${this.hass}
        .data=${{ entity: isEntity ? override : "" }}
        .schema=${[{ name: "entity", selector: { entity: {} } }]}
        .computeLabel=${() => "Entity"}
        @value-changed=${(ev) => {
          ev.stopPropagation();
          this._setOverride(key, ev.detail.value.entity || "");
        }}
      ></ha-form>
      <ha-form
        .hass=${this.hass}
        .data=${{ custom: isEntity ? "" : override }}
        .schema=${[{ name: "custom", selector: { text: {} } }]}
        .computeLabel=${() => "Custom value or template"}
        @value-changed=${(ev) => {
          ev.stopPropagation();
          this._setOverride(key, ev.detail.value.custom || "");
        }}
      ></ha-form>
      <div class="hint">
        Pick an entity, enter a fixed value, or a template like
        <code>{{ states('sensor.example') }}</code>. Leave both empty for
        the automatic entity.
      </div>`;
  }

  _setOverride(key, value) {
    const entities = { ...(this._config.entities || {}) };
    if (!value) delete entities[key];
    else entities[key] = value;
    const config = { ...this._config, entities, type: `custom:${CARD_TYPE}` };
    if (!Object.keys(entities).length) delete config.entities;
    this._dispatch(config);
  }

  _subpageHead(title, onBack) {
    return html`<div class="subpage-head">
      <button class="back" @click=${onBack}>
        <ha-icon icon="mdi:chevron-left"></ha-icon>
      </button>
      <span class="subpage-title">${title}</span>
    </div>`;
  }

  /* -- config plumbing -- */

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
      .hint {
        color: var(--secondary-text-color);
        font-size: 0.85em;
        margin: 8px 4px 12px;
      }
      .hint code {
        background: var(--secondary-background-color);
        border-radius: 4px;
        padding: 1px 5px;
      }
      ha-form {
        display: block;
        margin-bottom: 12px;
      }
    `;
  }
}
