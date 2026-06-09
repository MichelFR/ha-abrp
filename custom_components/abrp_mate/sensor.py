"""Sensor platform for ABRP Mate."""

from __future__ import annotations

from collections.abc import Callable
from dataclasses import dataclass
from datetime import datetime
from typing import Any

from homeassistant.components.sensor import (
    SensorDeviceClass,
    SensorEntity,
    SensorEntityDescription,
    SensorStateClass,
)
from homeassistant.const import (
    PERCENTAGE,
    EntityCategory,
    UnitOfElectricCurrent,
    UnitOfElectricPotential,
    UnitOfEnergy,
    UnitOfLength,
    UnitOfMass,
    UnitOfPower,
    UnitOfSpeed,
    UnitOfTemperature,
)
from homeassistant.core import HomeAssistant
from homeassistant.helpers.entity_platform import AddEntitiesCallback

from . import AbrpMateConfigEntry
from .api import Snapshot
from .coordinator import AbrpMateCoordinator
from .entity import AbrpMateEntity


@dataclass(frozen=True, kw_only=True)
class AbrpSensorDescription(SensorEntityDescription):
    """Describes an ABRP Mate sensor and how to read it from a snapshot."""

    value_fn: Callable[[Snapshot], float | None]


SENSORS: tuple[AbrpSensorDescription, ...] = (
    AbrpSensorDescription(
        key="soc",
        translation_key="soc",
        native_unit_of_measurement=PERCENTAGE,
        device_class=SensorDeviceClass.BATTERY,
        state_class=SensorStateClass.MEASUREMENT,
        value_fn=lambda s: s.soc_percent,
    ),
    AbrpSensorDescription(
        key="power",
        translation_key="power",
        native_unit_of_measurement=UnitOfPower.KILO_WATT,
        device_class=SensorDeviceClass.POWER,
        state_class=SensorStateClass.MEASUREMENT,
        value_fn=lambda s: s.power_kw,
    ),
    AbrpSensorDescription(
        key="speed",
        translation_key="speed",
        native_unit_of_measurement=UnitOfSpeed.KILOMETERS_PER_HOUR,
        device_class=SensorDeviceClass.SPEED,
        state_class=SensorStateClass.MEASUREMENT,
        value_fn=lambda s: s.speed_kmh,
    ),
    AbrpSensorDescription(
        key="odometer",
        translation_key="odometer",
        native_unit_of_measurement=UnitOfLength.KILOMETERS,
        device_class=SensorDeviceClass.DISTANCE,
        state_class=SensorStateClass.TOTAL_INCREASING,
        value_fn=lambda s: s.odometer_km,
    ),
    AbrpSensorDescription(
        key="range",
        translation_key="range",
        native_unit_of_measurement=UnitOfLength.KILOMETERS,
        device_class=SensorDeviceClass.DISTANCE,
        state_class=SensorStateClass.MEASUREMENT,
        value_fn=lambda s: s.estimated_range_km,
    ),
    AbrpSensorDescription(
        key="voltage",
        translation_key="voltage",
        native_unit_of_measurement=UnitOfElectricPotential.VOLT,
        device_class=SensorDeviceClass.VOLTAGE,
        state_class=SensorStateClass.MEASUREMENT,
        value_fn=lambda s: s.voltage_v,
    ),
    AbrpSensorDescription(
        key="current",
        translation_key="current",
        native_unit_of_measurement=UnitOfElectricCurrent.AMPERE,
        device_class=SensorDeviceClass.CURRENT,
        state_class=SensorStateClass.MEASUREMENT,
        value_fn=lambda s: s.current_a,
    ),
    AbrpSensorDescription(
        key="charge_energy_added",
        translation_key="charge_energy_added",
        native_unit_of_measurement=UnitOfEnergy.KILO_WATT_HOUR,
        device_class=SensorDeviceClass.ENERGY,
        state_class=SensorStateClass.TOTAL_INCREASING,
        value_fn=lambda s: s.charging_energy_added_kwh,
    ),
    AbrpSensorDescription(
        key="external_temp",
        translation_key="external_temp",
        native_unit_of_measurement=UnitOfTemperature.CELSIUS,
        device_class=SensorDeviceClass.TEMPERATURE,
        state_class=SensorStateClass.MEASUREMENT,
        value_fn=lambda s: s.ext_temp_c,
    ),
    AbrpSensorDescription(
        key="battery_temp",
        translation_key="battery_temp",
        native_unit_of_measurement=UnitOfTemperature.CELSIUS,
        device_class=SensorDeviceClass.TEMPERATURE,
        state_class=SensorStateClass.MEASUREMENT,
        value_fn=lambda s: s.batt_temp_c,
    ),
    AbrpSensorDescription(
        key="cabin_temp",
        translation_key="cabin_temp",
        native_unit_of_measurement=UnitOfTemperature.CELSIUS,
        device_class=SensorDeviceClass.TEMPERATURE,
        state_class=SensorStateClass.MEASUREMENT,
        value_fn=lambda s: s.cabin_temp_c,
    ),
    AbrpSensorDescription(
        key="vehicle_temp",
        translation_key="vehicle_temp",
        native_unit_of_measurement=UnitOfTemperature.CELSIUS,
        device_class=SensorDeviceClass.TEMPERATURE,
        state_class=SensorStateClass.MEASUREMENT,
        value_fn=lambda s: s.vehicle_temp_c,
    ),
    AbrpSensorDescription(
        key="reference_consumption",
        translation_key="reference_consumption",
        native_unit_of_measurement="Wh/km",
        state_class=SensorStateClass.MEASUREMENT,
        entity_category=EntityCategory.DIAGNOSTIC,
        value_fn=lambda s: s.ref_consumption_wh_km,
    ),
    AbrpSensorDescription(
        key="max_speed",
        translation_key="max_speed",
        native_unit_of_measurement=UnitOfSpeed.KILOMETERS_PER_HOUR,
        device_class=SensorDeviceClass.SPEED,
        state_class=SensorStateClass.MEASUREMENT,
        entity_category=EntityCategory.DIAGNOSTIC,
        value_fn=lambda s: s.max_speed_kmh,
    ),
    AbrpSensorDescription(
        key="weight",
        translation_key="weight",
        native_unit_of_measurement=UnitOfMass.KILOGRAMS,
        device_class=SensorDeviceClass.WEIGHT,
        state_class=SensorStateClass.MEASUREMENT,
        entity_category=EntityCategory.DIAGNOSTIC,
        value_fn=lambda s: s.weight_kg,
    ),
)


async def async_setup_entry(
    hass: HomeAssistant,
    entry: AbrpMateConfigEntry,
    async_add_entities: AddEntitiesCallback,
) -> None:
    """Set up ABRP Mate sensors for all known vehicles."""
    coordinator = entry.runtime_data
    entities: list[SensorEntity] = []
    for vehicle_id in coordinator.data:
        entities.extend(
            AbrpMateSensor(coordinator, vehicle_id, description)
            for description in SENSORS
        )
        entities.append(AbrpMateLastUpdateSensor(coordinator, vehicle_id))
        entities.append(AbrpMateDataSourceSensor(coordinator, vehicle_id))
    async_add_entities(entities)


class AbrpMateSensor(AbrpMateEntity, SensorEntity):
    """A single telemetry value for a vehicle."""

    entity_description: AbrpSensorDescription

    def __init__(
        self,
        coordinator: AbrpMateCoordinator,
        vehicle_id: int,
        description: AbrpSensorDescription,
    ) -> None:
        super().__init__(coordinator, vehicle_id)
        self.entity_description = description
        self._attr_unique_id = f"{vehicle_id}_{description.key}"

    @property
    def native_value(self) -> float | None:
        snapshot = self.snapshot
        if snapshot is None:
            return None
        return self.entity_description.value_fn(snapshot)


class AbrpMateLastUpdateSensor(AbrpMateEntity, SensorEntity):
    """When ABRP last received telemetry for the vehicle."""

    _attr_translation_key = "last_update"
    _attr_device_class = SensorDeviceClass.TIMESTAMP
    _attr_entity_category = EntityCategory.DIAGNOSTIC

    def __init__(self, coordinator: AbrpMateCoordinator, vehicle_id: int) -> None:
        super().__init__(coordinator, vehicle_id)
        self._attr_unique_id = f"{vehicle_id}_last_update"

    @property
    def native_value(self) -> datetime | None:
        return self.snapshot.recorded_at if self.snapshot else None


class AbrpMateDataSourceSensor(AbrpMateEntity, SensorEntity):
    """Which source ABRP's data is coming from (cloud provider, OBD, ...)."""

    _attr_translation_key = "data_source"
    _attr_entity_category = EntityCategory.DIAGNOSTIC

    def __init__(self, coordinator: AbrpMateCoordinator, vehicle_id: int) -> None:
        super().__init__(coordinator, vehicle_id)
        self._attr_unique_id = f"{vehicle_id}_data_source"

    @property
    def native_value(self) -> str | None:
        return self.snapshot.tlm_source if self.snapshot else None

    @property
    def extra_state_attributes(self) -> dict[str, Any] | None:
        snapshot = self.snapshot
        if snapshot is None:
            return None
        return {
            "connected": snapshot.is_connected,
            "providers": snapshot.providers or {},
        }
