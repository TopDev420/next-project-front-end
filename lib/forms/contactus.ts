import * as yup from 'yup';

export type ContactInput = {
  name: string;
  email: string;
  type?: string;
  phone: string;
  message: string;
};

export const ContactInputSchema = yup.object().shape({
  name: yup.string().required().label('Name'),
  email: yup.string().required().email().label('Email'),
  type: yup.string().label('Type'),
  phone: yup.string().label('Phone'),
  message: yup.string().required().max(1000).label('Message'),
});
