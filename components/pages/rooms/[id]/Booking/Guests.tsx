import { useContext } from 'react';
import { Controller } from 'react-hook-form';
import _ from 'lodash';
import { FormContext } from 'components/pages/rooms/[id]/Booking/FormProvider';
import config from 'config';
import InvalidFeedback from 'components/Error/InvalidFeedback';

const { MAX_GUESTS } = config;

const Guests = () => {
  const { control } = useContext(FormContext);

  return (
    <div className="mt-4 flex flex-col">
      <label className="mb-2" htmlFor="inputGuests">
        Guests
      </label>
      <Controller
        control={control}
        name="guests"
        render={({ field }) => (
          <select
            name="guests"
            className="border p-2"
            id="inputGuests"
            value={field.value}
            onChange={field.onChange}
          >
            <>
              {_.range(MAX_GUESTS).map((_val, key) => (
                <option key={String(key)} value={key + 1}>
                  {key + 1} Guests
                </option>
              ))}
            </>
          </select>
        )}
      />
      <InvalidFeedback name="guests" />
    </div>
  );
};

export default Guests;
