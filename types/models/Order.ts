export type OrderItem = {
  name: string;
  price: number;
  quantity: number;
  totalPrice: number;
};

export type Charge = {
  name: string;
  price: number;
  taxable: boolean;
  tax: number;
  priceIncTax: number;
};

export type Discount = {
  name: string;
  price: number;
};

export type Order = {
  orderItems: OrderItem[];
  charges: Charge[];
  discounts: Discount[];
  subtotal: number;
  total: number;
  tax: number;
  totalIncTax: number;
  avgPrice: number;
};
