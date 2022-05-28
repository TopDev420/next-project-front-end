import { StepType } from 'types/ui/Stepper';
import { Property } from 'types/models/Property';
import { isSubscribed } from 'lib/transformers/property';

export const filterSteps = (steps: StepType[], property: Property) => {
  if (isSubscribed(property)) {
    return steps;
  }

  return steps.filter((step) => step !== 'reservation-key');
};
