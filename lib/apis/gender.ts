import { get } from 'lib/helpers/api';
import { MasterType } from 'types/models/MasterType';

export const getGenders = (): Promise<MasterType[]> => get('gender');
