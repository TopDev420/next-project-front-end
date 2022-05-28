import { STEPS } from 'constants/steps';
import { myPagePropertyStepSelector } from 'lib/store/selectors/my-page/property';
import { useDispatch, useSelector } from 'react-redux';
import { useMemo, useCallback } from 'react';
import { nextStep, prevStep } from 'lib/store/slices/my-page/property';

const useStep = () => {
  const dispatch = useDispatch();
  const step = useSelector(myPagePropertyStepSelector);
  const isFirst = useMemo(() => step === STEPS[0], [step]);
  const isLast = useMemo(() => step === STEPS[STEPS.length - 1], [step]);
  const onPrev = useCallback(() => {
    dispatch(prevStep());
  }, [dispatch]);
  const onSkip = useCallback(() => {
    dispatch(nextStep());
  }, [dispatch]);

  return { isFirst, isLast, onPrev, onSkip } as const;
};

export default useStep;
