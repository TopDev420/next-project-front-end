import { useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useForm, SubmitHandler, Controller, useWatch } from 'react-hook-form';
import { useMutation } from 'react-query';
import { yupResolver } from '@hookform/resolvers/yup';
import { Property } from 'types/models/Property';
import { PriceInput, PriceSchema } from 'lib/forms/price';
import { myPagePropertySelector } from 'lib/store/selectors/my-page/property';
import * as propertyApi from 'lib/apis/property';
import { ErrorProvider } from 'components/Error/Provider';
import InvalidFeedback from 'components/Error/InvalidFeedback';
import Alert from 'components/Alert';
import Input from 'components/pages/my-page/property/Input';
import PriceTypes from 'static/price-type.json';
import WeekendDays from 'static/weekend-day.json';
import { savePrice } from 'lib/store/slices/my-page/property';
import LoadingIndicator from 'components/LoadingIndicator';

const convertPropertyToModel = (property: Property | null): PriceInput => ({
  propertyId: property?.id!,
  priceTypeId: property?.price?.priceTypeId || 1,
  weekendDayId: property?.price?.weekendDayId || 1,
  amountNight: property?.price?.amountNight || 100,
  amountWeek: property?.price?.amountWeek || null,
  amountMonth: property?.price?.amountMonth || null,
  amountWeekend: property?.price?.amountWeekend || null,
  minimumStay: property?.price?.minimumStay || null,
  taxRate: property?.price?.taxRate || null,
});

const Prices = () => {
  const dispatch = useDispatch();
  const property = useSelector(myPagePropertySelector);

  const {
    control,
    register,
    formState: { errors },
    reset: resetForm,
    handleSubmit,
  } = useForm({
    resolver: yupResolver(PriceSchema),
    defaultValues: convertPropertyToModel(property),
  });

  const priceTypeId = Number(useWatch({ control, name: 'priceTypeId' }));

  const { mutate, isLoading, error, data, reset } = useMutation(
    propertyApi.updatePropertyPrice,
  );

  const onSubmit: SubmitHandler<PriceInput> = useCallback(
    (input) => mutate(input),
    [mutate],
  );

  /**
   * onSaveSuccess
   */
  useEffect(() => {
    if (data) {
      dispatch(savePrice(data));
    }
  }, [data, dispatch]);

  /**
   * onPropertyUpdate
   */
  useEffect(() => {
    resetForm(convertPropertyToModel(property));
  }, [resetForm, property]);

  /**
   * componentWillUnmount
   */
  useEffect(() => () => reset(), [reset]);

  return (
    <div className="bg-white shadow-lg p-6 my-4">
      <h2 className="mb-4">Nightly Prices</h2>
      <ErrorProvider server={error} client={errors}>
        <form className="flex flex-col" onSubmit={handleSubmit(onSubmit)}>
          <input type="hidden" {...register('propertyId')} />
          {!!data && (
            <Alert severity="success" title="Saved prices successfully" />
          )}
          <Controller
            control={control}
            name="priceTypeId"
            render={({ field }) => (
              <div className="mb-3 pb-4 border-b">
                <div className="flex flex-col md:flex-row md:flex-wrap">
                  {PriceTypes.map((priceType) => (
                    <label
                      className="flex flex-1 items-center mb-1"
                      key={priceType.id}
                    >
                      <input
                        {...register('priceTypeId')}
                        className="mr-1"
                        type="radio"
                        checked={field.value === priceType.id}
                        onChange={(e) => field.onChange(Number(e.target.value))}
                        value={priceType.id}
                      />
                      {priceType.name}
                    </label>
                  ))}
                </div>
                <InvalidFeedback name="priceTypeId" />
              </div>
            )}
          />

          <div className={priceTypeId === 1 ? '' : 'hidden'}>
            <div className="pb-4 mb-4 border-b">
              <div className="flex flex-col md:flex-row">
                <div className="flex flex-1 md:pt-4">
                  Set the default nightly price guests will see for your
                  listing:
                </div>
                <div className="flex flex-col flex-1">
                  <Controller
                    control={control}
                    name="amountNight"
                    render={({ field }) => (
                      <Input
                        type="number"
                        id="inputAmountNight"
                        left="USD"
                        top="Charges per Night"
                        value={field.value}
                        onChange={field.onChange}
                      />
                    )}
                  />
                </div>
              </div>
            </div>
            <div className="pb-4 mb-4 border-b">
              <div className="flex flex-col md:flex-row">
                <div className="flex flex-1 md:pt-4">
                  Set your weekly and monthly price:
                </div>
                <div className="flex flex-col flex-1">
                  <Controller
                    name="amountWeek"
                    control={control}
                    render={({ field }) => (
                      <Input
                        type="number"
                        left="USD"
                        top="Weekly Price"
                        containerClass="mb-2"
                        /*
                        // @ts-ignore */
                        value={field.value}
                        onChange={field.onChange}
                      />
                    )}
                  />
                  <Controller
                    name="amountMonth"
                    control={control}
                    render={({ field }) => (
                      <Input
                        type="number"
                        left="USD"
                        top="Monthly Price"
                        /*
                        // @ts-ignore */
                        value={field.value}
                        onChange={field.onChange}
                      />
                    )}
                  />
                </div>
              </div>
            </div>
            <div className="pb-4 mb-4 border-b">
              <div className="flex flex-col md:flex-row">
                <div className="flex flex-1 md:pt-4">
                  Set your weekend price:
                </div>
                <div className="flex flex-col flex-1">
                  <Controller
                    name="amountWeekend"
                    control={control}
                    render={({ field }) => (
                      <Input
                        type="number"
                        left="USD"
                        top="Weekend Price"
                        containerClass="mb-2"
                        value={field.value || ''}
                        onChange={field.onChange}
                      />
                    )}
                  />
                  <Controller
                    name="weekendDayId"
                    control={control}
                    render={({ field }) => (
                      <Input
                        type="number"
                        top="Select weekend days"
                        select
                        value={field.value}
                        onChange={field.onChange}
                      >
                        {WeekendDays.map((weekendDay) => (
                          <option key={weekendDay.id} value={weekendDay.id}>
                            {weekendDay.name}
                          </option>
                        ))}
                      </Input>
                    )}
                  />
                </div>
              </div>
            </div>
            <div className="pb-4 mb-4 border-b">
              <div className="flex flex-col md:flex-row">
                <div className="flex flex-1 md:pt-4">
                  Minimum nights of booking required:
                </div>
                <div className="flex flex-col flex-1">
                  <Controller
                    name="minimumStay"
                    control={control}
                    render={({ field }) => (
                      <Input
                        top="Enter minimum night"
                        /*
                        // @ts-ignore */
                        value={field.value}
                        onChange={field.onChange}
                      />
                    )}
                  />
                </div>
              </div>
            </div>
            <div className="pb-4 mb-4 border-b">
              <div className="flex flex-col md:flex-row">
                <div className="flex flex-1 md:pt-4">Tax rate:</div>
                <div className="flex flex-col flex-1">
                  <Controller
                    name="taxRate"
                    control={control}
                    render={({ field }) => (
                      <Input
                        top="Enter your tax rate"
                        right="%"
                        name="taxRate"
                        /*
                        // @ts-ignore */
                        value={field.value}
                        onChange={field.onChange}
                      />
                    )}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="text-right">
            <button
              type="submit"
              disabled={isLoading}
              className="btn btn-primary"
            >
              {isLoading && <LoadingIndicator left light />}
              Save
            </button>
          </div>
        </form>
      </ErrorProvider>
    </div>
  );
};

export default Prices;
