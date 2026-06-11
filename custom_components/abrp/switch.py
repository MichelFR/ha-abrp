"""Switch platform for ABRP Mate (boolean planning settings)."""

from __future__ import annotations

from typing import Any

from homeassistant.components.switch import SwitchEntity, SwitchEntityDescription
from homeassistant.core import HomeAssistant
from homeassistant.helpers.entity_platform import AddEntitiesCallback

from . import AbrpMateConfigEntry
from .coordinator import AbrpMateCoordinator
from .entity import AbrpMateAccountEntity

# Each entry's key is the ABRP account setting it toggles.
SWITCHES: tuple[SwitchEntityDescription, ...] = (
    SwitchEntityDescription(
        key="avoid_tolls", translation_key="avoid_tolls", icon="mdi:cash-multiple"
    ),
    SwitchEntityDescription(
        key="avoid_ferries", translation_key="avoid_ferries", icon="mdi:ferry"
    ),
    SwitchEntityDescription(
        key="avoid_borders", translation_key="avoid_borders", icon="mdi:boom-gate"
    ),
    SwitchEntityDescription(
        key="avoid_motorways", translation_key="avoid_motorways", icon="mdi:highway"
    ),
    SwitchEntityDescription(
        key="realtime_traffic",
        translation_key="realtime_traffic",
        icon="mdi:traffic-light",
    ),
    SwitchEntityDescription(
        key="realtime_weather",
        translation_key="realtime_weather",
        icon="mdi:weather-partly-cloudy",
    ),
    SwitchEntityDescription(
        key="adjust_speed", translation_key="adjust_speed", icon="mdi:speedometer"
    ),
)


async def async_setup_entry(
    hass: HomeAssistant,
    entry: AbrpMateConfigEntry,
    async_add_entities: AddEntitiesCallback,
) -> None:
    """Set up the ABRP Mate boolean setting switches."""
    coordinator = entry.runtime_data
    async_add_entities(AbrpSettingSwitch(coordinator, desc) for desc in SWITCHES)


class AbrpSettingSwitch(AbrpMateAccountEntity, SwitchEntity):
    """Toggle a boolean ABRP planning setting."""

    def __init__(
        self, coordinator: AbrpMateCoordinator, description: SwitchEntityDescription
    ) -> None:
        super().__init__(coordinator, description.key)
        self.entity_description = description

    @property
    def is_on(self) -> bool | None:
        value = self.coordinator.settings.get(self._key)
        return value if isinstance(value, bool) else None

    async def async_turn_on(self, **kwargs: Any) -> None:
        await self.coordinator.async_set_setting(self._key, True)

    async def async_turn_off(self, **kwargs: Any) -> None:
        await self.coordinator.async_set_setting(self._key, False)
