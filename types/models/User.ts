import { Model } from 'types/models/Model';

export type User = Model & {
  firstName: string;
  lastName: string;
  email: string;
  emailVerifiedAt: string | null;
  dob: string;
  phone: string;
  phoneVerifiedAt: string | null;
  genderId: number;
  job: string | null;
  profile: string | null;
  school: string | null;
  website: string | null;
  address: string | null;
  imageUrl: string | null;
  rkId?: string | null;
};

export type SocialUser = {
  token: string | null;
  refreshToken: string | null;
  expiresIn: string | null;
  id: string | null;
  nickname: string | null;
  name: string | null;
  email: string | null;
  avatar: string | null;
  user: Record<string, any> | null;
};
