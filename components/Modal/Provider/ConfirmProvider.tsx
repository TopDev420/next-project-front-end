import Modal from 'components/Modal';
import Confirm from 'components/Modal/Containers/Confirm';
import React, { createContext, useState, useEffect } from 'react';

export type ConfirmOption = {
  title?: string;
  message?: string;
  callback?: () => void;
};

type ConfirmType = (option?: ConfirmOption) => void;

export const ConfirmContext = createContext<ConfirmType>(() => {});

const ConfirmProvider: React.FC = ({ children }) => {
  const [open, setOpen] = useState(false);
  const [confirm, setConfirm] = useState<ConfirmOption>();

  useEffect(() => {
    if (confirm) {
      setOpen(true);
    }
  }, [confirm]);

  return (
    <>
      <ConfirmContext.Provider value={setConfirm}>
        {children}
      </ConfirmContext.Provider>
      <Modal open={open} onClose={() => setOpen(false)}>
        <Confirm
          title={confirm?.title}
          message={confirm?.message}
          callback={(yes) => {
            setOpen(false);
            if (yes && confirm?.callback) {
              confirm.callback();
            }
          }}
        />
      </Modal>
    </>
  );
};

export default ConfirmProvider;
