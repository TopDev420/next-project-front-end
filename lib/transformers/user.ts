import { User } from 'types/models/User';
import { Image } from 'types/models/Image';
import { UpdateProfileInput } from 'lib/forms/user';
import dayjs from 'dayjs';

export const convertToProfileModel = (
  user: User,
  image?: Image,
): UpdateProfileInput => ({
  id: user?.id,
  firstName: user?.firstName || '',
  lastName: user?.lastName || '',
  email: user?.email || '',
  password: '',
  passwordConfirmation: '',
  genderId: user?.genderId || 1,
  phone: user?.phone || '',
  dob: user?.dob ? dayjs(user.dob).toDate() : new Date('2000-01-01'),
  address: user?.address || '',
  profile: user?.profile || '',
  school: user?.school || '',
  job: user?.job || '',
  website: user?.website || '',
  image: image ? { id: image.id } : undefined,
});
