import { StepType } from 'types/ui/Stepper';

export const STEPS: StepType[] = [
  'basics',
  'description',
  'location',
  'amenities',
  'photos',
  'video',
  'fees',
  'calendar',
  'reservation-key',
  'terms',
  'publish',
];

export const OPTIONAL_STEPS = ['video', 'terms'] as const;
