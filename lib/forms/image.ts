import * as yup from 'yup';
import _ from 'lodash';

export const PropertyImageSchema = yup.object().shape({
  id: yup.number().nullable(),
  file: yup
    .mixed()
    .test('fileSize', 'File is too large', (value) => value.size < 5000000)
    .test('fileType', 'Only jpg and png files are allowed', (value) =>
      ['image/jpg', 'image/jpeg', 'image/png'].includes(value.type),
    )
    .nullable(),
  alt: yup
    .string()
    .required()
    .test(
      'alt',
      'Please input at least two words',
      (value) => String(value).match(/\w+/g).length > 1,
    )
    .max(999),
});

export const UpdatePropertyImagesSchema = yup.object().shape({
  propertyId: yup.number().required(),
  images: yup.array().required().of(PropertyImageSchema),
});

export type PropertyImageInput = {
  id?: number;
  file?: File;
  alt?: string;
  url: string;
};

export type UpdatePropertyImagesInput = {
  propertyId: number;
  images: PropertyImageInput[];
};
