import { useState, useCallback, useEffect, useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ChargeItem from 'components/pages/my-page/property/Fees/Charges/ChargeItem';
import ChargeModal from 'components/pages/my-page/property/Fees/Charges/ChargeModal';
import { ChargeInput } from 'lib/forms/charge';
import { myPagePropertySelector } from 'lib/store/selectors/my-page/property';
import { Property } from 'types/models/Property';
import { useMutation } from 'react-query';
import * as chargeApi from 'lib/apis/charge';
import {
  saveCharge as saveChargeToStore,
  deleteCharge as deleteChargeFromStore,
} from 'lib/store/slices/my-page/property';
import Alert, { AlertProps } from 'components/Alert';
import { ConfirmContext } from 'components/Modal/Provider/ConfirmProvider';
import logger from 'lib/logger';

const convertPropertyToModel = (property: Property | null): ChargeInput[] =>
  (property?.charges || []).map((charge) => ({
    id: charge.id,
    propertyId: charge.propertyId,
    multiplierId: charge.multiplierId,
    modifierId: charge.modifierId,
    name: charge.name,
    amount: charge.amount,
    taxable: charge.taxable,
    optional: charge.optional,
  }));

const Charges = () => {
  const dispatch = useDispatch();
  const property = useSelector(myPagePropertySelector);
  const confirm = useContext(ConfirmContext);
  const model = convertPropertyToModel(property);

  const [alert, setAlert] = useState<Omit<AlertProps, 'onChange'>>();

  const [editItem, setEditItem] = useState<ChargeInput>();

  const {
    mutate: saveCharge,
    data: saveChargeData,
    reset: resetSaveCharge,
    isLoading: isLoadingSaveCharge,
    error: saveChargeError,
  } = useMutation(chargeApi.saveCharge);

  const {
    mutate: deleteCharge,
    data: deletedChargeId,
    reset: resetDeleteCharge,
    isLoading: isLoadingDeleteCharge,
    error: deleteChargeError,
  } = useMutation(chargeApi.deleteCharge);

  const isProcessing = isLoadingDeleteCharge || isLoadingSaveCharge;

  const handleSaveCharge = useCallback(
    (input?: ChargeInput) => {
      if (!input) {
        setEditItem(undefined);
        return;
      }

      saveCharge(input);
    },
    [saveCharge],
  );

  const handleDeleteCharge = (id?: number) => {
    if (!id) {
      logger.warn('Charge id is empty');
      return;
    }
    confirm({
      title: 'Do you really want to delete the charge?',
      callback: () => deleteCharge(id),
    });
  };

  /**
   * onSaveSuccess
   */
  useEffect(() => {
    if (!saveChargeData) {
      return;
    }
    dispatch(saveChargeToStore(saveChargeData));
    setEditItem(undefined);
    setAlert({
      severity: 'success',
      title: 'Charge has been saved successfully',
    });
  }, [dispatch, saveChargeData]);

  /**
   * onSaveError
   */
  useEffect(() => {
    if (!saveChargeError) {
      return;
    }
    setAlert({
      severity: 'danger',
      title: 'Save failed',
      message: (saveChargeError as any).message || 'Something went wrong',
    });
  }, [saveChargeError]);

  /**
   * onDeleteSuccess
   */
  useEffect(() => {
    if (!deletedChargeId) {
      return;
    }
    dispatch(deleteChargeFromStore(deletedChargeId));
    setAlert({
      severity: 'success',
      title: 'Charge has been deleted successfully',
    });
  }, [dispatch, deletedChargeId]);

  /**
   * onDeleteError
   */
  useEffect(() => {
    if (!deleteChargeError) {
      return;
    }
    setAlert({
      severity: 'danger',
      title: 'Delete failed',
      message: (deleteChargeError as any).message || 'Something went wrong',
    });
  }, [deleteChargeError]);

  /**
   * componentWillUnmount
   */
  useEffect(
    () => () => {
      resetSaveCharge();
      resetDeleteCharge();
    },
    [resetDeleteCharge, resetSaveCharge],
  );

  return (
    <>
      <h2 className="mb-4">Charges</h2>
      {!!alert && <Alert {...alert} onClose={() => setAlert(undefined)} />}
      {model.length > 0 ? (
        <>
          {model.map((charge) => (
            <ChargeItem
              key={charge.id}
              actionDisabled={isProcessing}
              value={charge}
              onEdit={() => setEditItem(charge)}
              onDelete={() => handleDeleteCharge(charge.id)}
            />
          ))}
        </>
      ) : (
        <p className="text-gray-600">No charges</p>
      )}
      <div className="text-center mt-4 pb-4 mb-4 border-b">
        <button
          type="button"
          className="btn btn-success"
          disabled={isProcessing}
          onClick={() =>
            setEditItem({
              propertyId: property!.id,
              multiplierId: 1,
              modifierId: 1,
              name: '',
              amount: 10,
              taxable: true,
              optional: true,
            })
          }
        >
          + Add additional charge
        </button>
      </div>
      <ChargeModal value={editItem} onChange={handleSaveCharge} />
    </>
  );
};

export default Charges;
