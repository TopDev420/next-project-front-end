/* eslint-disable jsx-a11y/no-interactive-element-to-noninteractive-role */
import { CalendarContext } from 'components/pages/my-page/property/Availibility/reducer';
import dayjs from 'dayjs';
import { formatPrice } from 'lib/helpers/number';
import React, { useContext } from 'react';

type DateHeaderProps = {
  label: React.ReactNode;
  date: Date;
  drilldownView: string;
  onDrillDown: () => void;
};

const renderPrice = (price?: number, isAvailable: boolean = true) => {
  if (!price) {
    return null;
  }

  const color = isAvailable ? 'bg-blue-500' : 'bg-gray-400';

  return (
    <span
      className={`text-xs ${color} text-white flex justify-center items-center p-0.5 rounded-sm shadow-lg mt-1 ml-1 font-normal`}
    >
      {formatPrice(price, {
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
      })}
    </span>
  );
};

const DateHeader: React.FC<DateHeaderProps> = ({
  label,
  date,
  drilldownView,
  onDrillDown,
}) => {
  const { slots } = useContext(CalendarContext);
  const slot = slots.find(
    (s) =>
      dayjs(s.date).startOf('date').toDate().getTime() ===
      dayjs(date).startOf('date').toDate().getTime(),
  );
  const price = slot?.price;
  const isAvailable = slot?.isAvailable;

  if (!drilldownView) {
    return (
      <div className="flex flex-row justify-between flex-wrap">
        {renderPrice(price, isAvailable)}
        <span>{label}</span>
      </div>
    );
  }

  return (
    <div className="flex flex-row justify-between flex-wrap">
      {renderPrice(price, isAvailable)}
      <a href="#" onClick={onDrillDown} role="cell">
        {label}
      </a>
    </div>
  );
};

export default DateHeader;
