import { dismissModal, presentModal } from 'lib/store/slices/ui';
import _ from 'lodash';
import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { ModalType } from 'types/Modal';

export type UseModalReturn = [
  (type: ModalType, props?: any) => void,
  (type?: ModalType) => void,
];

const useModal: <T = undefined>(
  type: ModalType,
  props?: T,
) => UseModalReturn = () => {
  const dispatch = useDispatch();

  const present: UseModalReturn[0] = useCallback(
    (type, props) => {
      dispatch(presentModal({ type, props }));
    },
    [dispatch],
  );

  const dismiss: UseModalReturn[1] = useCallback(
    (type) => {
      dispatch(dismissModal({ type }));
    },
    [dispatch],
  );

  return [present, dismiss];
};

export default useModal;
