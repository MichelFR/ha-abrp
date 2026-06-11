"""Image platform for ABRP Mate: the vehicle's rendered car image.

ABRP serves car renders from a public endpoint keyed by the vehicle's
typecode (``car_model``) and paint:
``/2/vehicle-model/by-typecode/{typecode}/image/{scene}`` which redirects to
the actual media CDN. No authentication is required.
"""

from __future__ import annotations

from urllib.parse import quote, urlencode

from homeassistant.components.image import ImageEntity
from homeassistant.core import HomeAssistant, callback
from homeassistant.helpers.entity_platform import AddEntitiesCallback
from homeassistant.util import dt as dt_util

from . import AbrpMateConfigEntry
from .coordinator import AbrpMateCoordinator
from .entity import AbrpMateEntity

_IMAGE_URL_BASE = "https://api.iternio.com/2/vehicle-model/by-typecode"
# The angled "hero" render that ABRP's own vehicle card uses.
_IMAGE_SCENE = "HERO_LEFT"


async def async_setup_entry(
    hass: HomeAssistant,
    entry: AbrpMateConfigEntry,
    async_add_entities: AddEntitiesCallback,
) -> None:
    """Set up a car image for every vehicle with a known model."""
    coordinator = entry.runtime_data
    async_add_entities(
        AbrpMateCarImage(hass, coordinator, vehicle_id)
        for vehicle_id in coordinator.data
    )


class AbrpMateCarImage(AbrpMateEntity, ImageEntity):
    """The ABRP render of the vehicle (model + paint)."""

    _attr_translation_key = "car_image"
    _attr_content_type = "image/webp"

    def __init__(
        self, hass: HomeAssistant, coordinator: AbrpMateCoordinator, vehicle_id: int
    ) -> None:
        AbrpMateEntity.__init__(self, coordinator, vehicle_id)
        ImageEntity.__init__(self, hass)
        self._attr_unique_id = f"{vehicle_id}_car_image"
        self._attr_image_url = self._build_url()
        if self._attr_image_url is not None:
            self._attr_image_last_updated = dt_util.utcnow()

    def _build_url(self) -> str | None:
        vehicle = self.vehicle
        if vehicle is None or not vehicle.car_model:
            return None
        # ABRP shows US plates for the northamerica region, EU otherwise.
        region = self.coordinator.settings.get("region")
        params = urlencode(
            {
                "paint": vehicle.paint or "WHITE",
                "licensePlate": "US" if region == "northamerica" else "EU",
            }
        )
        typecode = quote(vehicle.car_model, safe="")
        return f"{_IMAGE_URL_BASE}/{typecode}/image/{_IMAGE_SCENE}?{params}"

    @callback
    def _handle_coordinator_update(self) -> None:
        # Refetch only when the render would change (model/paint/region edit).
        url = self._build_url()
        if url != self._attr_image_url:
            self._attr_image_url = url
            self._cached_image = None
            self._attr_image_last_updated = dt_util.utcnow()
        super()._handle_coordinator_update()
