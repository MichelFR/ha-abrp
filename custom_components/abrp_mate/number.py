"""Number platform for ABRP Mate (destination SoC planning setting)."""

from __future__ import annotations

from homeassistant.components.number import NumberEntity, NumberMode
from homeassistant.const import PERCENTAGE
from homeassistant.core import HomeAssistant
from homeassistant.helpers.entity_platform import AddEntitiesCallback

from . import AbrpMateConfigEntry
from .const import SETTING_ARRIVAL_SOC
from .entity import AbrpMateAccountEntity


async def async_setup_entry(
    hass: HomeAssistant,
    entry: AbrpMateConfigEntry,
    async_add_entities: AddEntitiesCallback,
) -> None:
    """Set up the ABRP Mate planning number entities."""
    async_add_entities([AbrpArrivalSocNumber(entry.runtime_data)])


class AbrpArrivalSocNumber(AbrpMateAccountEntity, NumberEntity):
    """Target state of charge to arrive at the destination with."""

    _attr_translation_key = "arrival_soc"
    _attr_native_unit_of_measurement = PERCENTAGE
    _attr_native_min_value = 0
    _attr_native_max_value = 100
    _attr_native_step = 5
    _attr_mode = NumberMode.SLIDER
    _attr_icon = "mdi:battery-charging-50"

    def __init__(self, coordinator) -> None:
        super().__init__(coordinator, SETTING_ARRIVAL_SOC)

    @property
    def native_value(self) -> float | None:
        value = self.coordinator.settings.get(SETTING_ARRIVAL_SOC)
        return float(value) if isinstance(value, (int, float)) else None

    async def async_set_native_value(self, value: float) -> None:
        soc = int(value)
        # ABRP mirrors arrival SoC into a legacy string key (arrivalcharge)
        # that the mobile app reads; write both so all clients stay in sync.
        await self.coordinator.async_set_settings(
            {SETTING_ARRIVAL_SOC: soc, "arrivalcharge": str(soc)}
        )
