/* eslint-disable react/no-unescaped-entities */
import Card from 'components/pages/home/Discovery/Card';

const Discovery = () => (
  <div className="discovery">
    <div className="discovery__wrapper">
      <h2 className="discovery__title">
        Vacation rentals in popular destinations
      </h2>
      <p className="discovery__description">
        Why stay in a cramped-up hotel room when you can stay in one of our
        vacation rental properties direct from a local homeowner? When you
        inquire about one of our listings, you are dealing directly with the
        actual homeowner or property manager. All contracts, directions,
        information, payments and assistance are handled by the person who knows
        it best – the homeowner! We just make the introductions and leave the
        rest to you
      </p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 my-8">
        <Card
          title="Great Homes"
          image="https://res.cloudinary.com/vacation-rentals/image/upload/v1553978125/images/vc_rj_1.jpg"
          description={
            <>
              Find out what it's like to stay at the top of a mountain or right
              on the beach. <a href="#">Find a private home for rent</a> that
              has everything you want and more.
            </>
          }
        />
        <Card
          title="#1 Search Term"
          image="https://res.cloudinary.com/vacation-rentals/image/upload/v1553978138/images/vc_rj_3.jpg"
          description={`Travelers find homes for rent by searching for the number 1 search term in the world - "Vacation Rentals". Help travelers find yours by listing with us.`}
        />
        <Card
          title="Interact Direct"
          image="https://res.cloudinary.com/vacation-rentals/image/upload/v1553978147/images/vc_rj_6.jpg"
          description="We filter nothing. Customers and homeowners are free to interact with each other instantly with no fear of their contact information being scrubbed."
        />
        <Card
          title="Verified Listings"
          image="https://res.cloudinary.com/vacation-rentals/image/upload/v1553978159/images/vc_rj_2.jpg"
          description={`Every home that is listed on our site is verified prior to activation by the site administrator. What you reserve is what you will get. We do not allow "bait and switch" tactics.`}
        />
        <Card
          title="No Commissions"
          image="https://res.cloudinary.com/vacation-rentals/image/upload/v1553978166/images/vc_rj_5.jpg"
          description="Homeowners and property managers never need to worry about commissions when listing with us. Ours is a straight forward annual membership and nothing more."
        />
        <Card
          title="No traveler fees"
          image="https://res.cloudinary.com/vacation-rentals/image/upload/v1553978173/images/vc_rj_4.jpg"
          description={
            <>
              We never charge travelers for making a reservation through our
              site. All expenses are paid by the listing owner with nothing else
              due.
              <a href="#">Book with confidence and enjoy your vacation.</a>
            </>
          }
        />
      </div>
    </div>
  </div>
);

export default Discovery;
