import _ from 'lodash';
import dayjs from 'dayjs';
import { GetServerSidePropsContext } from 'next';
import Config from 'config';
import { ForgotPasswordInput } from 'lib/forms/forgot-password';
import { FbLoginInput, LoginInput } from 'lib/forms/login';
import { ResetPasswordInput } from 'lib/forms/reset-password';
import {
  SignUpInput,
  UpdateProfileInput,
  VerifyOtpInput,
} from 'lib/forms/user';
import { get, getServerSidePropsRequestHeader, post } from 'lib/helpers/api';
import logger from 'lib/logger';
import { Image } from 'types/models/Image';
import { User } from 'types/models/User';

export const login = async (model: LoginInput) => {
  try {
    await post('login', model);
  } catch (e: any) {
    if (String(e?.response?.status) === '422') {
      e.message = 'Invalid email or password';
    }
    throw e;
  }
  return true;
};

export const getCurrentUser = (): Promise<User> => get('user');

export const signUp = async (model: SignUpInput) => {
  const params: Record<string, any> = {
    ...model,
    dob: dayjs(model.dob).toISOString(),
  };
  if (params.social) {
    params.accessToken = params.social.accessToken;
    delete params.social;
    const result: User = await post('auth/facebook/signup', params);
    return result;
  }

  await post('register', params);
  return getCurrentUser();
};

export const logout = () => post('logout');

export const fbLogin = async (model: FbLoginInput): Promise<User> =>
  post('auth/facebook/login', model);

export const sendVerification = async (): Promise<boolean> => {
  await post('email/verification-notification');
  return true;
};

export const verifyEmail = async (link: string): Promise<boolean> => {
  if (!link || typeof link !== 'string') {
    throw new Error('Invalid link');
  }
  if (!link.startsWith(Config.API_HOST_URL)) {
    throw new Error('Invalid link');
  }
  try {
    await get(link, undefined, { baseURL: '' });
  } catch (e: any) {
    logger.warn(e);
    throw new Error('Link is invalid or expired');
  }

  return true;
};

export const forgotPassword = async (model: ForgotPasswordInput) => {
  await post('forgot-password', model);
  return true;
};

export const resetPassword = async (model: ResetPasswordInput) => {
  await post('reset-password', model);
  return true;
};

export const showImage = (req?: GetServerSidePropsContext['req']) =>
  get<Image | null>(
    'user/image',
    undefined,
    req ? getServerSidePropsRequestHeader(req) : undefined,
  );

export const updateProfile = (input: UpdateProfileInput) => {
  const formData = new FormData();
  formData.set('_method', 'PUT');
  (
    [
      'firstName',
      'lastName',
      'email',
      'phone',
      'password',
      'passwordConfirmation',
      'genderId',
      'phone',
      'address',
      'profile',
      'school',
      'job',
      'website',
    ] as const
  ).forEach((key) => {
    if (input[key]) {
      formData.append(_.snakeCase(key), String(input[key]));
    }
  });
  if (input.dob) {
    formData.append('dob', dayjs(input.dob).toISOString());
  }
  if (input.image) {
    if (input.image.id) {
      formData.append('image[id]', String(input.image.id));
    }
    if (input.image.file) {
      formData.append('image[file]', input.image.file);
    }
  }
  return post<User>(`user/${input.id}`, formData, {
    headers: {
      'content-type': 'multipart/form-data',
    },
  });
};

export const sendPhoneOTPRequest = () => get('user/phone/verify');

export const verifyOTP = (input: VerifyOtpInput) =>
  post('user/phone/verify', input);
