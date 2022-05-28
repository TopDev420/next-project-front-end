import React from 'react';
import Image from 'next/image';
import { PropertyImageInput } from 'lib/forms/image';
import theme from 'constants/theme';
import InvalidFeedback from 'components/Error/InvalidFeedback';
import LeftArrow from 'assets/images/icons/chevron-left.svg';
import RightArrow from 'assets/images/icons/chevron-right.svg';
import DeleteIcon from 'assets/images/icons/delete.svg';

type ImagePreviewItemProps = {
  className: string;
  index: number;
  image: PropertyImageInput;
  showDeleteButton: boolean;
  showMoveButtons?: boolean;
  isLast?: boolean;
  onDelete: () => void;
  fieldNames: string[];
  onAltChange: (alt: string) => void;
  moveImage: (dragIndex: number, hoverIndex: number) => void;
};

const ImagePreviewItem: React.FC<ImagePreviewItemProps> = ({
  className,
  index,
  image,
  showDeleteButton,
  showMoveButtons = true,
  isLast = false,
  onDelete,
  fieldNames,
  onAltChange,
  moveImage,
}) => {
  const moveLeft = () => {
    if (index <= 0) {
      return;
    }
    moveImage(index, index - 1);
  };

  const moveRight = () => {
    if (isLast) {
      return;
    }
    moveImage(index, index + 1);
  };

  return (
    <div className={className}>
      <div className="relative aspect-w-4 aspect-h-3 shadow-lg">
        <Image
          src={image.url}
          unoptimized={!!image.file}
          objectFit="cover"
          layout="fill"
        />
      </div>
      <div className="absolute left-auto top-2 right-2 flex flex-col">
        {showDeleteButton && (
          <button
            type="button"
            className="w-8 h-8 bg-red-600 hover:bg-red-500 flex justify-center items-center shadow-xl rounded-sm"
            onClick={onDelete}
          >
            <DeleteIcon width={16} height={16} fill={theme?.colors?.white} />
          </button>
        )}
        {showMoveButtons && (
          <>
            <button
              type="button"
              className="w-8 h-8 bg-gray-100 flex justify-center items-center shadow-xl rounded-sm mt-2"
              onClick={moveLeft}
            >
              <LeftArrow width={16} height={16} fill={theme?.colors?.black} />
            </button>
            <button
              type="button"
              className="w-8 h-8 bg-gray-100 flex justify-center items-center shadow-xl rounded-sm mt-2"
              onClick={moveRight}
            >
              <RightArrow width={16} height={16} fill={theme?.colors?.black} />
            </button>
          </>
        )}
      </div>
      <textarea
        className="w-full mt-2 border border-gray-500 text-xs md:text-sm p-2 shadow-lg"
        placeholder="Type at least two words. More is better."
        value={image.alt}
        onChange={(e) => onAltChange(e.target.value)}
      />
      {fieldNames.map((fieldName) => (
        <InvalidFeedback key={fieldName} name={fieldName} />
      ))}
    </div>
  );
};

export default ImagePreviewItem;
