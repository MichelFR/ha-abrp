/* Auto-discovery of abrp integration entities via the entity registry. */

import { PLATFORM } from "./const.js";

export const KNOWN_KEYS = {
  sensor: [
    "soc",
    "range",
    "reference_consumption",
    "battery_capacity",
    "odometer",
    "speed_factor",
    "max_speed",
    "charging_power",
    "elevation",
    "last_update",
    "data_source",
    "source_last_refresh",
    "obd_last_refresh",
  ],
  number: ["arrival_soc", "min_charger_stalls", "extra_weight"],
  select: ["charge_stops", "drive_profile"],
  switch: [
    "avoid_tolls",
    "avoid_motorways",
    "avoid_ferries",
    "avoid_borders",
    "realtime_traffic",
    "realtime_weather",
    "adjust_speed",
  ],
  binary_sensor: ["charging"],
  image: ["car_image"],
  device_tracker: ["location"],
};

export function abrpEntities(hass) {
  return Object.values(hass.entities || {}).filter(
    (e) => e.platform === PLATFORM
  );
}

export function keyOf(ent) {
  if (ent.translation_key) return ent.translation_key;
  const obj = ent.entity_id.split(".")[1];
  const idx = obj.lastIndexOf("_");
  return idx >= 0 ? obj.slice(idx + 1) : obj;
}

export function vehicleDevices(hass) {
  const byDevice = new Map();
  for (const ent of abrpEntities(hass)) {
    if (!ent.device_id) continue;
    if (!byDevice.has(ent.device_id)) byDevice.set(ent.device_id, []);
    byDevice.get(ent.device_id).push(ent);
  }
  // A vehicle device has the SoC sensor; the account device (planning
  // settings) does not.
  const vehicles = [];
  for (const [deviceId, ents] of byDevice) {
    if (ents.some((e) => keyOf(e) === "soc")) {
      vehicles.push({ deviceId, device: hass.devices?.[deviceId], ents });
    }
  }
  return vehicles;
}

export function accountEntities(hass) {
  const vehicles = new Set(vehicleDevices(hass).map((v) => v.deviceId));
  return abrpEntities(hass).filter((e) => !vehicles.has(e.device_id));
}

export function entityMap(hass, ents) {
  const map = {};
  for (const ent of ents) {
    const [domain, obj] = ent.entity_id.split(".");
    if (ent.translation_key) {
      map[`${domain}.${ent.translation_key}`] = ent.entity_id;
    }
    // Suffix fallback for registries without translation keys.
    for (const k of KNOWN_KEYS[domain] || []) {
      if (!map[`${domain}.${k}`] && obj.endsWith(`_${k}`)) {
        map[`${domain}.${k}`] = ent.entity_id;
      }
    }
  }
  return map;
}
