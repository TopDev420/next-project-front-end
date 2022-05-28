export const formatPrice = (
  price: number | string,
  options?: Partial<Intl.NumberFormatOptions>,
) => {
  const amount = Number(price);
  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    ...options,
  });
  return formatter.format(amount);
};

export const formatNumber = (
  number: number | string,
  options?: Partial<Intl.NumberFormatOptions>,
) => {
  let amount = Number(number);
  if (Number.isNaN(amount)) {
    amount = 0;
  }
  const formatter = new Intl.NumberFormat('en-US', options);
  return formatter.format(amount);
};

export const safePrice = (value: any) => {
  const number = Number(value);
  if (number < 0 || Number.isNaN(number)) {
    return 0;
  }
  return number;
};
