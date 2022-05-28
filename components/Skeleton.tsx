import React, { CSSProperties } from 'react';

export type SkeletonProps = {
  className?: string;
  animated?: boolean;
  rounded?: boolean;
  style?: CSSProperties;
};

const Skeleton: React.FC<SkeletonProps> = ({
  className: classNameProps,
  animated = true,
  rounded = false,
  style,
}) => (
  <div
    className={`skeleton w-full bg-gray-300 h-6 ${
      animated ? 'animate-pulse' : ''
    } ${rounded ? 'rounded-full' : 'rounded-md'} ${classNameProps}`}
    style={style}
  />
);

export default Skeleton;
