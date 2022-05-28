import React, { useEffect, useCallback, useContext, useState } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { useMutation } from 'react-query';
import dayjs from 'dayjs';
import {
  SeasonalPriceInput,
  SeasonalPriceSchema,
} from 'lib/forms/seasonal-price';
import * as seasonalPriceApi from 'lib/apis/seasonal-price';
import { ErrorProvider } from 'components/Error/Provider';
import Input from 'components/pages/my-page/property/Input';
import CloseIcon from 'assets/images/icons/close.svg';
import DeleteIcon from 'assets/images/icons/delete.svg';
import SaveIcon from 'assets/images/icons/save.svg';
import LoadingIndicator from 'components/LoadingIndicator';
import theme from 'constants/theme';
import { CalendarContext } from 'components/pages/my-page/property/Availibility/reducer';
import Alert, { AlertProps } from 'components/Alert';

type SeasonalPriceProps = {
  value?: SeasonalPriceInput;
  onClose?: () => void;
};

const SeasonalPrice: React.FC<SeasonalPriceProps> = ({
  onClose = () => {},
  value,
}) => {
  const { refetch: updateCalendar } = useContext(CalendarContext);

  const {
    control,
    register,
    formState: { errors },
    reset: resetForm,
    handleSubmit,
  } = useForm<SeasonalPriceInput>({
    resolver: yupResolver(SeasonalPriceSchema),
    defaultValues: value,
  });

  const {
    mutate: saveSeasonalPrice,
    reset: resetSave,
    error: saveError,
    data: saveData,
    isLoading: isLoadingSave,
  } = useMutation(seasonalPriceApi.saveSeasonalPrice);

  const {
    mutate: deleteSeasonalPrice,
    reset: resetDelete,
    error: deleteError,
    data: deletedSeasonalPriceId,
    isLoading: isLoadingDelete,
  } = useMutation(seasonalPriceApi.deleteSeasonalPrice);

  const isProcessing = isLoadingSave || isLoadingDelete;

  const [alert, setAlert] = useState<Omit<AlertProps, 'onChange'> | null>(null);

  const onSubmit: SubmitHandler<SeasonalPriceInput> = useCallback(
    (input) => {
      saveSeasonalPrice(input);
    },
    [saveSeasonalPrice],
  );

  /**
   * onValueUpdate
   */
  useEffect(() => {
    resetForm(value);
  }, [value, resetForm]);

  /**
   * onSaveSuccess
   */
  useEffect(() => {
    if (!saveData) {
      return;
    }
    updateCalendar();
    onClose();
  }, [updateCalendar, onClose, saveData]);

  /**
   * onDeleteSuccess
   */
  useEffect(() => {
    if (!deletedSeasonalPriceId) {
      return;
    }
    updateCalendar();
    onClose();
  }, [deletedSeasonalPriceId, updateCalendar, onClose]);

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
        <div className="flex flex-col md:flex-row">
          <div className="w-full mb-4 px-2">
            <Controller
              control={control}
              name="amountNight"
              render={({ field }) => (
                <Input
                  type="number"
                  name={field.name}
                  top="Nightly Price"
                  value={field.value || ''}
                  onChange={field.onChange}
                />
              )}
            />
          </div>
          <div className="w-full mb-4 px-2">
            <Controller
              control={control}
              name="amountWeek"
              render={({ field }) => (
                <Input
                  type="number"
                  name={field.name}
                  top="Week Price"
                  value={field.value || ''}
                  onChange={field.onChange}
                />
              )}
            />
          </div>
          <div className="w-full mb-4 px-2">
            <Controller
              control={control}
              name="amountMonth"
              render={({ field }) => (
                <Input
                  type="number"
                  name={field.name}
                  top="Month Price"
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
              name="amountWeekend"
              render={({ field }) => (
                <Input
                  type="number"
                  name={field.name}
                  top="Weekend Price"
                  value={field.value || ''}
                  onChange={field.onChange}
                />
              )}
            />
          </div>
          <div className="w-full mb-4 px-2">
            <Controller
              control={control}
              name="minimumStay"
              render={({ field }) => (
                <Input
                  type="number"
                  name={field.name}
                  top="Minimum Stay"
                  value={field.value || ''}
                  onChange={field.onChange}
                />
              )}
            />
          </div>
          <div className="w-full mb-4 px-2">
            <Controller
              control={control}
              name="amountGuestCharge"
              render={({ field }) => (
                <Input
                  type="number"
                  name={field.name}
                  top="Additional Guest Charge"
                  value={field.value || ''}
                  onChange={field.onChange}
                />
              )}
            />
          </div>
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
              onClick={() => deleteSeasonalPrice(value?.id!)}
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

export default SeasonalPrice;
