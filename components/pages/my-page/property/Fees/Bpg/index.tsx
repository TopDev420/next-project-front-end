import { useEffect, useCallback } from 'react';
import Image from 'next/image';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  UpdatePropertyBpgInput,
  UpdatePropertyBpgSchema,
} from 'lib/forms/property';
import { myPagePropertySelector } from 'lib/store/selectors/my-page/property';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { useMutation } from 'react-query';
import { useDispatch, useSelector } from 'react-redux';
import { Property } from 'types/models/Property';
import * as propertyApi from 'lib/apis/property';
import { ErrorProvider } from 'components/Error/Provider';
import BpgIcon from 'assets/images/bpg.png';
import LoadingIndicator from 'components/LoadingIndicator';
import InvalidFeedback from 'components/Error/InvalidFeedback';
import Alert from 'components/Alert';
import { setBpg } from 'lib/store/slices/my-page/property';

const convertPropertyToModel = (
  property?: Property | null,
): UpdatePropertyBpgInput => ({
  propertyId: property?.id!,
  bpg: property?.bpg || false,
});

const Bpg = () => {
  const dispatch = useDispatch();
  const property = useSelector(myPagePropertySelector);

  const {
    control,
    formState: { errors },
    reset: resetForm,
    handleSubmit,
  } = useForm<UpdatePropertyBpgInput>({
    resolver: yupResolver(UpdatePropertyBpgSchema),
    defaultValues: convertPropertyToModel(property),
  });

  const { mutate, reset, isLoading, error, data } = useMutation(
    propertyApi.updatePropertyBpg,
  );

  const onSubmit: SubmitHandler<UpdatePropertyBpgInput> = useCallback(
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
    dispatch(setBpg(data.bpg));
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
    <div className="bg-white shadow-lg p-6 my-4">
      {!!data && <Alert severity="success" title="Saved successfully" />}
      <div className="border-b pb-4 mb-4 relative">
        <ErrorProvider server={error} client={errors}>
          <h2 className="mb-4">Best Price Guarantee</h2>
          <InvalidFeedback name="bpg" />
          <p className="pr-4">
            By signing up for the BPG badge you are certifying that all rates
            for this property are the lowest rates published anywhere on the
            internet. If you fail to meet this obligation, you will agree to
            match or beat the rate you have published elsewhere or risk having
            your listing suspended until you do.{' '}
            <strong>
              Your nightly rate must be at least 2% lower than any other online
              travel agency you list with to include your own website.
            </strong>
          </p>
          <p className="pr-4 mt-2">
            I certify my daily rates qualifies for the BPG badge and will
            maintain them for the duration of my subscription.
          </p>
          <Controller
            name="bpg"
            control={control}
            render={({ field }) => (
              <div className="flex flex-row ml-1">
                <label className="mr-2">
                  <input
                    className="mr-1"
                    type="radio"
                    checked={field.value === true}
                    onChange={() => field.onChange(true)}
                  />
                  Yes
                </label>
                <label>
                  <input
                    className="mr-1"
                    type="radio"
                    checked={field.value === false}
                    onChange={() => field.onChange(false)}
                  />
                  No
                </label>
              </div>
            )}
          />
        </ErrorProvider>
        <div className="absolute bottom-0 right-0 opacity-30">
          <Image src={BpgIcon.src} width={95} height={150} />
        </div>
      </div>
      <div className="text-right">
        <button
          disabled={isLoading}
          type="button"
          className="btn btn-primary"
          onClick={handleSubmit(onSubmit)}
        >
          {isLoading && <LoadingIndicator left light />}
          Save
        </button>
      </div>
    </div>
  );
};

export default Bpg;
