import ListingPanel from 'components/pages/my-page/listings/ListingPanel';
import {
  PROPERTY_STATUS_DRAFT,
  PROPERTY_STATUS_PUBLIC,
} from 'constants/master-types';

const Listings = () => (
  <div className="flex flex-col max-w-screen-lg mx-auto p-4 md:p-0">
    <ListingPanel title="Listed" status={PROPERTY_STATUS_PUBLIC} />
    <ListingPanel
      title="Unlisted"
      status={PROPERTY_STATUS_DRAFT}
      className="mt-6"
    />
  </div>
);

export default Listings;
