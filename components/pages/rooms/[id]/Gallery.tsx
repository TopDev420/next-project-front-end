import { useContext, useMemo } from 'react';
import ImageGallery from 'react-image-gallery';
import { convertToGalleryImages } from 'lib/transformers/property';
import { PropertyContext } from 'components/pages/rooms/[id]/PropertyProvider';

const Gallery = () => {
  const property = useContext(PropertyContext);

  const images = useMemo(() => convertToGalleryImages(property), [property]);

  return <ImageGallery items={images} />;
};

export default Gallery;
