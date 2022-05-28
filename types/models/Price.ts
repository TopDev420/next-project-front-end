import { Model } from 'types/models/Model';

export type Price = {
  propertyId: number;
  priceTypeId: number;
  weekendDayId: number;
  amountNight: number;
  amountMonth: number | null;
  amountWeek: number | null;
  amountWeekend: number | null;
  minimumStay: number | null;
  taxRate: number | null;
} & Model;
