import * as yup from 'yup';

export type ForgotPasswordInput = {
  email: string;
};

export const ForgotPasswordSchema = yup.object().shape({
  email: yup.string().required().email().label('Email'),
});
