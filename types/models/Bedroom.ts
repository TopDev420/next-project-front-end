import { Model } from 'types/models/Model';

export type Bedroom = {
  name: string;
  bedsCount: number;
  bedsMap: Record<number, number>;
  propertyId: number;
} & Model;
