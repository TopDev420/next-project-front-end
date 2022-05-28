import React, { useCallback, useState } from 'react';
import RoomsSelectComponent from 'components/pages/my-page/property/Availibility/RoomsSelect';
import CloseIcon from 'assets/images/icons/close.svg';
import theme from 'constants/theme';

type Option = { label: string; value: number };

type RoomsSelectProps = {
  initialData?: Option[];
  value: number[];
  onChange: (value?: number[]) => void;
};

const RoomsSelect: React.FC<RoomsSelectProps> = ({
  initialData = [],
  value = [],
  onChange = () => {},
}) => {
  const [items, setItems] = useState(initialData);

  const handleSelect = useCallback(
    (selected?: Option | null) => {
      if (!selected?.value) {
        return;
      }
      if (value.includes(selected.value)) {
        return;
      }
      setItems((oldItems) => {
        if (
          oldItems.findIndex(({ value: val }) => val === selected.value) > -1
        ) {
          return oldItems;
        }

        return oldItems.concat(selected);
      });
      onChange(value.concat(selected.value));
    },
    [onChange, value],
  );

  const handleDeselect = (id: number) => {
    onChange(value.filter((item) => item !== id));
  };

  const renderSelectedItems = () =>
    items
      .filter(({ value: roomId }) => value.includes(roomId))
      .map((item) => (
        <button
          type="button"
          key={item.value}
          className="mr-2 mb-2 py-1 px-2 bg-gray-100 text-sm inline-flex items-center"
          onClick={() => handleDeselect(item.value)}
        >
          {item.label}
          <CloseIcon
            className="ml-1"
            width={8}
            height={8}
            fill={theme.colors?.black}
          />
        </button>
      ));

  return (
    <div className="flex flex-col md:flex-row">
      <div className="flex-1">{renderSelectedItems()}</div>
      <div className="flex-1">
        <RoomsSelectComponent onChange={handleSelect} />
      </div>
    </div>
  );
};

export default RoomsSelect;
