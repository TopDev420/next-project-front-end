import {
  MODIFIER_FIXED_ID,
  PLAN_BASIC_MONTHLY_ID,
  PLAN_BASIC_YEARLY_ID,
  PLAN_PRO_MONTHLY_ID,
  PLAN_PRO_YEARLY_ID,
} from 'constants/master-types';
import config from 'config';
import { safePrice } from 'lib/helpers/number';

export const applyDiscount = (
  price: number,
  discountModifierId: number,
  discount: number,
) => {
  if (discountModifierId === MODIFIER_FIXED_ID) {
    return safePrice(price - discount);
  }
  return safePrice((price * (100 - discount)) / 100);
};

export const getPlanPrice = (id: number) => {
  switch (Number(id)) {
    case PLAN_BASIC_MONTHLY_ID:
      return config.PRICE_BASIC_MONTHLY;
    case PLAN_BASIC_YEARLY_ID:
      return config.PRICE_BASIC_YEARLY;
    case PLAN_PRO_MONTHLY_ID:
      return config.PRICE_PRO_MONTHLY;
    default:
      return config.PRICE_PRO_YEARLY;
  }
};

export const getProductDescriptor = (id: number) => {
  switch (Number(id)) {
    case PLAN_BASIC_MONTHLY_ID:
    case PLAN_BASIC_YEARLY_ID:
      return 'basic';
    case PLAN_PRO_MONTHLY_ID:
    case PLAN_PRO_YEARLY_ID:
      return 'pro';
    default:
      return '';
  }
};

export const getPriceDescriptor = (id: number) => {
  switch (Number(id)) {
    case PLAN_BASIC_MONTHLY_ID:
    case PLAN_PRO_MONTHLY_ID:
      return 'monthly';
    default:
      return 'yearly';
  }
};
