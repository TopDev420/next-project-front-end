import React, { useRef } from 'react';
import FileUploadIcon from 'assets/images/icons/file-upload.svg';
import theme from 'constants/theme';

type FileUploadButtonProps = {
  title?: string;
  Icon?: any;
  inputProps?: React.InputHTMLAttributes<HTMLInputElement>;
  onChange?: (file: File) => void;
} & Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'onChange'>;

const FileUploadButton: React.FC<FileUploadButtonProps> = ({
  title,
  Icon = FileUploadIcon,
  inputProps,
  onChange = () => {},
  ...props
}) => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const handleClick = () => {
    if (!inputRef.current) {
      return;
    }
    inputRef.current.value = '';
    inputRef.current.click();
  };
  return (
    <>
      <button
        type="button"
        className="btn btn-info flex items-center"
        onClick={handleClick}
        {...props}
      >
        {!!Icon && (
          <Icon
            className="mr-1"
            width={12}
            height={12}
            fill={theme.colors?.white}
          />
        )}
        {title}
      </button>
      <div className="hidden">
        <input
          ref={inputRef}
          type="file"
          {...inputProps}
          onChange={(e) => {
            if (e.target.files && e.target.files[0]) {
              onChange(e.target.files[0]);
            }
          }}
        />
      </div>
    </>
  );
};

export default FileUploadButton;
