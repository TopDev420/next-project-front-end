import { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useMutation } from 'react-query';
import { PaymentMethodResult } from '@stripe/stripe-js';
import { Coupon } from 'types/models/Coupon';
import {
  myPagePropertyIdSelector,
  subscriptionQuantitySelector,
} from 'lib/store/selectors/my-page/property';
import * as subscriptionApi from 'lib/apis/subscription';
import { updateSubscription } from 'lib/store/slices/my-page/property';
import { formatError } from 'lib/transformers/error';
import Alert from 'components/Alert';
import Plan from 'components/pages/my-page/property/Publish/Plans/Plan';
import { Plan as PlanType } from 'components/pages/my-page/property/Publish/types';
import Checkout from 'components/pages/my-page/property/Publish/Plans/Checkout';
import config from 'config';
import HomeIcon from 'assets/images/icons/home.svg';
import HotelIcon from 'assets/images/icons/hotel.svg';

const {
  PRICE_BASIC_MONTHLY,
  PRICE_BASIC_YEARLY,
  PRICE_PRO_MONTHLY,
  PRICE_PRO_YEARLY,
} = config;

const Plans = () => {
  const dispatch = useDispatch();
  const propertyId = useSelector(myPagePropertyIdSelector);
  const quantity = useSelector(subscriptionQuantitySelector);
  const [plan, setPlan] = useState<PlanType>();

  const { data, isLoading, mutate, error, reset } = useMutation(
    subscriptionApi.saveSubscription,
  );

  const handleCheckOut = useCallback(
    ({ paymentMethod }: PaymentMethodResult, coupon?: Coupon) => {
      if (!plan) {
        return;
      }
      mutate({
        propertyId,
        productAlias: plan.product,
        priceAlias: plan.billingCycleDescriptor,
        couponCode: coupon?.stripeId,
        paymentMethodId: paymentMethod.id,
      });
    },
    [mutate, plan, propertyId],
  );

  /**
   * onSubscriptionSuccess
   */
  useEffect(() => {
    if (data) {
      dispatch(updateSubscription(data));
    }
  }, [dispatch, data]);

  /**
   * componentWillUnmount
   */
  useEffect(() => () => reset(), [reset]);

  return (
    <>
      {!!plan ? (
        <>
          {!!error && <Alert severity="danger" message={formatError(error)} />}
          <Checkout
            loading={isLoading}
            plan={plan}
            onCancel={() => setPlan(undefined)}
            onCheckOut={handleCheckOut}
          />
        </>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Plan
            name="Basic"
            priceMonthly={PRICE_BASIC_MONTHLY}
            priceYearly={PRICE_BASIC_YEARLY}
            Icon={HomeIcon}
            features={[
              '➕ Property management software',
              '➕ iCal feed import/export',
              '➕ Availability calendar',
            ]}
            quantity={quantity}
            onPurchase={(priceName) =>
              setPlan({
                product: 'basic',
                billingCycleDescriptor: priceName,
                price:
                  priceName === 'monthly'
                    ? PRICE_BASIC_MONTHLY
                    : PRICE_BASIC_YEARLY,
                quantity,
              })
            }
          />
          <Plan
            name="Pro"
            priceMonthly={PRICE_PRO_MONTHLY}
            priceYearly={PRICE_PRO_YEARLY}
            Icon={HotelIcon}
            features={[
              '✅ Everything Included in Basic Plan',
              '✅ Reservation Key integration',
              '✅ Ranks highest in search results',
              '✅ Featured on home page',
              '✅ Five-page website',
            ]}
            quantity={quantity}
            onPurchase={(priceName) =>
              setPlan({
                product: 'pro',
                billingCycleDescriptor: priceName,
                price:
                  priceName === 'monthly'
                    ? PRICE_PRO_MONTHLY
                    : PRICE_PRO_YEARLY,
                quantity,
              })
            }
          />
        </div>
      )}
    </>
  );
};
export default Plans;
