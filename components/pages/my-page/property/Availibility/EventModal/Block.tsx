import React, { useCallback, useEffect, useState, useContext } from 'react';
import { BlockInput, BlockSchema } from 'lib/forms/block';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import dayjs from 'dayjs';
import { yupResolver } from '@hookform/resolvers/yup';
import { useMutation } from 'react-query';
import * as blockApi from 'lib/apis/block';
import Alert, { AlertProps } from 'components/Alert';
import { ErrorProvider } from 'components/Error/Provider';
import Input from 'components/pages/my-page/property/Input';
import DeleteIcon from 'assets/images/icons/delete.svg';
import SaveIcon from 'assets/images/icons/save.svg';
import CloseIcon from 'assets/images/icons/close.svg';
import LoadingIndicator from 'components/LoadingIndicator';
import theme from 'constants/theme';
import {
  CalendarContext,
  deleteEvent,
  updateEvent,
} from 'components/pages/my-page/property/Availibility/reducer';
import { convertToCalendarEvent } from 'lib/transformers/block';
import { useSelector } from 'react-redux';
import { myPagePropertyRoomIdSelector } from 'lib/store/selectors/my-page/room';
import { myPagePropertySelector } from 'lib/store/selectors/my-page/property';

type BlockProps = {
  value?: BlockInput;
  onClose?: () => void;
};

const Block: React.FC<BlockProps> = ({ value, onClose = () => {} }) => {
  const { dispatch } = useContext(CalendarContext);
  const property = useSelector(myPagePropertySelector);
  const roomId = useSelector(myPagePropertyRoomIdSelector);

  const {
    control,
    register,
    formState: { errors },
    reset: resetForm,
    handleSubmit,
  } = useForm<BlockInput>({
    resolver: yupResolver(BlockSchema),
    defaultValues: value,
  });

  const {
    mutate: saveBlock,
    reset: resetSave,
    error: saveError,
    isLoading: isLoadingSave,
    data: saveData,
  } = useMutation(blockApi.saveBlock);

  const {
    mutate: deleteBlock,
    reset: resetDelete,
    error: deleteError,
    isLoading: isLoadingDelete,
    data: deletedBlockId,
  } = useMutation(blockApi.deleteBlock);

  const isProcessing = isLoadingSave || isLoadingDelete;

  const [alert, setAlert] = useState<Omit<AlertProps, 'onChange'> | null>(null);

  const onSubmit: SubmitHandler<BlockInput> = useCallback(
    (input) => saveBlock(input),
    [saveBlock],
  );

  /**
   * onSaveSuccess
   */
  useEffect(() => {
    if (!saveData) {
      return;
    }

    dispatch(updateEvent(convertToCalendarEvent(saveData)));
    onClose();
  }, [saveData, dispatch, onClose]);

  /**
   * onDeleteSuccess
   */
  useEffect(() => {
    if (!deletedBlockId) {
      return;
    }

    dispatch(deleteEvent({ id: deletedBlockId, type: 'Block' }));
    onClose();
  }, [deletedBlockId, dispatch, onClose]);

  /**
   * onSaveError
   */
  useEffect(() => {
    if (!saveError) {
      return;
    }
    setAlert({
      severity: 'danger',
      message: (saveError as any)?.message || '',
    });
  }, [saveError]);

  /**
   * onDeleteError
   */
  useEffect(() => {
    if (!deleteError) {
      return;
    }
    setAlert({
      severity: 'danger',
      message: (deleteError as any)?.message || '',
    });
  }, [deleteError]);

  /**
   * onValueUpdate
   */
  useEffect(() => {
    resetForm(value);
  }, [value, resetForm]);

  /**
   * componentWillUnmount
   */
  useEffect(
    () => () => {
      resetSave();
      resetDelete();
    },
    [resetSave, resetDelete],
  );

  return (
    <div className="flex flex-col">
      <ErrorProvider client={errors}>
        <input type="hidden" {...register('id')} />
        <input type="hidden" {...register('propertyId')} />
        {!!alert && <Alert {...alert} onClose={() => setAlert(null)} />}

        <div className="flex flex-col md:flex-row">
          <div className="w-full mb-4 px-2">
            <Controller
              control={control}
              name="name"
              render={({ field }) => (
                <Input
                  name={field.name}
                  top="Title"
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
              name="startedAt"
              render={({ field }) => (
                <Input
                  name={field.name}
                  required
                  top="Start At"
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
              name="endedAt"
              render={({ field }) => (
                <Input
                  name={field.name}
                  required
                  top="End At"
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
        <div className="flex flex-col mb-4 px-2">
          {!!property && property.roomsCount > 1 && !!roomId ? (
            <Controller
              control={control}
              name="roomId"
              render={({ field }) => (
                <label className="mb-4 flex items-center">
                  <input
                    className="mr-1"
                    type="checkbox"
                    name="roomId"
                    checked={!!field.value}
                    onChange={() => {
                      if (!field.value) {
                        field.onChange(roomId);
                      } else {
                        field.onChange(null);
                      }
                    }}
                  />
                  Apply to All Rooms
                </label>
              )}
            />
          ) : (
            <Controller
              control={control}
              name="roomId"
              render={() => <div />}
            />
          )}
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
          {!!value?.id && (
            <button
              disabled={isProcessing}
              type="button"
              className="btn btn-danger flex items-center mr-2"
              onClick={() => deleteBlock(value?.id!)}
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

export default Block;
