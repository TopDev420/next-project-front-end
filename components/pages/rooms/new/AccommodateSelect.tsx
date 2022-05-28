import _ from 'lodash';
import InputFilled from 'components/pages/rooms/new/InputFilled';
import React from 'react';

type AccommodateSelectProps = {
  value?: number;
  onChange?: (value: number | undefined) => void;
};

const AccommodateSelect: React.FC<AccommodateSelectProps> = ({
  value,
  onChange = () => {},
}) => (
  <div className="flex w-full flex-col md:flex-row text-white my-4">
    {!!value ? (
      <InputFilled
        title={`${value} Guests`}
        description="Whether you're hosting a lone traveler or a large group, it's important for your guests to feel comfortable."
        onClick={() => onChange(undefined)}
      />
    ) : (
      <select
        className="text-black flex w-full outline-none border p-4"
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
      >
        {_.times(30).map((_val, index) => (
          <option key={String(index)} value={index + 1}>
            {index + 1}
          </option>
        ))}
      </select>
    )}
  </div>
);

export default AccommodateSelect;
