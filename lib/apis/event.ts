import { EventModelType } from 'components/pages/my-page/property/Availibility/EventModal/type';
import { saveBlock, showBlock } from 'lib/apis/block';
import { saveReservation, showReservation } from 'lib/apis/reservation';
import { saveSeasonalPrice, showSeasonalPrice } from 'lib/apis/seasonal-price';
import { BlockInput } from 'lib/forms/block';
import { ReservationInput } from 'lib/forms/reservation';
import { SeasonalPriceInput } from 'lib/forms/seasonal-price';
import _ from 'lodash';
import { CalendarEvent } from 'types/models/Calendar';

type EventInput<T extends EventModelType = EventModelType> =
  T extends 'SeasonalPrice'
    ? SeasonalPriceInput
    : T extends 'Block'
    ? BlockInput
    : ReservationInput;

export const getEventInputModelType = (input?: EventInput): EventModelType => {
  if (!!(input as SeasonalPriceInput)?.amountNight) {
    return 'SeasonalPrice';
  }
  if (!!(input as BlockInput)?.startedAt) {
    return 'Block';
  }

  return 'Reservation';
};

const getDateRangeFromEvent = (input?: EventInput) => {
  const modelType = getEventInputModelType(input);
  if (modelType === 'Reservation') {
    return {
      startedAt: (input as ReservationInput).checkedInAt,
      endedAt: (input as ReservationInput).checkedOutAt,
    };
  }

  return {
    startedAt: (input as BlockInput).startedAt,
    endedAt: (input as BlockInput).endedAt,
  };
};

export const ensureEventInputModelType = <
  T extends EventModelType = EventModelType,
>(
  input: EventInput,
  modelType: T,
  roomsIds?: number[],
): EventInput<T> => {
  const currentModelType = getEventInputModelType(input);

  if (modelType === currentModelType) {
    return input as EventInput<T>;
  }

  const { startedAt, endedAt } = getDateRangeFromEvent(input);

  const newInput = { ...input, startedAt, endedAt };

  if (modelType === 'Reservation') {
    return {
      ..._.pick(newInput, [
        'id',
        'propertyId',
        'userId',
        'checkedInAt',
        'checkedOutAt',
        'guests',
        'note',
        'firstName',
        'lastName',
        'email',
        'phone',
        'address',
        'roomsIds',
      ]),
      checkedInAt: startedAt,
      checkedOutAt: endedAt,
      guests: (newInput as any).guests || 1,
      roomsIds,
    } as EventInput<T>;
  }
  if (modelType === 'Block') {
    return _.pick(newInput, [
      'id',
      'propertyId',
      'name',
      'startedAt',
      'endedAt',
    ]) as EventInput<T>;
  }

  return _.pick(newInput, [
    'id',
    'propertyId',
    'name',
    'startedAt',
    'endedAt',
    'amountNight',
    'amountWeek',
    'amountMonth',
    'amountWeekend',
    'minimumStay',
    'amonutGuestCharge',
  ]) as EventInput<T>;
};

export const saveEvent = (input: EventInput, modelType?: EventModelType) => {
  // eslint-disable-next-line no-param-reassign
  modelType = modelType || getEventInputModelType(input);
  switch (modelType) {
    case 'Reservation':
      return saveReservation(input as ReservationInput);
    case 'SeasonalPrice':
      return saveSeasonalPrice(input as SeasonalPriceInput);
    case 'Block':
      return saveBlock(input as BlockInput);
    default:
      return saveReservation(input as ReservationInput);
  }
};

export const getEventModel = (event: CalendarEvent) => {
  if (!event.metadata) {
    throw new Error('Cannot get model for event. Metadata is missing');
  }
  if (!event.metadata.id) {
    throw new Error('Cannot get model for event. ID is missing');
  }

  if (event.metadata.type === 'Block') {
    return showBlock(event.metadata.id);
  }
  if (event.metadata.type === 'SeasonalPrice') {
    return showSeasonalPrice(event.metadata.id);
  }

  return showReservation(event.metadata.id);
};
