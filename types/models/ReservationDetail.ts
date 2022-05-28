import { Model } from 'types/models/Model';

export type ReservationDetail = {
  flexible: boolean;
  reservationId: number;
  subtotal: number;
  tax: number;
  total: number;
  totalIncTax: number;
} & Model;
