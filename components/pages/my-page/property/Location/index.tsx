import Layout from 'components/pages/my-page/property/Layout';
import { useDispatch, useSelector } from 'react-redux';
import { myPagePropertySelector } from 'lib/store/selectors/my-page/property';
import { nextStep, saveLocation } from 'lib/store/slices/my-page/property';
import LocationSelect, { DEFAULT_CENTER } from 'components/LocationSelect';
import {
  getFormattedAddress,
  Location,
  LocationSelectValue,
} from 'types/models/Location';
import { useState, useEffect, useCallback } from 'react';
import * as propertyApi from 'lib/apis/property';
import { useMutation } from 'react-query';
import useStep from 'components/pages/my-page/property/Actions/useStep';
import Actions from 'components/pages/my-page/property/Actions';
import Alert, { AlertProps } from 'components/Alert';
import { useForm } from 'react-hook-form';
import { LocationInput, LocationSchema } from 'lib/forms/location';
import { yupResolver } from '@hookform/resolvers/yup';
import { ErrorProvider } from 'components/Error/Provider';
import InvalidFeedback from 'components/Error/InvalidFeedback';

const containerStyle = {
  height: '100%',
  minHeight: '320px',
};

const locationInputKeys: Array<keyof Omit<LocationInput, 'propertyId'>> = [
  'addressLine1',
  'addressLine2',
  'city',
  'state',
  'countryCode',
  'postalCode',
  'lat',
  'lng',
];

const convertLocationToModel = (location: Location): LocationSelectValue => ({
  addressLine1: location?.addressLine1 || '',
  addressLine2: location?.addressLine2 || '',
  city: location?.city || '',
  state: location?.state || '',
  countryCode: location?.countryCode || '',
  postalCode: location?.postalCode || '',
  lat:
    location?.lat === null || location?.lat === undefined
      ? DEFAULT_CENTER.lat
      : location.lat,
  lng:
    location?.lng === null || location?.lng === undefined
      ? DEFAULT_CENTER.lng
      : location.lng,
  formattedAddress: getFormattedAddress(location),
});

const LocationContainer: typeof Layout = ({
  title = 'Set Your Listing Location',
  description = 'You’re not only sharing your space, you’re sharing your neighborhood. Travelers will use this information to find a place that’s in the right spot.',
  sideTitle = 'Location',
  sideDescription = 'Your exact address will only be shared with confirmed guests.',
}) => {
  const dispatch = useDispatch();
  const property = useSelector(myPagePropertySelector);

  const actionProps = useStep();

  const [alert, setAlert] = useState<Omit<AlertProps, 'onChange'>>();

  const [value, setValue] = useState(
    convertLocationToModel(property?.location!),
  );

  const [isContinuing, setIsContinuing] = useState(false);

  const {
    register,
    formState: { errors },
    reset: resetForm,
    getValues,
    setValue: setFormValue,
  } = useForm<LocationInput>({
    resolver: yupResolver(LocationSchema),
    defaultValues: value as any,
  });

  const { mutate, data, error, reset, isLoading } = useMutation(
    propertyApi.updatePropertyLocation,
  );

  const scrollToTop = useCallback(() => {
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0 });
    }
  }, []);

  const handleSave = useCallback(
    (continuing) => {
      setIsContinuing(continuing);
      mutate({ ...value, propertyId: property!.id });
    },
    [mutate, value, property],
  );

  const renderActions = () => (
    <Actions {...actionProps} isLoading={isLoading} onSave={handleSave} />
  );

  /**
   * onSaveSuccess
   */
  useEffect(() => {
    if (data) {
      dispatch(saveLocation(data));
      if (isContinuing) {
        dispatch(nextStep());
        return;
      }
      setAlert({
        title: 'Location has been saved successfully',
        severity: 'success',
      });
      scrollToTop();
    }
  }, [dispatch, data, scrollToTop, isContinuing]);

  /**
   * onSaveError
   */
  useEffect(() => {
    if (error) {
      setAlert({
        title: 'Save failed',
        severity: 'danger',
        message: (error as any).message || 'Unknown error',
      });
      scrollToTop();
    }
  }, [error, scrollToTop]);

  /**
   * onValueChange
   */
  useEffect(() => {
    const formValue = getValues();
    if (formValue.lat === value.lat && formValue.lng === value.lng) {
      locationInputKeys.forEach((key) => {
        if (formValue[key] !== value[key]) {
          setFormValue(key, value[key] || '');
        }
      });
    } else {
      resetForm(value as any);
    }
  }, [resetForm, value, getValues, setFormValue]);

  /**
   * componentDidMount
   */
  useEffect(() => {
    scrollToTop();
  }, [scrollToTop]);

  /**
   * componentWillUnmount
   */
  useEffect(() => () => reset(), [reset]);

  /**
   * onPropertyChange
   */
  useEffect(() => {
    setValue(convertLocationToModel(property?.location!));
  }, [property]);

  return (
    <Layout
      title={title}
      description={description}
      sideTitle={sideTitle}
      sideDescription={sideDescription}
      step="location"
    >
      {renderActions()}
      <div className="bg-white p-6 shadow-lg my-4">
        {!!alert && <Alert {...alert} onClose={() => setAlert(undefined)} />}
        <div className="flex flex-col-reverse md:flex-row">
          <div className="flex-1 flex flex-col mr-4 mt-4 md:mt-0">
            <h3 className="mb-6">Address</h3>
            <p className="mb-2">
              While guests can see approximately where your listing is located
              in search results, your exact address is private and will only be
              shown to guests after they book your listing.
            </p>
            <ErrorProvider client={errors} server={error}>
              <input
                type="hidden"
                {...register('propertyId')}
                defaultValue={property?.id}
              />
              <InvalidFeedback name="propertyId" />
              <input
                type="text"
                className="mb-2 border p-2 rounded text-sm"
                placeholder="Address Line 1"
                {...register('addressLine1')}
                onChange={(e) =>
                  setValue((old) => ({
                    ...old,
                    addressLine1: e.target.value || '',
                  }))
                }
              />
              <InvalidFeedback name="addressLine1" />
              <input
                type="text"
                className="mb-2 border p-2 rounded text-sm"
                placeholder="Address Line 2"
                {...register('addressLine2')}
                onChange={(e) =>
                  setValue((old) => ({
                    ...old,
                    addressLine2: e.target.value || '',
                  }))
                }
              />
              <InvalidFeedback name="addressLine2" />
              <input
                type="text"
                className="mb-2 border p-2 rounded text-sm"
                placeholder="City"
                {...register('city')}
                onChange={(e) =>
                  setValue((old) => ({ ...old, city: e.target.value || '' }))
                }
              />
              <InvalidFeedback name="city" />
              <input
                type="text"
                className="mb-2 border p-2 rounded text-sm"
                placeholder="State"
                {...register('state')}
                onChange={(e) =>
                  setValue((old) => ({ ...old, state: e.target.value || '' }))
                }
              />
              <InvalidFeedback name="state" />
              <input
                type="hidden"
                placeholder="Country Code"
                {...register('countryCode')}
              />
              <InvalidFeedback name="countryCode" />
              <input
                type="text"
                className="mb-2 border p-2 rounded text-sm"
                placeholder="Postal Code"
                {...register('postalCode')}
                onChange={(e) =>
                  setValue((old) => ({
                    ...old,
                    postalCode: e.target.value || '',
                  }))
                }
              />
              <InvalidFeedback name="postalCode" />
              <input type="hidden" {...register('lat')} />
              <InvalidFeedback name="lat" />
              <input type="hidden" {...register('lng')} />
              <InvalidFeedback name="lng" />
            </ErrorProvider>
          </div>
          <div className="flex-1">
            <LocationSelect
              className="h-full"
              containerStyle={containerStyle}
              value={value}
              onChange={setValue}
              getUserLocation={false}
            />
          </div>
        </div>
      </div>
      {renderActions()}
    </Layout>
  );
};

export default LocationContainer;
