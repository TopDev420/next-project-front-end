import { useContext } from 'react';
import { useSelector } from 'react-redux';
import Link from 'next/link';
import { PropertyContext } from 'components/pages/rooms/[id]/PropertyProvider';
import LocationTags from 'components/pages/rooms/[id]/Header/LocationTags';
import Tabs from 'components/pages/rooms/[id]/Header/Tabs';
import Alert from 'components/Alert';
import { currentUserSelector } from 'lib/store/selectors/user';
import {
  PROPERTY_STATUS_PUBLIC,
  SUBSCRIPTION_STATUS_SUBSCRIBED,
} from 'constants/master-types';
import { getMyPagePropertyStepRoute } from 'lib/helpers/route';

const Header = () => {
  const property = useContext(PropertyContext);
  const user = useSelector(currentUserSelector);

  const showUnsubscribedWarning =
    property.userId === user?.id &&
    property?.subscription?.status !== SUBSCRIPTION_STATUS_SUBSCRIBED;

  const showUnpublishedWarning =
    property.userId === user?.id &&
    property?.subscription?.status === SUBSCRIPTION_STATUS_SUBSCRIBED &&
    property.status !== PROPERTY_STATUS_PUBLIC;

  const alertMessage = showUnsubscribedWarning ? (
    <span className="mt-1 text-sm">
      <Link href={getMyPagePropertyStepRoute(property.id, 'publish')}>
        <a className="hover:underline">Please subscribe to one of our plans</a>
      </Link>{' '}
      to make it publicly visible to guests and search engines
    </span>
  ) : (
    <span className="mt-1 text-sm">
      You can change its visibility in{' '}
      <Link href="/dashboard">
        <a className="hover:underline">dashboard</a>
      </Link>{' '}
      to make it publicly visible to guests and search engines
    </span>
  );

  return (
    <div className="flex flex-col">
      {(showUnsubscribedWarning || showUnpublishedWarning) && (
        <Alert
          className="mt-4"
          severity="warn"
          title="This property is only visible to you"
          message={alertMessage}
        />
      )}
      <h1 className="my-2">{property?.title}</h1>
      <LocationTags
        city={property?.location?.city}
        state={property?.location?.state}
        countryCode={property?.location?.countryCode}
      />
      <Tabs />
    </div>
  );
};

export default Header;
