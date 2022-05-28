import { MasterType } from 'types/models/MasterType';
import Modifiers from 'static/modifier.json';
import DiscountTypes from 'static/discount-type.json';
import AmenityCategories from 'static/amenity-category.json';

export const findMasterTypeById = <T extends MasterType = MasterType>(
  masterTypes: T[],
  findId: number,
) => masterTypes.find(({ id }) => id === findId);

export const PRICE_TYPE_NIGHTLY_RATES = 1;
export const PRICE_TYPE_FLEXIBLE = 2;

export const MODIFIER_FIXED_ID = 1;
export const MODIFIER_PERCENT_ID = 2;

export const MODIFIER_FIXED = findMasterTypeById(Modifiers, MODIFIER_FIXED_ID)!;
export const MODIFIER_PERCENT = findMasterTypeById(
  Modifiers,
  MODIFIER_PERCENT_ID,
)!;

export const DISCOUNT_TYPE_LAST_MIN_ID = 1;
export const DISCOUNT_TYPE_EARLY_BIRD_ID = 2;

export const DISCOUNT_TYPE_LAST_MIN = findMasterTypeById(
  DiscountTypes,
  DISCOUNT_TYPE_LAST_MIN_ID,
)!;
export const DISCONT_TYPE_EARLY_BIRD = findMasterTypeById(
  DiscountTypes,
  DISCOUNT_TYPE_EARLY_BIRD_ID,
)!;

export const RESERVATION_STATUS_PENDING = 1;
export const RESERVATION_STATUS_ACCEPTED = 2;
export const RESERVATION_STATUS_DECLINED = 3;
export const RESERVATION_STATUS_CANCELLED_BY_HOST = 4;
export const RESERVATION_STATUS_CANCELLED_BY_GUEST = 5;

export const AMENITY_CATEGORY_IDS = AmenityCategories.map(({ id }) => id);

export const SUBSCRIPTION_STATUS_SUBSCRIBED = 1;
export const SUBSCRIPTION_STATUS_PAUSED = 2;
export const SUBSCRIPTION_STATUS_CANCELLED = 3;

export const PLAN_BASIC_MONTHLY_ID = 1;
export const PLAN_BASIC_YEARLY_ID = 2;
export const PLAN_PRO_MONTHLY_ID = 3;
export const PLAN_PRO_YEARLY_ID = 4;

export const PROPERTY_STATUS_PUBLIC = 1;
export const PROPERTY_STATUS_DRAFT = 0;
export const PROPERTY_STATUSES = [
  PROPERTY_STATUS_PUBLIC,
  PROPERTY_STATUS_DRAFT,
] as const;
