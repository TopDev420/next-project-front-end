import { camelCaseKeys } from 'lib/helpers/object';
import React, {
  useMemo,
  createContext,
  useCallback,
  PropsWithChildren,
  ReactElement,
} from 'react';
import { FieldErrors } from 'react-hook-form';

type ErrorContextType = {
  getFieldErrors: (fieldName: string) => string[];
};

export const ErrorContext = createContext<ErrorContextType>({
  getFieldErrors: () => [],
});

export type ErrorProviderProps<ClientInputType, ServerResponseType> = {
  client?: FieldErrors<ClientInputType>;
  server?:
    | any
    | {
        message?: string;
        response?: {
          data?: {
            message?: string;
            errors?: Record<keyof ServerResponseType, string[]>;
          };
        };
      };
};

export const ErrorProvider = <C extends unknown = Record<string, any>, S = C>({
  client,
  server,
  children,
}: PropsWithChildren<ErrorProviderProps<C, S>>): ReactElement | null => {
  const serverErrors = useMemo(
    () => camelCaseKeys(server?.response?.data?.errors || {}),
    [server],
  ) as Record<string, string[]>;

  const getFieldErrors = useCallback(
    (fieldName: string) => {
      if (serverErrors[fieldName]) {
        return serverErrors[fieldName];
      }
      return (client as any)?.[fieldName]?.message
        ? [(client as any)[fieldName].message]
        : [];
    },
    [client, serverErrors],
  );

  return (
    <ErrorContext.Provider value={{ getFieldErrors }}>
      {children}
    </ErrorContext.Provider>
  );
};
