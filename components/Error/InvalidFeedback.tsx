import { ErrorContext } from 'components/Error/Provider';
import React, { useContext } from 'react';

type InvalidFeedbackProps = {
  name: string;
  className?: string;
  additionalClass?: string;
  container?: keyof JSX.IntrinsicElements;
};

const InvalidFeedback: React.FC<InvalidFeedbackProps> = ({
  name,
  className = 'text-red-400 text-sm mt-2',
  additionalClass = '',
  container,
}) => {
  const { getFieldErrors } = useContext(ErrorContext);
  const errorMessages = getFieldErrors(name);
  if (!errorMessages.length) {
    return null;
  }

  const Container = container || React.Fragment;

  return (
    <Container>
      {errorMessages.map((m, index) => (
        <span key={String(index)} className={`${className} ${additionalClass}`}>
          {m}
        </span>
      ))}
    </Container>
  );
};

export default InvalidFeedback;
