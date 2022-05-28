import React from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import { TailwindColorConfig } from 'tailwindcss/tailwind-config';
import theme from 'constants/theme';
import DeleteIcon from 'assets/images/icons/delete.svg';
import EditIcon from 'assets/images/icons/edit.svg';
import CheckIcon from 'assets/images/icons/check.svg';
import CloseIcon from 'assets/images/icons/close.svg';

type IconButtonIcon = 'delete' | 'edit' | 'check' | 'close';

type IconButtonProps = {
  iconName?: IconButtonIcon;
  additionalClass?: string;
  iconSize?: number;
  renderIcon?: (size: number, color: TailwindColorConfig) => any;
} & React.HTMLAttributes<HTMLButtonElement>;

const IconButton: React.FC<IconButtonProps> = ({
  iconName,
  additionalClass = '',
  iconSize = 16,
  renderIcon,
  ...props
}) => {
  switch (iconName) {
    case 'delete':
      return (
        <button
          type="button"
          className={`p-2 bg-red-500 hover:bg-red-600 ${additionalClass}`}
          {...props}
        >
          <DeleteIcon
            width={iconSize}
            height={iconSize}
            fill={theme.colors?.white}
          />
        </button>
      );
    case 'edit':
      return (
        <button
          type="button"
          className={`p-2 bg-green-500 hover:bg-green-600 ${additionalClass}`}
          {...props}
        >
          <EditIcon
            width={iconSize}
            height={iconSize}
            fill={theme.colors?.white}
          />
        </button>
      );
    case 'check':
      return (
        <button type="button" className={`p-2 ${additionalClass}`} {...props}>
          <CheckIcon
            width={iconSize}
            height={iconSize}
            fill={theme.colors?.blue[600]}
          />
        </button>
      );
    case 'close':
      return (
        <button type="button" className={`p-2 ${additionalClass}`} {...props}>
          <CloseIcon
            width={iconSize}
            height={iconSize}
            fill={theme.colors?.gray[600]}
          />
        </button>
      );
    default:
      return (
        <button type="button" className={`p-2 ${additionalClass}`} {...props}>
          {renderIcon && <>{renderIcon(iconSize, theme.colors!)}</>}
        </button>
      );
  }
};

export default IconButton;
