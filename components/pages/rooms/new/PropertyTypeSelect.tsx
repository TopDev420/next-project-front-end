import InputFilled from 'components/pages/rooms/new/InputFilled';
import React from 'react';
import { MasterType } from 'types/models/MasterType';

type PropertyTypeSelectProps = {
  propertyTypes?: MasterType[];
  value?: number;
  onChange?: (value: number | undefined) => void;
};

const PropertyTypeSelect: React.FC<PropertyTypeSelectProps> = ({
  propertyTypes = [],
  value,
  onChange = () => {},
}) => {
  const selectedPropertyType = propertyTypes.find(({ id }) => id === value);
  return (
    <div className="flex w-full flex-col md:flex-row text-white my-4">
      {!!selectedPropertyType ? (
        <InputFilled
          title={selectedPropertyType.name}
          description="Vacation.Rentals guests love the variety of home types available."
          onClick={() => onChange(undefined)}
        />
      ) : (
        <>
          {propertyTypes.slice(0, 3).map(({ id, name }) => (
            <button
              className="md:flex-1 bg-blue-500 hover:bg-blue-400 border border-b-0 md:border-b md:border-r-0 border-blue-900 p-4"
              type="button"
              key={id}
              onClick={() => onChange(id)}
            >
              {name}
            </button>
          ))}
          <select
            className="md:flex-1 bg-blue-500 hover:bg-blue-400 cursor-pointer border border-blue-900 p-4 text-center outline-none appearance-none"
            value={value}
            defaultValue={0}
            onChange={(e) => onChange(Number(e.target.value))}
          >
            <option value={0} disabled>
              Choose 👇
            </option>
            {propertyTypes.slice(3).map(({ id, name }) => (
              <option key={id} value={id}>
                {name}
              </option>
            ))}
          </select>
        </>
      )}
    </div>
  );
};

export default PropertyTypeSelect;
