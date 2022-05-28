/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { useWatch } from 'react-hook-form';
import { DateRange as Picker, RangeKeyDict, Range } from 'react-date-range';
import dayjs from 'dayjs';
import { convertCheckInCheckOutToRanges } from 'lib/transformers/search';
import { FormContext } from 'components/pages/rooms/[id]/Booking/FormProvider';
import InvalidFeedback from 'components/Error/InvalidFeedback';
import { getDisabledDates } from 'lib/transformers/calendar-event';
import { PropertyContext } from 'components/pages/rooms/[id]/PropertyProvider';
import { getDateRange } from 'lib/helpers/date';

const DateRangePicker = () => {
  const property = useContext(PropertyContext);
  const minDate = dayjs().startOf('date').toDate();
  const maxDate = dayjs().add(1, 'year').endOf('year').toDate();
  const [open, setOpen] = useState(false);

  const { control, register, setValue, setError, clearErrors } =
    useContext(FormContext);
  const rooms = useWatch({ control, name: 'roomsRequested' });
  const checkedInAt = useWatch({ control, name: 'checkedInAt' });
  const checkedOutAt = useWatch({ control, name: 'checkedOutAt' });

  const range = useMemo(
    () => convertCheckInCheckOutToRanges(checkedInAt, checkedOutAt),
    [checkedInAt, checkedOutAt],
  );
  const eventRanges = useMemo(
    () =>
      // return convertCalendarToRanges(property?.calendar);
      [],
    [],
  );
  const disabledDates = useMemo(
    () => getDisabledDates(property?.calendar?.slots || [], rooms || 1),
    [rooms, property?.calendar?.slots],
  );

  const handleChange = useCallback(
    (item: RangeKeyDict) => {
      if (!item.selection) {
        setValue('checkedInAt', undefined);
        setValue('checkedOutAt', undefined);
        return;
      }

      const selection = item.selection as Range;
      const { startDate, endDate } = selection;
      if (startDate) {
        setValue('checkedInAt', selection.startDate);
      }
      if (endDate) {
        setValue('checkedOutAt', selection.endDate);
      }
      if (
        dayjs(endDate).toDate().getTime() -
          dayjs(startDate).toDate().getTime() <
        1000 * 3600 * 24
      ) {
        return;
      }
      setOpen(false);
    },
    [setValue],
  );

  useEffect(() => {
    if (!disabledDates || !checkedInAt || !checkedOutAt) {
      return;
    }
    const dateRange = getDateRange(checkedInAt, checkedOutAt);
    // eslint-disable-next-line no-restricted-syntax
    for (const date of dateRange) {
      if (disabledDates.includes(date)) {
        setError('checkedInAt', {
          message: 'These dates are not available',
          type: 'manual',
        });
        return;
      }
    }
    clearErrors('checkedInAt');
  }, [checkedInAt, checkedOutAt, clearErrors, disabledDates, setError]);

  return (
    <div className="flex flex-col relative">
      <label htmlFor="inputCheckIn" className="mb-2">
        Check In
      </label>
      <div className="mb-4">
        <div
          id="inputCheckIn"
          className={`border p-2 ${checkedInAt ? '' : 'text-gray-500'}`}
          onClick={() => setOpen(true)}
        >
          {checkedInAt ? dayjs(checkedInAt).format('MM/DD/YYYY') : 'Check In'}
        </div>
        <input {...register('checkedInAt')} type="hidden" />
        <InvalidFeedback name="checkedInAt" />
      </div>
      <label htmlFor="inputCheckOut" className="mb-2">
        Check Out
      </label>
      <div
        id="inputCheckOut"
        className={`border p-2 mb-2 ${checkedOutAt ? '' : 'text-gray-500'}`}
        onClick={() => setOpen(true)}
      >
        {checkedOutAt ? dayjs(checkedOutAt).format('MM/DD/YYYY') : 'Check Out'}
      </div>
      <input {...register('checkedOutAt')} type="hidden" />
      <InvalidFeedback name="checkedOutAt" />
      {open && (
        <>
          <div className="fixed inset-0" onClick={() => setOpen(false)} />
          <div className="absolute inset-0 z-30 top-8 flex flex-col">
            <Picker
              minDate={minDate}
              maxDate={maxDate}
              months={1}
              showDateDisplay={false}
              moveRangeOnFirstSelection={false}
              showPreview
              weekdayDisplayFormat="EEEEE"
              disabledDates={disabledDates}
              ranges={[...range, ...eventRanges]}
              onChange={handleChange}
            />
            <div className="border border-t-0 py-2 px-3 bg-yellow-200 grid grid-cols-2">
              <p className="flex flex-row text-sm items-center">
                <span className="w-3 h-3 rounded-full border mr-1 bg-blue-600" />
                Selected Dates
              </p>
              <p className="flex flex-row text-sm items-center">
                <span className="w-3 h-3 rounded-full border mr-1 bg-gray-600" />
                Blocked Dates
              </p>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default DateRangePicker;
