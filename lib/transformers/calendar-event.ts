import { Block } from 'types/models/Block';
import { Reservation } from 'types/models/Reservation';
import { SeasonalPrice } from 'types/models/SeasonalPrice';
import { convertToEventInput as convertToReservationInput } from 'lib/transformers/reservation';
import { convertToEventInput as convertToSeasonalPriceInput } from 'lib/transformers/seasonal-price';
import { convertToEventInput as convertToBlockInput } from 'lib/transformers/block';
import { Calendar, CalendarEvent, CalendarSlot } from 'types/models/Calendar';
import dayjs from 'dayjs';
import { getDateRange } from 'lib/helpers/date';

export const convertToEventInput = (
  model: Reservation | Block | SeasonalPrice,
) => {
  if ((model as any).checkedInAt) {
    return convertToReservationInput(model as any);
  }
  if ((model as any).amountNight !== undefined) {
    return convertToSeasonalPriceInput(model as any);
  }

  return convertToBlockInput(model as any);
};

export const normalize = (event: CalendarEvent) => {
  if (event.metadata?.type === 'Reservation') {
    const dateRangeFormat = `${dayjs(event.start).format(
      'MM/DD/YYYY',
    )} ~ ${dayjs(event.end).format('MM/DD/YYYY')}`;

    return {
      ...event,
      start: dayjs(event.start).toDate(),
      end: dayjs(event.end).toDate(),
      title: [event.title, dateRangeFormat].filter((item) => !!item).join(' '),
    };
  }

  return {
    ...event,
    start: dayjs(event.start).toDate(),
    end: dayjs(event.end).toDate(),
  };
};

export const convertCalendarToRanges = (calendar: Calendar) => {
  if (!calendar) {
    return [];
  }
  const { events } = calendar;
  return events.map((event) => {
    let color = '#E5E7EB'; // bg-gray-600
    if (event.metadata?.type === 'Reservation') {
      color = '#FDE68A'; // bg-yellow-600
    }
    return {
      startDate: dayjs(event.start).toDate(),
      endDate: dayjs(event.end).toDate(),
      color,
      key: 'event',
    };
  });
};

export const convertRangesToDates = (
  ranges: { startDate: Date; endDate: Date }[],
) => {
  let dates: Date[] = [];
  if (!ranges) {
    return [];
  }
  ranges.forEach((range) => {
    dates = [...dates, ...getDateRange(range.startDate, range.endDate)];
  });

  return dates;
};

export const getDisabledDates = (slots: CalendarSlot[], guests = 1) =>
  slots
    .filter((slot) => !slot.isAvailable || slot.capacity < guests)
    .map((slot) => dayjs(slot.date).toDate());

export const isReservationEventDate = (
  roomId: number,
  date: Parameters<typeof dayjs>[0],
  event: CalendarEvent,
) => {
  const dateTimestamp = dayjs(date).startOf('date').toDate().getTime();
  const eventStartTimeStamp = dayjs(event.start)
    .startOf('date')
    .toDate()
    .getTime();
  const eventEndTimeStamp = dayjs(event.end).endOf('date').toDate().getTime();
  const isBetween =
    dateTimestamp >= eventStartTimeStamp && dateTimestamp <= eventEndTimeStamp;
  if (!isBetween) {
    return false;
  }
  if (event.metadata?.type !== 'Reservation') {
    return false;
  }
  return event.metadata?.roomsIds?.includes(roomId);
};

export const splitDatesByReservation = (
  roomId: number,
  dates: Date[],
  events: CalendarEvent[],
) => {
  let interval: { title?: string; image?: string; dates?: Date[] } = {};
  const arr: Array<typeof interval> = [];
  let currentIdx = 0;
  let currentDate = dates[currentIdx];
  while (currentIdx < dates.length) {
    // eslint-disable-next-line @typescript-eslint/no-loop-func
    const event = events.find((item) =>
      isReservationEventDate(roomId, currentDate, item),
    );
    if (event) {
      if (interval.dates) {
        arr.push(interval);
        interval = {};
      }
      interval = {
        title: event.metadata?.userName || event.title,
        image: event.metadata?.userAvatar,
        dates: [],
      };
      do {
        interval.dates.push(currentDate);
        currentIdx += 1;
        currentDate = dates[currentIdx];
      } while (currentDate <= event.end && currentIdx < dates.length);
      arr.push(interval);
      interval = {};
    } else {
      // eslint-disable-next-line no-lonely-if
      if (interval.dates) {
        interval.dates.push(currentDate);
      } else {
        interval = {
          dates: [currentDate],
        };
      }
    }
    currentIdx += 1;
    currentDate = dates[currentIdx];
  }
  if (interval.dates) {
    arr.push(interval);
  }

  return arr;
};
