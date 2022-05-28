import { BathroomInput } from 'lib/forms/bathroom';
import { getRestfulApis } from 'lib/helpers/api';
import { Bathroom } from 'types/models/Bathroom';

const [saveBathroom, deleteBathroom] = getRestfulApis<BathroomInput, Bathroom>(
  'bathroom',
);

export { saveBathroom, deleteBathroom };
