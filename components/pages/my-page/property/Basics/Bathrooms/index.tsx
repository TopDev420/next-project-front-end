import { useState, useEffect, useContext } from 'react';
import {
  myPagePropertyIdSelector,
  myPagePropertySelector,
} from 'lib/store/selectors/my-page/property';
import { useDispatch, useSelector } from 'react-redux';
import { BathroomInput } from 'lib/forms/bathroom';
import { Property } from 'types/models/Property';
import Alert, { AlertProps } from 'components/Alert';
import BathroomModal from 'components/pages/my-page/property/Basics/Bathrooms/BathroomModal';
import { useMutation } from 'react-query';
import * as bathroomApi from 'lib/apis/bathroom';
import {
  saveBathroom as saveBathroomToStore,
  deleteBathroom as deleteBathroomFromStore,
} from 'lib/store/slices/my-page/property';
import BathroomItem from 'components/pages/my-page/property/Basics/Bathrooms/BathroomItem';
import { ConfirmContext } from 'components/Modal/Provider/ConfirmProvider';
import logger from 'lib/logger';
import _ from 'lodash';
import { createSelector } from '@reduxjs/toolkit';

const convertPropertyToModel = (property: Property | null): BathroomInput[] =>
  property?.bathrooms?.map((item) => ({
    id: item.id,
    name: item.name,
    propertyId: item.propertyId,
    bathroomTypeId: item.bathroomTypeId,
    bathroomFeaturesIds: item.bathroomFeaturesIds || [],
  })) || [];

const bathroomsSelector = createSelector(
  myPagePropertySelector,
  convertPropertyToModel,
);

const Bathrooms = () => {
  const dispatch = useDispatch();
  const propertyId = useSelector(myPagePropertyIdSelector);

  const confirm = useContext(ConfirmContext);

  const [alert, setAlert] = useState<Omit<AlertProps, 'onChange'>>();

  const value = useSelector(bathroomsSelector);

  const [bathroomModel, setBathroomModel] = useState<BathroomInput>();

  const {
    mutate: saveBathroom,
    data: saveBathroomData,
    reset: resetSaveBathroom,
    isLoading: isLoadingSaveBathroom,
    error: saveBathroomError,
  } = useMutation(bathroomApi.saveBathroom);

  const {
    mutate: deleteBathroom,
    data: deletedBathroomId,
    reset: resetDeleteBathroom,
    isLoading: isLoadingDeleteBathroom,
    error: deleteBathroomError,
  } = useMutation(bathroomApi.deleteBathroom);

  const isProcessing = isLoadingSaveBathroom || isLoadingDeleteBathroom;

  const handleSaveBathroom = (val?: BathroomInput) => {
    if (!val) {
      setBathroomModel(undefined);
      return;
    }

    saveBathroom(val);
  };

  const handleDeleteBathroom = (id?: number) => {
    if (!id) {
      logger.warn('Bathroom id is empty');
      return;
    }
    confirm({
      title: 'Do you really want to delete the bathroom?',
      callback: () => deleteBathroom(id),
    });
  };

  /**
   * onSaveSuccess
   */
  useEffect(() => {
    if (saveBathroomData) {
      dispatch(saveBathroomToStore(saveBathroomData));
      setBathroomModel(undefined);
      setAlert({
        severity: 'success',
        title: 'Bathroom has been saved successfully',
      });
    }
  }, [dispatch, saveBathroomData]);

  /**
   * onDeleteSuccess
   */
  useEffect(() => {
    if (deletedBathroomId) {
      dispatch(deleteBathroomFromStore(deletedBathroomId));
      setAlert({
        severity: 'success',
        title: 'Bedroom has been deleted successfully',
      });
    }
  }, [deletedBathroomId, dispatch]);

  /**
   * onSaveError
   */
  useEffect(() => {
    if (saveBathroomError) {
      setAlert({
        severity: 'danger',
        message: `Save failed: ${
          (saveBathroomError as any).message || 'Something went wrong.'
        }`,
      });
    }
  }, [saveBathroomError]);

  /**
   * onDeleteError
   */
  useEffect(() => {
    if (deleteBathroomError) {
      setAlert({
        severity: 'danger',
        message: `Delete failed: ${
          (deleteBathroomError as any).message || 'Something went wrong.'
        }`,
      });
    }
  }, [deleteBathroomError]);

  /**
   * componentWillUnmount
   */
  useEffect(
    () => () => {
      resetSaveBathroom();
      resetDeleteBathroom();
    },
    [resetDeleteBathroom, resetSaveBathroom],
  );

  return (
    <>
      <div className="bg-white shadow-lg p-4 my-2">
        <h2 className="mb-4">Bathrooms</h2>
        {!!alert && <Alert {...alert} onClose={() => setAlert(undefined)} />}
        {!value.length ? (
          <p className="text-sm py-2 text-gray-400 text-center">
            No bathrooms yet
          </p>
        ) : (
          <>
            {value.map((item) => (
              <BathroomItem
                key={item.id}
                bathroom={item}
                actionDisabled={isProcessing}
                onEdit={() => setBathroomModel(item)}
                onDelete={() => handleDeleteBathroom(item.id)}
              />
            ))}
          </>
        )}
        <div className="text-center">
          <button
            type="button"
            className="btn btn-dark"
            onClick={() => {
              setBathroomModel({
                name: '',
                propertyId: propertyId!,
                bathroomTypeId: 0,
                bathroomFeaturesIds: [],
              });
            }}
          >
            Add a bathroom
          </button>
        </div>
      </div>
      <BathroomModal value={bathroomModel} onChange={handleSaveBathroom} />
    </>
  );
};

export default Bathrooms;
