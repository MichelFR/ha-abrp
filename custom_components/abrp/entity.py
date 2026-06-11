"""Shared entity base for ABRP Mate."""

from __future__ import annotations

from homeassistant.helpers.device_registry import DeviceEntryType, DeviceInfo
from homeassistant.helpers.update_coordinator import CoordinatorEntity

from .api import Snapshot, Vehicle
from .const import DOMAIN
from .coordinator import AbrpMateCoordinator


def cloud_source_label(vehicle: Vehicle | None) -> str | None:
    """Display name of the vehicle's cloud telemetry provider (e.g. "Enode")."""
    source = vehicle.raw.get("ota_tlm_type") if vehicle else None
    if not isinstance(source, str) or not source:
        return None
    return source.replace("_", " ").title()


class AbrpMateEntity(CoordinatorEntity[AbrpMateCoordinator]):
    """Base entity tied to a single vehicle on the coordinator."""

    _attr_has_entity_name = True

    def __init__(self, coordinator: AbrpMateCoordinator, vehicle_id: int) -> None:
        super().__init__(coordinator)
        self._vehicle_id = vehicle_id

    @property
    def vehicle(self) -> Vehicle | None:
        return self.coordinator.vehicles.get(self._vehicle_id)

    @property
    def snapshot(self) -> Snapshot | None:
        return (self.coordinator.data or {}).get(self._vehicle_id)

    @property
    def available(self) -> bool:
        return super().available and self.snapshot is not None

    @property
    def device_info(self) -> DeviceInfo:
        vehicle = self.vehicle
        name = (vehicle.name if vehicle else None) or f"ABRP Vehicle {self._vehicle_id}"
        return DeviceInfo(
            identifiers={(DOMAIN, str(self._vehicle_id))},
            name=name,
            manufacturer="ABRP",
            model=(vehicle.car_model if vehicle else None) or "Electric Vehicle",
        )


class AbrpMateAccountEntity(CoordinatorEntity[AbrpMateCoordinator]):
    """Base entity for account-level planning settings (not per-vehicle)."""

    _attr_has_entity_name = True

    def __init__(self, coordinator: AbrpMateCoordinator, key: str) -> None:
        super().__init__(coordinator)
        self._key = key
        self._attr_unique_id = f"{coordinator.entry.entry_id}_{key}"

    @property
    def device_info(self) -> DeviceInfo:
        return DeviceInfo(
            identifiers={(DOMAIN, f"{self.coordinator.entry.entry_id}_account")},
            name="ABRP",
            manufacturer="ABRP",
            model="Route planning",
            entry_type=DeviceEntryType.SERVICE,
        )
