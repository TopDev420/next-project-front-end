/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useCallback, useMemo, useState } from 'react';
import dayjs from 'dayjs';
import { DateRange as Picker, Range, RangeKeyDict } from 'react-date-range';
import CalendarIcon from 'assets/images/icons/calendar.svg';
import useWindowSize from 'lib/hooks/ui/useWindowSize';
import theme from 'constants/theme';
import { formatDate } from 'lib/helpers/date';
import { convertCheckInCheckOutToRanges } from 'lib/transformers/search';

type DateRangePickerProps = {
  checkIn?: Date;
  checkOut?: Date;
  onChange?: (value: { checkIn?: Date; checkOut?: Date }) => void;
};

const DateRangePicker: React.FC<DateRangePickerProps> = ({
  checkIn,
  checkOut,
  onChange = () => {},
}) => {
  const minDate = dayjs().startOf('date').toDate();
  const maxDate = dayjs().add(1, 'year').endOf('year').toDate();

  const range = useMemo(
    () => convertCheckInCheckOutToRanges(checkIn, checkOut),
    [checkIn, checkOut],
  );

  const [open, setOpen] = useState(false);

  const toggleOpen = () => setOpen((old) => !old);

  const { width } = useWindowSize();

  const handleChange = useCallback(
    (item: RangeKeyDict) => {
      if (!item.selection) {
        onChange({ checkIn: undefined, checkOut: undefined });
        setOpen(false);
        return;
      }
      const selection = item.selection as Range;
      onChange({
        checkIn: selection.startDate ? selection.startDate : undefined,
        checkOut: selection.endDate ? selection.endDate : undefined,
      });
      if (
        dayjs(selection.endDate).toDate().getTime() -
          dayjs(selection.startDate).toDate().getTime() <
        1000 * 3600 * 24
      ) {
        return;
      }
      setOpen(false);
    },
    [onChange],
  );

  return (
    <div className="searchBar__dateRange">
      <div
        className="flex flex-1 items-center text-sm mr-4 border p-2"
        onBlur={() => setOpen(false)}
        onClick={toggleOpen}
      >
        <CalendarIcon
          className="mr-1"
          width={18}
          height={18}
          fill={theme.colors?.gray[500]}
        />
        <span className="whitespace-nowrap text-gray-500">
          {!!range?.[0]?.startDate
            ? formatDate(range[0].startDate, 'MM/DD/YYYY', 'Check in')
            : 'Check in'}
        </span>
      </div>
      <div
        className="flex flex-1 items-center text-sm border p-2"
        onClick={toggleOpen}
      >
        <CalendarIcon
          className="mr-1"
          width={18}
          height={18}
          fill={theme.colors?.gray[500]}
        />
        <span className="whitespace-nowrap text-gray-500">
          {!!range?.[0]?.endDate
            ? formatDate(range[0].endDate, 'MM/DD/YYYY', 'Check out')
            : 'Check out'}
        </span>
      </div>

      {open && (
        <>
          <div className="fixed inset-0" onClick={() => setOpen(false)} />
          <div className="absolute inset-0 z-30">
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
        </>
      )}
    </div>
  );
};

export default DateRangePicker;
