"""Device tracker platform for ABRP Mate (vehicle location)."""

from __future__ import annotations

from homeassistant.components.device_tracker import SourceType, TrackerEntity
from homeassistant.core import HomeAssistant
from homeassistant.helpers.entity_platform import AddEntitiesCallback

from . import AbrpMateConfigEntry
from .coordinator import AbrpMateCoordinator
from .entity import AbrpMateEntity


async def async_setup_entry(
    hass: HomeAssistant,
    entry: AbrpMateConfigEntry,
    async_add_entities: AddEntitiesCallback,
) -> None:
    """Set up an ABRP Mate location tracker for each vehicle."""
    coordinator = entry.runtime_data
    async_add_entities(
        AbrpMateDeviceTracker(coordinator, vehicle_id)
        for vehicle_id in coordinator.data
    )


class AbrpMateDeviceTracker(AbrpMateEntity, TrackerEntity):
    """Reports the vehicle's GPS position."""

    _attr_translation_key = "location"

    def __init__(
        self, coordinator: AbrpMateCoordinator, vehicle_id: int
    ) -> None:
        super().__init__(coordinator, vehicle_id)
        self._attr_unique_id = f"{vehicle_id}_location"

    @property
    def source_type(self) -> SourceType:
        return SourceType.GPS

    @property
    def latitude(self) -> float | None:
        snapshot = self.snapshot
        return snapshot.latitude if snapshot else None

    @property
    def longitude(self) -> float | None:
        snapshot = self.snapshot
        return snapshot.longitude if snapshot else None
