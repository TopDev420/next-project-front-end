import * as yup from 'yup';
import { Location } from 'types/models/Location';
import { BathroomSchema } from 'lib/forms/bathroom';
import { BedroomSchema } from 'lib/forms/bedroom';
import { LocationSchema } from 'lib/forms/location';
import { Input } from 'types/models/Input';
import { PaginationInput } from 'types/Pagination';
import {
  PROPERTY_STATUS_PUBLIC,
  PROPERTY_STATUS_DRAFT,
} from 'constants/master-types';

export type NewPropertyInput = {
  propertyTypeId: number;
  guests: number;
  rooms: number;
} & Input<Location>;

export const NewPropertySchema = yup
  .object()
  .shape({
    propertyTypeId: yup.number().required().label('Property type'),
    guests: yup.number().required().label('Guests'),
    rooms: yup.number().required().label('Rooms'),
  })
  .concat(LocationSchema);

export const UpdatePropertyBasicsSchema = yup.object().shape({
  bedrooms: yup
    .array()
    .of(BedroomSchema)
    .min(1, 'Please add at least one bed room')
    .max(99)
    .label('Bedrooms'),
  bathrooms: yup.array().of(BathroomSchema).max(99).label('Bathrooms'),
});

const getDescriptionStringYup = (label: string) =>
  yup
    .string()
    .transform((_, val) => (!val ? '' : val))
    .max(10000)
    .label(label);

export const UpdatePropertyDescriptionSchema = yup.object().shape({
  propertyId: yup.number().required(),
  title: yup.string().required().min(1).max(100).label('Title'),
  summary: getDescriptionStringYup('Summary'),
  guestAccess: getDescriptionStringYup('Lodging Description'),
  guestInteraction: getDescriptionStringYup('Guest interaction'),
  notes: getDescriptionStringYup('Other notes'),
  houseRules: getDescriptionStringYup('House rules'),
  neighborOverview: getDescriptionStringYup('Neighborhood overview'),
  neighborGettingAround: getDescriptionStringYup('Neighborhood getting around'),
});

export type UpdatePropertyDescriptionInput = {
  propertyId: number;
  title: string;
  summary: string;
  guestAccess: string;
  guestInteraction: string;
  notes: string;
  houseRules: string;
  neighborOverview: string;
  neighborGettingAround: string;
};

export const UpdatePropertyAmenitiesSchema = yup.object().shape({
  propertyId: yup.number().required(),
  amenitiesIds: yup.array().nullable().of(yup.number()).label('Amenities'),
});

export type UpdatePropertyAmenitiesInput = {
  propertyId: number;
  amenitiesIds: number[];
};

export const UpdatePropertyVideoSchema = yup.object().shape({
  video: yup
    .string()
    .nullable()
    .max(100)
    .test(
      'Video',
      'Should be a valid YouTube URL',
      (value) => !value || /^http(s?):\/\/(www\.)?youtu(\.)?be/.test(value),
    )
    .label('Video'),
});

export type UpdatePropertyVideoInput = {
  propertyId: number;
  video: string;
};

export const UpdatePropertyBpgSchema = yup.object().shape({
  bpg: yup.boolean().required(),
});

export type UpdatePropertyBpgInput = {
  propertyId: number;
  bpg: boolean;
};

export type RoomsCsvInput = {
  propertyId: number;
  file: File;
};

export const RoomsCsvSchema: yup.SchemaOf<RoomsCsvInput> = yup.object().shape({
  propertyId: yup.number().required().label('Property Id'),
  file: yup
    .mixed()
    .test('fileSize', 'File is too large', (value) => value.size < 5000000)
    .test(
      'fileType',
      'Only txt and csv files are allowed',
      (value) => value === 'text/plain',
    )
    .required()
    .label('File') as any,
});

export type UpdateTermsInput = {
  propertyId: number;
  cancellationPolicy?: string | null;
};

export const UpdateTermsSchema: yup.SchemaOf<UpdateTermsInput> = yup
  .object()
  .shape({
    propertyId: yup.number().required(),
    cancellationPolicy: yup.string().nullable().max(9999),
  });

export type GetCouponInput = {
  couponCode: string;
  propertyId: number;
};

export type UpdateStatusInput = {
  propertyId: number;
  status: number;
};

export type MyPageListingInput = PaginationInput<{
  status: typeof PROPERTY_STATUS_DRAFT | typeof PROPERTY_STATUS_PUBLIC;
}>;
