import { useState, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useMutation } from 'react-query';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  UpdatePropertyDescriptionInput,
  UpdatePropertyDescriptionSchema,
} from 'lib/forms/property';
import * as propertyApi from 'lib/apis/property';
import {
  nextStep,
  saveDescription as saveDescriptionToStore,
} from 'lib/store/slices/my-page/property';
import Actions from 'components/pages/my-page/property/Actions';
import useStep from 'components/pages/my-page/property/Actions/useStep';
import Layout from 'components/pages/my-page/property/Layout';
import FormContext from 'components/pages/my-page/property/Description/FormContext';
import Summary from 'components/pages/my-page/property/Description/Summary';
import { ErrorProvider } from 'components/Error/Provider';
import { myPagePropertySelector } from 'lib/store/selectors/my-page/property';
import Space from 'components/pages/my-page/property/Description/Space';
import NeighborHood from 'components/pages/my-page/property/Description/NeighborHood';
import Alert from 'components/Alert';
import { Property } from 'types/models/Property';

const convertPropertyToModel = (
  property: Property,
): UpdatePropertyDescriptionInput => ({
  propertyId: property?.id!,
  title: property?.propertyDescription?.title || '',
  summary: property?.propertyDescription?.summary || '',
  guestAccess: property?.propertyDescription?.guestAccess || '',
  guestInteraction: property?.propertyDescription?.guestInteraction || '',
  notes: property?.propertyDescription?.notes || '',
  houseRules: property?.propertyDescription?.houseRules || '',
  neighborOverview: property?.propertyDescription?.neighborOverview || '',
  neighborGettingAround:
    property?.propertyDescription?.neighborGettingAround || '',
});

const Description: typeof Layout = ({
  title = 'Tell Travelers About Your Space',
  description = 'Every space on Vacation.Rentals is unique. Highlight what makes your listing welcoming so that it stands out to guests who want to stay in your area.',
  sideTitle = 'Description',
  sideDescription = 'Your listing name will be the first thing travelers see when they find your space in search results. Example: Cozy cottage just off Main Street',
}) => {
  const dispatch = useDispatch();
  const actionProps = useStep();

  const property = useSelector(myPagePropertySelector);

  const form = useForm<UpdatePropertyDescriptionInput>({
    resolver: yupResolver(UpdatePropertyDescriptionSchema),
    defaultValues: convertPropertyToModel(property!),
  });

  const {
    handleSubmit,
    formState: { errors },
    reset: resetFormValue,
  } = form;

  const [isContinuing, setIsContinuing] = useState(false);

  const { mutate, data, error, isLoading, reset } = useMutation(
    propertyApi.updatePropertyDescription,
  );

  const onSubmit: SubmitHandler<UpdatePropertyDescriptionInput> = useCallback(
    (input) => {
      mutate(input);
    },
    [mutate],
  );

  const handleSave = (continuing: boolean) => {
    setIsContinuing(continuing);
    handleSubmit(onSubmit)();
  };

  const scrollToTop = useCallback(() => {
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0 });
    }
  }, []);

  /**
   * onSaveSuccess
   */
  useEffect(() => {
    if (!data) {
      return;
    }

    dispatch(saveDescriptionToStore(data));
    if (isContinuing) {
      dispatch(nextStep());
    } else {
      scrollToTop();
    }
  }, [dispatch, data, scrollToTop, isContinuing]);

  /**
   * onPropertyChange
   */
  useEffect(() => {
    if (property) {
      resetFormValue(convertPropertyToModel(property));
    }
  }, [property, resetFormValue]);

  /**
   * componentWillUnmount
   */
  useEffect(() => () => reset(), [reset]);

  useEffect(() => {
    scrollToTop();
  }, [scrollToTop]);

  const renderActions = () => (
    <Actions {...actionProps} isLoading={isLoading} onSave={handleSave} />
  );

  return (
    <Layout
      title={title}
      description={description}
      sideTitle={sideTitle}
      sideDescription={sideDescription}
      step="description"
    >
      {renderActions()}
      {!!data && (
        <div className="mt-4 -mb-4">
          <Alert severity="success" title="Saved successfully" />
        </div>
      )}
      <form method="PUT" onSubmit={handleSubmit(onSubmit)}>
        <FormContext.Provider value={form}>
          <ErrorProvider client={errors} server={error}>
            <input
              type="hidden"
              defaultValue={property?.id}
              {...form.register('propertyId')}
            />
            <Summary />
            {renderActions()}
            <Space />
            {renderActions()}
            <NeighborHood />
          </ErrorProvider>
        </FormContext.Provider>
      </form>
      {renderActions()}
    </Layout>
  );
};

export default Description;
