import { BathroomInput } from 'lib/forms/bathroom';
import React from 'react';
import BathroomTypes from 'static/bathroom-type.json';
import BathroomFeatures from 'static/bathroom-feature.json';
import CreateIcon from 'assets/images/icons/create.svg';
import DeleteIcon from 'assets/images/icons/delete.svg';
import theme from 'constants/theme';

type BathroomItemProps = {
  bathroom: BathroomInput;
  onEdit?: () => void;
  onDelete?: () => void;
  actionDisabled?: boolean;
};

const BathroomItem: React.FC<BathroomItemProps> = ({
  bathroom,
  onEdit,
  onDelete,
  actionDisabled,
}) => (
  <div className="flex flex-row my-3 pb-4 border-b">
    <div className="flex flex-col flex-1">
      <h3 className="text-blue-900 text-lg break-all mb-2">{bathroom.name}</h3>
      <div className="flex flex-col">
        <div>
          <strong className="mr-1">Bathroom Type:</strong>
          <span>
            {BathroomTypes.find(({ id }) => id === bathroom.bathroomTypeId)
              ?.name || 'Unknown'}
          </span>
        </div>
        <div className="flex flex-row flex-wrap">
          <strong className="mr-1">Included Features:</strong>
          {bathroom.bathroomFeaturesIds?.length < 1 && <span>No feature</span>}
          {bathroom.bathroomFeaturesIds?.map((featureId, index) => {
            const isLast = index >= bathroom.bathroomFeaturesIds.length - 1;
            const feature = BathroomFeatures.find(({ id }) => id === featureId);
            if (!feature) {
              return null;
            }

            return (
              <span key={String(index)} className={isLast ? '' : 'mr-1'}>
                {feature.name}
                {isLast ? '' : ','}
              </span>
            );
          })}
        </div>
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

export default BathroomItem;
