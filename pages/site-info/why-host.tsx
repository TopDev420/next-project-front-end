import { NextPage } from 'next';

const WhyHost: NextPage = () => (
  <div className="container mx-auto mb-6 why-host">
    <h1 className="text-center mb-6">EARN MONEY WITH VACATION.RENTALS</h1>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pr-5 py-6">
      <div className="p-3">
        <img
          className="mx-auto key-image"
          alt="why-host"
          src="https://res.cloudinary.com/vacation-rentals/image/upload/v1642858722/reservation.jpg"
        />
      </div>
      <div className="p-3 md:p-6">
        One of the major reasons given when travelers were surveyed about their
        reason for renting a private home instead of staying in an extended stay
        or resort was the convenience of having a kitchen. In every survey
        taken, the kitchen always came in #1 for the responses. Given this, it
        is no wonder the short term rental market has simply exploded. You as a
        vacation homeowner are sitting on a highly profitable revenue generating
        machine. Every home is an opportunity. Every location is needed.
        Travelers search far and wide to find suitable lodging for their
        vacations and short trips.
      </div>
    </div>
    <div className="mt-6 pb-6">
      <div className="mb-6 pt-4">
        <h2 className="pl-6">What's in a listing</h2>
        <p className="mt-3 px-3">
          Just the basics really and not much more. You simply and accurately
          list your home on our site, upload images, give a great description
          and set your rates and availability. After that it is just a case of
          responding to your inquiries and nothing more.
        </p>
      </div>
      <div className="mb-6 pt-4">
        <h2 className="pl-6">Who can book</h2>
        <p className="mt-3 px-3">
          You are in charge and set the rules for who can stay and at what
          amount.
        </p>
      </div>
      <div className="mb-6 pt-4">
        <h2 className="pl-6">We're here to help</h2>
        <p className="mt-3 px-3">
          Vacation.Rentals provides tips and help along the way. From getting
          your home listed to helping you interact quicker with your guests. We
          will run the advertisement, make the videos, create the business
          cards, funnel your listing to the social media sites and much more.
          You take care of your customers and we will take care of you.
        </p>
      </div>
    </div>
  </div>
);

export default WhyHost;
