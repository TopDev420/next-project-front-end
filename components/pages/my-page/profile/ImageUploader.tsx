import React from 'react';
import Image from 'next/image';
import { UpdateProfileInput } from 'lib/forms/user';
import AvatarPlaceholder from 'assets/images/icons/person.svg';
import FileUploadButton from 'components/FileUpload/Button';
import InvalidFeedback from 'components/Error/InvalidFeedback';
import theme from 'constants/theme';

type ImageUploaderProps = {
  imageUrl: string;
  data: UpdateProfileInput['image'];
  onChange: (file: File) => void;
};

const ImageUploader: React.FC<ImageUploaderProps> = ({
  data,
  onChange,
  imageUrl,
}) => (
  <div className="flex flex-col w-full md:w-1/4 sm:w-1/3 lg:w-1/5 ">
    <div className="mb-3">
      {!!imageUrl ? (
        <Image
          unoptimized={!!data?.file}
          src={imageUrl}
          width={1}
          height={1}
          objectFit="cover"
          layout="responsive"
        />
      ) : (
        <AvatarPlaceholder
          width="100%"
          height="100%"
          fill={theme.colors?.gray?.[600]}
        />
      )}
      <InvalidFeedback name="file" />
    </div>
    <FileUploadButton title="Change Photo" onChange={onChange} />
  </div>
);

export default ImageUploader;
