import { useState, useCallback, useContext, useEffect } from 'react';
import { useMutation } from 'react-query';
import { useDispatch, useSelector } from 'react-redux';
import { DiscountInput } from 'lib/forms/discount';
import { Property } from 'types/models/Property';
import { myPagePropertySelector } from 'lib/store/selectors/my-page/property';
import DiscountItem from 'components/pages/my-page/property/Fees/Discounts/DiscountItem';
import {
  DISCOUNT_TYPE_LAST_MIN_ID,
  MODIFIER_FIXED_ID,
} from 'constants/master-types';
import DiscountModal from 'components/pages/my-page/property/Fees/Discounts/DiscountModal';
import * as discountApi from 'lib/apis/discount';
import logger from 'lib/logger';
import { ConfirmContext } from 'components/Modal/Provider/ConfirmProvider';
import {
  saveDiscount as saveDiscountToStore,
  deleteDiscount as deleteDiscountFromStore,
} from 'lib/store/slices/my-page/property';
import Alert, { AlertProps } from 'components/Alert';

const convertPropertyToModel = (property: Property | null): DiscountInput[] =>
  property?.discounts?.map((discount) => ({
    id: discount.id,
    propertyId: discount.propertyId,
    discountTypeId: discount.discountTypeId,
    modifierId: discount.modifierId,
    name: discount.name,
    period: discount.period,
    amount: discount.amount,
  })) || [];

const Discounts = () => {
  const dispatch = useDispatch();
  const property = useSelector(myPagePropertySelector);
  const model = convertPropertyToModel(property);

  const [alert, setAlert] = useState<Omit<AlertProps, 'onChange'>>();

  const confirm = useContext(ConfirmContext);

  const [editItem, setEditItem] = useState<DiscountInput>();

  const {
    mutate: saveDiscount,
    data: saveDiscountData,
    isLoading: isLoadingSaveDiscount,
    error: saveDiscountError,
    reset: resetSaveDiscount,
  } = useMutation(discountApi.saveDiscount);

  const {
    mutate: deleteDiscount,
    data: deletedDiscountId,
    isLoading: isLoadingDeleteDiscount,
    error: deleteDiscountError,
    reset: resetDeleteDiscount,
  } = useMutation(discountApi.deleteDiscount);

  const isProcessing = isLoadingSaveDiscount || isLoadingDeleteDiscount;

  const handleSaveDiscount = useCallback(
    (input?: DiscountInput) => {
      if (!input) {
        setEditItem(undefined);
        return;
      }

      saveDiscount(input);
    },
    [saveDiscount],
  );

  const handleDeleteDiscount = (id?: number) => {
    if (!id) {
      logger.warn('Discount id is empty');
      return;
    }

    confirm({
      title: 'Do you really want to delete the discount?',
      callback: () => deleteDiscount(id),
    });
  };

  /**
   * onSaveSuccess
   */
  useEffect(() => {
    if (!saveDiscountData) {
      return;
    }
    dispatch(saveDiscountToStore(saveDiscountData));
    setEditItem(undefined);
    setAlert({
      severity: 'success',
      title: 'Discount has been saved successfully',
    });
  }, [dispatch, saveDiscountData]);

  /**
   * onSaveError
   */
  useEffect(() => {
    if (!saveDiscountError) {
      return;
    }
    setAlert({
      severity: 'danger',
      title: 'Save failed',
      message: (saveDiscountError as any).message || 'Something went wrong',
    });
  }, [saveDiscountError]);

  /**
   * onDeleteSuccess
   */
  useEffect(() => {
    if (!deletedDiscountId) {
      return;
    }
    dispatch(deleteDiscountFromStore(deletedDiscountId));
    setAlert({
      severity: 'success',
      title: 'Discount has been deleted successfully',
    });
  }, [dispatch, deletedDiscountId]);

  /**
   * onDeleteError
   */
  useEffect(() => {
    if (!deleteDiscountError) {
      return;
    }
    setAlert({
      severity: 'danger',
      title: 'Delete failed',
      message: (deleteDiscountError as any).message || 'Something went wrong',
    });
  }, [deleteDiscountError]);

  /**
   * componentWillUnmount
   */
  useEffect(
    () => () => {
      resetSaveDiscount();
      resetDeleteDiscount();
    },
    [resetDeleteDiscount, resetSaveDiscount],
  );

  return (
    <>
      <div className="bg-white p-6 my-4 shadow-lg">
        <h2 className="mb-4">Discounts</h2>
        {!!alert && <Alert {...alert} onClose={() => setAlert(undefined)} />}
        {model.length > 0 ? (
          <>
            {model.map((discount) => (
              <DiscountItem
                actionDisabled={isProcessing}
                value={discount}
                onEdit={() => setEditItem(discount)}
                onDelete={() => handleDeleteDiscount(discount.id)}
              />
            ))}
          </>
        ) : (
          <p className="text-gray-600">No discounts</p>
        )}
        <div className="text-center mt-4">
          <button
            type="button"
            className="btn btn-success"
            disabled={isProcessing}
            onClick={() =>
              setEditItem({
                propertyId: property!.id,
                discountTypeId: DISCOUNT_TYPE_LAST_MIN_ID,
                modifierId: MODIFIER_FIXED_ID,
                period: 1,
                name: '',
                amount: 0,
              })
            }
          >
            + Add discount
          </button>
        </div>
      </div>
      <DiscountModal value={editItem} onChange={handleSaveDiscount} />
    </>
  );
};

export default Discounts;
