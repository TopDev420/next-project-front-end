import {
  PLAN_PRO_MONTHLY_ID,
  PLAN_PRO_YEARLY_ID,
  SUBSCRIPTION_STATUS_SUBSCRIBED,
} from 'constants/master-types';
import { Property } from 'types/models/Property';

export const isPropertySubscribedPro = (
  property: Property | null | undefined,
) =>
  property &&
  property.subscription &&
  property.subscription.status === SUBSCRIPTION_STATUS_SUBSCRIBED &&
  (property.subscription.planId === PLAN_PRO_MONTHLY_ID ||
    property.subscription.planId === PLAN_PRO_YEARLY_ID);
