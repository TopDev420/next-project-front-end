/* eslint-disable */
//@ts-ignore
import * as dates from 'react-big-calendar/lib/utils/dates';
import { DateLocalizer } from 'react-big-calendar';
import dayjs from 'dayjs';

let dateRangeFormat = ({ start, end }: any, culture: any, local: any) =>
  local.format(start, 'L', culture) + ' – ' + local.format(end, 'L', culture);

let timeRangeFormat = ({ start, end }: any, culture: any, local: any) =>
  local.format(start, 'LT', culture) + ' – ' + local.format(end, 'LT', culture);

let timeRangeStartFormat = ({ start }: any, culture: any, local: any) =>
  local.format(start, 'LT', culture) + ' – ';

let timeRangeEndFormat = ({ end }: any, culture: any, local: any) =>
  ' – ' + local.format(end, 'LT', culture);

let weekRangeFormat = ({ start, end }: any, culture: any, local: any) =>
  local.format(start, 'MMMM DD', culture) +
  ' – ' +
  local.format(end, dates.eq(start, end, 'month') ? 'DD' : 'MMMM DD', culture);

export let formats = {
  dateFormat: 'DD',
  dayFormat: 'DD ddd',
  weekdayFormat: 'ddd',

  selectRangeFormat: timeRangeFormat,
  eventTimeRangeFormat: timeRangeFormat,
  eventTimeRangeStartFormat: timeRangeStartFormat,
  eventTimeRangeEndFormat: timeRangeEndFormat,

  timeGutterFormat: 'LT',

  monthHeaderFormat: 'MMMM YYYY',
  dayHeaderFormat: 'dddd MMM DD',
  dayRangeHeaderFormat: weekRangeFormat,
  agendaHeaderFormat: dateRangeFormat,

  agendaDateFormat: 'ddd MMM DD',
  agendaTimeFormat: 'LT',
  agendaTimeRangeFormat: timeRangeFormat,
};

const dayjsLocalizer = () => {
  let locale = (m: any, c: any) => (c ? m.locale(c) : m);

  return new DateLocalizer({
    formats,
    firstOfWeek(culture) {
      let data = dayjs.localeData();
      return data ? data.firstDayOfWeek() : 0;
    },

    format(value, format, culture) {
      return locale(dayjs(value), culture).format(format);
    },
  });
};

import localeData from 'dayjs/plugin/localeData';

dayjs.extend(localeData);

const localizer = dayjsLocalizer();

export default localizer;
