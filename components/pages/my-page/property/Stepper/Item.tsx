import React from 'react';
import CheckIcon from 'assets/images/icons/check.svg';
import theme from 'constants/theme';

type ItemProps = {
  icon: any;
  title: string;
  active?: boolean;
  completed?: boolean;
  optional?: boolean;
  onClick?: () => void;
};

const Item: React.FC<ItemProps> = ({
  icon,
  title,
  completed,
  active,
  optional = false,
  onClick,
}) => {
  const Icon = icon;

  return (
    <li
      className={`text-lg p-3 ${
        active ? 'bg-blue-900 hover:bg-blue-800' : 'hover:bg-gray-100'
      }`}
    >
      <button
        type="button"
        className={`px-2 flex w-full justify-between items-center ${
          active ? 'text-white' : 'text-blue-900'
        }`}
        onClick={onClick}
      >
        <Icon
          className="mr-1"
          width={20}
          height={20}
          fill={active ? theme.colors?.white : theme.colors?.blue[900]}
        />
        <span className="flex-1 text-left">{title}</span>
        {completed ? (
          <CheckIcon width={20} height={20} fill={theme.colors?.green[500]} />
        ) : (
          <>
            {optional && (
              <CheckIcon
                width={20}
                height={20}
                fill={theme.colors?.gray[500]}
              />
            )}
          </>
        )}
      </button>
    </li>
  );
};

export default Item;
