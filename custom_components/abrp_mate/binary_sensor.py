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
from homeassistant.helpers import entity_registry as er
from homeassistant.helpers.entity_platform import AddEntitiesCallback

from . import AbrpMateConfigEntry
from .api import Snapshot
from .coordinator import AbrpMateCoordinator
from .entity import AbrpMateEntity, cloud_source_label


@dataclass(frozen=True, kw_only=True)
class AbrpBinarySensorDescription(BinarySensorEntityDescription):
    """Describes an ABRP Mate binary sensor."""

    value_fn: Callable[[Snapshot], bool | None]
    # Name carries the vehicle's cloud provider (e.g. "Enode connected");
    # such entities are only created when the vehicle has a cloud provider.
    source_named: bool = False


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
        key="dc_charging",
        translation_key="dc_charging",
        device_class=BinarySensorDeviceClass.BATTERY_CHARGING,
        value_fn=lambda s: s.is_dcfc,
    ),
    AbrpBinarySensorDescription(
        key="plugged_in",
        translation_key="plugged_in",
        device_class=BinarySensorDeviceClass.PLUG,
        value_fn=lambda s: s.plugged_in,
    ),
    AbrpBinarySensorDescription(
        key="asleep",
        translation_key="asleep",
        entity_category=EntityCategory.DIAGNOSTIC,
        value_fn=lambda s: s.is_asleep,
    ),
    AbrpBinarySensorDescription(
        key="source_connected",
        translation_key="source_connected",
        device_class=BinarySensorDeviceClass.CONNECTIVITY,
        entity_category=EntityCategory.DIAGNOSTIC,
        source_named=True,
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

# Keys of binary sensors that used to exist; their registry entries are
# removed so they don't linger as unavailable leftovers.
_REMOVED_KEYS = ("online", "cloud_connected")


def _cleanup_removed_entities(
    hass: HomeAssistant, entry: AbrpMateConfigEntry
) -> None:
    registry = er.async_get(hass)
    for reg_entry in er.async_entries_for_config_entry(registry, entry.entry_id):
        if reg_entry.domain != "binary_sensor":
            continue
        if reg_entry.unique_id.partition("_")[2] in _REMOVED_KEYS:
            registry.async_remove(reg_entry.entity_id)


async def async_setup_entry(
    hass: HomeAssistant,
    entry: AbrpMateConfigEntry,
    async_add_entities: AddEntitiesCallback,
) -> None:
    """Set up ABRP Mate binary sensors for all known vehicles."""
    coordinator = entry.runtime_data
    _cleanup_removed_entities(hass, entry)
    entities: list[BinarySensorEntity] = []
    for vehicle_id in coordinator.data:
        has_cloud = (
            cloud_source_label(coordinator.vehicles.get(vehicle_id)) is not None
        )
        entities.extend(
            AbrpMateBinarySensor(coordinator, vehicle_id, description)
            for description in BINARY_SENSORS
            if not description.source_named or has_cloud
        )
        entities.append(AbrpMateRealtimeConnectedSensor(coordinator, vehicle_id))
    async_add_entities(entities)


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
        if description.source_named:
            self._attr_translation_placeholders = {
                "source": cloud_source_label(self.vehicle) or "Cloud"
            }

    @property
    def is_on(self) -> bool | None:
        snapshot = self.snapshot
        if snapshot is None:
            return None
        return self.entity_description.value_fn(snapshot)


class AbrpMateRealtimeConnectedSensor(AbrpMateEntity, BinarySensorEntity):
    """Whether the realtime SSE stream for this vehicle is connected."""

    _attr_translation_key = "realtime_connected"
    _attr_device_class = BinarySensorDeviceClass.CONNECTIVITY
    _attr_entity_category = EntityCategory.DIAGNOSTIC

    def __init__(self, coordinator: AbrpMateCoordinator, vehicle_id: int) -> None:
        super().__init__(coordinator, vehicle_id)
        self._attr_unique_id = f"{vehicle_id}_realtime_connected"

    @property
    def is_on(self) -> bool:
        return self.coordinator.stream_connected.get(self._vehicle_id, False)
