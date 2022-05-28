import React from 'react';
import Image from 'next/image';

type BlockProps = {
  image: string;
  title: string;
  description: string;
};

const Block: React.FC<BlockProps> = ({ image, title, description }) => (
  <div className="flex flex-col w-1/2 md:w-1/4 items-center md:mr-4 mb-12">
    <Image src={image} layout="fixed" width={130} height={130} alt={title} />
    <h3 className="my-4">{title}</h3>
    <p className="text-center">{description}</p>
  </div>
);

export default Block;
