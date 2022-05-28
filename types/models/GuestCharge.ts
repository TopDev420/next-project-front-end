import { Model } from 'types/models/Model';

export type GuestCharge = {
  propertyId: number;
  guestBase: number;
  guestMax: number;
  amount: number;
} & Model;
