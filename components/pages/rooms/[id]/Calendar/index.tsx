import { useContext } from 'react';
import { Calendar as BigCalendar } from 'react-big-calendar';
import localizer from 'lib/DayjsLocalizer';
import DateHeader from 'components/pages/rooms/[id]/Calendar/DateHeader';
import { PropertyContext } from 'components/pages/rooms/[id]/PropertyProvider';

const Calendar = () => {
  const property = useContext(PropertyContext);

  return (
    <div className="lg:ml-4 my-6 p-6 border bg-white shadow-md ">
      <h4 className="mb-4">Availibility & Pricing</h4>
      <div className="h-96">
        <BigCalendar
          localizer={localizer}
          views={['month']}
          selectable={false}
          events={property?.calendar?.events || []}
          components={{ month: { dateHeader: DateHeader as any } }}
        />
      </div>
    </div>
  );
};

export default Calendar;
