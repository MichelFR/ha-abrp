"""The ABRP Mate integration."""

from __future__ import annotations

from homeassistant.config_entries import ConfigEntry
from homeassistant.core import HomeAssistant

from .const import DOMAIN, PLATFORMS
from .coordinator import AbrpMateCoordinator

type AbrpMateConfigEntry = ConfigEntry[AbrpMateCoordinator]


async def async_setup_entry(hass: HomeAssistant, entry: AbrpMateConfigEntry) -> bool:
    """Set up ABRP Mate from a config entry."""
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
