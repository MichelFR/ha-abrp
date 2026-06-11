/* Nudge the frontend into defining ha-dialog / ha-slider / ha-switch /
 * ha-select, which are lazy-loaded; the light more-info control pulls in
 * the whole stack. */

let componentsLoaded = false;

export async function ensureHaComponents() {
  if (componentsLoaded) return;
  componentsLoaded = true;
  try {
    const helpers = await window.loadCardHelpers?.();
    await helpers?.importMoreInfoControl?.("light");
  } catch (e) {
    /* the dialogs degrade gracefully if an element is missing */
  }
}
