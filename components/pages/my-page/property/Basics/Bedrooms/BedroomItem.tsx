import React from 'react';
import _ from 'lodash';
import Beds from 'static/bed.json';
import { BedroomInput } from 'lib/forms/bedroom';
import CreateIcon from 'assets/images/icons/create.svg';
import DeleteIcon from 'assets/images/icons/delete.svg';
import theme from 'constants/theme';
import { findMasterTypeById } from 'constants/master-types';

type BedroomItemProps = {
  bedroom: BedroomInput;
  onEdit?: () => void;
  onDelete?: () => void;
  actionDisabled?: boolean;
};

const BedroomItem: React.FC<BedroomItemProps> = ({
  bedroom,
  onEdit,
  onDelete,
  actionDisabled,
}) => (
  <div className="flex flex-row my-3 pb-4 border-b">
    <div className="flex flex-col flex-1">
      <h3 className="text-blue-900 text-lg break-all mb-2">{bedroom.name}</h3>
      <div className="flex flex-row flex-wrap">
        <strong className="mr-1">Beds:</strong>
        {bedroom.beds.length > 0 ? (
          <>
            {bedroom.beds.map(({ id, count }, index) => {
              const bed = findMasterTypeById(Beds, id);
              const isLast = index >= bedroom.beds.length - 1;
              if (!bed) {
                return null;
              }
              return (
                <span key={id} className={isLast ? '' : 'mr-1'}>
                  {bed.name} &times; {count}
                  {!isLast && ','}
                </span>
              );
            })}
          </>
        ) : (
          <span>No beds</span>
        )}
      </div>
    </div>
    <div className="flex flex-col flex-0 ml-2">
      <button
        type="button"
        disabled={actionDisabled}
        className="p-2 bg-blue-500 hover:bg-blue-600 mb-2"
        onClick={onEdit}
      >
        <CreateIcon width={12} height={12} fill={theme.colors?.white} />
      </button>
      <button
        type="button"
        disabled={actionDisabled}
        className="p-2 bg-red-500 hover:bg-red-600"
        onClick={onDelete}
      >
        <DeleteIcon width={12} height={12} fill={theme.colors?.white} />
      </button>
    </div>
  </div>
);

export default BedroomItem;
