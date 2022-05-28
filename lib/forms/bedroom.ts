import * as yup from 'yup';
import { BedInput, BedSchema } from 'lib/forms/bed';

export const BedroomSchema = yup.object().shape({
  id: yup
    .number()
    .nullable()
    .transform((_, val) => (val || val === 0 ? val : null))
    .label('Bedroom ID'),
  name: yup.string().required().min(1).max(100).label('Name'),
  beds: yup
    .array()
    .required()
    .of(BedSchema)
    .min(1, 'Please add at least one bed')
    .max(99)
    .label('Beds')
    .test(
      'beds',
      'Please add at least one bed',
      (value) =>
        !!value &&
        value.reduce((prev, current) => prev + (current.count || 0), 0) > 0,
    ),
  propertyId: yup.number().required(),
});

export type BedroomInput = {
  id?: number;
  name: string;
  beds: BedInput[];
  propertyId: number;
};
