import { createSelector } from '@reduxjs/toolkit';
import { getIncompleteSteps } from 'lib/transformers/property';
import { RootState } from 'types/store';

export const myPagePropertySelector = (state: RootState) =>
  state.myPage.property.value;

export const myPagePropertyIdSelector = createSelector(
  myPagePropertySelector,
  (state) => state?.id,
);

export const myPagePropertyStepSelector = (state: RootState) =>
  state.myPage.property.step;

export const incompleteStepsSelector = createSelector(
  myPagePropertySelector,
  getIncompleteSteps,
);

export const isMultiplePropertySelector = createSelector(
  myPagePropertySelector,
  (state) => state?.roomsCount > 1,
);

export const subscriptionQuantitySelector = createSelector(
  myPagePropertySelector,
  (state) => state?.roomsCount || 1,
);

export const myPageSubscriptionSelector = createSelector(
  myPagePropertySelector,
  (state) => state?.subscription,
);
