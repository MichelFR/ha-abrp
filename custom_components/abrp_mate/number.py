"""Number platform for ABRP Mate planning settings."""

from __future__ import annotations

from homeassistant.components.number import (
    NumberDeviceClass,
    NumberEntity,
    NumberEntityDescription,
    NumberMode,
)
from homeassistant.const import PERCENTAGE, UnitOfMass
from homeassistant.core import HomeAssistant
from homeassistant.helpers.entity_platform import AddEntitiesCallback

from . import AbrpMateConfigEntry
from .const import SETTING_ARRIVAL_SOC
from .coordinator import AbrpMateCoordinator
from .entity import AbrpMateAccountEntity

# Simple single-key integer settings. (Destination SoC is special — it also
# mirrors a legacy string key — so it has its own class below.)
NUMBERS: tuple[NumberEntityDescription, ...] = (
    NumberEntityDescription(
        key="preferred_minimum_charger_stalls",
        translation_key="min_charger_stalls",
        native_min_value=1,
        native_max_value=12,
        native_step=1,
        mode=NumberMode.BOX,
        icon="mdi:ev-station",
    ),
    NumberEntityDescription(
        key="extra_weight",
        translation_key="extra_weight",
        native_unit_of_measurement=UnitOfMass.KILOGRAMS,
        device_class=NumberDeviceClass.WEIGHT,
        native_min_value=0,
        native_max_value=1000,
        native_step=5,
        mode=NumberMode.BOX,
        icon="mdi:weight",
    ),
)


async def async_setup_entry(
    hass: HomeAssistant,
    entry: AbrpMateConfigEntry,
    async_add_entities: AddEntitiesCallback,
) -> None:
    """Set up the ABRP Mate planning number entities."""
    coordinator = entry.runtime_data
    entities: list[NumberEntity] = [AbrpArrivalSocNumber(coordinator)]
    entities.extend(AbrpSettingNumber(coordinator, desc) for desc in NUMBERS)
    async_add_entities(entities)


class AbrpSettingNumber(AbrpMateAccountEntity, NumberEntity):
    """A single-key integer ABRP planning setting."""

    def __init__(
        self, coordinator: AbrpMateCoordinator, description: NumberEntityDescription
    ) -> None:
        super().__init__(coordinator, description.key)
        self.entity_description = description

    @property
    def native_value(self) -> float | None:
        value = self.coordinator.settings.get(self._key)
        return float(value) if isinstance(value, (int, float)) else None

    async def async_set_native_value(self, value: float) -> None:
        await self.coordinator.async_set_setting(self._key, int(value))


class AbrpArrivalSocNumber(AbrpMateAccountEntity, NumberEntity):
    """Target state of charge to arrive at the destination with."""

    _attr_translation_key = "arrival_soc"
    _attr_native_unit_of_measurement = PERCENTAGE
    _attr_native_min_value = 0
    _attr_native_max_value = 100
    _attr_native_step = 5
    _attr_mode = NumberMode.SLIDER
    _attr_icon = "mdi:battery-charging-50"

    def __init__(self, coordinator: AbrpMateCoordinator) -> None:
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
