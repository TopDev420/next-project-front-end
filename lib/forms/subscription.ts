export type SubscriptionInput = {
  id?: number | null;
  productAlias: string;
  priceAlias: string;
  propertyId: number;
  couponCode?: string;
  paymentMethodId?: string;
};
