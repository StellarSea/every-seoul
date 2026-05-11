import type { NearbyFacility } from '../types/app';

export function getFacilityMapUrl(facility: NearbyFacility) {
  if (facility.latitude !== undefined && facility.longitude !== undefined) {
    return `https://www.openstreetmap.org/?mlat=${facility.latitude}&mlon=${facility.longitude}#map=17/${facility.latitude}/${facility.longitude}&layers=N&marker=${facility.latitude},${facility.longitude}`;
  }

  return `https://map.naver.com/p/search/${encodeURIComponent(
    `${facility.address} ${facility.name}`
  )}`;
}

export function getFacilityMapPosition(facility: NearbyFacility) {
  if (facility.latitude === undefined || facility.longitude === undefined) {
    return null;
  }

  const x = clamp(((facility.longitude - 126.75) / 0.65) * 100);
  const y = clamp(((37.75 - facility.latitude) / 0.45) * 100);
  return { x, y };
}

function clamp(value: number) {
  return Math.max(8, Math.min(92, value));
}
