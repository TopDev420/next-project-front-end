import { Calendar } from 'types/models/Calendar';
import { Image } from 'types/models/Image';
import { Model } from 'types/models/Model';
import { Price } from 'types/models/Price';
import { Property } from 'types/models/Property';

export type PropertySearchResource = {
  title: string;
  slug: string;
  location: {
    addressLine1: string | null;
    city: string | null;
    state: string | null;
    countryCode: string | null;
    lat: number | null;
    lng: number | null;
  };
  price: number | null;
  priceTypeId: number;
  bpg: boolean;
  images: Image[];
  bedroomsCount: number | null;
  bathroomsCount: number | null;
  roomsCount: number | null;
} & Model;

export type PropertyDetailResource = Property & {
  calendar: Calendar;
  host: {
    fullName: string;
    address: string;
    imageUrl: string | null;
    profile: string | null;
  };
  similar: SimilarProperty[];
} & Model;

export type SimilarProperty = {
  id: number;
  title: string;
  slug: string;
  price: Price;
  images: Image[];
};

export type MyPagePropertyResource = Omit<
  Property,
  | 'propertyType'
  | 'location'
  | 'bedrooms'
  | 'bathrooms'
  | 'charges'
  | 'discounts'
  | 'price'
  | 'guestCharge'
>;

export type HomePagePropertyResource = {
  id: number;
  location: {
    city: string;
    state: string;
    countryCode: string;
  };
  title: string;
  imageUrl: string;
  slug: string;
};
