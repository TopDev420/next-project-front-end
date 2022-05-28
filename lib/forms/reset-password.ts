import * as yup from 'yup';

export type ResetPasswordInput = {
  token: string;
  email: string;
  password: string;
  passwordConfirmation: string;
};

export const ResetPasswordSchema = yup.object().shape({
  token: yup.string().required().label('Token'),
  email: yup.string().required().email().label('Email'),
  password: yup.string().required().min(1).label('Password'),
  passwordConfirmation: yup
    .string()
    .oneOf([yup.ref('password'), null], 'Password does not match'),
});
