import React from 'react';

type LoadMoreProps = {
  disabled?: boolean;
  onClick?: () => void;
};
const LoadMore: React.FC<LoadMoreProps> = ({ onClick, disabled = false }) => (
  <div className="flex flex-row justify-center">
    <button
      type="button"
      disabled={disabled}
      className="btn btn-primary"
      onClick={onClick}
    >
      Load More
    </button>
  </div>
);

export default LoadMore;
