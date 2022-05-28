import * as yup from 'yup';
import DiscountTypes from 'static/discount-type.json';
import Modifiers from 'static/modifier.json';

export const DiscountSchema = yup.object().shape({
  id: yup
    .number()
    .nullable()
    .transform((_, val) => (val || val === 0 ? val : null))
    .label('Discount ID'),
  propertyId: yup.number().required(),
  discountTypeId: yup
    .number()
    .required()
    .oneOf(DiscountTypes.map(({ id }) => id))
    .label('Discount type is invalid'),
  modifierId: yup
    .number()
    .required()
    .oneOf(Modifiers.map(({ id }) => id))
    .label('Type'),
  name: yup.string().required().max(100),
  period: yup.number().required().min(1).max(300),
  amount: yup.number().required().min(0).max(9999),
});

export type DiscountInput = {
  id?: number;
  propertyId: number;
  discountTypeId: number;
  modifierId: number;
  name: string;
  period: number;
  amount: number;
};
