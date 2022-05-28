import { MODIFIER_FIXED_ID } from 'constants/master-types';
import { formatNumber, formatPrice } from 'lib/helpers/number';
import { Coupon } from 'types/models/Coupon';

export const toDisplayText = (
  coupon: Pick<Coupon, 'discount' | 'discountModifierId'>,
) => {
  if (!coupon) {
    return '';
  }
  if (coupon.discountModifierId === MODIFIER_FIXED_ID) {
    return formatPrice(coupon.discountModifierId);
  }

  return `${formatNumber(coupon.discount)}%`;
};
