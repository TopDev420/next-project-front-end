import Image from 'next/image';
import SearchBox from 'components/pages/home/Banner/SearchBox';

const Banner = () => (
  <div className="banner">
    <Image
      src="https://res.cloudinary.com/vacation-rentals/image/upload/v1593874291/Vacation-home-for-rent-in-florida.jpg"
      layout="fill"
      objectFit="cover"
      alt="Vacation.Rentals"
    />
    <div className="banner__inner">
      <h1 className="banner__title">
        Vacation Rentals From Owners And Property Managers <br />
        No Fees.No Commissions.100% Verified.
      </h1>
      <SearchBox />
    </div>
  </div>
);

export default Banner;
