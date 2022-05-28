import React from 'react';
import Overview from 'components/pages/rooms/[id]/Info/About/Overview';
import Accordion from 'components/pages/rooms/[id]/Info/About/Accordion';

const About = () => (
  <div className="flex flex-col">
    <Overview />
    <Accordion />
  </div>
);

export default About;
