import * as yup from 'yup';
import Multipliers from 'static/multiplier.json';
import Modifiers from 'static/modifier.json';

export const ChargeSchema = yup.object().shape({
  id: yup
    .number()
    .nullable()
    .transform((_, val) => (val || val === 0 ? val : null))
    .label('Charge ID'),
  propertyId: yup.number().required(),
  multiplierId: yup
    .number()
    .required()
    .oneOf(Multipliers.map(({ id }) => id))
    .label('Type'),
  modifierId: yup
    .number()
    .required()
    .oneOf(Modifiers.map(({ id }) => id))
    .label('Type'),
  name: yup.string().required().max(100).label('Charge name'),
  amount: yup
    .number()
    .transform((_, val) => (val || val === 0 ? parseInt(val, 10) : 0))
    .required()
    .min(1)
    .max(99999)
    .label('Amount'),
  taxable: yup.bool().required().label('Taxable'),
  optional: yup.bool().required().label('Optional'),
});

export type ChargeInput = {
  id?: number;
  propertyId: number;
  multiplierId: number;
  modifierId: number;
  name: string;
  amount: number;
  taxable: boolean;
  optional: boolean;
};
