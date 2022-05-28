import React, {
  useReducer,
  useCallback,
  useMemo,
  useEffect,
  useState,
} from 'react';
import { useSelector } from 'react-redux';
import Layout, { LayoutProps } from 'components/pages/my-page/property/Layout';
import { myPagePropertySelector } from 'lib/store/selectors/my-page/property';
import reducer, {
  CalendarActions,
  CalendarContext,
  initialState,
} from 'components/pages/my-page/property/Availibility/reducer';
import CalendarComponent from 'components/pages/my-page/property/Availibility/Calendar/Calendar';
import useDebounce from 'lib/hooks/useDebounce';
import { getCalendar } from 'lib/apis/property';
import { GetCalendarInput } from 'lib/forms/calendar';
import EventModal from 'components/pages/my-page/property/Availibility/EventModal';
import { ReservationInput } from 'lib/forms/reservation';
import { SeasonalPriceInput } from 'lib/forms/seasonal-price';
import { BlockInput } from 'lib/forms/block';
import dayjs from 'dayjs';
import { getEventModel } from 'lib/apis/event';
import { convertToEventInput } from 'lib/transformers/calendar-event';
import Tabs from 'components/pages/my-page/property/Availibility/Tabs';
import RoomsSelect from 'components/pages/my-page/property/Availibility/Calendar/RoomsSelect';
import { myPagePropertyRoomSelector } from 'lib/store/selectors/my-page/room';
import IcalModal from 'components/pages/my-page/property/Availibility/Calendar/IcalModal';

type EventInput = ReservationInput | SeasonalPriceInput | BlockInput;

const Calendar: React.FC<LayoutProps> = ({
  title = 'Listing Availability',
  description = 'Use the calendar below to restrict your listing availability and create custom seasonal pricing for specific dates. All listings must have an iCal link to before they can publish to this website. This helps ensure accurate availability for travelers. If you need help with this step - contact us at Sales@VacaRent.com',
}) => {
  const property = useSelector(myPagePropertySelector);
  const room = useSelector(myPagePropertyRoomSelector);

  const [icalModalVisible, setIcalModalVisible] = useState(false);

  const [{ events, slots, from, to }, dispatchCalendarAction] = useReducer(
    reducer,
    initialState,
  );

  const calendarInput: GetCalendarInput = useMemo(
    () => ({
      propertyId: property?.id!,
      from,
      to,
      type: 'MANAGEMENT',
      roomId: room?.id,
    }),
    [property, from, to, room],
  );

  const debouncedCalendarInput = useDebounce(calendarInput, 300);

  const handleNavigate = useCallback((date: Date) => {
    dispatchCalendarAction({
      type: CalendarActions.NAVIGATE,
      payload: date,
    });
  }, []);

  const [eventInput, setEventInput] = useState<EventInput>();

  const updateCalendar = useCallback(() => {
    if (debouncedCalendarInput.propertyId) {
      getCalendar(debouncedCalendarInput).then((calendarData) => {
        dispatchCalendarAction({
          type: CalendarActions.SET_DATA,
          payload: calendarData,
        });
      });
    }
  }, [debouncedCalendarInput]);

  const isMultipleProperty = !!property && property.roomsCount > 1;
  const shouldShowIcalButton = !isMultipleProperty || !!room;

  useEffect(() => {
    updateCalendar();
  }, [updateCalendar]);

  return (
    <Layout step="calendar" title={title} description={description} hideSideBar>
      {isMultipleProperty && <Tabs tab="calendar" />}
      <div className="pt-4 pb-2 flex flex-col md:flex-row md:flex-wrap md:justify-between">
        <div className="w-64 mb-2">
          {isMultipleProperty && (
            <RoomsSelect
              onChange={() =>
                dispatchCalendarAction({
                  type: CalendarActions.RESET,
                })
              }
            />
          )}
        </div>
        {!!property && shouldShowIcalButton && (
          <div className="mb-2">
            <button
              type="button"
              className="btn btn-info"
              onClick={() => setIcalModalVisible(true)}
            >
              iCal Import/Export
            </button>
          </div>
        )}
      </div>
      <CalendarContext.Provider
        value={{
          events,
          slots,
          from,
          to,
          dispatch: dispatchCalendarAction,
          refetch: updateCalendar,
        }}
      >
        <CalendarComponent
          onNavigate={handleNavigate}
          onSelectEvent={async (event) => {
            if (!event) {
              return;
            }
            const model = await getEventModel(event);
            setEventInput(convertToEventInput(model));
          }}
          onSelectSlot={({ start, end }) =>
            setEventInput({
              id: null,
              propertyId: property!.id,
              checkedInAt: dayjs(start).toDate(),
              checkedOutAt: dayjs(end).toDate(),
              guests: 1,
              roomsIds: room ? [room.id] : undefined,
              rooms: room ? [room] : [],
            })
          }
        />
        <EventModal value={eventInput} />
        <IcalModal
          open={icalModalVisible}
          onClose={() => setIcalModalVisible(false)}
          onChange={() => {
            dispatchCalendarAction({
              type: CalendarActions.RESET,
            });
            setIcalModalVisible(false);
          }}
        />
      </CalendarContext.Provider>
    </Layout>
  );
};

export default Calendar;
