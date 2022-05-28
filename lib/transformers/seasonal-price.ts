import dayjs from 'dayjs';
import { SeasonalPriceInput } from 'lib/forms/seasonal-price';
import { SeasonalPrice } from 'types/models/SeasonalPrice';

export const convertToEventInput = (
  seasonalPrice: SeasonalPrice,
): SeasonalPriceInput => ({
  id: seasonalPrice.id,
  propertyId: seasonalPrice.propertyId,
  name: seasonalPrice.name,
  startedAt: dayjs(seasonalPrice.startedAt).toDate(),
  endedAt: dayjs(seasonalPrice.endedAt).toDate(),
  amountNight: seasonalPrice.amountNight,
  amountWeek: seasonalPrice.amountWeek,
  amountMonth: seasonalPrice.amountMonth,
  amountWeekend: seasonalPrice.amountWeekend,
  amountGuestCharge: seasonalPrice.amountGuestCharge,
});
