import React from 'react';
import { formatNumber } from 'lib/helpers/number';
import theme from 'constants/theme';

type PlanProps = {
  name: string;
  Icon: any;
  priceMonthly: number;
  priceYearly: number;
  features: string[];
  onPurchase: (type: 'monthly' | 'yearly') => void;
  quantity: number;
};

const formatPrice = (price: number) =>
  formatNumber(price, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

const Plan: React.FC<PlanProps> = ({
  name,
  Icon,
  priceMonthly,
  priceYearly,
  features,
  onPurchase,
  quantity,
}) => (
  <div className="bg-white p-6 shadow-lg flex flex-col items-center">
    <Icon width={48} height={48} fill={theme?.colors?.gray[500]} />
    <h3 className="uppercase mt-2">{name}</h3>
    <div className="my-3 flex flex-row justify-center items-start">
      <span className="text-lg mr-1">$</span>
      <span className="text-4xl font-bold">{formatPrice(priceYearly)}</span>
      <span className="text-sm ml-1 mt-4">/ Year</span>
    </div>
    <div className="mb-2 flex flex-row justify-center items-start">
      <span className="text-lg mr-1">$</span>
      <span className="text-2xl font-bold">{formatPrice(priceMonthly)}</span>
      <span className="text-sm  ml-1 mt-2">/ Month</span>
    </div>
    <ul className="text-sm">
      {features.map((feature) => (
        <li key={feature} className="mt-2">
          {feature}
        </li>
      ))}
    </ul>
    <div className="flex flex-col justify-end pt-4" style={{ flex: 1 }}>
      <button
        type="button"
        className="btn btn-primary w-full"
        onClick={() => onPurchase('yearly')}
      >
        Subscribe ${formatPrice(priceYearly)} / year
        {quantity > 1 && <span>&nbsp;&times; {quantity}</span>}
      </button>
      <button
        type="button"
        className="btn btn-primary-outline w-full mt-2"
        onClick={() => onPurchase('monthly')}
      >
        Subscribe ${formatPrice(priceMonthly)} / month
        {quantity > 1 && <span>&nbsp;&times; {quantity}</span>}
      </button>
    </div>
  </div>
);

export default Plan;
