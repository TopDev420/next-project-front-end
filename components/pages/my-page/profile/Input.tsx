import React from 'react';
import InvalidFeedback from 'components/Error/InvalidFeedback';
import { classNames } from 'lib/helpers/ui';

type InputProps = {
  top?: React.ReactNode;
  bottom?: React.ReactNode;
  left?: React.ReactNode;
  right?: React.ReactNode;
  select?: boolean;
  textarea?: boolean;
  required?: boolean;
  containerClass?: string;
  classname?: string;
  as?: keyof JSX.IntrinsicElements;
} & React.HTMLProps<HTMLInputElement | HTMLSelectElement>;

const wrapWithDefaultSideComponent = (comp: React.ReactNode) => {
  if (typeof comp !== 'string') {
    return comp;
  }

  return <div className="flex-0 bg-blue-900 text-white p-2">{comp}</div>;
};

const Input = ({
  top,
  right,
  left,
  bottom,
  select = false,
  textarea = false,
  children,
  containerClass = '',
  required = false,
  as = 'input',
  classname = "border p-2 outline-none w-full",
  ...props
}: InputProps) => {
  let Container = as;
  if (select) {
    Container = 'select';
  }
  if (textarea) {
    Container = 'textarea';
  }

  let inputElement = (
    <Container className={classname} {...(props as any)}>
      {children}
    </Container>
  );

  if (!top && !right && !left && !bottom) {
    return inputElement;
  }

  if (left || right) {
    inputElement = (
      <div className="flex flex-row">
        {wrapWithDefaultSideComponent(left)}
        <div className="flex-1">{inputElement}</div>
        {wrapWithDefaultSideComponent(right)}
      </div>
    );
  }

  return (
    <div className={classNames('flex flex-col', containerClass)}>
      {typeof top === 'string' ? (
        <span className="text-sm mb-2">
          {top} {required && <span className="text-red-400 text-sm">*</span>}
        </span>
      ) : (
        top
      )}
      {inputElement}
      {bottom ? (
        <>
          {typeof bottom === 'string' ? (
            <span className="text-sm mt-2">{bottom}</span>
          ) : (
            bottom
          )}
        </>
      ) : (
        <>{!!props.name && <InvalidFeedback name={props.name} />}</>
      )}
    </div>
  );
};

export default Input;
