export type Coupon = {
  userId: number | null;
  propertyId: number | null;
  name: string | null;
  stripeId: string;
  discountModifierId: number;
  discount: number;
  trialPeriod: number | null;
};
