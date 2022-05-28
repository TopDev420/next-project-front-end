import StepBox from 'components/pages/company/features/StepBox';
import WordContent from 'components/pages/company/features/WordContent';
import { NextPage } from 'next';

const Features: NextPage = () => (
  <div className="company-features">
    <div className="container-fluid relative mb-6">
      <div className="media-container relative flex justify-center">
        <div className="bg-source pos-absolute-0">
          <div className="bg-img bg-no-repeat bg-cover pos-absolute-0" />
          <div className="bg-overlay pos-absolute-0" />
          <div className="bg-overlay-gloss" />
        </div>
        <div className="media-content flex flex-col justify-center">
          <div className="text-center svg-text relative">
            <svg
              height="70"
              width="400"
              xmlnsXlink="http://www.w3.org/2000/svg"
            >
              <rect x="0" y="0" height="70" width="400" />
            </svg>
            <div className="content-features pos-absolute-0 text-white w-100 h-100">
              <span className="text-white inline-block">Features</span>
              <h2 className="mt-5 about-us">About Us</h2>
              <p className="mt-2">Great features - low costs</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div className="container mx-auto py-6">
      <div className="step-boxes grid grid-cols-1 lg:grid-cols-3">
        <div className="p-5 pl-5 md:pl-0">
          <StepBox
            img="https://res.cloudinary.com/vacation-rentals/image/upload/v1584982684/bookingautomation.jpg"
            title="Get a Free Property Management Software"
            content="We are the only online travel agency in the world to offer a free property management system"
          />
        </div>
        <div className="p-5">
          <StepBox
            img="https://res.cloudinary.com/vacation-rentals/image/upload/v1584979699/Channel_resource_manager_for_airbnb_vrbo_expedia_vacation_rentals.jpg"
            title="Integrate with other Platforms"
            content="Fully integrate your listing with other online travel agencies and never worry about double bookings again"
          />
        </div>
        <div className="p-5">
          <StepBox
            img="https://res.cloudinary.com/vacation-rentals/image/upload/v1584979699/Monthly.jpg"
            title="Membership that Fits your Budget"
            content="Choose the membership plan that works for you and your company with either monthly or annual memberhsip"
          />
        </div>
      </div>
    </div>

    <div className="container mx-auto py-6">
      <div className="features-section p-5 pl-0">
        <div className="shadow-2xl p-10">
          <div className="title-div pb-5 border-0 border-b border-solid">
            <h4 className="font-bold">Features</h4>
          </div>
          <div className="features-content mt-8">
            <h1>SIDE BY SIDE, THERE IS SIMPLY, NO COMPARISON</h1>
            <img
              className="w-full py-5"
              alt="side-by-side"
              src="https://res.cloudinary.com/vacation-rentals/image/upload/v1546482976/Artemova.vacation.rentals/images/Compare-side-by-side-different-vacation-rental-websites.jpg"
            />
            <h2 className="my-2">LOOK AT WHAT WE OFFER</h2>
            <h4 className="uppercase">
              We understand we are a new site – no debate there. but, we are a
              motivated company that intends to change the way vacationers find
              their homes and owners list their homes. look at the chart below
              and see how we compare
            </h4>
            <div className="features-table">
              <table className="mt-5 border-collapse border">
                <thead>
                  <tr>
                    <th className="border p-4">Features</th>
                    <th className="border p-4">AirBNB©</th>
                    <th className="border p-4">VRBO©</th>
                    <th className="border p-4">Vacation.Rentals©</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border p-4">Property Management Software</td>
                    <td className="border p-4" />
                    <td className="border p-4" />
                    <td className="border p-4">✓</td>
                  </tr>
                  <tr>
                    <td className="border p-4">Channel Resource Manager</td>
                    <td className="border p-4" />
                    <td className="border p-4" />
                    <td className="border p-4">✓</td>
                  </tr>
                  <tr>
                    <td className="border p-4">Image Gallery</td>
                    <td className="border p-4">✓</td>
                    <td className="border p-4">✓</td>
                    <td className="border p-4">✓</td>
                  </tr>
                  <tr>
                    <td className="border p-4">Technical Staff</td>
                    <td className="border p-4">✓</td>
                    <td className="border p-4">✓</td>
                    <td className="border p-4">✓</td>
                  </tr>
                  <tr>
                    <td className="border p-4">Google Maps</td>
                    <td className="border p-4">✓</td>
                    <td className="border p-4">✓</td>
                    <td className="border p-4">✓</td>
                  </tr>
                  <tr>
                    <td className="border p-4">Reviews</td>
                    <td className="border p-4">✓</td>
                    <td className="border p-4">✓</td>
                    <td className="border p-4">✓</td>
                  </tr>
                  <tr>
                    <td className="border p-4">iCal Import</td>
                    <td className="border p-4">✓</td>
                    <td className="border p-4">✓</td>
                    <td className="border p-4">✓</td>
                  </tr>
                  <tr>
                    <td className="border p-4">Host commission</td>
                    <td className="border p-4">✓</td>
                    <td className="border p-4">✓</td>
                    <td className="border p-4" />
                  </tr>
                  <tr>
                    <td className="border p-4">Traveler Fees</td>
                    <td className="border p-4">✓</td>
                    <td className="border p-4">✓</td>
                    <td className="border p-4" />
                  </tr>
                  <tr>
                    <td className="border p-4">Seasonal Rates</td>
                    <td className="border p-4">✓</td>
                    <td className="border p-4">✓</td>
                    <td className="border p-4">✓</td>
                  </tr>
                  <tr>
                    <td className="border p-4">Amenities</td>
                    <td className="border p-4">✓</td>
                    <td className="border p-4">✓</td>
                    <td className="border p-4">✓</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <WordContent
              img="https://res.cloudinary.com/vacation-rentals/image/upload/v1546482967/Artemova.vacation.rentals/images/shackled-and-chained.jpg"
              title="DON’T SETTLE FOR LESS"
              borderTitle="You DO have options!"
              content={
                <p>
                  We are going to give you options! We will overwhelm you with
                  options! You are not bound to just one online travel agency.
                  Yes – they have name recognition. Yes – they have established
                  clientele. Yes – they have a great support staff in place.{' '}
                  <span className="underline">
                    <strong>
                      But they also charge a massive mount in the way of
                      homeowner and traveler fees and commissions.
                    </strong>
                  </span>{' '}
                  You can break free and operate your vacation home for rent as
                  you see fit and we are here to help you achieve that. You are
                  back in control with{' '}
                  <a href="https://vacation.rentals">
                    Vacation Rentals by Vacarent
                  </a>
                  . You have the final say on who you rent out your investment
                  to. As a traveler you will have direct control over who you
                  stay with. Homeowners are back in control of their finances
                  and pricing on their property. Both the homeowner AND the
                  traveler win and we are proud to be a part of it.
                </p>
              }
            />
            <div className="mt-4 p-4 notice-content">
              <h2 className="mb-3 text-white">
                YES, YOU CAN STILL LIST ON OTHER SITES
              </h2>
              <h4 className="uppercase text-white">
                sometimes the fear of leaving what is comfortable overwhelms the
                logical choice to do what’s right. we understand that and
                welcome the opportunity to show you over the next year how well
                we stack up against the other choices.
              </h4>
            </div>
            <WordContent
              img="https://res.cloudinary.com/vacation-rentals/image/upload/c_fill,fl_lossy,h_208,q_auto:low,w_315/How-many-times-is-Vacation-Rentals-searched.jpg"
              title="DON’T SETTLE FOR LESS"
              borderTitle="DON’T TOSS YOUR HARD EARNED CASH AWAY ON “WANNABES”"
              content={
                <p>
                  There are at least 500 Vacation Rental websites out there. Ask
                  yourself honestly – does ANYONE search for “Tex By Oh” (Texas
                  By Owner) homes? Have you EVER said to your spouse “Honey, see
                  if there is a FYAH (Fie-Ah) “For You A House” homes in
                  Branson?
                </p>
              }
            />
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default Features;
