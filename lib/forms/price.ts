import * as yup from 'yup';
import PriceTypes from 'static/price-type.json';
import WeekendDays from 'static/weekend-day.json';

export const PriceSchema = yup.object().shape({
  propertyId: yup.number().required(),
  priceTypeId: yup
    .number()
    .required()
    .oneOf(PriceTypes.map(({ id }) => id))
    .label('Price type'),
  weekendDayId: yup
    .number()
    .required()
    .oneOf(WeekendDays.map(({ id }) => id))
    .label('Weekend days'),
  amountNight: yup
    .number()
    .transform((_, val) => (val || val === 0 ? parseInt(val, 10) : 0))
    .required()
    .min(1)
    .max(99999)
    .label('Nightly price'),
  amountWeek: yup
    .number()
    .nullable()
    .transform((_, val) => (val || val === 0 ? parseInt(val, 10) : null))
    .min(0)
    .max(99999)
    .label('Weekly price'),
  amountWeekend: yup
    .number()
    .nullable()
    .transform((_, val) => (val || val === 0 ? parseInt(val, 10) : null))
    .min(0)
    .max(99999)
    .label('Weekend price'),
  amountMonth: yup
    .number()
    .nullable()
    .transform((_, val) => (val || val === 0 ? parseInt(val, 10) : null))
    .min(0)
    .max(99999)
    .label('Monthly price'),
  minimumStay: yup
    .number()
    .nullable()
    .transform((_, val) => (val || val === 0 ? parseInt(val, 10) : null))
    .min(0)
    .max(999)
    .label('Minimum stay'),
  taxRate: yup
    .mixed()
    .transform((_, val) =>
      val || val === 0 ? parseFloat(parseFloat(val).toFixed(2)) : null,
    )
    .test(
      'taxRate',
      'Invalid tax rate',
      (val) => !Number.isNaN(val) && val >= 0 && val <= 100,
    )
    .label('Tax rate'),
});

export type PriceInput = {
  propertyId: number;
  priceTypeId: number;
  weekendDayId: number;
  amountNight: number;
  amountWeek: number | null;
  amountWeekend: number | null;
  amountMonth: number | null;
  minimumStay: number | null;
  taxRate: number | null;
};
