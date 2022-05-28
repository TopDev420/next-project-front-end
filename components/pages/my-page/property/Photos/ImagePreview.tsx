import React from 'react';
import _ from 'lodash';
import { PropertyImageInput } from 'lib/forms/image';
import useWindowSize from 'lib/hooks/ui/useWindowSize';
import ImagePreviewItem from 'components/pages/my-page/property/Photos/ImagePreviewItem';
import { classNames } from 'lib/helpers/ui';

type ImagePreviewProps = {
  images: PropertyImageInput[];
  onAltChange?: (value: string, index: number) => void;
  onDeleteImage?: (index: number) => void;
  moveImage?: (dragIndex: number, hoverIndex: number) => void;
};

const ImagePreview: React.FC<ImagePreviewProps> = ({
  images,
  onAltChange = () => {},
  onDeleteImage = () => {},
  moveImage = () => {},
}) => {
  const { width } = useWindowSize();

  const chunkSize = width && width < 960 ? 2 : 3;

  return (
    <div className="flex flex-col">
      {_.chunk(images, chunkSize).map((imageChunk, chunkIndex) => (
        <div className="flex flex-row -mx-2" key={`imageChunk_${chunkIndex}`}>
          {imageChunk.map((image, imageIndex) => {
            const index = chunkIndex * chunkSize + imageIndex;
            return (
              <ImagePreviewItem
                key={`image_${imageIndex}`}
                index={index}
                isLast={index === images.length - 1}
                className={classNames(
                  'p-2 relative',
                  chunkSize === 2 ? 'w-1/2' : 'w-1/3',
                )}
                image={image}
                showDeleteButton={images.length > 1}
                onDelete={() => onDeleteImage(index)}
                fieldNames={[`images${index}File`, `images${index}Alt`]}
                onAltChange={(val) => onAltChange(val, index)}
                moveImage={moveImage}
              />
            );
          })}
        </div>
      ))}
    </div>
  );
};

export default ImagePreview;
