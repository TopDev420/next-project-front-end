import React, { useRef, useEffect } from 'react';
import Image from 'next/image';
import Stepper from 'components/pages/my-page/property/Stepper';
import { StepType } from 'types/ui/Stepper';
import PropertyHelp from 'assets/images/property_help.png';
import { useDispatch, useSelector } from 'react-redux';
import { renderStringOrComponent } from 'lib/helpers/ui';
import { useRouter } from 'next/router';
import {
  myPagePropertyIdSelector,
  myPagePropertySelector,
  myPagePropertyStepSelector,
} from 'lib/store/selectors/my-page/property';
import { getMyPagePropertyStepRoute } from 'lib/helpers/route';
import { setStep } from 'lib/store/slices/my-page/property';
import { currentUserSelector } from 'lib/store/selectors/user';

export type LayoutProps = {
  step?: StepType;
  // onStepChange?: (step: StepType) => void;
  title?: string | React.FunctionComponent;
  description?: string | React.FunctionComponent;
  sideTitle?: string | React.FunctionComponent;
  sideDescription?: string | React.FunctionComponent;
  hideTopBar?: boolean;
  hideSideBar?: boolean;
  // onSkip?: () => void;
  // onSave?: (isContinuing: boolean) => void;
};

const Layout: React.FC<LayoutProps> = ({
  title,
  description,
  sideTitle,
  sideDescription,
  hideTopBar = false,
  hideSideBar = false,
  children,
  step = 'basics',
}) => {
  const dispatch = useDispatch();
  const firstRenderRef = useRef(true);
  const updatedStep = useSelector(myPagePropertyStepSelector);
  const propertyId = useSelector(myPagePropertyIdSelector);
  const router = useRouter();
  const user = useSelector(currentUserSelector);
  const property = useSelector(myPagePropertySelector);

  useEffect(() => {
    if (property && user && user.id !== property.userId) {
      router.push('/404');
    }
  }, [user, property, router]);

  useEffect(() => {
    if (step !== updatedStep) {
      if (firstRenderRef.current) {
        dispatch(setStep(step));
      } else if (propertyId) {
        router.push(
          getMyPagePropertyStepRoute(propertyId, updatedStep),
          undefined,
          { shallow: true },
        );
        firstRenderRef.current = true;
      }
    }
    firstRenderRef.current = false;
  }, [dispatch, propertyId, router, step, updatedStep]);

  return (
    <div className="flex flex-col md:flex-row bg-blue-50 myPageProperty">
      <div className="md:flex-initial p-4 myPageProperty__stepper">
        <div className="bg-white shadow-lg">
          <Stepper
            step={step}
            onChange={(newStep) => dispatch(setStep(newStep))}
          />
        </div>
      </div>

      <div className="flex flex-col md:flex-1 p-4 myPageProperty__content">
        {!hideTopBar && (
          <div className="bg-white p-4 shadow-lg mb-8">
            {renderStringOrComponent(title, 'h1', 'mb-4')}
            {renderStringOrComponent(description, 'p')}
          </div>
        )}
        {children}
      </div>

      {!hideSideBar && (
        <div className="md:flex md:flex-col p-4 w-72 myPageProperty__side">
          <div className="bg-white p-4 shadow-lg">
            <div className="mb-2">
              <Image
                width={75}
                height={75}
                alt="Property help"
                src={PropertyHelp.src}
              />
            </div>
            {renderStringOrComponent(sideTitle, 'h2', 'mb-4')}
            {renderStringOrComponent(sideDescription, 'p')}
          </div>
        </div>
      )}
    </div>
  );
};

export default Layout;
