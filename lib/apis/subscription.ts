import _ from 'lodash';
import { SubscriptionInput } from 'lib/forms/subscription';
import { del, post, put } from 'lib/helpers/api';
import { Subscription } from 'types/models/Subscription';

export const saveSubscription = (input: SubscriptionInput) => {
  if (input.id) {
    return put<Subscription>(`subscription/${input.id}`, _.omit(input, 'id'));
  }

  return post<Subscription>('subscription', input);
};

export const unsubscribe = (id: number) =>
  del<Subscription>(`subscription/${id}`);
