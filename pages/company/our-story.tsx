import AboutStaff from 'components/pages/company/out-story/AboutStaff';
import { NextPage } from 'next';

const OurStory: NextPage = () => (
  <div className="container py-6 mx-auto mb-6">
    <h1 className="text-center mb-6">
      MEET THE OWNERS OF VACATION RENTALS BY VACARENT™
    </h1>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pr-5 py-6">
      <AboutStaff
        img="https://res.cloudinary.com/vacation-rentals/image/upload/v1642615971/mike_and_handan.jpg"
        name="Mike and Handan Kugler"
        address="BRANSON, MISSOURI"
        content={
          <p>
            With a background in software engineering and 17 years in the
            hospitality business with
            <a
              href="https://huntersfriendresort.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              Hunter's Friend Resort
            </a>
            , buying
            <a
              href="https://www.vacation.rentals"
              target="_blank"
              rel="noopener noreferrer"
            >
              www.vacation.rentals
            </a>
            &nbsp;was a natural progression. Familiar with the frustrations of
            homeowners and property managers, Mike and Handan set out to make
            this directory site everything it should be and much more.
          </p>
        }
      />

      <AboutStaff
        img="https://res.cloudinary.com/vacation-rentals/image/upload/v1642615970/jim_and_wendy.jpg"
        name="JIM AND WENDY SHERRILL"
        address="VAN HORNE, IOWA"
        content={
          <p>
            Jim and Wendy Sherrill are seasoned veterans of the vacation home
            rental market with their own properties located in Young, Arizona.
            Their frustration with the major OTAs and their outrageous service
            fees led them to be immediate and early investors in VacaRent, LLC.
          </p>
        }
      />

      <AboutStaff
        img="https://res.cloudinary.com/vacation-rentals/image/upload/v1642615970/marshall.jpg"
        name="MARSHALL HART"
        address="DANVILLE, CALIFORNIA"
        content={
          <p>
            Marshall is a serial entrepreneur in every sense of the word. As the
            founder and leader of a Fortune 75 company in the Silicon Valley
            from 1990 to 2013, Marshall revolutionized the high end rental
            market for Test and Measurement Equipment. Marshall retired in 2013
            and now advises as a partner mentor to the board of VacaRent, LLC.
          </p>
        }
      />

      <AboutStaff
        img="https://res.cloudinary.com/vacation-rentals/image/upload/v1642615970/itm_investments.jpg"
        name="ITM INVESTMENTS"
        address="DAVENPORT, IOWA"
        content={
          <p>
            Mark and Michelle Hendricks do not have a background in short term
            rentals but they know smart investments when they come along. Within
            2 days of discussions both agreed to finance and back VacaRent.
            Seeing the frustration of so many homeowners looking for a new
            option to compete was especially exciting for them.
          </p>
        }
      />

      <AboutStaff
        img="https://res.cloudinary.com/vacation-rentals/image/upload/v1642615970/kalus.jpg"
        name="KALUS ENTERPRISES"
        address="DAVENPORT, IOWA"
        content={
          <p>
            Based out of the Quad Cities, Kalus Enterprises is a dynamic family
            business with a flair for serial investing. Their portfolio includes
            everything from renovated banks to art shows. The chance to invest
            early into a powerful company with an explosively fast website was
            exciting to them and from day 1 they have marketed this start up
            enthusiastically to all they can.
          </p>
        }
      />

      <AboutStaff
        img="https://res.cloudinary.com/vacation-rentals/image/upload/v1642615970/william.jpg"
        name="WILLIAM WHELPLEY"
        address="KIMBERLING CITY, MISSOURI"
        content={
          <p>
            Bill owns many vacation rental homes, ranging from Illinois to
            Missouri to Florida. As soon as he heard of a website being launched
            that combined "Vacation" and "Rentals" together in the URL, he knew
            immediately that he had to be a part of it.
          </p>
        }
      />
    </div>
  </div>
);

export default OurStory;
