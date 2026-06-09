"""Switch platform for ABRP Mate ("Avoid on route" planning settings)."""

from __future__ import annotations

from typing import Any

from homeassistant.components.switch import SwitchEntity
from homeassistant.core import HomeAssistant
from homeassistant.helpers.entity_platform import AddEntitiesCallback

from . import AbrpMateConfigEntry
from .const import AVOID_SETTINGS
from .entity import AbrpMateAccountEntity

_ICONS = {
    "avoid_tolls": "mdi:cash-multiple",
    "avoid_ferries": "mdi:ferry",
    "avoid_borders": "mdi:boom-gate",
    "avoid_motorways": "mdi:highway",
}


async def async_setup_entry(
    hass: HomeAssistant,
    entry: AbrpMateConfigEntry,
    async_add_entities: AddEntitiesCallback,
) -> None:
    """Set up the ABRP Mate "avoid on route" switches."""
    coordinator = entry.runtime_data
    async_add_entities(AbrpAvoidSwitch(coordinator, key) for key in AVOID_SETTINGS)


class AbrpAvoidSwitch(AbrpMateAccountEntity, SwitchEntity):
    """Toggle an ABRP "avoid on route" planning preference."""

    def __init__(self, coordinator, key: str) -> None:
        super().__init__(coordinator, key)
        self._attr_translation_key = key
        self._attr_icon = _ICONS.get(key)

    @property
    def is_on(self) -> bool | None:
        value = self.coordinator.settings.get(self._key)
        return bool(value) if isinstance(value, bool) else None

    async def async_turn_on(self, **kwargs: Any) -> None:
        await self.coordinator.async_set_setting(self._key, True)

    async def async_turn_off(self, **kwargs: Any) -> None:
        await self.coordinator.async_set_setting(self._key, False)
