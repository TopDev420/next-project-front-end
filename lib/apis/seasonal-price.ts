import dayjs from 'dayjs';
import { SeasonalPriceInput } from 'lib/forms/seasonal-price';
import { del, get, post, put } from 'lib/helpers/api';
import _ from 'lodash';
import { SeasonalPrice } from 'types/models/SeasonalPrice';

const normalizeInput = (input: SeasonalPriceInput): SeasonalPriceInput => ({
  ..._.omit(input, 'id'),
  name:
    input.name ||
    `[Seasonal Price] ${dayjs(input.startedAt).format('MM/DD/YYYY')} - ${dayjs(
      input.endedAt,
    ).format('MM/DD/YYYY')}`,
  startedAt: dayjs(input.startedAt).startOf('date').toDate(),
  endedAt: dayjs(input.endedAt).endOf('date').toDate(),
});

export const showSeasonalPrice = (id: number) =>
  get<SeasonalPrice>(`seasonal-price/${id}`);

export const saveSeasonalPrice = (input: SeasonalPriceInput) => {
  if (input.id) {
    return put<SeasonalPrice>(
      `seasonal-price/${input.id}`,
      normalizeInput(input),
    );
  }

  return post<SeasonalPrice>('seasonal-price', normalizeInput(input));
};

export const deleteSeasonalPrice = async (id: number) => {
  await del(`seasonal-price/${id}`);
  return id;
};
