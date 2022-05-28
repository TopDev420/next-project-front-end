import { MasterType } from 'types/models/MasterType';

export type Amenity = MasterType & {
  amenityCategoryId: number;
};
