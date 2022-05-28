import { ModalType } from 'types/Modal';
import React from 'react';
import { useDispatch } from 'react-redux';
import { presentModal } from 'lib/store/slices/ui';

export type ModalPresentLinkProps = {
  type: ModalType;
  className: string;
};

const ModalPresentLink: React.FC<ModalPresentLinkProps> = ({
  type,
  className,
  children,
}) => {
  const dispatch = useDispatch();
  return (
    <a
      href={`/#${type}`}
      className={className}
      onClick={(e) => {
        e.preventDefault();
        dispatch(presentModal({ type, exclusive: true }));
      }}
    >
      {children}
    </a>
  );
};

export default ModalPresentLink;
