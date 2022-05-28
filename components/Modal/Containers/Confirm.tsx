import React from 'react';

export type ConfirmProps = {
  title?: string;
  message?: string;
  callback?: (yes?: boolean) => void;
};

const Confirm: React.FC<ConfirmProps> = ({
  title = 'Are you sure?',
  message,
  callback = () => {},
}) => (
  <div className="p-4">
    <h3 className="mb-4">{title}</h3>
    {!!message && <p className="mb-4">{message}</p>}
    <div className="flex w-full justify-center">
      <button
        type="button"
        className="btn btn-primary mr-2"
        onClick={() => callback(true)}
      >
        Yes
      </button>
      <button
        type="button"
        className="btn btn-dark"
        onClick={() => callback(false)}
      >
        Cancel
      </button>
    </div>
  </div>
);

export default Confirm;
