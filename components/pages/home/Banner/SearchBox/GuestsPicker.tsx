import React, { useEffect, useState } from 'react';
import _ from 'lodash';
import config from 'config';

const { MAX_GUESTS } = config;

type GuestsPickerProps = {
  onChange?: (guests: number) => void;
};

const GuestsPicker: React.FC<GuestsPickerProps> = ({ onChange = () => {} }) => {
  const [guests, setGuests] = useState(1);

  useEffect(() => {
    onChange(guests);
  }, [guests, onChange]);

  return (
    <div className="searchBox__item flex-1 border-r px-4">
      <select
        className="py-2 outline-none w-full text-sm"
        value={guests}
        onChange={(e) => setGuests(Number(e.target.value))}
      >
        {_.range(MAX_GUESTS).map((_val, key) => (
          <option key={String(key)} value={key + 1}>
            {key + 1} Guests
          </option>
        ))}
        <option value={-1}>{MAX_GUESTS}+ Guests</option>
      </select>
    </div>
  );
};
export default GuestsPicker;
