import Config from 'config';
import { get } from 'lib/helpers/api';

export const csrfCookie = async () => {
  await get('', undefined, {
    baseURL: Config.SANCTUM_URL,
  });
  return true;
};
