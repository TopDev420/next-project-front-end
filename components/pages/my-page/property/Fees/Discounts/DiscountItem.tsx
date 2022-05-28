import React from 'react';
import DeleteIcon from 'assets/images/icons/delete.svg';
import EditIcon from 'assets/images/icons/edit.svg';
import theme from 'constants/theme';
import { DiscountInput } from 'lib/forms/discount';
import {
  DISCOUNT_TYPE_EARLY_BIRD_ID,
  MODIFIER_FIXED_ID,
} from 'constants/master-types';
import { formatPrice, formatNumber } from 'lib/helpers/number';
import DiscountTypes from 'static/discount-type.json';

type DiscountItemProps = {
  value: DiscountInput;
  actionDisabled?: boolean;
  onEdit?: () => void;
  onDelete?: () => void;
};

const DiscountItem: React.FC<DiscountItemProps> = ({
  value,
  actionDisabled = false,
  onEdit = () => {},
  onDelete = () => {},
}) => (
  <div className="flex flex-col border-b pb-4 mb-4">
    <h4 className="font-bold text-base mb-3">{value.name}</h4>
    <div className="flex flex-row">
      <div className="flex flex-col md:flex-row flex-wrap flex-1">
        <div className="flex flex-1">
          <div className="w-1/2 flex flex-col">
            <span className="bg-gray-100 py-1 px-2">Fee</span>
            <span className="py-1 px-2">
              {value.modifierId === MODIFIER_FIXED_ID
                ? formatPrice(value.amount)
                : `${formatNumber(value.amount)}%`}
            </span>
          </div>
          <div className="w-1/2 flex flex-col">
            <span className="bg-gray-100 py-1 px-2">Discount Type</span>
            <span className="py-1 px-2">
              {
                DiscountTypes.find(({ id }) => id === value.discountTypeId)
                  ?.name
              }
            </span>
          </div>
        </div>
        <div className="flex flex-1">
          <div className="w-full flex flex-col">
            <span className="bg-gray-100 py-1 px-2">
              Days{' '}
              {value.discountTypeId === DISCOUNT_TYPE_EARLY_BIRD_ID
                ? 'After'
                : 'Before'}
            </span>
            <span className="py-1 px-2">{value.period}</span>
          </div>
        </div>
      </div>
      <div className="flex-0 ml-2">
        <button
          type="button"
          disabled={actionDisabled}
          className="p-2 bg-green-500 hover:bg-green-600 mb-2"
          onClick={onEdit}
        >
          <EditIcon width={16} height={16} fill={theme.colors?.white} />
        </button>
        <button
          type="button"
          disabled={actionDisabled}
          className="p-2 bg-red-500 hover:bg-red-600"
          onClick={onDelete}
        >
          <DeleteIcon width={16} height={16} fill={theme.colors?.white} />
        </button>
      </div>
    </div>
  </div>
);

export default DiscountItem;
