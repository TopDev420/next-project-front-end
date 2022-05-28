import {
  PLAN_BASIC_MONTHLY_ID,
  PLAN_BASIC_YEARLY_ID,
  PLAN_PRO_MONTHLY_ID,
  PLAN_PRO_YEARLY_ID,
  SUBSCRIPTION_STATUS_CANCELLED,
  SUBSCRIPTION_STATUS_PAUSED,
  SUBSCRIPTION_STATUS_SUBSCRIBED,
} from 'constants/master-types';

export const getPlanName = (planId: number) => {
  if (planId === PLAN_BASIC_MONTHLY_ID || planId === PLAN_BASIC_YEARLY_ID) {
    return 'Basic';
  }
  if (planId === PLAN_PRO_MONTHLY_ID || planId === PLAN_PRO_YEARLY_ID) {
    return 'Pro';
  }

  return 'Unsubscribed';
};

export const getSubscriptionStatusDisplayText = (status: number) => {
  if (status === SUBSCRIPTION_STATUS_CANCELLED) {
    return 'Cancelled';
  }
  if (status === SUBSCRIPTION_STATUS_PAUSED) {
    return 'Paused';
  }
  if (status === SUBSCRIPTION_STATUS_SUBSCRIBED) {
    return 'Subscribed';
  }
  return '';
};
