import { Model } from 'types/models/Model';

export type SeasonalPrice = {
  name: string;
  propertyId: number;
  startedAt: string;
  endedAt: string;
  amountNight: number;
  amountWeek: number | null;
  amountMonth: number | null;
  amountWeekend: number | null;
  minimumStay: number | null;
  amountGuestCharge: number | null;
  metadata?: Record<string, any> | null;
} & Model;
