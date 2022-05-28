import { Model, ModelData } from 'types/models/Model';

export type LatLng = {
  lat: number;
  lng: number;
};

export type BoundingBox = [LatLng, LatLng];

export type Location = {
  addressLine1: string | null;
  addressLine2: string | null;
  city: string | null;
  state: string | null;
  countryCode: string | null;
  postalCode: string | null;
} & LatLng &
  Model;

export type LocationSelectValue = ModelData<Location> & {
  formattedAddress: string;
};

export const getFormattedAddress = (address: ModelData<Location>) =>
  [address?.addressLine1, address?.city, address?.state, address?.countryCode]
    .filter((item) => !!item)
    .join(' ');
