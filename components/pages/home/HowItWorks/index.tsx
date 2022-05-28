import Block from 'components/pages/home/HowItWorks/Block';

const HowItWorks = () => (
  <div className="howItWorks">
    <h2 className="howItWorks__title">How It Works</h2>
    <div className="max-w-screen-lg flex flex-col items-center md:items-start md:flex-row mx-auto">
      <Block
        image="https://res.cloudinary.com/vacation-rentals/image/upload/v1555703591/images/how1.png"
        title="Search"
        description="Search for the perfect vacation home for rent from our verified listings"
      />
      <Block
        image="https://res.cloudinary.com/vacation-rentals/image/upload/v1555703591/images/how2.png"
        title="Make an inquiry"
        description="Contact the owner or property manager directly"
      />
      <Block
        image="https://res.cloudinary.com/vacation-rentals/image/upload/v1555703591/images/how3.png"
        title="Make the booking"
        description="Once you have settled on the home of your choice, book direct with the homeowner or property manager"
      />
      <Block
        image="https://res.cloudinary.com/vacation-rentals/image/upload/v1555703591/images/how4.png"
        title="Review your stay"
        description="Tell others about the great trip you had and place you stayed"
      />
    </div>
  </div>
);

export default HowItWorks;
