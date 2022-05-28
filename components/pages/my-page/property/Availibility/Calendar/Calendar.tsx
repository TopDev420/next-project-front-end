import { Calendar as BigCalendar, SlotInfo } from 'react-big-calendar';
import React, { useContext } from 'react';
import localizer from 'lib/DayjsLocalizer';
import { CalendarEvent } from 'types/models/Calendar';
import DateHeader from 'components/pages/my-page/property/Availibility/Calendar/DateHeader';
import { CalendarContext } from 'components/pages/my-page/property/Availibility/reducer';
import { eventPropGetter } from 'components/pages/my-page/property/Availibility/Calendar/style';

type CalendarProps = {
  onNavigate?: (date: Date) => void;
  onSelectSlot?: (slotInfo: SlotInfo) => void;
  onSelectEvent?: (event?: CalendarEvent) => void;
};

const Calendar: React.FC<CalendarProps> = ({
  onNavigate = () => {},
  onSelectSlot = () => {},
  onSelectEvent = () => {},
}) => {
  const { events } = useContext(CalendarContext);
  return (
    <div className="bg-white p-6 shadow-lg">
      <div className="rbc-container">
        <BigCalendar
          selectable
          views={['month', 'week', 'day']}
          onSelectSlot={onSelectSlot}
          onSelectEvent={onSelectEvent}
          eventPropGetter={eventPropGetter}
          components={{ month: { dateHeader: DateHeader as any } }}
          localizer={localizer}
          startAccessor="start"
          endAccessor="end"
          events={events}
          onNavigate={onNavigate}
        />
      </div>
    </div>
  );
};

export default Calendar;
