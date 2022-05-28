import { Model } from 'types/models/Model';

export type Block = {
  name: string;
  startedAt: string;
  endedAt: string;
  propertyId: number;
  metadata?: Record<string, any> | null;
} & Model;
