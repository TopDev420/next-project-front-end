import React, { useMemo } from 'react';
import { useSelector } from 'react-redux';
import Item from 'components/pages/my-page/property/Stepper/Item';
import { OPTIONAL_STEPS, STEPS } from 'constants/steps';
import { StepType } from 'types/ui/Stepper';
import useIsMobile from 'lib/hooks/ui/useIsMobile';
import { myPagePropertySelector } from 'lib/store/selectors/my-page/property';
import { getIncompleteSteps, isStepCompleted } from 'lib/transformers/property';
import HomeIcon from 'assets/images/icons/home.svg';
import DescriptionIcon from 'assets/images/icons/description.svg';
import MapIcon from 'assets/images/icons/map.svg';
import HotTubIcon from 'assets/images/icons/hot-tub.svg';
import PhotoIcon from 'assets/images/icons/add-a-photo.svg';
import VideoIcon from 'assets/images/icons/video-call.svg';
import DollarIcon from 'assets/images/icons/dollar-sign.svg';
import CalendarIcon from 'assets/images/icons/calendar.svg';
import VerifiedIcon from 'assets/images/icons/verified.svg';
import CreditCardIcon from 'assets/images/icons/credit-card.svg';
import KeyIcon from 'assets/images/icons/key.svg';
import { isPropertySubscribedPro } from 'lib/helpers/util';

const STYLES = {
  basics: {
    icon: HomeIcon,
    title: 'Basics',
  },
  description: {
    icon: DescriptionIcon,
    title: 'Description',
  },
  location: {
    icon: MapIcon,
    title: 'Location',
  },
  amenities: {
    icon: HotTubIcon,
    title: 'Amenities',
  },
  photos: {
    icon: PhotoIcon,
    title: 'Photos',
  },
  video: {
    icon: VideoIcon,
    title: 'Video',
  },
  fees: {
    icon: DollarIcon,
    title: 'Taxes and Fees',
  },
  calendar: {
    icon: CalendarIcon,
    title: 'Rates and Availability',
  },
  'reservation-key': {
    icon: KeyIcon,
    title: 'Reservation Key',
  },
  terms: {
    icon: VerifiedIcon,
    title: 'Terms',
  },
  publish: {
    icon: CreditCardIcon,
    title: 'Publish',
  },
};

export type StepperProps = {
  step?: StepType;
  onChange?: (step: StepType) => void;
};

const Stepper: React.FC<StepperProps> = ({
  step: value,
  onChange = () => {},
}) => {
  const property = useSelector(myPagePropertySelector);
  const isMobile = useIsMobile();
  const missingSteps = getIncompleteSteps(property).length;
  //   const steps = filterSteps(STEPS, property);
  const steps = useMemo(() => {
    if (isPropertySubscribedPro(property)) return STEPS;
    return STEPS.filter((step) => step !== 'reservation-key');
  }, [property]);

  if (!isMobile) {
    return (
      <>
        <ul>
          {steps.map((step) => (
            <Item
              key={step}
              title={STYLES[step].title}
              icon={STYLES[step].icon}
              onClick={() => onChange(step)}
              completed={isStepCompleted(property, step)}
              optional={OPTIONAL_STEPS.includes(step as any)}
              active={step === value}
            />
          ))}
        </ul>
        {missingSteps > 0 ? (
          <div className="text-sm p-4 text-gray-700">
            Only {missingSteps} {missingSteps > 1 ? 'steps' : 'step'} away from
            publishing
          </div>
        ) : (
          <div className="text-sm p-4 text-blue-700">You are all set!</div>
        )}
      </>
    );
  }

  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value as StepType)}
      className="w-full p-2"
      placeholder="Please select a step"
    >
      {steps.map((step) => (
        <option key={step} value={step}>
          {STYLES[step].title}
        </option>
      ))}
    </select>
  );
};

export default Stepper;
