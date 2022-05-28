import { BedroomInput } from 'lib/forms/bedroom';
import { getRestfulApis } from 'lib/helpers/api';
import { Bedroom } from 'types/models/Bedroom';

const [saveBedroom, deleteBedroom] = getRestfulApis<BedroomInput, Bedroom>(
  'bedroom',
);

export { saveBedroom, deleteBedroom };
