"""Device tracker platform for ABRP Mate (vehicle location)."""

from __future__ import annotations

from typing import Any

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
    """Set up ABRP Mate location + navigation-destination trackers."""
    coordinator = entry.runtime_data
    entities: list[TrackerEntity] = []
    for vehicle_id in coordinator.data:
        entities.append(AbrpMateDeviceTracker(coordinator, vehicle_id))
        entities.append(AbrpMateDestinationTracker(coordinator, vehicle_id))
    async_add_entities(entities)


class AbrpMateDeviceTracker(AbrpMateEntity, TrackerEntity):
    """Reports the vehicle's GPS position."""

    _attr_translation_key = "location"

    def __init__(self, coordinator: AbrpMateCoordinator, vehicle_id: int) -> None:
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

    @property
    def extra_state_attributes(self) -> dict[str, Any] | None:
        snapshot = self.snapshot
        if snapshot is None:
            return None
        speed = snapshot.speed_kmh
        if speed is None:
            speed = snapshot.gps_speed_kmh
        return {
            "heading": snapshot.heading_deg,
            "speed_kmh": speed,
            "country": snapshot.country3,
            "timezone": snapshot.timezone,
            # Street address, region, and speed limit from ABRP's mapInfo
            # (live while navigating in the app).
            "address": snapshot.location_name,
            "region": snapshot.location_region,
            "speed_limit": snapshot.speed_limit,
        }


class AbrpMateDestinationTracker(AbrpMateEntity, TrackerEntity):
    """The final destination of the active ABRP navigation plan.

    Unknown while no plan is active (``settings.plan_uuid`` is null); while
    navigating it reports the plan's final stop with its coordinates, so it
    zones like any GPS tracker.
    """

    _attr_translation_key = "destination"

    def __init__(self, coordinator: AbrpMateCoordinator, vehicle_id: int) -> None:
        super().__init__(coordinator, vehicle_id)
        self._attr_unique_id = f"{vehicle_id}_destination"

    def _final_stop(self) -> dict[str, Any] | None:
        plan = self.coordinator.active_plan(self._vehicle_id)
        if not plan:
            return None
        destinations = plan.get("destinations")
        if not isinstance(destinations, list) or not destinations:
            return None
        final = destinations[-1]
        return final if isinstance(final, dict) else None

    @property
    def available(self) -> bool:
        # Available whenever the coordinator is; "no active plan" is a valid
        # (unknown) state, not an entity outage.
        return self.coordinator.last_update_success

    @property
    def source_type(self) -> SourceType:
        return SourceType.GPS

    @property
    def latitude(self) -> float | None:
        final = self._final_stop()
        location = final.get("location") if final else None
        value = location.get("lat") if isinstance(location, dict) else None
        return float(value) if isinstance(value, (int, float)) else None

    @property
    def longitude(self) -> float | None:
        final = self._final_stop()
        location = final.get("location") if final else None
        value = location.get("long") if isinstance(location, dict) else None
        return float(value) if isinstance(value, (int, float)) else None

    @property
    def extra_state_attributes(self) -> dict[str, Any] | None:
        plan = self.coordinator.active_plan(self._vehicle_id)
        if not plan:
            return None
        final = self._final_stop() or {}
        distance = plan.get("distance")
        duration = plan.get("duration")
        destinations = plan.get("destinations")
        return {
            # The plan's own "to" label; the final stop's name when set.
            "destination": final.get("name") or plan.get("to"),
            "origin": plan.get("from"),
            "distance_km": round(distance / 1000, 1)
            if isinstance(distance, (int, float))
            else None,
            "duration_min": round(duration / 60)
            if isinstance(duration, (int, float))
            else None,
            "waypoints": len(destinations) if isinstance(destinations, list) else None,
            "plan_uuid": plan.get("plan_uuid"),
        }
