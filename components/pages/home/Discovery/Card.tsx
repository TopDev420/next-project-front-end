import React from 'react';
import Image from 'next/image';

type CardProps = {
  title: string;
  image: string;
  description: React.ReactNode;
};

const Card: React.FC<CardProps> = ({ title, image, description }) => (
  <div className="discovery__card">
    <h3 className="discovery__cardTitle">{title}</h3>
    <Image alt={title} src={image} width={70} height={70} layout="fixed" />
    <p className="discovery__cardDescription">{description}</p>
  </div>
);

export default Card;
