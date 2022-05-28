import { NextPage } from 'next';

const BestPriceGurantee: NextPage = () => (
  <div className="best-price-guarantee">
    <div className="container px-4 md:px-0 mx-auto py-6">
      <h1 className="my-3 text-center">
        Save even MORE money with our Best Price Guarantee!
      </h1>
      <div className="text-content">
        <p className="my-3 text-justify">
          Everyone loves a bargain and we enjoy helping you save money.
        </p>
        <p className="my-3 text-justify">
          With our Best Price Guarantee (BPG), exclusively from Vacation Rentals
          By VacaRent, you can gain even greater savings! This is our promise to
          you: The vacation rental listing you find on our site will feature the
          lowest price for that exact property and time period than you will
          find published anywhere else on the internet. Simply look for this
          symbol next for each participating listing and book with confidence
          that you are getting the lowest price anywhere!
        </p>
        <img
          alt="bill"
          src="https://res.cloudinary.com/vacation-rentals/image/upload/v1583239780/BPG.jpg"
          className="mx-auto"
        />
        <p className="my-3 text-justify">
          While the BPG is a voluntary program, those partners awarded this
          badge certify that their daily rates will be at least 2% or more below
          any other published rates for their vacation home. You won’t find
          other sites offering this type of guarantee!
        </p>
        <p className="my-3 text-justify">
          On our website, we further guarantee you will NEVER pay:
        </p>
        <ul className="list-disc pl-8">
          <li>
            <strong>Service fees</strong> - Really? What was the “Service”
            exactly?
          </li>
          <li>
            <strong>Booking Fees/Commissions</strong> - Take from the host -
            take from the traveler
          </li>
          <li>
            <strong>Convenience fees</strong> - “We allow you to look at our
            site so therein lies the ‘convenience’.”
          </li>
        </ul>
        <p className="my-3 text-justify">
          You already know that VRBO™, AirBNB™, FlipKey™, and many other booking
          sites charge you more for the identical property that you found here
          on www.vacation.rentals. Why should you pay more for those sites to
          pad their corporate profits with fees disguised as “convenience fees”,
          “service fees”, or “booking fees” that provide no added benefit? We
          feel you should take a vacation – not be taken!
        </p>
        <img
          alt="gurantee-sample"
          className="w-full mt-8"
          src="https://res.cloudinary.com/vacation-rentals/image/upload/v1583596130/best-price-guarantee-sample.jpg"
        />
      </div>
    </div>
  </div>
);

export default BestPriceGurantee;
