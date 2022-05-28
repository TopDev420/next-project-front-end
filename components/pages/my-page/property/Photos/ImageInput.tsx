import React, { useCallback, useRef } from 'react';
import { useDropzone } from 'react-dropzone';
import theme from 'constants/theme';
import Config from 'config';
import CameraIcon from 'assets/images/icons/add-a-photo.svg';
import ImageIcon from 'assets/images/icons/image.svg';

const { MAX_FILE_SIZE } = Config;
const allowedFileTypes = ['image/jpeg', 'image/png'];

type ImageInputProps = {
  isLoading?: boolean;
  imagesCount?: number;
  onChange?: (files: File[] | null) => void;
};

const ImageInput: React.FC<ImageInputProps> = ({
  isLoading = false,
  imagesCount = 0,
  onChange = () => {},
}) => {
  const handleChange = useCallback(
    (files: FileList | File[] | null) => {
      if (!files) {
        onChange(null);
        return;
      }
      const result: File[] = [];
      Array.from(files).forEach((file) => {
        if (
          file.size < MAX_FILE_SIZE * 1024 * 1024 &&
          allowedFileTypes.includes(file.type)
        ) {
          result.push(file);
        }
      });
      onChange(result);
    },
    [onChange],
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: handleChange,
  });

  const inputRef = useRef<HTMLInputElement | null>(null);

  const openFileInput = useCallback(() => {
    if (inputRef.current) {
      inputRef.current.click();
    }
  }, []);

  const handleFileInputChange = () => {
    if (!inputRef.current) {
      return;
    }
    handleChange(inputRef.current.files);
  };

  return (
    <div {...getRootProps()} className="bg-white my-4 relative">
      {isDragActive && (
        <div className="border border-dashed bg-white bg-opacity-90 border-blue-500 absolute flex w-full h-full items-center justify-center">
          <CameraIcon
            width={36}
            height={36}
            fill={theme?.colors?.blue[900]}
            className="mx-4"
          />
          <span className="text-blue-900 font-bold text-lg">
            Drop images here
          </span>
        </div>
      )}
      {isLoading && (
        <div className="bg-white bg-opacity-90 absolute flex w-full h-full items-center justify-center">
          <p className="text-blue-900 font-bold text-lg">Uploading...</p>
        </div>
      )}
      <div className="p-6 flex flex-col-reverse md:flex-row items-end md:items-center md:justify-between md:flex-wrap">
        <button
          type="button"
          className="bg-blue-900 text-white flex flex-row items-center rounded-md shadow-md mt-4 md:mt-0"
          onClick={openFileInput}
        >
          <CameraIcon
            width={36}
            height={36}
            fill={theme?.colors?.white}
            className="mx-4"
          />
          <div className="flex flex-col flex-1 border-l text-left px-6 py-3">
            <span className="text-sm">Minimum 1 Photo Required</span>
            <span className="text-sm">Max File Size = {MAX_FILE_SIZE}MB</span>
          </div>
        </button>
        <div className="flex flex-row items-center border shadow-lg py-5 px-6 text-blue-900 rounded-md">
          <ImageIcon
            width={28}
            height={28}
            fill={theme?.colors?.blue[900]}
            className="mr-2"
          />
          {imagesCount > 0 ? imagesCount : 'No'}{' '}
          {imagesCount > 1 ? 'Images' : 'Image'}
        </div>
        <input
          {...getInputProps()}
          ref={inputRef}
          type="file"
          accept={allowedFileTypes.join(', ')}
          className="hidden"
          onChange={handleFileInputChange}
        />
      </div>
    </div>
  );
};

export default ImageInput;
