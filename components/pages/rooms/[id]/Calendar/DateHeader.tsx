import React, { useContext } from 'react';
import dayjs from 'dayjs';
import { PropertyContext } from 'components/pages/rooms/[id]/PropertyProvider';
import { formatPrice } from 'lib/helpers/number';

type DateHeaderProps = {
  label: React.ReactNode;
  date: Date;
};

const renderPrice = (price?: number, isAvailable: boolean = true) => {
  if (!price) {
    return null;
  }

  const color = isAvailable ? 'text-gray-600' : 'text-gray-400';

  return (
    <span
      className={`text-xs ${color} flex justify-center p-0.5 items-center rounded-sm mt-1 ml-1 font-normal`}
    >
      {isAvailable
        ? formatPrice(price, {
            maximumFractionDigits: 0,
            minimumFractionDigits: 0,
          })
        : 'N/A'}
    </span>
  );
};

const DateHeader: React.FC<DateHeaderProps> = ({ date, label }) => {
  const property = useContext(PropertyContext);
  const slots = property?.calendar?.slots || [];

  const slot = slots.find(
    (s) =>
      dayjs(s.date).startOf('date').toDate().getTime() ===
      dayjs(date).startOf('date').toDate().getTime(),
  );
  const price = slot?.price;
  const isAvailable = slot?.isAvailable;

  return (
    <div className="flex flex-row justify-between flex-wrap">
      <span>{label}</span>
      {renderPrice(price, isAvailable)}
    </div>
  );
};

export default DateHeader;
