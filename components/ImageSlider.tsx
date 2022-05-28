import React from 'react';
import Slider from 'react-slick';
import Image from 'next/image';
import useIsMobile from 'lib/hooks/ui/useIsMobile';
import { Image as ImageModel } from 'types/models/Image';
import ImagePlaceholder from 'assets/images/image-placeholder.png';
import { sortImages } from 'lib/helpers/image';

type ImageSliderProps = {
  images?: ImageModel[];
};

const ImageSlider: React.FC<ImageSliderProps> = ({ images }) => {
  const isMobile = useIsMobile();

  return (
    <Slider
      arrows
      infinite
      lazyLoad="ondemand"
      autoplay={false}
      slidesToScroll={1}
      slidesToShow={1}
    >
      {sortImages(images).map((image) => (
        <div key={image.id}>
          <Image
            src={image.url}
            alt={image.metadata?.alt}
            width={isMobile ? 16 : 4}
            height={isMobile ? 9 : 3}
            layout="responsive"
            objectFit="cover"
          />
        </div>
      ))}
      {!images?.length && (
        <div className="p-6 border-r">
          <Image
            src={ImagePlaceholder.src}
            width={isMobile ? 16 : 4}
            height={isMobile ? 9 : 3}
            layout="responsive"
            objectFit="contain"
          />
        </div>
      )}
    </Slider>
  );
};

export default ImageSlider;
