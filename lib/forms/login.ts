import * as yup from 'yup';

export type LoginInput = {
  email: string;
  password: string;
  remember: boolean;
};

export const LoginSchema = yup.object().shape({
  email: yup.string().required().email().label('Email'),
  password: yup.string().required().min(1).label('Password'),
  remember: yup.bool().label('Remember'),
});

export type FbLoginInput = {
  accessToken: string;
};
