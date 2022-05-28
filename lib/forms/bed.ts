import * as yup from 'yup';
import Beds from 'static/bed.json';

export const BedSchema = yup.object().shape({
  id: yup
    .number()
    .required()
    .oneOf(Beds.map(({ id }) => id)),
  count: yup.number().required().min(1).max(10),
});

export type BedInput = {
  id: number;
  count: number;
};
