/* ABRP Vehicle Card — bundled with the ABRP integration.
 *
 * A Lovelace card styled after the ABRP app's vehicle card: car render,
 * battery state, last-seen line, plus an Options dialog (all planning
 * settings) and a Live data dialog (telemetry grid with per-signal
 * providers). Entities are auto-discovered from the abrp integration; the
 * visual editor only needs the vehicle (device) when more than one exists.
 *
 * Built on Home Assistant's own frontend elements (ha-card, ha-dialog,
 * ha-slider, ha-switch, ha-select, ha-icon); Lit itself is bundled at
 * build time so the module is self-contained.
 */

import { CARD_TYPE } from "./const.js";
import { AbrpVehicleCard } from "./card.js";
import { AbrpVehicleCardEditor } from "./editor.js";

customElements.define(CARD_TYPE, AbrpVehicleCard);
customElements.define(`${CARD_TYPE}-editor`, AbrpVehicleCardEditor);

window.customCards = window.customCards || [];
window.customCards.push({
  type: CARD_TYPE,
  name: "ABRP Vehicle Card",
  description:
    "ABRP-style vehicle card with battery state, live data and plan options.",
  preview: true,
  documentationURL: "https://github.com/MichelFR/ha-abrp",
});
