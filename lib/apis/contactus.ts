import { ContactInput } from 'lib/forms/contactus';
import { post } from 'lib/helpers/api';

export const contact = async (model: ContactInput) => {
  try {
    await post('contactus', {
      ...model,
      type: !model.type ? undefined : model.type,
    });
  } catch (e: any) {
    if (String(e?.response?.status) === '422') {
      e.message = 'Invalid email or password';
    }
    throw e;
  }
  return true;
};
