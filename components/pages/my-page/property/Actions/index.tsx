import React from 'react';

type ActionsProps = {
  isFirst?: boolean;
  isLast?: boolean;
  isLoading?: boolean;
  showSaveButtons?: boolean;
  onPrev?: () => void;
  onSkip?: () => void;
  onSave?: (isContinuing: boolean) => void;
};

const Actions: React.FC<ActionsProps> = ({
  isFirst,
  isLast,
  isLoading,
  onPrev,
  onSkip,
  showSaveButtons = true,
  onSave = () => {},
}) => (
  <div className="flex w-full justify-between">
    <div className="flex-0">
      {!isFirst && (
        <button
          type="button"
          className="btn btn-sm btn-dark"
          disabled={isLoading}
          onClick={onPrev}
        >
          Previous
        </button>
      )}
    </div>
    <div className="flex flex-1 justify-end">
      {showSaveButtons && (
        <button
          type="button"
          className={`btn btn-sm btn-info ${isLast ? '' : 'mr-1'}`}
          disabled={isLoading}
          onClick={() => onSave(false)}
        >
          {isLast ? 'Save' : 'Save & Stay'}
        </button>
      )}
      {!isLast && (
        <>
          <button
            type="button"
            className="btn btn-sm btn-warn mr-1"
            disabled={isLoading}
            onClick={onSkip}
          >
            {showSaveButtons ? 'Skip' : 'Next'}
          </button>
          {showSaveButtons && (
            <button
              type="button"
              className="btn btn-sm btn-success"
              disabled={isLoading}
              onClick={() => onSave(true)}
            >
              Save & Continue
            </button>
          )}
        </>
      )}
    </div>
  </div>
);

export default Actions;
