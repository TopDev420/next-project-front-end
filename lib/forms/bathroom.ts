import * as yup from 'yup';
import BathroomTypes from 'static/bathroom-type.json';
import BathroomFeatures from 'static/bathroom-feature.json';

export const BathroomSchema = yup.object().shape({
  id: yup
    .number()
    .nullable(true)
    .transform((_, val) => (val || val === 0 ? val : null))
    .label('Bathroom ID'),
  name: yup.string().required().min(1).max(100).label('Name'),
  bathroomTypeId: yup
    .number()
    .required()
    .oneOf(
      BathroomTypes.map(({ id }) => id),
      'Bathroom type is invalid',
    )
    .label('Bathroom type'),
  bathroomFeaturesIds: yup
    .array()
    .of(yup.number().oneOf(BathroomFeatures.map(({ id }) => id)))
    .label('Bathroom features'),
});

export type BathroomInput = {
  id?: number;
  name: string;
  propertyId: number;
  bathroomTypeId: number;
  bathroomFeaturesIds: number[];
};
