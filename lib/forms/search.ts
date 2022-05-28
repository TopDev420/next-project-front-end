import { LatLng } from 'types/models/Location';

export type HomePageSearchInput = {
  formattedAddress?: string;
  guests?: number;
  checkIn?: Date;
  checkOut?: Date;
  bedsCount?: number;
  bedroomsCount?: number;
  bathroomsCount?: number;
  propertyTypesIds?: number[];
  amenitiesIds?: number[];
  boundingBox?: [LatLng, LatLng];
};

export type HomePageSearchQuery = {
  address?: string; // address
  lat?: number;
  lng?: number;
  guests?: number; // guests
  checkIn?: string; // checkIn
  checkOut?: string; // checkOut
  bedsCount?: number;
  bedroomsCount?: number;
  bathroomsCount?: number;
  propertyTypesIds?: number[];
  amenitiesIds?: number[];
  boundingBox?: [LatLng, LatLng];
};
