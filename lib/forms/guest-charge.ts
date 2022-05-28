import * as yup from 'yup';

export const GuestChargeSchema = yup.object().shape({
  propertyId: yup.number().required(),
  guestBase: yup
    .number()
    .required()
    .min(1)
    .max(100)
    .label('Number of base occupants'),
  guestMax: yup
    .number()
    .required()
    .min(1)
    .max(100)
    .min(yup.ref('guestBase'))
    .label('Number of max occupants'),
  amount: yup.number().required().min(0).max(9999).label('Charge'),
});

export type GuestChargeInput = {
  propertyId: number;
  guestBase: number;
  guestMax: number;
  amount: number;
};
