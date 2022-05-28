import * as yup from 'yup';
import dayjs from 'dayjs';
import Config from 'config';

export type SocialAuthProvider = {
  provider: 'facebook';
  accessToken: string;
};

export type SignUpInput = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  passwordConfirmation: string;
  genderId: number;
  phone: string;
  dob: Date;
  isAgreed: boolean;
  social?: SocialAuthProvider;
};

const PHONE_REGEX = /^\d{10,16}$/;

export const SignUpSchema = yup.object().shape({
  firstName: yup.string().required().min(1).max(30).label('First name'),
  lastName: yup.string().required().min(1).max(30).label('Last name'),
  email: yup.string().required().email().label('Email'),
  password: yup.string().required().min(1).label('Password'),
  passwordConfirmation: yup
    .string()
    .oneOf([yup.ref('password'), null], 'Password does not match'),
  genderId: yup.number().oneOf([1, 2, 3]).label('Gender'),
  dob: yup
    .date()
    .required()
    .nullable()
    .transform((curr, orig) => (!orig ? null : curr))
    .max(
      dayjs().subtract(Config.USER_MIN_AGE, 'year').toDate(),
      `You must be ${Config.USER_MIN_AGE}+ years old`,
    )
    .label('Date of birth'),
  phone: yup
    .string()
    .nullable()
    .transform((curr: string) => curr.replace(/[^\d]/g, ''))
    .matches(PHONE_REGEX, 'Invalid phone number')
    .label('Phone number'),
  isAgreed: yup
    .bool()
    .required()
    .oneOf([true], 'Please agree to privacy policy and terms of service'),
});

export type UpdateProfileInput = {
  id?: number;
  address?: string;
  profile?: string;
  school?: string;
  job?: string;
  website?: string;
  image?: {
    id?: number;
    file?: File;
  };
} & Omit<SignUpInput, 'isAgreed' | 'social'>;

export const UpdateProfileSchema = SignUpSchema.shape({
  id: yup.number().required(),
  isAgreed: yup.mixed().nullable(),
  password: yup
    .string()
    .transform((_any, val) => val || null)
    .nullable()
    .min(1)
    .label('Password'),
  passwordConfirmation: yup
    .string()
    .nullable()
    .oneOf([yup.ref('password'), null, ''], 'Password does not match'),
  address: yup.string().nullable().max(191).label('Address'),
  profile: yup.string().nullable().max(999).label('Profile'),
  school: yup.string().nullable().max(191).label('School'),
  job: yup.string().nullable().max(191).label('Job'),
  website: yup.string().nullable().max(999).label('Website'),
  image: yup
    .object()
    .transform((_any, val) => val || null)
    .shape({
      id: yup.number().nullable(),
      file: yup
        .mixed()
        .test(
          'fileSize',
          'File is too large',
          (value) => !value || value.size < 5000000,
        )
        .test(
          'fileType',
          'Only jpg and png files are allowed',
          (value) =>
            !value ||
            ['image/jpg', 'image/jpeg', 'image/png'].includes(value.type),
        )
        .nullable()
        .label('Image'),
    })
    .nullable()
    .label('Image'),
});

export type VerifyOtpInput = {
  otp: string;
};

export const VerifyOtpSchema = yup.object().shape({
  otp: yup.string().required(),
});
