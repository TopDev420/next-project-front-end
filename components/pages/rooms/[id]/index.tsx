import Gallery from 'components/pages/rooms/[id]/Gallery';
import Header from 'components/pages/rooms/[id]/Header';
import Booking from 'components/pages/rooms/[id]/Booking';
import Info from 'components/pages/rooms/[id]/Info';
import SimilarListings from 'components/pages/rooms/[id]/SimilarListings';
import Calendar from 'components/pages/rooms/[id]/Calendar';

const PropertyPage = () => (
  <div className="propertyPage container mx-auto px-6">
    <Header />
    <div className="my-4 flex flex-col lg:flex-row">
      <div className="w-full lg:w-2/3 mb-4 lg:mb-0">
        <Gallery />
        <Info />
      </div>
      <div className="w-full lg:w-1/3">
        <Booking />
        <Calendar />
      </div>
    </div>

    <SimilarListings />
  </div>
);

export default PropertyPage;
