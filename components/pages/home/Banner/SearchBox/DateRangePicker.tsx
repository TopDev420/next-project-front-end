/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useCallback, useEffect, useState } from 'react';
import dayjs from 'dayjs';
import { DateRange as Picker, RangeKeyDict, Range } from 'react-date-range';
import CalendarIcon from 'assets/images/icons/calendar.svg';
import theme from 'constants/theme';
import useWindowSize from 'lib/hooks/ui/useWindowSize';
import { formatDate } from 'lib/helpers/date';

type DateRangePickerProps = {
  onChange?: (checkIn: Date | undefined, checkOut: Date | undefined) => void;
};

const DateRangePicker: React.FC<DateRangePickerProps> = ({
  onChange = () => {},
}) => {
  const [open, setOpen] = useState(false);
  const [range, setRange] = useState([
    {
      startDate: null,
      endDate: new Date(''),
      key: 'selection',
    },
  ]);

  const toggleOpen = () => setOpen((old) => !old);

  const minDate = dayjs().startOf('date').toDate();
  const maxDate = dayjs().add(1, 'year').endOf('year').toDate();

  const { width } = useWindowSize();

  const handleChange = useCallback((item: RangeKeyDict) => {
    setRange([(item as any).selection]);
    const selection = item.selection as Range;

    const { startDate, endDate } = selection;
    if (
      dayjs(endDate).toDate().getTime() - dayjs(startDate).toDate().getTime() <
      1000 * 3600 * 24
    ) {
      return;
    }
    setOpen(false);
  }, []);

  useEffect(() => {
    if (!range || !range.length) {
      onChange(undefined, undefined);
      return;
    }
    const { startDate, endDate } = range[0];
    onChange(startDate, endDate);
  }, [onChange, range]);

  return (
    <div className="searchBox__item flex flex-row justify-between flex-1 relative border-r">
      <div
        className="flex flex-1 items-center text-sm mr-2"
        onClick={toggleOpen}
      >
        <CalendarIcon
          className="mr-1"
          width={24}
          height={24}
          fill={theme.colors?.gray[500]}
        />
        <span className="whitespace-nowrap">
          {!!range?.[0]?.startDate
            ? formatDate(range[0].startDate, 'MM/DD/YYYY', 'Check in')
            : 'Check in'}
        </span>
      </div>
      <div className="flex flex-0 mr-2 searchBox__dateSeparator">~</div>
      <div className="flex flex-1 items-center text-sm" onClick={toggleOpen}>
        <CalendarIcon
          className="mr-1"
          width={24}
          height={24}
          fill={theme.colors?.gray[500]}
        />
        <span className="whitespace-nowrap">
          {!!range?.[0]?.endDate
            ? formatDate(range[0].endDate, 'MM/DD/YYYY', 'Check out')
            : 'Check out'}
        </span>
      </div>
      {open && (
        <div className="absolute inset-0">
          <Picker
            minDate={minDate}
            maxDate={maxDate}
            ranges={range}
            months={2}
            showDateDisplay={false}
            moveRangeOnFirstSelection={false}
            weekdayDisplayFormat="EEEEE"
            onChange={handleChange}
            direction={width > 951 ? 'horizontal' : 'vertical'}
          />
        </div>
      )}
    </div>
  );
};

export default DateRangePicker;
