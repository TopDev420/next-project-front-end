import React from 'react';
import theme from 'constants/theme';
import PlusIcon from 'assets/images/icons/plus-circle-o.svg';
import MinusIcon from 'assets/images/icons/minus-circle-o.svg';

type CounterProps = {
  value?: number;
  min?: number;
  max?: number;
  onChange?: (value: number) => void;
};

const Counter: React.FC<CounterProps> = ({
  value = 0,
  min = 0,
  max,
  onChange = () => {},
}) => {
  const minusDisabled = value <= min;
  const plusDisabled = !!max && value >= max;
  return (
    <div className="flex flex-row items-center">
      <button
        disabled={minusDisabled}
        type="button"
        onClick={() => onChange(value - 1)}
      >
        <MinusIcon
          width={20}
          height={20}
          fill={minusDisabled ? theme.colors?.gray[500] : theme.colors?.black}
        />
      </button>
      <span className="w-8 text-center">{value}</span>
      <button
        disabled={plusDisabled}
        type="button"
        onClick={() => onChange(value + 1)}
      >
        <PlusIcon
          width={20}
          height={20}
          fill={plusDisabled ? theme.colors?.gray[500] : theme.colors?.black}
        />
      </button>
    </div>
  );
};

export default Counter;
