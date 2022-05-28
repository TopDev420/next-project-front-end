import React, { createContext } from 'react';
import { UseFormReturn } from 'react-hook-form';
import { GuestReservationInput } from 'lib/forms/reservation';

export const FormContext =
  createContext<UseFormReturn<GuestReservationInput, object>>(undefined);

export const FormProvider: React.FC<{
  form: UseFormReturn<GuestReservationInput, object>;
}> = ({ form, children }) => (
  <FormContext.Provider value={form}>{children}</FormContext.Provider>
);
