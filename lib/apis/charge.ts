import { ChargeInput } from 'lib/forms/charge';
import { getRestfulApis } from 'lib/helpers/api';
import { Charge } from 'types/models/Charge';

const [saveCharge, deleteCharge] = getRestfulApis<ChargeInput, Charge>(
  'charge',
);

export { saveCharge, deleteCharge };
