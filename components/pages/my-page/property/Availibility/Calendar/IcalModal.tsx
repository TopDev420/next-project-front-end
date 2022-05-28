import React, { useCallback, useEffect, useRef } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useMutation } from 'react-query';
import { yupResolver } from '@hookform/resolvers/yup';
import Modal from 'components/Modal';
import { RoomInput, RoomSchema } from 'lib/forms/room';
import { myPagePropertyRoomSelector } from 'lib/store/selectors/my-page/room';
import { myPagePropertySelector } from 'lib/store/selectors/my-page/property';
import * as roomApi from 'lib/apis/room';
import { ErrorProvider } from 'components/Error/Provider';
import { getBackendURL } from 'lib/helpers/url';
import SaveIcon from 'assets/images/icons/save.svg';
import CloseIcon from 'assets/images/icons/close.svg';
import theme from 'constants/theme';
import LoadingIndicator from 'components/LoadingIndicator';
import { updateRoom as updatePropertyRoom } from 'lib/store/slices/my-page/property';
import { updateRoom } from 'lib/store/slices/my-page/room';

type IcalModalProps = {
  open?: boolean;
  onClose?: () => void;
  onChange?: () => void;
};

const IcalModal: React.FC<IcalModalProps> = ({
  open = false,
  onClose = () => {},
  onChange = () => {},
}) => {
  const property = useSelector(myPagePropertySelector);
  const room = useSelector(myPagePropertyRoomSelector);
  const roomModel = room || property?.room;
  const dispatch = useDispatch();

  const updateRef = useRef<string[]>([]);

  const {
    register,
    formState: { errors },
    handleSubmit,
    reset: resetForm,
  } = useForm<RoomInput>({
    defaultValues: roomModel,
    resolver: yupResolver(RoomSchema),
  });

  const {
    mutate: save,
    isLoading,
    error,
    data: savedData,
    reset,
  } = useMutation(roomApi.saveRoom);

  const onSubmit: SubmitHandler<RoomInput> = useCallback(
    (input) => save(input),
    [save],
  );

  /**
   * updateRef
   */
  useEffect(() => {
    if (property && property?.room?.id === roomModel?.id) {
      if (!updateRef.current.includes('property')) {
        updateRef.current.push('property');
      }
    } else {
      updateRef.current = updateRef.current.filter(
        (item) => item !== 'property',
      );
    }
    if (room && room.id === roomModel?.id) {
      if (!updateRef.current.includes('room')) {
        updateRef.current.push('room');
      }
    } else {
      updateRef.current = updateRef.current.filter((item) => item !== 'room');
    }
  }, [property, room, roomModel]);

  /**
   * onSaveSuccess
   */
  useEffect(() => {
    if (savedData) {
      if (updateRef.current.includes('property')) {
        dispatch(updatePropertyRoom(savedData));
      }
      if (updateRef.current.includes('room')) {
        dispatch(updateRoom(savedData));
      }
      if (onChange) {
        onChange();
      }
    }
  }, [dispatch, onChange, savedData]);

  /**
   * onRoomModelUpdate
   */
  useEffect(() => {
    resetForm(roomModel);
  }, [roomModel, resetForm]);

  useEffect(() => () => reset(), [reset, open]);

  return (
    <Modal open={open} onClose={onClose} containerClass="sm:max-w-3xl">
      <div>
        <ErrorProvider server={error} client={errors}>
          <div className="flex flex-row justify-between text-white mb-4 p-4 bg-blue-700">
            <h2>iCal Import/Export</h2>
            <button
              className="text-3xl outline-none"
              type="button"
              onClick={onClose}
            >
              &times;
            </button>
          </div>
          <div className="p-4">
            <input type="hidden" {...register('propertyId')} />
            <input type="hidden" {...register('id')} />
            <input type="hidden" {...register('title')} />
            <div className="flex flex-col">
              <label className="mb-4" htmlFor="inputIcalModalIcalFeedURL">
                iCal Feed URL
              </label>
              <div className="bg-gray-100 text-sm p-2 mb-4">
                We'll try to sync your calendar with ical feed when a iCal feed
                URL is saved for the first time. <br /> We'll notify you via
                email when the first synchronization is done. <br /> After that,
                iCal feeds are synced every six hours.
              </div>
              <input
                className="p-2 border w-full mb-6"
                id="inputIcalModalIcalFeedURL"
                {...register('icalFeedUrl')}
              />
            </div>
            <div className="flex flex-col">
              <label className="mb-4" htmlFor="inputIcalModalExportURL">
                Export URL
              </label>
              <div className="p-2 border">
                {(!!roomModel || !!property) && (
                  <a
                    id="inputIcalModalExportURL"
                    target="_blank"
                    rel="noreferrer"
                    href={getBackendURL(
                      roomModel
                        ? `room/${roomModel.id}/ical`
                        : `property/${property!.id}/ical`,
                    )}
                  >
                    {getBackendURL(
                      roomModel
                        ? `room/${roomModel.id}/ical`
                        : `property/${property!.id}/ical`,
                    )}
                  </a>
                )}
              </div>
            </div>
          </div>
        </ErrorProvider>
      </div>
      <div className="w-full mb-4 px-2 flex justify-center border-t pt-4 ">
        <button
          type="button"
          className="btn btn-dark flex items-center mr-2"
          onClick={onClose}
        >
          <CloseIcon
            className="mr-2"
            width={14}
            height={14}
            fill={theme.colors?.white}
          />
          Close
        </button>
        <button
          type="button"
          disabled={isLoading}
          className="btn btn-primary flex items-center"
          onClick={handleSubmit(onSubmit)}
        >
          {isLoading && <LoadingIndicator left light />}
          <SaveIcon
            className="mr-2"
            width={14}
            height={14}
            fill={theme.colors?.white}
          />
          Save
        </button>
      </div>
    </Modal>
  );
};

export default IcalModal;
