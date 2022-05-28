import React from 'react';
import Link from 'next/link';
import { classNames } from 'lib/helpers/ui';

type StatusBadgeProps = {
  title: string;
  color?: 'blue' | 'yellow' | 'dark';
  inverted?: boolean;
  className?: string;
  href?: string;
};

const COLORS = {
  background: {
    blue: 'bg-blue-700',
    yellow: 'bg-yellow-700',
    dark: 'bg-dark-700',
  },
  text: {
    blue: 'text-blue-700',
    yellow: 'text-yellow-700',
    dark: 'text-gray-700',
  },
  border: {
    blue: 'border-blue-700',
    yellow: 'border-yellow-700',
    dark: 'border-dark-700',
  },
};

const StatusBadge: React.FC<StatusBadgeProps> = ({
  title,
  color = 'blue',
  inverted = false,
  className,
  href,
}) => {
  let bgColor = 'bg-white';
  const borderColor = COLORS.border[color];
  let textColor = COLORS.text[color];
  if (inverted) {
    bgColor = COLORS.background[color];
    textColor = 'text-white';
  }
  const content = (
    <span
      className={classNames(
        'border px-2 text-xs',
        bgColor,
        borderColor,
        textColor,
        className,
      )}
    >
      {title}
    </span>
  );
  if (!href) {
    return content;
  }

  return <Link href={href}>{content}</Link>;
};

export default StatusBadge;
