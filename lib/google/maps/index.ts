import convertGeocoderResultToAddress from 'lib/helpers/location';
import logger from 'lib/logger';
import {
  BoundingBox,
  LatLng,
  LocationSelectValue,
} from 'types/models/Location';

export const geocode = (location: LatLng) =>
  new Promise<LocationSelectValue | null>((resolve) => {
    const geocoder = new google.maps.Geocoder();
    geocoder
      .geocode({ location })
      .then((value) => {
        if (!value?.results?.length) {
          logger.warn('Geocode result is empty');
          resolve(null);
          return;
        }

        const result = value.results[0];
        resolve(convertGeocoderResultToAddress(result, location));
      })
      .catch((e) => {
        logger.warn(e);
        resolve(null);
      });
  });
export const toRad = (value: number) => (value * Math.PI) / 180;

export const getDistance = (loc1: LatLng, loc2: LatLng) => {
  // eslint-disable-next-line prefer-const
  let { lat: lat1, lng: lon1 } = loc1;
  // eslint-disable-next-line prefer-const
  let { lat: lat2, lng: lon2 } = loc2;
  const R = 6371; // km
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  lat1 = toRad(lat1);
  lat2 = toRad(lat2);

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(lat1) * Math.cos(lat2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const d = R * c;
  return d;
};

export const getClosestLocation = (center: LatLng, locations: LatLng[]) => {
  let nearestIndex = 0;
  if (locations.length < 1) {
    return null;
  }
  let nearestDistance = getDistance(center, locations[0]);
  locations.forEach(({ lat, lng }, index) => {
    const dist = getDistance(center, { lat, lng });
    if (dist < nearestDistance) {
      nearestIndex = index;
      nearestDistance = dist;
    }
  });
  return locations[nearestIndex];
};

export const getFarthestLocation = (center: LatLng, locations: LatLng[]) => {
  let farthestIndex = 0;
  if (locations.length < 1) {
    return null;
  }
  let farthestDistance = getDistance(center, locations[0]);
  locations.forEach(({ lat, lng }, index) => {
    const dist = getDistance(center, { lat, lng });
    if (dist >= farthestDistance) {
      farthestIndex = index;
      farthestDistance = dist;
    }
  });
  return locations[farthestIndex];
};

export const getBoundsByCenterAndRadius = (center: LatLng, radius: number) => {
  if (!window.google) {
    return null;
  }
  // eslint-disable-next-line no-param-reassign
  const latLngCenter = new window.google.maps.LatLng(center.lat, center.lng);
  const circle = new window.google.maps.Circle({
    radius,
    center: latLngCenter,
  });
  return circle.getBounds();
};

export const getMapBounds = (args: {
  currentPosition?: LatLng;
  locations?: LatLng[] | null;
}) => {
  if (typeof window === 'undefined') {
    return null;
  }
  const { currentPosition, locations } = args;

  const currentLocation = currentPosition || locations[0];

  const bounds = new window.google.maps.LatLngBounds();
  if (currentLocation) {
    bounds.extend(currentLocation);
  }

  locations.forEach((location) => {
    bounds.extend(location);
  });
  return bounds;
};

export const latLngEqualCanonically = (loc1: LatLng, loc2: LatLng) => {
  const { lat: lat1, lng: lng1 } = loc1;
  const { lat: lat2, lng: lng2 } = loc2;
  return Math.abs(lat1 - lat2) < 0.00001 && Math.abs(lng1 - lng2) < 0.00001;
};

export const boundsEqualCanonically = (
  bounds1: BoundingBox,
  bounds2: BoundingBox,
) => {
  const truthy1 = !!bounds1;
  const truthy2 = !!bounds2;
  if (truthy1 !== truthy2) {
    return false;
  }
  const arrayish1 = Array.isArray(bounds1);
  const arrayish2 = Array.isArray(bounds2);
  if (!arrayish1 && !arrayish2) {
    return bounds1 === bounds2;
  }
  if (arrayish1 !== arrayish2) {
    return false;
  }
  const [ne1, sw1] = bounds1;
  const [ne2, sw2] = bounds2;
  if (latLngEqualCanonically(ne1, ne2) && latLngEqualCanonically(sw1, sw2)) {
    return true;
  }
  return false;
};

export const convertLatLngBoundsToBoundingBox = (
  bound: google.maps.LatLngBounds,
): BoundingBox => {
  const ne = bound.getNorthEast();
  const sw = bound.getSouthWest();
  return [
    { lat: ne.lat(), lng: ne.lng() },
    { lat: sw.lat(), lng: sw.lng() },
  ];
};

export const convertBoundingBoxToLatLngBounds = (bound: BoundingBox) => {
  const [ne, sw] = bound;
  return new google.maps.LatLngBounds(
    new google.maps.LatLng(sw.lat, sw.lng),
    new google.maps.LatLng(ne.lat, ne.lng),
  );
};

export const getCenterFromBoundingBox = (bound: BoundingBox): LatLng => {
  const [ne, sw] = bound;
  const { lat: neLat, lng: neLng } = ne;
  const { lat: swLat, lng: swLng } = sw;
  const midLat = (neLat + swLat) / 2;
  const midLng = (neLng + swLng) / 2;
  return { lat: midLat, lng: midLng };
};

export const ensureBoundingBoxMinDistance = (
  bound: BoundingBox,
  distance = 40000,
) => {
  const center = getCenterFromBoundingBox(bound);
  const minBound = convertLatLngBoundsToBoundingBox(
    getBoundsByCenterAndRadius(center, distance),
  );
  const gbound = convertBoundingBoxToLatLngBounds(bound);
  gbound.union(convertBoundingBoxToLatLngBounds(minBound));
  return convertLatLngBoundsToBoundingBox(gbound);
};
