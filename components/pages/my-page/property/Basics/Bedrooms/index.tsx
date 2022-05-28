import React, { useState, useEffect, useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  myPagePropertyIdSelector,
  myPagePropertySelector,
} from 'lib/store/selectors/my-page/property';
import BedroomModal from 'components/pages/my-page/property/Basics/Bedrooms/BedroomModal';
import { BedroomInput } from 'lib/forms/bedroom';
import { Property } from 'types/models/Property';
import _ from 'lodash';
import * as bedroomApi from 'lib/apis/bedroom';
import { useMutation } from 'react-query';
import {
  saveBedroom as saveBedroomToStore,
  deleteBedroom as deleteBedroomFromStore,
} from 'lib/store/slices/my-page/property';
import BedroomItem from 'components/pages/my-page/property/Basics/Bedrooms/BedroomItem';
import { ConfirmContext } from 'components/Modal/Provider/ConfirmProvider';
import Alert, { AlertProps } from 'components/Alert';
import logger from 'lib/logger';
import { createSelector } from '@reduxjs/toolkit';

const convertPropertyToModel = (property: Property | null): BedroomInput[] =>
  property?.bedrooms?.map((item) => ({
    id: item.id,
    name: item.name,
    propertyId: item.propertyId,
    beds: _.map(item.bedsMap, (val, key) => ({
      id: Number(key),
      count: val,
    })),
  })) || [];

const bedroomsSelector = createSelector(
  myPagePropertySelector,
  convertPropertyToModel,
);

const Bedrooms: React.FC = () => {
  const dispatch = useDispatch();
  const propertyId = useSelector(myPagePropertyIdSelector);
  const value = useSelector(bedroomsSelector);

  const [bedroomModel, setBedroomModel] = useState<BedroomInput>();

  const confirm = useContext(ConfirmContext);

  const [alert, setAlert] = useState<Omit<AlertProps, 'onClose'>>();

  const {
    mutate: saveBedroom,
    data: saveBedroomData,
    reset: resetSaveBedroom,
    isLoading: isLoadingSaveBedroom,
    error: saveBedroomError,
  } = useMutation(bedroomApi.saveBedroom);

  const {
    mutate: deleteBedroom,
    data: deletedBedroomId,
    reset: resetDeleteBedroom,
    isLoading: isLoadingDeleteBedroom,
    error: deleteBedroomError,
  } = useMutation(bedroomApi.deleteBedroom);

  const handleSaveBedroom = (val?: BedroomInput) => {
    if (!val) {
      setBedroomModel(undefined);
      return;
    }

    saveBedroom(val);
  };

  const handleDeleteBedroom = (id?: number) => {
    if (!id) {
      logger.warn('Bedroom id is empty');
      return;
    }
    confirm({
      title: 'Do you really want to delete the bedroom?',
      callback: () => deleteBedroom(id),
    });
  };

  const isProcessing = isLoadingSaveBedroom || isLoadingDeleteBedroom;

  /**
   * onSaveSuccess
   */
  useEffect(() => {
    if (saveBedroomData) {
      dispatch(saveBedroomToStore(saveBedroomData));
      setBedroomModel(undefined);
      setAlert({
        severity: 'success',
        title: 'Bedroom has been saved successfully',
      });
    }
  }, [saveBedroomData, dispatch]);

  /**
   * onDeleteSuccess
   */
  useEffect(() => {
    if (deletedBedroomId) {
      dispatch(deleteBedroomFromStore(deletedBedroomId));
      setAlert({
        severity: 'success',
        title: 'Bedroom has been deleted successfully',
      });
    }
  }, [deletedBedroomId, dispatch]);

  /**
   * onSaveBedroomError
   */
  useEffect(() => {
    if (saveBedroomError) {
      setAlert({
        severity: 'danger',
        message: `Save failed: ${
          (saveBedroomError as any).message || 'Something went wrong.'
        }`,
      });
    }
  }, [saveBedroomError]);

  /**
   * onDeleteBedroomError
   */
  useEffect(() => {
    if (deleteBedroomError) {
      setAlert({
        severity: 'danger',
        message: `Delete failed: ${
          (deleteBedroomError as any).message || 'Something went wrong.'
        }`,
      });
    }
  }, [deleteBedroomError]);

  /**
   * componentWillUnmount
   */
  useEffect(
    () => () => {
      resetSaveBedroom();
      resetDeleteBedroom();
    },
    [resetDeleteBedroom, resetSaveBedroom],
  );

  return (
    <>
      <div className="bg-white shadow-lg p-4 my-2">
        <h2 className="mb-4">Bedrooms</h2>
        {!!alert && <Alert {...alert} onClose={() => setAlert(undefined)} />}
        {!value.length ? (
          <p className="text-sm py-2 text-gray-400 text-center">
            No bedrooms yet
          </p>
        ) : (
          <>
            {value.map((item) => (
              <BedroomItem
                bedroom={item}
                key={item.id}
                actionDisabled={isProcessing}
                onEdit={() => setBedroomModel(item)}
                onDelete={() => handleDeleteBedroom(item.id)}
              />
            ))}
          </>
        )}
        <div className="text-center">
          <button
            type="button"
            className="btn btn-dark"
            disabled={isProcessing}
            onClick={() =>
              setBedroomModel({
                name: '',
                beds: [],
                propertyId: propertyId!,
              })
            }
          >
            Add a bedroom
          </button>
        </div>
      </div>
      <BedroomModal value={bedroomModel} onChange={handleSaveBedroom} />
    </>
  );
};

export default Bedrooms;
