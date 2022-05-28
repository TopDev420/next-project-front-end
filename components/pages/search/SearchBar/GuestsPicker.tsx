import React from 'react';
import _ from 'lodash';
import config from 'config';

const { MAX_GUESTS } = config;

type GuestsPickerProps = {
  guests?: number;
  onChange?: (value: { guests: number }) => void;
};

const GuestsPicker: React.FC<GuestsPickerProps> = ({ guests, onChange }) => (
  <div className="searchBar__guests">
    <select
      className="p-2 outline-none w-full text-sm border"
      value={guests}
      onChange={(e) => {
        onChange({ guests: Number(e.target.value) });
      }}
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
export default GuestsPicker;
