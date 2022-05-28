import convertGeocoderResultToAddress from 'lib/helpers/location';
import logger from 'lib/logger';
import { LocationSelectValue } from 'types/models/Location';

export class GeocodeService {
  geocoder: google.maps.Geocoder;

  cacheStore: Record<string, any>;

  constructor() {
    this.geocoder = new google.maps.Geocoder();
    this.cacheStore = {};
  }

  static getCacheKey(lat: number, lng: number) {
    return `${lat}:${lng}`;
  }

  getCachedResult(loc: google.maps.LatLngLiteral) {
    return this.cacheStore[GeocodeService.getCacheKey(loc.lat, loc.lng)];
  }

  cacheResult<T>(key: string, value: T): T {
    this.cacheStore[key] = value;
    return value;
  }

  async geocode(
    location: google.maps.LatLngLiteral,
  ): Promise<LocationSelectValue | undefined | null> {
    const cachedResult = this.getCachedResult(location);
    if (cachedResult) {
      return cachedResult;
    }
    try {
      const geocodeResult = await this.geocoder.geocode({
        location,
      });
      const firstResult = geocodeResult.results[0];
      const result = convertGeocoderResultToAddress(firstResult, location);
      return this.cacheResult(
        GeocodeService.getCacheKey(location.lat, location.lng),
        result,
      );
    } catch (e) {
      logger.warn(e);
      return null;
    }
  }
}
