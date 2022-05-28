import { get } from 'lib/helpers/api';
import { MasterType } from 'types/models/MasterType';

export const getPropertyTypeList = (): Promise<MasterType[]> =>
  get('property-type');
