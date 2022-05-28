import { Model } from 'types/models/Model';

export type PropertyTerm = {
  propertyId: number;
  cancellationPolicy: string | null;
} & Model;
