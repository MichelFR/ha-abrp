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
    DEGREE,
    PERCENTAGE,
    EntityCategory,
    UnitOfElectricCurrent,
    UnitOfElectricPotential,
    UnitOfEnergy,
    UnitOfEnergyDistance,
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
from .entity import AbrpMateEntity, cloud_source_label


@dataclass(frozen=True, kw_only=True)
class AbrpSensorDescription(SensorEntityDescription):
    """Describes an ABRP Mate sensor and how to read it from a snapshot."""

    value_fn: Callable[[Snapshot], float | int | str | datetime | None]
    # Name carries the vehicle's cloud provider (e.g. "Enode last refresh");
    # such entities are only created when the vehicle has a cloud provider.
    source_named: bool = False


def _consumption_display_unit(settings: dict[str, Any]) -> str | None:
    """Consumption unit matching the user's ABRP app display settings.

    ABRP combines ``measures_system`` with ``inverted_ref_consumption``
    (energy-per-distance vs distance-per-energy). Imperial non-inverted is
    Wh/mi in ABRP, which Home Assistant has no unit for; mi/kWh is the
    imperial norm instead.
    """
    system = settings.get("measures_system")
    if not isinstance(system, str):
        return None
    imperial = system != "metric"
    if settings.get("inverted_ref_consumption"):
        return (
            UnitOfEnergyDistance.MILES_PER_KILO_WATT_HOUR
            if imperial
            else UnitOfEnergyDistance.KM_PER_KILO_WATT_HOUR
        )
    return (
        UnitOfEnergyDistance.MILES_PER_KILO_WATT_HOUR
        if imperial
        else UnitOfEnergyDistance.WATT_HOUR_PER_KM
    )


def _charging_power(snapshot: Snapshot) -> float | None:
    """Charge rate (positive kW) while charging, 0 otherwise, None if unknown."""
    if snapshot.is_charging is None:
        return None
    if not snapshot.is_charging:
        return 0.0
    return abs(snapshot.power_kw) if snapshot.power_kw is not None else None


# The stream's chargingState values, normalized to our enum options.
_CHARGING_STATES = {
    "NOT_CHARGING": "not_charging",
    "CHARGING_AC": "charging_ac",
    "CHARGING_DC": "charging_dc",
    "CHARGING_UNKNOWN": "charging_unknown",
}


def _charging_state(s: Snapshot) -> str | None:
    """Charging state, from the stream's enum or derived from poll booleans."""
    if s.charging_state is not None:
        return _CHARGING_STATES.get(s.charging_state)
    if s.is_charging is None:
        return None
    if not s.is_charging:
        return "not_charging"
    if s.is_dcfc is None:
        return "charging_unknown"
    return "charging_dc" if s.is_dcfc else "charging_ac"


def _driving_state(s: Snapshot) -> str | None:
    """Driving state, from the stream's enum or derived from poll booleans."""
    if s.driving_state in ("DRIVE", "DRIVING"):
        return "driving"
    if s.driving_state in ("PARK", "PARKED"):
        return "parked"
    if s.is_driving:
        return "driving"
    if s.is_parked:
        return "parked"
    if s.is_driving is None and s.is_parked is None:
        return None
    return "idle"


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
        key="soe",
        translation_key="soe",
        native_unit_of_measurement=UnitOfEnergy.KILO_WATT_HOUR,
        device_class=SensorDeviceClass.ENERGY_STORAGE,
        state_class=SensorStateClass.MEASUREMENT,
        value_fn=lambda s: s.soe_kwh,
    ),
    AbrpSensorDescription(
        key="soh",
        translation_key="soh",
        native_unit_of_measurement=PERCENTAGE,
        state_class=SensorStateClass.MEASUREMENT,
        value_fn=lambda s: s.soh_percent,
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
        key="charging_power",
        translation_key="charging_power",
        native_unit_of_measurement=UnitOfPower.KILO_WATT,
        device_class=SensorDeviceClass.POWER,
        state_class=SensorStateClass.MEASUREMENT,
        value_fn=_charging_power,
    ),
    AbrpSensorDescription(
        key="hvac_power",
        translation_key="hvac_power",
        native_unit_of_measurement=UnitOfPower.KILO_WATT,
        device_class=SensorDeviceClass.POWER,
        state_class=SensorStateClass.MEASUREMENT,
        value_fn=lambda s: s.hvac_power_kw,
    ),
    AbrpSensorDescription(
        key="charging_state",
        translation_key="charging_state",
        device_class=SensorDeviceClass.ENUM,
        options=["not_charging", "charging_ac", "charging_dc", "charging_unknown"],
        value_fn=_charging_state,
    ),
    AbrpSensorDescription(
        key="driving_state",
        translation_key="driving_state",
        device_class=SensorDeviceClass.ENUM,
        options=["driving", "parked", "idle"],
        value_fn=_driving_state,
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
        key="elevation",
        translation_key="elevation",
        native_unit_of_measurement=UnitOfLength.METERS,
        device_class=SensorDeviceClass.DISTANCE,
        state_class=SensorStateClass.MEASUREMENT,
        value_fn=lambda s: s.elevation_m,
    ),
    AbrpSensorDescription(
        key="heading",
        translation_key="heading",
        native_unit_of_measurement=DEGREE,
        state_class=SensorStateClass.MEASUREMENT,
        value_fn=lambda s: s.heading_deg,
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
        key="cabin_set_point",
        translation_key="cabin_set_point",
        native_unit_of_measurement=UnitOfTemperature.CELSIUS,
        device_class=SensorDeviceClass.TEMPERATURE,
        state_class=SensorStateClass.MEASUREMENT,
        value_fn=lambda s: s.cabin_set_point_c,
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
        key="battery_capacity",
        translation_key="battery_capacity",
        native_unit_of_measurement=UnitOfEnergy.KILO_WATT_HOUR,
        device_class=SensorDeviceClass.ENERGY_STORAGE,
        state_class=SensorStateClass.MEASUREMENT,
        entity_category=EntityCategory.DIAGNOSTIC,
        value_fn=lambda s: s.battery_capacity_kwh,
    ),
    AbrpSensorDescription(
        key="calibration_confidence",
        translation_key="calibration_confidence",
        native_unit_of_measurement=PERCENTAGE,
        state_class=SensorStateClass.MEASUREMENT,
        entity_category=EntityCategory.DIAGNOSTIC,
        value_fn=lambda s: s.calib_confidence_percent,
    ),
    AbrpSensorDescription(
        key="speed_factor",
        translation_key="speed_factor",
        state_class=SensorStateClass.MEASUREMENT,
        entity_category=EntityCategory.DIAGNOSTIC,
        value_fn=lambda s: s.speed_factor,
    ),
    AbrpSensorDescription(
        key="charger_id",
        translation_key="charger_id",
        entity_category=EntityCategory.DIAGNOSTIC,
        value_fn=lambda s: s.charger_id,
    ),
    AbrpSensorDescription(
        key="reference_consumption",
        translation_key="reference_consumption",
        native_unit_of_measurement=UnitOfEnergyDistance.WATT_HOUR_PER_KM,
        device_class=SensorDeviceClass.ENERGY_DISTANCE,
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
    AbrpSensorDescription(
        key="source_last_refresh",
        translation_key="source_last_refresh",
        device_class=SensorDeviceClass.TIMESTAMP,
        entity_category=EntityCategory.DIAGNOSTIC,
        source_named=True,
        value_fn=lambda s: s.cloud_last_seen,
    ),
    AbrpSensorDescription(
        key="obd_last_refresh",
        translation_key="obd_last_refresh",
        device_class=SensorDeviceClass.TIMESTAMP,
        entity_category=EntityCategory.DIAGNOSTIC,
        value_fn=lambda s: s.obd_last_seen,
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
        has_cloud = (
            cloud_source_label(coordinator.vehicles.get(vehicle_id)) is not None
        )
        entities.extend(
            AbrpMateSensor(coordinator, vehicle_id, description)
            for description in SENSORS
            if not description.source_named or has_cloud
        )
        entities.append(AbrpMateLastUpdateSensor(coordinator, vehicle_id))
        entities.append(AbrpMateDataSourceSensor(coordinator, vehicle_id))
        entities.append(AbrpMateVehicleNameSensor(coordinator, vehicle_id))
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
        if description.source_named:
            self._attr_translation_placeholders = {
                "source": cloud_source_label(self.vehicle) or "Cloud"
            }
        # Default the display unit to the format chosen in the ABRP app;
        # Home Assistant converts, and a per-entity override still wins.
        if description.device_class is SensorDeviceClass.ENERGY_DISTANCE:
            self._attr_suggested_unit_of_measurement = _consumption_display_unit(
                coordinator.settings
            )

    @property
    def native_value(self) -> float | datetime | None:
        # Returns None (-> "unknown") when ABRP isn't currently providing this
        # value, e.g. a stale/blanked transient signal or an unreported field.
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
            # Let the card reproduce ABRP's connection-status indicator without
            # depending on the (user-disableable) last-update/refresh sensors:
            # last_seen is the freshest telemetry time, soc_last_seen is when the
            # SoC itself was measured.
            "last_seen": snapshot.recorded_at,
            "soc_last_seen": snapshot.soc_last_seen,
        }


class AbrpMateVehicleNameSensor(AbrpMateEntity, SensorEntity):
    """The user-configurable vehicle name as set in the ABRP app."""

    _attr_translation_key = "vehicle_name"
    _attr_entity_category = EntityCategory.DIAGNOSTIC
    _attr_icon = "mdi:car-info"

    def __init__(self, coordinator: AbrpMateCoordinator, vehicle_id: int) -> None:
        super().__init__(coordinator, vehicle_id)
        self._attr_unique_id = f"{vehicle_id}_vehicle_name"

    @property
    def native_value(self) -> str | None:
        vehicle = self.vehicle
        return vehicle.name if vehicle else None
