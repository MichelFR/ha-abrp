"""The ABRP integration."""

from __future__ import annotations

import logging
from pathlib import Path

from homeassistant.components.http import StaticPathConfig
from homeassistant.config_entries import ConfigEntry
from homeassistant.const import EVENT_HOMEASSISTANT_STARTED
from homeassistant.core import CoreState, HomeAssistant
from homeassistant.helpers.event import async_call_later
from homeassistant.loader import async_get_integration

from .const import CARD_URL, DOMAIN, PLATFORMS
from .coordinator import AbrpMateCoordinator

_LOGGER = logging.getLogger(__name__)

type AbrpMateConfigEntry = ConfigEntry[AbrpMateCoordinator]

_STATIC_PATH_KEY = f"{DOMAIN}_static_registered"


async def async_setup_entry(hass: HomeAssistant, entry: AbrpMateConfigEntry) -> bool:
    """Set up ABRP from a config entry."""
    await _async_register_card(hass)

    coordinator = AbrpMateCoordinator(hass, entry)
    await coordinator.async_config_entry_first_refresh()

    entry.runtime_data = coordinator
    await hass.config_entries.async_forward_entry_setups(entry, PLATFORMS)
    return True


async def async_unload_entry(hass: HomeAssistant, entry: AbrpMateConfigEntry) -> bool:
    """Unload a config entry."""
    unload_ok = await hass.config_entries.async_unload_platforms(entry, PLATFORMS)
    if unload_ok:
        await entry.runtime_data.async_shutdown()
    return unload_ok


async def _async_register_card(hass: HomeAssistant) -> None:
    """Serve the bundled Lovelace card and register it as a resource."""
    if _STATIC_PATH_KEY not in hass.data:
        hass.data[_STATIC_PATH_KEY] = True
        await hass.http.async_register_static_paths(
            [
                StaticPathConfig(
                    CARD_URL,
                    str(Path(__file__).parent / "www" / Path(CARD_URL).name),
                    cache_headers=False,
                )
            ]
        )

    # Adding the dashboard resource needs lovelace to be set up; defer to
    # HA start when it isn't yet.
    if hass.state is CoreState.running:
        await _async_add_resource(hass)
    else:

        async def _on_started(_event) -> None:
            await _async_add_resource(hass)

        hass.bus.async_listen_once(EVENT_HOMEASSISTANT_STARTED, _on_started)


async def _async_add_resource(hass: HomeAssistant, retries: int = 12) -> None:
    """Create or update the Lovelace resource entry for the card."""
    lovelace = hass.data.get("lovelace")
    resources = getattr(lovelace, "resources", None)
    # Renamed from ``mode`` to ``resource_mode`` in HA 2026.2.
    mode = getattr(lovelace, "resource_mode", None) or getattr(
        lovelace, "mode", None
    )
    if resources is None or mode != "storage":
        _LOGGER.info(
            "Lovelace is not in storage mode (mode=%s); add %s as a "
            "dashboard resource manually",
            mode,
            CARD_URL,
        )
        return

    if not resources.loaded:
        # Lovelace loads its resources lazily; retry until they are up.
        if retries <= 0:
            _LOGGER.warning(
                "Lovelace resources never loaded; add %s as a dashboard "
                "resource manually",
                CARD_URL,
            )
            return

        async def _retry(_now) -> None:
            await _async_add_resource(hass, retries - 1)

        async_call_later(hass, 5, _retry)
        return

    try:
        # Version the URL so browsers refetch the card after upgrades.
        integration = await async_get_integration(hass, DOMAIN)
        url = f"{CARD_URL}?v={integration.version}"

        existing = next(
            (
                item
                for item in resources.async_items()
                if item.get("url", "").split("?")[0] == CARD_URL
            ),
            None,
        )
        if existing is None:
            await resources.async_create_item({"res_type": "module", "url": url})
            _LOGGER.info("Registered the ABRP card resource %s", url)
        elif existing["url"] != url:
            await resources.async_update_item(existing["id"], {"url": url})
            _LOGGER.info("Updated the ABRP card resource to %s", url)
    except Exception:  # noqa: BLE001 - the card is optional, never block setup
        _LOGGER.exception("Could not register the ABRP card resource")
