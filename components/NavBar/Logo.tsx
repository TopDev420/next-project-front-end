/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const LOGO_PROPS = {
  src: 'https://res.cloudinary.com/vacation-rentals/image/upload/v1593533189/images/Vacation-Rentals-Logo-JPEG.jpg',
  alt: 'Vacation.Rentals',
};

const Logo: React.FC = () => (
  <div className="flex my-2 flex-1 md:flex-initial justify-center">
    <Link href="/" passHref>
      <a className="flex">
        <Image {...LOGO_PROPS} width={150} height={74} />
      </a>
    </Link>
  </div>
);

export default Logo;
