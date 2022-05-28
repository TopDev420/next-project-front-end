/* eslint-disable react/no-unescaped-entities */
import Image from 'next/image';

const ShoutOut = () => (
  <div className="shoutOut">
    <Image
      layout="fill"
      objectFit="cover"
      alt="The Vacation MatchMaker"
      src="https://res.cloudinary.com/vacation-rentals/image/upload/v1583534073/images/rooms/11753/1583534072_1520.jpg"
    />
    <div className="shoutOut__overlay" />
    <div className="shoutOut__inner">
      <Image
        layout="fixed"
        width={140}
        height={140}
        alt="Vacation.Rentals"
        src="https://res.cloudinary.com/vacation-rentals/image/upload/v1553980443/images/vr-icon-white.png"
      />
      <div className="mb-6" />
      <h2 className="shoutOut__title">
        Communicate directly with each other{' '}
        <span className="px-2 py-0.5 md:px-3 md:py-2 bg-blue-500">BEFORE</span>{' '}
        the reservation is made
      </h2>
      <h3 className="text-white mb-3 text-2xl">
        We think of ourselves as "The Vacation Matchmaker!"
      </h3>
      <p className="text-white text-xl">
        We just make the introductions and leave the rest to you - the homeowner
        and traveler.
      </p>
    </div>
  </div>
);

export default ShoutOut;
