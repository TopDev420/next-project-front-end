import { useContext } from 'react';
import { Controller } from 'react-hook-form';
import _ from 'lodash';
import { FormContext } from 'components/pages/rooms/[id]/Booking/FormProvider';
import { PropertyContext } from 'components/pages/rooms/[id]/PropertyProvider';
import InvalidFeedback from 'components/Error/InvalidFeedback';

const Rooms = () => {
  const property = useContext(PropertyContext);
  const { control } = useContext(FormContext);

  const visible = property?.roomsCount > 1;

  return (
    <div className={`mt-4 flex flex-col ${!visible ? 'hidden' : ''}`}>
      <label className="mb-2" htmlFor="inputRooms">
        Rooms
      </label>
      <Controller
        name="roomsRequested"
        control={control}
        render={({ field }) => (
          <select
            name="roomsRequested"
            className="p-2 border"
            value={field.value}
            onChange={field.onChange}
          >
            {_.range(property?.roomsCount || 0).map((_val, key) => (
              <option key={String(key)} value={key + 1}>
                {key + 1} Rooms
              </option>
            ))}
          </select>
        )}
      />
      <InvalidFeedback name="roomsRequested" />
    </div>
  );
};

export default Rooms;
