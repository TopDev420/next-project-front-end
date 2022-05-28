import { Model } from 'types/models/Model';

export type Bathroom = {
  name: string;
  bathroomFeaturesIds: number[] | null;
  bathroomTypeId: number;
  propertyId: number;
} & Model;
