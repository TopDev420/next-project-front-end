import React from 'react';

export const renderStringOrComponent = (
  Component?: string | React.FunctionComponent,
  Fallback: keyof JSX.IntrinsicElements = 'div',
  className: string = '',
) => {
  if (typeof Component === 'function') {
    return <Component />;
  }
  return <Fallback className={className}>{Component}</Fallback>;
};

export const classNames = (...classes: (string | undefined | null)[]) =>
  classes.filter(Boolean).join(' ');
