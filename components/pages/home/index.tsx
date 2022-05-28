import React from 'react';
import Banner from 'components/pages/home/Banner';
import HowItWorks from 'components/pages/home/HowItWorks';
import ShoutOut from 'components/pages/home/ShoutOut';
import Featured from 'components/pages/home/Featured';
import Discovery from 'components/pages/home/Discovery';
import Cta from 'components/pages/home/Cta';
import Blogs from 'components/pages/home/Blogs';
import { HomePageProps } from 'types/pages/home';

const Home: React.FC<HomePageProps> = ({ properties, blogs }) => (
  <div className="homepage">
    <Banner />
    <HowItWorks />
    <ShoutOut />
    <Featured properties={properties} />
    <Discovery />
    <Cta />
    <Blogs blogs={blogs} />
  </div>
);

export default Home;
