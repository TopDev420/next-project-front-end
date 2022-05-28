import { DiscountInput } from 'lib/forms/discount';
import { getRestfulApis } from 'lib/helpers/api';
import { Discount } from 'types/models/Discount';

const [saveDiscount, deleteDiscount] = getRestfulApis<DiscountInput, Discount>(
  'discount',
);

export { saveDiscount, deleteDiscount };
