import React, { useContext, useEffect } from 'react';
import { useMutation } from 'react-query';
import { useDispatch, useSelector } from 'react-redux';
import dayjs from 'dayjs';
import { subscriptionQuantitySelector } from 'lib/store/selectors/my-page/property';
import { Subscription } from 'types/models/Subscription';
import { findMasterTypeById } from 'constants/master-types';
import Alert from 'components/Alert';
import PlanTable from 'components/pages/my-page/property/Publish/PlanTable';
import {
  getPlanPrice,
  getPriceDescriptor,
  getProductDescriptor,
} from 'lib/transformers/price';
import * as couponTransformer from 'lib/transformers/coupon';
import * as subscriptionApi from 'lib/apis/subscription';
import { updateSubscription } from 'lib/store/slices/my-page/property';
import { formatError } from 'lib/transformers/error';
import Plans from 'static/plan.json';
import { ConfirmContext } from 'components/Modal/Provider/ConfirmProvider';

type CurrentPlanProps = {
  subscription: Subscription;
};

const CurrentPlan: React.FC<CurrentPlanProps> = ({ subscription }) => {
  const dispatch = useDispatch();
  const quantity = useSelector(subscriptionQuantitySelector);
  const plan = findMasterTypeById(Plans, subscription.planId);

  const confirm = useContext(ConfirmContext);

  const { data, isLoading, reset, error, mutate } = useMutation(
    subscriptionApi.unsubscribe,
  );

  const handleCancel = () => {
    confirm({
      title: 'Do you really want to cancel this subscription?',
      message:
        'Your listing will be removed from public view and search engine.',
      callback: () => mutate(subscription.id),
    });
  };

  /**
   * onUnsubscribeSuccess
   */
  useEffect(() => {
    if (data) {
      dispatch(updateSubscription(data));
    }
  }, [data, dispatch]);

  /**
   * componentWillUnmount
   */
  useEffect(() => () => reset(), [reset]);

  return (
    <div className="bg-white p-6 shadow-lg">
      <h3>Current Plan</h3>
      {!!error && <Alert severity="danger" message={formatError(error)} />}
      <div className="mt-4 text-sm">
        <p>
          Subscribed At: {dayjs(subscription.createdAt).format('MM/DD/YYYY')}
        </p>
        {!!subscription.trialPeriod && (
          <p>
            Trial Ends At:
            {dayjs(subscription.createdAt)
              .add(subscription.trialPeriod, 'date')
              .format('MM/DD/YYYY')}
          </p>
        )}
        {!!subscription.discount && (
          <p>
            Applied Discount:
            {couponTransformer.toDisplayText(subscription)}
          </p>
        )}
      </div>
      {!!plan && (
        <PlanTable
          product={getProductDescriptor(plan.id)}
          price={getPlanPrice(plan.id)}
          billingCycleDescriptor={getPriceDescriptor(plan?.id)}
          quantity={quantity}
          discount={subscription.discount}
          discountModifierId={subscription.discountModifierId}
        />
      )}
      <div className="mt-4 text-right">
        <button
          disabled={isLoading}
          type="button"
          className="btn btn-dark"
          onClick={handleCancel}
        >
          Cancel this Subscription
        </button>
      </div>
    </div>
  );
};

export default CurrentPlan;
