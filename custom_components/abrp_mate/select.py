"""Select platform for ABRP Mate (charge-stops frequency planning setting)."""

from __future__ import annotations

from homeassistant.components.select import SelectEntity
from homeassistant.core import HomeAssistant
from homeassistant.helpers.entity_platform import AddEntitiesCallback

from . import AbrpMateConfigEntry
from .const import CHARGE_STOPS_OPTIONS, SETTING_CHARGE_STOPS
from .entity import AbrpMateAccountEntity


async def async_setup_entry(
    hass: HomeAssistant,
    entry: AbrpMateConfigEntry,
    async_add_entities: AddEntitiesCallback,
) -> None:
    """Set up the ABRP Mate charge-stops select."""
    async_add_entities([AbrpChargeStopsSelect(entry.runtime_data)])


class AbrpChargeStopsSelect(AbrpMateAccountEntity, SelectEntity):
    """Charge-stops frequency: optimal, fewer or fewest stops."""

    _attr_translation_key = "charge_stops"
    _attr_options = CHARGE_STOPS_OPTIONS
    _attr_icon = "mdi:ev-station"

    def __init__(self, coordinator) -> None:
        super().__init__(coordinator, SETTING_CHARGE_STOPS)

    @property
    def current_option(self) -> str | None:
        value = self.coordinator.settings.get(SETTING_CHARGE_STOPS)
        return value if value in CHARGE_STOPS_OPTIONS else None

    async def async_select_option(self, option: str) -> None:
        await self.coordinator.async_set_setting(SETTING_CHARGE_STOPS, option)
