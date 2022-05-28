import { Model } from 'types/models/Model';

export type Discount = {
  propertyId: number;
  discountTypeId: number;
  modifierId: number;
  name: string;
  period: number;
  amount: number;
} & Model;
