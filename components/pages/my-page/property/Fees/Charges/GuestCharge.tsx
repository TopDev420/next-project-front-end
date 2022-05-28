import { useCallback, useEffect } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import { GuestChargeInput, GuestChargeSchema } from 'lib/forms/guest-charge';
import { myPagePropertySelector } from 'lib/store/selectors/my-page/property';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useMutation } from 'react-query';
import { useDispatch, useSelector } from 'react-redux';
import { Property } from 'types/models/Property';
import * as propertyApi from 'lib/apis/property';
import InvalidFeedback from 'components/Error/InvalidFeedback';
import { ErrorProvider } from 'components/Error/Provider';
import { saveGuestCharge } from 'lib/store/slices/my-page/property';
import Alert from 'components/Alert';

const convertPropertyToModel = (
  property?: Property | null,
): GuestChargeInput => ({
  propertyId: property?.id!,
  guestBase: property?.guestCharge?.guestBase || 1,
  guestMax: property?.guestCharge?.guestMax || 1,
  amount: property?.guestCharge?.amount || 0,
});

const GuestCharge = () => {
  const dispatch = useDispatch();
  const property = useSelector(myPagePropertySelector);

  const {
    register,
    formState: { errors },
    reset: resetForm,
    handleSubmit,
  } = useForm<GuestChargeInput>({
    resolver: yupResolver(GuestChargeSchema),
    defaultValues: convertPropertyToModel(property),
  });

  const { mutate, data, isLoading, error, reset } = useMutation(
    propertyApi.updatePropertyGuestCharge,
  );

  const onSubmit: SubmitHandler<GuestChargeInput> = useCallback(
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

    dispatch(saveGuestCharge(data));
  }, [dispatch, data]);

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
    <ErrorProvider server={error} client={errors}>
      <div className="flex flex-col mb-4 border-b">
        <h4 className="mb-4 text-base font-bold">Additional Guest Charge</h4>
        {!!data && (
          <Alert
            severity="success"
            title="Guest charge has been saved successfully"
          />
        )}
        <input type="hidden" {...register('propertyId')} />
        <div className="flex flex-col">
          <div className="flex flex-row flex-wrap -mr-4">
            <div className="flex flex-col mr-4 mb-4">
              <label className="mb-2" htmlFor="inputAmount">
                Charge amount per extra guest
              </label>
              <div className="flex flex-row ">
                <input
                  id="inputAmount"
                  className="border p-2 outline-none"
                  type="number"
                  {...register('amount')}
                />
              </div>
              <InvalidFeedback name="amount" />
            </div>
            <div className="flex flex-col mb-4 mr-4">
              <label className="mb-2" htmlFor="inputGuestBase">
                Number of Base Occupants
              </label>
              <input
                id="inputGuestBase"
                className="border p-2 outline-none"
                type="number"
                {...register('guestBase')}
              />
              <InvalidFeedback name="guestBase" />
            </div>
            <div className="flex flex-col mb-4 mr-4">
              <label className="mb-2" htmlFor="inputGuestMax">
                Number of Max Occupants
              </label>
              <input
                id="inputGuestMax"
                className="border p-2 outline-none"
                type="number"
                {...register('guestMax')}
              />
              <InvalidFeedback name="guestMax" />
            </div>
          </div>
        </div>
      </div>
      <div className="text-right">
        <button
          disabled={isLoading}
          type="button"
          className="btn btn-primary"
          onClick={handleSubmit(onSubmit)}
        >
          Save
        </button>
      </div>
    </ErrorProvider>
  );
};

export default GuestCharge;
