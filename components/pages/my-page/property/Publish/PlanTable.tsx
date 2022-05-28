import React from 'react';
import _ from 'lodash';
import { Plan } from 'components/pages/my-page/property/Publish/types';
import { Coupon } from 'types/models/Coupon';
import * as priceTransformer from 'lib/transformers/price';
import { formatNumber, formatPrice } from 'lib/helpers/number';

type PlanTableProps = Plan & Pick<Coupon, 'discount' | 'discountModifierId'>;

const formatPriceOption = {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
};

const PlanTable: React.FC<PlanTableProps> = ({
  product,
  price,
  quantity,
  billingCycleDescriptor,
  discount,
  discountModifierId,
}) => {
  const subtotal = price * quantity;

  const total = (() => {
    if (!discount || !discountModifierId) {
      return subtotal;
    }
    return priceTransformer.applyDiscount(
      subtotal,
      discountModifierId,
      discount,
    );
  })();

  return (
    <div className="overflow-x-auto">
      <table className="w-full my-4">
        <thead>
          <tr className="border-b-2">
            <th className="py-1">Plan</th>
            <th className="py-1">Price</th>
            {quantity > 1 && <th className="py-1">Quantity</th>}
            <th className="py-1">Subtotal</th>
            <th className="py-1">Billing Cycle</th>
          </tr>
        </thead>
        <tbody>
          <tr className="text-center">
            <td className="uppercase py-1">{product}</td>
            <td className="py-1">{formatPrice(price, formatPriceOption)}</td>
            {quantity > 1 && <td className="py-1">{formatNumber(quantity)}</td>}
            <td className="py-1">
              {!!discount && (
                <del className="mr-1 text-sm">
                  {formatPrice(subtotal, formatPriceOption)}
                </del>
              )}
              {formatPrice(total, formatPriceOption)}
            </td>
            <td className="py-1">{_.capitalize(billingCycleDescriptor)}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default PlanTable;
