"""Binary sensor platform for ABRP Mate."""

from __future__ import annotations

from collections.abc import Callable
from dataclasses import dataclass

from homeassistant.components.binary_sensor import (
    BinarySensorDeviceClass,
    BinarySensorEntity,
    BinarySensorEntityDescription,
)
from homeassistant.const import EntityCategory
from homeassistant.core import HomeAssistant
from homeassistant.helpers.entity_platform import AddEntitiesCallback

from . import AbrpMateConfigEntry
from .api import Snapshot
from .coordinator import AbrpMateCoordinator
from .entity import AbrpMateEntity


@dataclass(frozen=True, kw_only=True)
class AbrpBinarySensorDescription(BinarySensorEntityDescription):
    """Describes an ABRP Mate binary sensor."""

    value_fn: Callable[[Snapshot], bool | None]


# Speed (non-GPS, live) above this counts as moving.
_MOVING_KMH = 2.0


def _derive_driving(s: Snapshot) -> bool | None:
    """Driving state, explicit if ABRP reports it, otherwise inferred."""
    if s.is_driving is not None:
        return s.is_driving
    if s.is_charging or s.is_asleep:
        return False  # plugged-in or sleeping vehicles are not driving
    if s.speed_kmh is not None:  # a live, non-GPS speed reading
        return s.speed_kmh > _MOVING_KMH
    return None  # not enough information


def _derive_parked(s: Snapshot) -> bool | None:
    """Parked state, explicit if ABRP reports it, otherwise inferred."""
    if s.is_parked is not None:
        return s.is_parked
    if s.is_asleep or s.is_charging:
        return True
    if s.speed_kmh is not None:
        return s.speed_kmh <= _MOVING_KMH
    return None


BINARY_SENSORS: tuple[AbrpBinarySensorDescription, ...] = (
    AbrpBinarySensorDescription(
        key="charging",
        translation_key="charging",
        device_class=BinarySensorDeviceClass.BATTERY_CHARGING,
        value_fn=lambda s: s.is_charging,
    ),
    AbrpBinarySensorDescription(
        key="driving",
        translation_key="driving",
        device_class=BinarySensorDeviceClass.MOVING,
        value_fn=_derive_driving,
    ),
    AbrpBinarySensorDescription(
        key="parked",
        translation_key="parked",
        value_fn=_derive_parked,
    ),
    AbrpBinarySensorDescription(
        key="fast_charging",
        translation_key="fast_charging",
        value_fn=lambda s: s.is_dcfc,
    ),
    AbrpBinarySensorDescription(
        key="online",
        translation_key="online",
        device_class=BinarySensorDeviceClass.CONNECTIVITY,
        entity_category=EntityCategory.DIAGNOSTIC,
        value_fn=lambda s: s.is_connected,
    ),
    AbrpBinarySensorDescription(
        key="asleep",
        translation_key="asleep",
        entity_category=EntityCategory.DIAGNOSTIC,
        value_fn=lambda s: s.is_asleep,
    ),
    AbrpBinarySensorDescription(
        key="cloud_connected",
        translation_key="cloud_connected",
        device_class=BinarySensorDeviceClass.CONNECTIVITY,
        entity_category=EntityCategory.DIAGNOSTIC,
        value_fn=lambda s: s.cloud_connected,
    ),
    AbrpBinarySensorDescription(
        key="obd_connected",
        translation_key="obd_connected",
        device_class=BinarySensorDeviceClass.CONNECTIVITY,
        entity_category=EntityCategory.DIAGNOSTIC,
        value_fn=lambda s: s.obd_connected,
    ),
)


async def async_setup_entry(
    hass: HomeAssistant,
    entry: AbrpMateConfigEntry,
    async_add_entities: AddEntitiesCallback,
) -> None:
    """Set up ABRP Mate binary sensors for all known vehicles."""
    coordinator = entry.runtime_data
    async_add_entities(
        AbrpMateBinarySensor(coordinator, vehicle_id, description)
        for vehicle_id in coordinator.data
        for description in BINARY_SENSORS
    )


class AbrpMateBinarySensor(AbrpMateEntity, BinarySensorEntity):
    """A boolean telemetry flag for a vehicle."""

    entity_description: AbrpBinarySensorDescription

    def __init__(
        self,
        coordinator: AbrpMateCoordinator,
        vehicle_id: int,
        description: AbrpBinarySensorDescription,
    ) -> None:
        super().__init__(coordinator, vehicle_id)
        self.entity_description = description
        self._attr_unique_id = f"{vehicle_id}_{description.key}"

    @property
    def available(self) -> bool:
        # Unavailable (not "unknown") when ABRP doesn't report this state for
        # the vehicle — e.g. driving/parked on a cloud-only vehicle.
        return super().available and self.is_on is not None

    @property
    def is_on(self) -> bool | None:
        snapshot = self.snapshot
        if snapshot is None:
            return None
        return self.entity_description.value_fn(snapshot)
