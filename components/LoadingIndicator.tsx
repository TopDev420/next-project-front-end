import React from 'react';
import Loading from 'assets/images/loading.svg';

export type LoadingIndicatorProps = {
  left?: boolean;
  right?: boolean;
  dark?: boolean;
  light?: boolean;
  className?: string;
  additionalClass?: string;
};

const getMutuallyExclusiveOptionsFromProps = (
  propsA: boolean | undefined,
  propsB: boolean | undefined,
) => {
  let isA: boolean | undefined;
  let isB: boolean | undefined;
  if (propsA === undefined && propsB === undefined) {
    isA = true;
    isB = false;
  }
  if (propsA !== undefined && propsB === undefined) {
    isA = propsA;
    isB = !isA;
  }
  if (propsA === undefined && propsB !== undefined) {
    isB = propsB;
    isA = !isB;
  }
  if (propsA !== undefined && propsB !== undefined) {
    isA = propsA;
    isB = propsB;
    if (isA === isB) {
      isB = !isA;
    }
  }

  return [!!isA, !!isB] as const;
};

const LoadingIndicator: React.FC<LoadingIndicatorProps> = ({
  left: propsLeft,
  right: propsRight,
  dark: propsDark,
  light: propsLight,
  className = 'animate-spin h-5 w-5 inline',
  additionalClass = '',
}) => {
  const optionalClasses = [];
  const [left, right] = getMutuallyExclusiveOptionsFromProps(
    propsLeft,
    propsRight,
  );
  const [dark, light] = getMutuallyExclusiveOptionsFromProps(
    propsDark,
    propsLight,
  );

  if (left) {
    optionalClasses.push('-ml-1');
    optionalClasses.push('mr-2');
  }
  if (right) {
    optionalClasses.push('-mr-1');
    optionalClasses.push('ml-2');
  }
  if (dark) {
    optionalClasses.push('text-black');
  }
  if (light) {
    optionalClasses.push('text-white');
  }
  const optionalClass = optionalClasses.join(' ');
  const finalClass = [className, optionalClass, additionalClass].join(' ');

  return <Loading className={finalClass} />;
};

export default LoadingIndicator;
