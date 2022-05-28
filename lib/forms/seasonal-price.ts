import * as yup from 'yup';

export type SeasonalPriceInput = {
  id?: number | null;
  propertyId: number;
  name?: string | null;
  startedAt: Date;
  endedAt: Date;
  amountNight: number;
  amountWeek?: number | null;
  amountMonth?: number | null;
  amountWeekend?: number | null;
  minimumStay?: number | null;
  amountGuestCharge?: number | null;
};

export const SeasonalPriceSchema: yup.SchemaOf<SeasonalPriceInput> = yup
  .object()
  .shape({
    id: yup.number().nullable(),
    propertyId: yup.number().required().label('Property Id'),
    name: yup.string().nullable().max(99),
    startedAt: yup.date().required().label('Start Date'),
    endedAt: yup.date().required().min(yup.ref('startedAt')).label('End Date'),
    amountNight: yup
      .number()
      .required()
      .min(1)
      .max(99999)
      .label('Nightly Price'),
    amountWeek: yup
      .number()
      .nullable()
      .transform((_, val) => (val || val === 0 ? Number(val) : null))
      .min(1)
      .max(99999)
      .label('Week Price'),
    amountMonth: yup
      .number()
      .nullable()
      .transform((_, val) => (val || val === 0 ? Number(val) : null))
      .min(1)
      .max(99999)
      .label('Month Price'),
    amountGuestCharge: yup
      .number()
      .nullable()
      .transform((_, val) => (val || val === 0 ? Number(val) : null))
      .min(1)
      .max(99999)
      .label('Additional Guest Charge'),
    amountWeekend: yup
      .number()
      .nullable()
      .transform((_, val) => (val || val === 0 ? Number(val) : null))
      .min(1)
      .max(99999)
      .label('Weekend Price'),
    minimumStay: yup
      .number()
      .nullable()
      .transform((_, val) => (val || val === 0 ? Number(val) : null))
      .min(1)
      .max(999)
      .label('Weekly Price'),
  });
