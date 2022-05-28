import { Model } from 'types/models/Model';

export type Charge = {
  propertyId: number;
  multiplierId: number;
  modifierId: number;
  name: string;
  amount: number;
  taxable: boolean;
  optional: boolean;
} & Model;
