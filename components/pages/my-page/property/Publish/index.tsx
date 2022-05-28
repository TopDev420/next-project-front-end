import { useDispatch, useSelector } from 'react-redux';
import Layout from 'components/pages/my-page/property/Layout';
import IncompleteSteps from 'components/pages/my-page/property/Publish/IncompleteSteps';
import SideDescription from 'components/pages/my-page/property/Publish/SideDescription';
import {
  incompleteStepsSelector,
  isMultiplePropertySelector,
  myPageSubscriptionSelector,
} from 'lib/store/selectors/my-page/property';
import { setStep } from 'lib/store/slices/my-page/property';
import Plans from 'components/pages/my-page/property/Publish/Plans';
import Alert from 'components/Alert';
import { SUBSCRIPTION_STATUS_SUBSCRIBED } from 'constants/master-types';
import CurrentPlan from 'components/pages/my-page/property/Publish/CurrentPlan';

const Publish: typeof Layout = ({
  title = 'Choose from one of our listing plans',
  description = 'Contact us for multiple property discounts',
  sideTitle = 'Owners Love the Benefits of Membership',
  sideDescription = SideDescription,
}) => {
  const dispatch = useDispatch();
  const isMultiple = useSelector(isMultiplePropertySelector);
  const incompleteSteps = useSelector(incompleteStepsSelector);
  const subscription = useSelector(myPageSubscriptionSelector);

  return (
    <Layout
      title={title}
      description={description}
      sideTitle={sideTitle}
      sideDescription={sideDescription}
      step="publish"
    >
      {subscription?.status === SUBSCRIPTION_STATUS_SUBSCRIBED ? (
        <CurrentPlan subscription={subscription} />
      ) : (
        <>
          {isMultiple && (
            <Alert
              severity="warn"
              title="Discount for multiple property owners"
              message="Looks like you're listing multiple rooms of same type. Subscription fee is multiplied by number of rooms. Please contact us at Sales@VacaRent.com for a discounted multiroom price."
            />
          )}
          {incompleteSteps.length > 0 ? (
            <IncompleteSteps
              steps={incompleteSteps}
              onClickStep={(step) => dispatch(setStep(step))}
            />
          ) : (
            <Plans />
          )}
        </>
      )}
    </Layout>
  );
};

export default Publish;
