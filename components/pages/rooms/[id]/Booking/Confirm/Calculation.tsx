import { formatPrice } from 'lib/helpers/number';
import React from 'react';
import { Order } from 'types/models/Order';
import { ReservationCalculation } from 'types/models/Reservation';

type OrderCalculationProps = {
  calculation?: ReservationCalculation;
};

const LineItem = ({ title, price }: { title: string; price: number }) => (
  <div className="my-2 flex flex-row justify-between">
    <strong>{title}</strong>
    <span>{formatPrice(price)}</span>
  </div>
);

const Calculation: React.FC<OrderCalculationProps> = ({ calculation }) => {
  if ((calculation as any)?.flexible) {
    return (
      <div className="mt-4">
        <p className="text-gray-400 text-center">Contact host for pricing</p>
      </div>
    );
  }

  const order = calculation as Order;

  return (
    <div className="py-2 px-6 flex flex-col">
      <LineItem title="Nightly Price" price={order?.avgPrice} />
      {order?.charges?.map((charge, key) => (
        <LineItem key={String(key)} title={charge.name} price={charge.price} />
      ))}
      {order?.discounts?.map((discount, key) => (
        <LineItem
          key={String(key)}
          title={discount.name}
          price={-1 * discount.price}
        />
      ))}
      <LineItem title="Total Tax" price={order?.tax} />
      <div className="my-2 border-t" />
      <LineItem title="Grand Total" price={order?.totalIncTax} />
    </div>
  );
};

export default Calculation;
