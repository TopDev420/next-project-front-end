import dayjs from 'dayjs';
import { suppress } from 'lib/helpers/support';

export const convertToPHPTimestamp = (date: number | Date) => {
  let timestamp: number;
  if (date instanceof Date) {
    timestamp = date.getTime();
  } else {
    timestamp = Number(date);
  }
  return Math.floor(timestamp / 1000);
};

export const isValidDate = (date: Date) => !Number.isNaN(date.getTime());

export const formatDate = (
  date: any,
  format: string = 'MM/DD/YYYY',
  fallback: string = 'Invalid Date',
) =>
  suppress(() => {
    const dateObj = dayjs(date).toDate();
    if (!isValidDate(dateObj)) {
      return fallback;
    }
    return dayjs(dateObj).format(format);
  }, fallback);

export const dateEqualsCanonically = (date1: any, date2: any) => {
  const truthy1 = !!date1;
  const truthy2 = !!date2;
  if (truthy1 !== truthy2) {
    return false;
  }
  const datish1 = date1 instanceof Date;
  const datish2 = date2 instanceof Date;
  if (!datish1 && !datish2) {
    return date1 === date2;
  }
  if (datish1 !== datish2) {
    return false;
  }
  return date1.getTime() === date2.getTime();
};

export const getDateRange = (from: Date, to: Date) => {
  const dateArray: Date[] = [];
  const currentDate = new Date(from);
  while (currentDate <= new Date(to)) {
    dateArray.push(new Date(currentDate));
    currentDate.setUTCDate(currentDate.getUTCDate() + 1);
  }

  return dateArray;
};

export const getCurrentMonthRange = (curDate: Date) =>
  getDateRange(
    dayjs(curDate).startOf('month').toDate(),
    dayjs(curDate).endOf('month').toDate(),
  );

export const isSameDay = (
  a: Parameters<typeof dayjs>[0],
  b: Parameters<typeof dayjs>[0],
) =>
  dayjs(a).startOf('date').toDate().getTime() ===
  dayjs(b).startOf('date').toDate().getTime();
