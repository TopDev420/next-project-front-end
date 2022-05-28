/* eslint-disable jsx-a11y/label-has-for */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useCallback, useEffect, useContext, useState } from 'react';
import dayjs from 'dayjs';
import { yupResolver } from '@hookform/resolvers/yup';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { useMutation } from 'react-query';
import Input from 'components/pages/my-page/property/Input';
import { ReservationInput, ReservationSchema } from 'lib/forms/reservation';
import { ErrorProvider } from 'components/Error/Provider';
import {
  RESERVATION_STATUS_PENDING,
  RESERVATION_STATUS_ACCEPTED,
  findMasterTypeById,
} from 'constants/master-types';
import ReservationStatuses from 'static/reservation-status.json';
import * as reservationApi from 'lib/apis/reservation';
import LoadingIndicator from 'components/LoadingIndicator';
import {
  CalendarContext,
  updateEvent,
  deleteEvent,
  updateEventStatus,
} from 'components/pages/my-page/property/Availibility/reducer';
import {
  canHostDeleteReservation,
  convertToCalendarEvent,
  convertToEventInput,
} from 'lib/transformers/reservation';
import theme from 'constants/theme';
import logger from 'lib/logger';
import Alert, { AlertProps } from 'components/Alert';
import { useSelector } from 'react-redux';
import { myPagePropertySelector } from 'lib/store/selectors/my-page/property';
import RoomsSelect from 'components/pages/my-page/property/Availibility/EventModal/RoomsSelect';
import { Reservation as ReservationType } from 'types/models/Reservation';
import CheckIcon from 'assets/images/icons/check.svg';
import CloseIcon from 'assets/images/icons/close.svg';
import SaveIcon from 'assets/images/icons/save.svg';
import DeleteIcon from 'assets/images/icons/delete.svg';
import InvalidFeedback from 'components/Error/InvalidFeedback';
import { myPagePropertyRoomIdSelector } from 'lib/store/selectors/my-page/room';

type ReservationProps = {
  value: ReservationType;
  onClose: () => void;
  onUpdated?: () => void;
};

const Reservation: React.FC<ReservationProps> = ({
  value,
  onClose,
  onUpdated,
}) => {
  const { dispatch } = useContext(CalendarContext);
  const property = useSelector(myPagePropertySelector);
  const roomId = useSelector(myPagePropertyRoomIdSelector);
  const [model, setModel] = useState(convertToEventInput(value));
  const [updated, setUpdated] = useState(false);
  const [alert, setAlert] = useState<Omit<AlertProps, 'onChange'> | null>(null);
  const handleClose = useCallback(() => {
    if (updated && onUpdated) onUpdated();
    onClose();
  }, [updated, onUpdated, onClose]);

  const {
    control,
    register,
    formState: { errors },
    reset: resetForm,
    handleSubmit,
  } = useForm<ReservationInput>({
    resolver: yupResolver(ReservationSchema),
    defaultValues: model,
  });

  const {
    mutate,
    reset,
    data,
    isLoading: isLoadingSave,
    error: saveError,
  } = useMutation(reservationApi.saveReservation);

  const {
    mutate: deleteReservation,
    reset: resetDelete,
    data: deletedReservationId,
    isLoading: isLoadingDelete,
    error: deleteError,
  } = useMutation(reservationApi.deleteReservation);

  const {
    mutate: processReservation,
    reset: resetProcess,
    data: processedReservationData,
    isLoading: isLoadingProcess,
    error: processError,
  } = useMutation(reservationApi.processReservation);

  const isProcessing = isLoadingSave || isLoadingDelete || isLoadingProcess;

  const onSubmit: SubmitHandler<ReservationInput> = useCallback(
    (input) => {
      mutate(input);
    },
    [mutate],
  );

  /**
   * onSaveSuccess
   */
  useEffect(() => {
    if (!data) {
      return;
    }
    setUpdated(true);
    if (roomId) {
      const newRoomsIds = data.rooms.map(({ id }) => id);
      if (!newRoomsIds.includes(roomId)) {
        dispatch(deleteEvent({ id: data.id, type: 'Reservation' }));
      }
    } else {
      dispatch(updateEvent(convertToCalendarEvent(data)));
    }

    handleClose();
  }, [dispatch, data, handleClose, roomId]);

  /**
   * onDeleteSuccess
   */
  useEffect(() => {
    if (!deletedReservationId) {
      return;
    }
    setUpdated(true);

    dispatch(deleteEvent({ id: deletedReservationId, type: 'Reservation' }));
    handleClose();
  }, [deletedReservationId, dispatch, handleClose]);

  /**
   * onProcessSuccess
   */
  useEffect(() => {
    if (!processedReservationData) {
      return;
    }
    setUpdated(true);

    setModel((old) => {
      if (old?.status === processedReservationData.status) {
        return old;
      }

      dispatch(
        updateEventStatus({
          id: old?.id!,
          type: 'Reservation',
          status: processedReservationData.status,
        }),
      );

      return {
        ...old,
        status: processedReservationData.status,
      } as ReservationInput;
    });
  }, [processedReservationData, resetForm, dispatch]);

  /**
   * componentWillUnmount
   */
  useEffect(
    () => () => {
      reset();
      resetDelete();
      resetProcess();
    },
    [reset, resetDelete, resetProcess],
  );

  /**
   * onModelChange
   */
  useEffect(() => {
    resetForm(model);
  }, [model, resetForm]);

  /**
   * onValueChange
   */
  useEffect(() => {
    setModel(convertToEventInput(value));
  }, [value]);

  /**
   * onSaveError
   */
  useEffect(() => {
    if (saveError) {
      logger.error(saveError);
    }
  }, [saveError]);

  /**
   * onDeleteError
   */
  useEffect(() => {
    if (deleteError) {
      logger.error(deleteError);
    }
  }, [deleteError]);

  /**
   * onProcessError
   */
  useEffect(() => {
    if (processError) {
      setAlert({
        severity: 'danger',
        message: (processError as any)?.message || '',
      });
    }
  }, [processError]);

  return (
    <div className="flex flex-col">
      <ErrorProvider client={errors} server={saveError}>
        <input type="hidden" {...register('id')} />
        <input type="hidden" {...register('propertyId')} />
        {!!alert && <Alert {...alert} onClose={() => setAlert(null)} />}
        <div className="flex flex-col md:flex-row">
          <div className="w-full mb-4 px-2">
            <Controller
              control={control}
              name="checkedInAt"
              render={({ field }) => (
                <Input
                  required
                  name={field.name}
                  top="Check In"
                  type="date"
                  value={dayjs(field.value).format('YYYY-MM-DD')}
                  onChange={(e) =>
                    field.onChange(dayjs((e.target as any).value).toDate())
                  }
                />
              )}
            />
          </div>
          <div className="w-full mb-4 px-2">
            <Controller
              control={control}
              name="checkedOutAt"
              render={({ field }) => (
                <Input
                  required
                  name={field.name}
                  top="Check Out"
                  type="date"
                  value={dayjs(field.value).format('YYYY-MM-DD')}
                  onChange={(e) =>
                    field.onChange(dayjs((e.target as any).value).toDate())
                  }
                />
              )}
            />
          </div>
        </div>
        <div className="flex flex-col md:flex-row">
          <div className="w-full mb-4 px-2">
            <Controller
              control={control}
              name="firstName"
              render={({ field }) => (
                <Input
                  name={field.name}
                  top="First Name"
                  value={field.value || ''}
                  onChange={field.onChange}
                />
              )}
            />
          </div>
          <div className="w-full mb-4 px-2">
            <Controller
              control={control}
              name="lastName"
              render={({ field }) => (
                <Input
                  name={field.name}
                  top="Last Name"
                  value={field.value || ''}
                  onChange={field.onChange}
                />
              )}
            />
          </div>
        </div>
        <div className="flex flex-col md:flex-row">
          <div className="w-full mb-4 px-2">
            <Controller
              control={control}
              name="email"
              render={({ field }) => (
                <Input
                  name={field.name}
                  top="Email"
                  type="email"
                  value={field.value || ''}
                  onChange={field.onChange}
                />
              )}
            />
          </div>
          <div className="w-full mb-4 px-2">
            <Controller
              control={control}
              name="phone"
              render={({ field }) => (
                <Input
                  name={field.name}
                  top="Phone Number"
                  value={field.value || ''}
                  onChange={field.onChange}
                />
              )}
            />
          </div>
        </div>
        <div className="flex flex-col md:flex-row">
          <div className="w-full mb-4 px-2">
            <Controller
              control={control}
              name="address"
              render={({ field }) => (
                <Input
                  name={field.name}
                  top="Address"
                  value={field.value || ''}
                  onChange={field.onChange}
                />
              )}
            />
          </div>
          <div className="w-full mb-4 px-2">
            <Controller
              control={control}
              name="guests"
              render={({ field }) => (
                <Input
                  top="Guests"
                  name={field.name}
                  type="number"
                  value={field.value || 1}
                  onChange={field.onChange}
                />
              )}
            />
          </div>
        </div>
        <div className="flex flex-col md:flex-row">
          <div className="w-full flex-col mb-4 px-2">
            <Controller
              control={control}
              name="note"
              render={({ field }) => (
                <Input
                  name={field.name}
                  top="Note"
                  textarea
                  value={field.value || ''}
                  onChange={field.onChange}
                />
              )}
            />
          </div>
        </div>

        {!!property && property?.roomsCount > 1 ? (
          <div className="flex flex-col">
            <div className="w-full mb-4 px-2">
              <label>Select Rooms</label>
              <InvalidFeedback name="roomsIds" />
            </div>
            <div className="w-full mb-4 px-2">
              <Controller
                control={control}
                name="roomsIds"
                render={({ field }) => (
                  <RoomsSelect
                    initialData={(value as ReservationType).rooms?.map(
                      ({ id, title }) => ({ label: title, value: id }),
                    )}
                    value={field.value || []}
                    onChange={field.onChange}
                  />
                )}
              />
            </div>
          </div>
        ) : (
          <Controller
            control={control}
            name="roomsIds"
            render={() => <div className="hidden" />}
          />
        )}

        <Controller
          control={control}
          name="roomsRequested"
          render={() => <div className="hidden" />}
        />

        <div className="flex flex-col md:flex-row">
          {!!model?.id && !!model?.status && (
            <div className="w-full mb-4 px-2">
              <div className="flex flex-col flex-wrap">
                <span className="text-sm mb-4">
                  Status:{' '}
                  {findMasterTypeById(ReservationStatuses, model.status)
                    ?.name || ''}
                </span>
                <>
                  {model.status === RESERVATION_STATUS_PENDING && (
                    <div className="flex flex-row">
                      <button
                        disabled={isProcessing}
                        type="button"
                        className="btn btn-info mb-2 flex flex-1 items-center justify-center mr-2"
                        onClick={() =>
                          processReservation({
                            id: model.id!,
                            action: 'accept',
                          })
                        }
                      >
                        <CheckIcon
                          className="mr-2"
                          width={14}
                          height={14}
                          fill={theme.colors?.white}
                        />
                        Accept
                      </button>
                      <button
                        disabled={isProcessing}
                        type="button"
                        className="btn btn-warn mb-2 flex flex-1 items-center justify-center"
                        onClick={() =>
                          processReservation({
                            id: model.id!,
                            action: 'decline',
                          })
                        }
                      >
                        <CloseIcon
                          className="mr-2"
                          width={14}
                          height={14}
                          fill={theme.colors?.white}
                        />
                        Decline
                      </button>
                    </div>
                  )}
                  {model.status === RESERVATION_STATUS_ACCEPTED && (
                    <button
                      disabled={isProcessing}
                      type="button"
                      className="btn btn-dark mb-2"
                      onClick={() =>
                        processReservation({ id: model.id!, action: 'cancel' })
                      }
                    >
                      Cancel Reservation
                    </button>
                  )}
                </>
              </div>
            </div>
          )}
        </div>
        <div className="w-full mb-4 px-2 flex justify-center border-t pt-4 ">
          <button
            type="button"
            className="btn btn-dark flex items-center mr-2"
            onClick={handleClose}
          >
            <CloseIcon
              className="mr-2"
              width={14}
              height={14}
              fill={theme.colors?.white}
            />
            Close
          </button>
          {canHostDeleteReservation(model) && (
            <button
              disabled={isProcessing}
              type="button"
              className="btn btn-danger flex items-center mr-2"
              onClick={() => {
                deleteReservation(model?.id!);
              }}
            >
              <DeleteIcon
                className="mr-2"
                width={14}
                height={14}
                fill={theme.colors?.white}
              />
              Delete
            </button>
          )}
          <button
            type="button"
            disabled={isProcessing}
            className="btn btn-primary flex items-center"
            onClick={handleSubmit(onSubmit)}
          >
            {isProcessing && <LoadingIndicator left light />}
            <SaveIcon
              className="mr-2"
              width={14}
              height={14}
              fill={theme.colors?.white}
            />
            Save
          </button>
        </div>
      </ErrorProvider>
    </div>
  );
};

export default Reservation;
