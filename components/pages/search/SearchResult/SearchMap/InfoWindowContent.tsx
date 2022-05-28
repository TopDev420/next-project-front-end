import React from 'react';
import Link from 'next/link';
import Slider from 'react-slick';
import Flags from 'country-flag-icons/react/3x2';
import Image from 'next/image';
import { PropertySearchResource } from 'types/resources/Property';
import ImagePlaceholder from 'assets/images/image-placeholder.png';
import { getPublicPropertyShowRoute } from 'lib/helpers/route';
import { sortImages } from 'lib/helpers/image';

type InfoWindowContentProps = { data: PropertySearchResource };

const InfoWindowContent: React.FC<InfoWindowContentProps> = ({ data }) => {
  const Flag = Flags[data?.location?.countryCode || 'ZZ'];
  return (
    <div className="flex flex-col w-40">
      <div className="w-40 h-30">
        {!!data?.images?.length ? (
          <Slider
            arrows
            infinite
            lazyLoad="ondemand"
            autoplay={false}
            slidesToScroll={1}
            slidesToShow={1}
          >
            {sortImages(data.images).map((image) => (
              <Image
                key={image.id}
                width={4}
                height={3}
                layout="responsive"
                objectFit="cover"
                src={image.url}
              />
            ))}
          </Slider>
        ) : (
          <div className="p-4">
            <Image
              src={ImagePlaceholder.src}
              width={4}
              height={3}
              layout="responsive"
              objectFit="contain"
            />
          </div>
        )}
      </div>
      <div className="mt-4 flex flex-row items-start">
        <div className="flex-initial">
          {!!Flag && <Flag width={16} height={16} className="mr-2" />}
        </div>
        <p className="flex-1 font-bold text-base hover:underline">
          <Link href={getPublicPropertyShowRoute(data.id, data.slug)}>
            {data.title || data?.location?.addressLine1}
          </Link>
        </p>
      </div>
    </div>
  );
};

export default InfoWindowContent;
