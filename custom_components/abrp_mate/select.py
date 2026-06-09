"""Select platform for ABRP Mate (charge-stops frequency planning setting)."""

from __future__ import annotations

from homeassistant.components.select import SelectEntity
from homeassistant.core import HomeAssistant
from homeassistant.helpers.entity_platform import AddEntitiesCallback

from . import AbrpMateConfigEntry
from .const import CHARGE_STOPS_OPTIONS, SETTING_CHARGE_STOPS
from .coordinator import AbrpMateCoordinator
from .entity import AbrpMateAccountEntity, AbrpMateEntity


async def async_setup_entry(
    hass: HomeAssistant,
    entry: AbrpMateConfigEntry,
    async_add_entities: AddEntitiesCallback,
) -> None:
    """Set up the ABRP Mate selects: account charge-stops + per-vehicle profile."""
    coordinator = entry.runtime_data
    entities: list[SelectEntity] = [AbrpChargeStopsSelect(coordinator)]
    entities.extend(
        AbrpDriveProfileSelect(coordinator, vehicle_id)
        for vehicle_id in coordinator.data
    )
    async_add_entities(entities)


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


class AbrpDriveProfileSelect(AbrpMateEntity, SelectEntity):
    """Select the vehicle's active drive profile (ABRP configuration)."""

    _attr_translation_key = "drive_profile"
    _attr_icon = "mdi:car-cog"

    def __init__(self, coordinator: AbrpMateCoordinator, vehicle_id: int) -> None:
        super().__init__(coordinator, vehicle_id)
        self._attr_unique_id = f"{vehicle_id}_drive_profile"

    def _configs(self) -> dict[str, str]:
        """Map config id -> display name for this vehicle."""
        vehicle = self.vehicle
        if vehicle is None:
            return {}
        return {
            cid: (cfg.get("name") or cid) for cid, cfg in vehicle.configurations.items()
        }

    @property
    def available(self) -> bool:
        return super().available and bool(self._configs())

    @property
    def options(self) -> list[str]:
        return list(self._configs().values())

    @property
    def current_option(self) -> str | None:
        vehicle = self.vehicle
        if vehicle is None or vehicle.active_config is None:
            return None
        return self._configs().get(vehicle.active_config)

    async def async_select_option(self, option: str) -> None:
        config_id = next(
            (cid for cid, name in self._configs().items() if name == option), None
        )
        if config_id is not None:
            await self.coordinator.async_set_active_config(self._vehicle_id, config_id)
