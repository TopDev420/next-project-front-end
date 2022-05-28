import { EventPropGetter } from 'react-big-calendar';
import { CalendarEvent } from 'types/models/Calendar';
import theme from 'constants/theme';
import {
  RESERVATION_STATUS_ACCEPTED,
  RESERVATION_STATUS_CANCELLED_BY_GUEST,
  RESERVATION_STATUS_CANCELLED_BY_HOST,
  RESERVATION_STATUS_DECLINED,
  RESERVATION_STATUS_PENDING,
} from 'constants/master-types';

export const eventPropGetter: EventPropGetter<CalendarEvent> = (event) => {
  let backgroundColor: string = theme.colors?.blue[600]!;
  if (event.metadata?.type === 'Reservation') {
    switch (event?.metadata?.status) {
      case RESERVATION_STATUS_ACCEPTED:
        backgroundColor = theme.colors?.indigo[600]!;
        break;
      case RESERVATION_STATUS_CANCELLED_BY_GUEST:
      case RESERVATION_STATUS_CANCELLED_BY_HOST:
      case RESERVATION_STATUS_DECLINED:
        backgroundColor = theme.colors?.gray[400]!;
        break;
      case RESERVATION_STATUS_PENDING:
      default:
        backgroundColor = theme.colors?.green[600]!;
    }
  }

  if (event.metadata?.type === 'Block') {
    backgroundColor = theme.colors?.black!;
  }

  if (event.metadata?.type === 'SeasonalPrice') {
    backgroundColor = theme.colors?.red[400]!;
  }

  return {
    style: {
      backgroundColor,
      color: theme.colors?.white,
    },
  };
};
