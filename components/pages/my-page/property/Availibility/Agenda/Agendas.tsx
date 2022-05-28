import { useCallback, useEffect, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import Image from 'next/image';
import dayjs from 'dayjs';
import { getCalendar } from 'lib/apis/property';
import { Calendar } from 'types/models/Calendar';
import { formatDate, getCurrentMonthRange } from 'lib/helpers/date';
import usePagination from 'lib/hooks/usePagination';
import { myPagePropertyIdSelector } from 'lib/store/selectors/my-page/property';
import * as propertyApi from 'lib/apis/property';
import LoadingIndicator from 'components/LoadingIndicator';
import theme from 'constants/theme';
import { splitDatesByReservation } from 'lib/transformers/calendar-event';
import LeftArrow from 'assets/images/icons/chevron-left.svg';
import RightArrow from 'assets/images/icons/chevron-right.svg';
import { formatPrice } from 'lib/helpers/number';

const Agendas = () => {
  const propertyId = useSelector(myPagePropertyIdSelector) as number;
  const fetchInput = useMemo(() => ({ propertyId }), [propertyId]);
  const [updating, setUpdating] = useState(true);

  const [currentDate, setCurrentDate] = useState(
    dayjs(new Date()).startOf('month').toDate(),
  );
  const [dates, setDates] = useState(getCurrentMonthRange(currentDate));
  const [eventData, setEventData] = useState({
    slots: [],
    events: [],
  } as Calendar);

  const [currentPage, setCurrentPage] = useState(1);
  const {
    pagination,
    loading,
    fetch: fetchPagination,
  } = usePagination({
    preserveLastData: true,
    api: propertyApi.listRooms,
    input: fetchInput as any,
  });

  const getRoomData = useCallback(() => {
    if (propertyId !== undefined) {
      const curRange = getCurrentMonthRange(currentDate);
      setDates(curRange);
      getCalendar({
        from: curRange[0].getTime(),
        to: curRange[curRange.length - 1].getTime() + 86400000,
        propertyId,
        type: 'MANAGEMENT',
        roomId: undefined,
      }).then(
        (calendarData) => {
          setEventData(calendarData);
          setUpdating(false);
        },
        (_) => {
          setUpdating(false);
        },
      );
    }
  }, [currentDate, propertyId]);

  const getDatePrice = useCallback(
    (date: Date) => {
      const slotIndex = eventData.slots.findIndex(
        (item) =>
          dayjs(item.date).startOf('date').toDate().getTime() ===
          dayjs(date).startOf('date').toDate().getTime(),
      );
      if (slotIndex > -1) {
        const { price } = eventData.slots[slotIndex];
        if (price) {
          return formatPrice(price);
        }
        return 'N/A';
      }
      return '';
    },
    [eventData],
  );

  const getFilledClass = useCallback(
    (roomID: number, date: Date) => {
      const eventIndex = eventData.events.findIndex(
        (item) =>
          item.metadata?.roomsIds?.includes(roomID) &&
          formatDate(date, 'YYYY-MM-DD') >=
            formatDate(item.start, 'YYYY-MM-DD') &&
          formatDate(date, 'YYYY-MM-DD') < formatDate(item.end, 'YYYY-MM-DD'),
      );
      if (eventIndex > -1) {
        return 'filled';
      }
      const slotIndex = eventData.slots.findIndex(
        (item) =>
          dayjs(item.date).startOf('date').toDate().getTime() ===
          dayjs(date).startOf('date').toDate().getTime(),
      );
      if (slotIndex === -1) {
        return '';
      }
      const slot = eventData.slots[slotIndex];
      if (!slot.isAvailable) {
        return 'blocked';
      }
      return '';
    },
    [eventData],
  );

  const handlePrevMonth = useCallback(() => {
    setUpdating(true);
    currentDate.setMonth(currentDate.getMonth() - 1);
    setCurrentDate(new Date(currentDate.getTime()));
  }, [currentDate]);

  const handleNextMonth = useCallback(() => {
    setUpdating(true);
    currentDate.setMonth(currentDate.getMonth() + 1);
    setCurrentDate(new Date(currentDate.getTime()));
  }, [currentDate]);

  useEffect(() => {
    getRoomData();
  }, [getRoomData]);

  useEffect(() => {
    if (propertyId) {
      fetchPagination(currentPage);
    }
  }, [currentPage, fetchPagination, propertyId]);

  return (
    <div className="agenda">
      <nav className="agenda__nav">
        <ul className="flex">
          <li>
            <button
              type="button"
              className="agenda__navButton agenda__navButton--left"
              onClick={handlePrevMonth}
              disabled={updating}
            >
              <LeftArrow width={16} height={16} fill={theme?.colors?.black} />
            </button>
          </li>
          <li className="agenda__navDate">
            <span className="agenda__navDateText">
              {formatDate(currentDate, 'YYYY/MM')}
            </span>
          </li>
          <li>
            <button
              type="button"
              className="agenda__navButton agenda__navButton--right"
              onClick={handleNextMonth}
              disabled={updating}
            >
              <RightArrow width={16} height={16} fill={theme?.colors?.black} />
            </button>
          </li>
        </ul>
      </nav>
      <div className="agenda__tableContainer mb-3">
        <table className="agenda__table">
          <thead>
            <tr>
              <th> </th>
              {dates.map((thDate, index) => (
                <th key={`date-${index}`}>{formatDate(thDate, 'D')}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {pagination?.data.map((row, index) => (
              <tr key={index}>
                <td>{row.title}</td>
                {splitDatesByReservation(row.id, dates, eventData.events).map(
                  (interval, intervalIdx) => (
                    <>
                      {!!interval.title ? (
                        <td
                          key={`${row.id}_${index}_${intervalIdx}`}
                          colSpan={interval.dates.length}
                          className="agenda__slot agenda__slot--res"
                        >
                          <div className="agenda__slotWrapper">
                            {!!interval.image && (
                              <div className="mr-1">
                                <Image
                                  src={interval.image}
                                  width={24}
                                  height={24}
                                  layout="fixed"
                                  objectFit="cover"
                                  className="agenda__slotImage"
                                />
                              </div>
                            )}
                            <span
                              className="agenda__slotTitle"
                              title={interval.title}
                            >
                              {interval.title}
                            </span>
                          </div>
                        </td>
                      ) : (
                        <>
                          {interval.dates.map((date, dateIndex) => (
                            <td
                              key={`${row.id}_${dateIndex}`}
                              className={getFilledClass(row.id, date)}
                            >
                              {getDatePrice(date)}
                            </td>
                          ))}
                        </>
                      )}
                    </>
                  ),
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {!!pagination && !!pagination.nextPageUrl && (
        <div className="text-center">
          <button
            type="button"
            className="btn btn-primary"
            onClick={() => setCurrentPage(currentPage + 1)}
          >
            {loading && <LoadingIndicator left light />}
            Load More
          </button>
        </div>
      )}
    </div>
  );
};

export default Agendas;
