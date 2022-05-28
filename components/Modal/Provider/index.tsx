import React from 'react';
import ReduxModals from 'components/Modal/Provider/ReduxModals';
import ConfirmProvider from 'components/Modal/Provider/ConfirmProvider';

export const ModalProvider: React.FC = ({ children }) => (
  <>
    <ConfirmProvider>{children}</ConfirmProvider>
    <ReduxModals />
  </>
);
