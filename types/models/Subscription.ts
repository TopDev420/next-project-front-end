import { Model } from 'types/models/Model';

export type Subscription = {
  userId: number;
  propertyId: number;
  planId: number;
  stripeId: string | null;
  coupon: string | null;
  discountModifierId: number;
  discount: number;
  trialPeriod: number | null;
  defaultPaymentMethod: string;
  status: number;
} & Model;
