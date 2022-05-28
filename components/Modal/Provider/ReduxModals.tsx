import Modal from 'components/Modal';
import { HASH_MODAL_TYPES, MODALS } from 'constants/modals';
import { normalizeHash, removeHash } from 'lib/helpers/url';
import useHash from 'lib/hooks/useHash';
import { modalsSelector } from 'lib/store/selectors/ui';
import { currentUserSelector } from 'lib/store/selectors/user';
import { dismissModal, presentModal } from 'lib/store/slices/ui';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ModalType } from 'types/Modal';
import _ from 'lodash';

const ReduxModals: React.FC = () => {
  const dispatch = useDispatch();
  const user = useSelector(currentUserSelector);
  const modals = useSelector(modalsSelector);
  const [hash, setHash] = useHash();

  /**
   * Hide all modals when auth state is changed
   */
  useEffect(() => {
    dispatch(dismissModal(undefined));
  }, [dispatch, user]);

  /**
   * Show modal by location hash
   */
  useEffect(() => {
    if (
      HASH_MODAL_TYPES.includes(hash) &&
      !Object.keys(modals).includes(hash)
    ) {
      dispatch(presentModal({ type: hash as ModalType, exclusive: true }));
    }
  }, [dispatch, hash, modals]);

  /**
   * Remove location hash when modal type is not hash
   */
  useEffect(() => {
    if (!_.intersection(Object.keys(modals), HASH_MODAL_TYPES).length) {
      const oldHash =
        typeof window === 'undefined'
          ? hash
          : normalizeHash(window.location.hash);
      if (HASH_MODAL_TYPES.includes(oldHash)) {
        setHash('');
        removeHash();
      }
    }
  }, [hash, modals, setHash]);

  return (
    <>
      {(Object.keys(MODALS) as ModalType[]).map((type) => {
        const props = modals[type] ?? {};
        const Component = MODALS[type];
        return (
          <Modal
            key={type}
            open={Object.keys(modals).includes(type)}
            onClose={() => {
              dispatch(
                dismissModal({
                  type,
                }),
              );
            }}
          >
            <Component {...props} />
          </Modal>
        );
      })}
    </>
  );
};

export default ReduxModals;
