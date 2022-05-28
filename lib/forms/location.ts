import * as yup from 'yup';

export const LocationSchema = yup.object().shape({
  addressLine1: yup.string().nullable().label('Address Line 1'),
  addressLine2: yup.string().nullable().label('Address Line 2'),
  city: yup.string().nullable().label('City'),
  state: yup.string().nullable().label('State'),
  countryCode: yup.string().nullable().label('Country code'),
  postalCode: yup.string().nullable().label('postalCode'),
  lat: yup.number().required().label('Latitude'),
  lng: yup.number().required().label('Longitude'),
});

export type LocationInput = {
  propertyId: number;
  addressLine1: string;
  addressLine2: string;
  city: string;
  state: string;
  countryCode: string;
  postalCode: string;
  lat: number;
  lng: number;
};
