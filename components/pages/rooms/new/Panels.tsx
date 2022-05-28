import ListYourHomePanel from 'components/pages/rooms/new/ListYourHomePanel';
import Handshake from 'assets/images/handshake.svg';
import Convenience from 'assets/images/host-guarantee.svg';
import Lock from 'assets/images/lock.svg';

const Panels = () => (
  <div className="flex flex-col md:flex-row mt-10 mb-20">
    <ListYourHomePanel
      icon={Handshake}
      title="Trust & Experience"
      description="As property owners ourselves, we at Vacation.Rentals are well versed in the vacation rental industry. You can trust that we will provide you with the marketing tools and resources you need most when listing your properties."
    />
    <ListYourHomePanel
      icon={Convenience}
      title="Convenience"
      description="Your time is priceless. Listing with Vacation.Rentals saves your valuable time, allowing you to focus on what’s most important: Making sure your guests have the best experience possible"
    />
    <ListYourHomePanel
      icon={Lock}
      title="Exposure"
      description="Get the word out and showcase your property to our large community of guests, giving you the exposure you need to fill your vacancies."
    />
  </div>
);

export default Panels;
