import React, { useState } from 'react';

type RoomsInputProps = {
  value?: number;
  onChange?: (value?: number) => void;
};

const RoomsInput: React.FC<RoomsInputProps> = ({
  value,
  onChange = () => {},
}) => {
  const [isMultiple, setIsMultiple] = useState(!!value);

  const handleChange = (e: any) => onChange(e.target.value);

  return (
    <div className="flex w-full flex-col my-4">
      <div className="flex flex-row mb-2">
        <label className="mr-2 cursor-pointer">
          <input
            className="mr-1"
            type="radio"
            checked={isMultiple}
            onChange={() => {}}
            onClick={() => setIsMultiple(true)}
          />
          Yes
        </label>
        <label className="cursor-pointer">
          <input
            className="mr-1"
            type="radio"
            checked={!isMultiple}
            onChange={() => {}}
            onClick={() => setIsMultiple(false)}
          />
          No
        </label>
      </div>
      {isMultiple && (
        <div className="flex flex-row items-center">
          <label htmlFor="inputRooms" className="mr-2">
            Number of Rooms
          </label>
          <input
            id="inputRooms"
            className="border p-2"
            type="number"
            value={value || 1}
            onChange={handleChange}
          />
        </div>
      )}
    </div>
  );
};

export default RoomsInput;
