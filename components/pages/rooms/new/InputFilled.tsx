import React from 'react';

type InputFilledProps = {
  title?: string;
  description?: string;
  onClick?: () => void;
};

const InputFilled: React.FC<InputFilledProps> = ({
  title,
  description,
  onClick,
}) => (
  <button
    type="button"
    className="border border-gray-200 w-full flex flex-col md:flex-row"
    onClick={onClick}
  >
    <div className="flex flex-initial w-full md:w-40 md:h-full justify-center items-center text-blue-900 border-r border-gray-200 bg-gray-200 p-4 md:p-6">
      {title}
    </div>
    <div className="flex flex-1 md:h-full justify-center items-center p-4 md:p-6 text-black ">
      {description}
    </div>
  </button>
);

export default InputFilled;
