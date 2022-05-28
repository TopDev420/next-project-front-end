import React from 'react';

const AboutStaff: React.FC<{
  name: string;
  address: string;
  content: React.ReactNode;
  img: string;
}> = ({ name, address, content, img }) => (
  <div className="shadow-2xl about-staff p-6 relative overflow-hidden">
    <img alt={name} src={img} />
    <h2 className="mt-6 text-center font-bold">{name}</h2>
    <h3 className="text-center">{address}</h3>
    <div className="text-center my-6">{content}</div>
  </div>
);

export default AboutStaff;
