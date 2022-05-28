import { UpdatePropertyDescriptionInput } from 'lib/forms/property';
import { createContext } from 'react';
import { UseFormReturn } from 'react-hook-form';

const FormContext =
  // @ts-ignore
  createContext<UseFormReturn<UpdatePropertyDescriptionInput, object>>();

export default FormContext;
