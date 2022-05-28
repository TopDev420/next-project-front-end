import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useMutation } from 'react-query';
import { PaymentMethodResult } from '@stripe/stripe-js';
import _ from 'lodash';
import * as propertyApi from 'lib/apis/property';
import { Plan } from 'components/pages/my-page/property/Publish/types';
import CardForm from 'components/pages/my-page/property/Publish/CardForm';
import useDebounce from 'lib/hooks/useDebounce';
import { myPagePropertyIdSelector } from 'lib/store/selectors/my-page/property';
import * as couponTransformer from 'lib/transformers/coupon';
import { formatError } from 'lib/transformers/error';
import { Coupon } from 'types/models/Coupon';
import PlanTable from 'components/pages/my-page/property/Publish/PlanTable';

type CheckoutProps = {
  loading?: boolean;
  plan: Plan;
  onCheckOut: (
    paymenMethodResult: PaymentMethodResult,
    coupon?: Coupon,
  ) => void;
  onCancel: () => void;
};

const Checkout: React.FC<CheckoutProps> = ({
  loading = false,
  plan,
  onCheckOut,
  onCancel,
}) => {
  const propertyId = useSelector(myPagePropertyIdSelector);
  const [couponCode, setCouponCode] = useState('');
  const debouncedCouponCode = useDebounce(couponCode);

  const {
    data: coupon,
    error,
    mutate,
    reset,
  } = useMutation(propertyApi.getCouponInfo);

  /**
   * get coupon info for debounced coupon code
   */
  useEffect(() => {
    if (!propertyId || !debouncedCouponCode || debouncedCouponCode.length < 5) {
      return;
    }
    mutate({
      propertyId,
      couponCode: debouncedCouponCode,
    });
  }, [debouncedCouponCode, mutate, propertyId]);

  useEffect(() => () => reset(), [reset]);

  return (
    <div className="bg-white p-6 shadow-lg">
      <h3>Checkout</h3>
      <PlanTable
        {...plan}
        discount={coupon?.discount}
        discountModifierId={coupon?.discountModifierId}
      />
      <div className="flex flex-col md:flex-row">
        <div className="flex-1 md:mr-4 mb-3">
          <CardForm
            id="formCheckout"
            onChange={(pm) => onCheckOut(pm, coupon)}
          />
        </div>
        <div className="flex-1 mb-3">
          <h3 className="mb-4">Coupon</h3>
          <input
            type="text"
            className="p-2 border border-black w-full"
            value={couponCode}
            onChange={(e) => setCouponCode(e.target.value)}
          />
          {!!coupon && (
            <div className="text-sm text-gray-600 mt-2">
              {!!coupon.name && <strong>{coupon.name}: </strong>}
              {couponTransformer.toDisplayText(coupon)} OFF
            </div>
          )}
          {!!error && (
            <div className="text-sm text-red-500 mt-2">
              {formatError(error)}
            </div>
          )}
        </div>
      </div>
      <div className="mt-4 flex flex-row justify-end">
        <button type="button" className="btn btn-dark mr-2" onClick={onCancel}>
          Cancel
        </button>
        <input
          disabled={loading}
          type="submit"
          className="btn btn-primary"
          form="formCheckout"
          value="Check Out"
        />
      </div>
    </div>
  );
};

export default Checkout;
