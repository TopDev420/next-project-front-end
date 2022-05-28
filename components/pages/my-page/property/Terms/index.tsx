import { useEffect, useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import dynamic from 'next/dynamic';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { useMutation } from 'react-query';
import { yupResolver } from '@hookform/resolvers/yup';
import Alert from 'components/Alert';
import Actions from 'components/pages/my-page/property/Actions';
import useStep from 'components/pages/my-page/property/Actions/useStep';
import Layout from 'components/pages/my-page/property/Layout';
import EditorSkeleton from 'components/Editor/Skeleton';
import InvalidFeedback from 'components/Error/InvalidFeedback';
import { ErrorProvider } from 'components/Error/Provider';
import editorConfig from 'constants/editorConfig';
import { UpdateTermsInput, UpdateTermsSchema } from 'lib/forms/property';
import * as propertyApi from 'lib/apis/property';
import { nextStep, saveTerms } from 'lib/store/slices/my-page/property';
import { myPagePropertySelector } from 'lib/store/selectors/my-page/property';
import { Property } from 'types/models/Property';

const Editor = dynamic(() => import('components/Editor'), {
  ssr: false,
  loading: EditorSkeleton,
});

const getTermForm = (property: Property) => ({
  propertyId: property?.id,
  cancellationPolicy: property?.propertyTerm?.cancellationPolicy || '',
});

const Terms: typeof Layout = ({
  title = 'Terms',
  description = 'The requirements and conditions to book a reservation at your listing.',
  sideTitle = 'List Your Cancellation Policy',
  sideDescription = 'Be descriptive with your cancellation policy and let your customers know the policies and penalties for early cancellations and no shows.',
}) => {
  const dispatch = useDispatch();
  const property = useSelector(myPagePropertySelector);

  const {
    control,
    handleSubmit,
    register,
    formState: { errors },
    reset: resetForm,
  } = useForm({
    resolver: yupResolver(UpdateTermsSchema),
    defaultValues: getTermForm(property),
  });

  const [isContinuing, setIsContinuing] = useState(false);

  const { mutate, error, isLoading, reset, data } = useMutation(
    propertyApi.updatePropertyTerms,
  );

  const actionProps = useStep();

  const onSubmit: SubmitHandler<UpdateTermsInput> = useCallback(
    (input) => {
      mutate(input);
    },
    [mutate],
  );

  const handleSave = (continuing: boolean) => {
    setIsContinuing(continuing);
    handleSubmit(onSubmit)();
  };

  const renderActions = () => (
    <Actions {...actionProps} isLoading={isLoading} onSave={handleSave} />
  );

  useEffect(() => {
    if (!data) {
      return;
    }

    dispatch(saveTerms(data));
    if (isContinuing) {
      dispatch(nextStep());
    }
  }, [data, dispatch, isContinuing]);

  /**
   * componentWillUnmount
   */
  useEffect(
    () => () => {
      reset();
    },
    [reset],
  );

  useEffect(() => {
    resetForm(getTermForm(property));
  }, [resetForm, property]);

  return (
    <Layout
      title={title}
      description={description}
      sideTitle={sideTitle}
      sideDescription={sideDescription}
      step="terms"
    >
      {renderActions()}
      {!!data && (
        <div className="my-4">
          <Alert severity="success" title="Saved successfully" />
        </div>
      )}
      <ErrorProvider client={errors} server={error}>
        <div className="bg-white shadow-lg p-6 my-4">
          <div className="flex flex-col">
            <label
              className="font-bold mb-4 mt-2"
              htmlFor="inputCancellationPolicy"
            >
              Cancellation Policy
            </label>
            <InvalidFeedback name="cancellationPolicy" />
            <Controller
              control={control}
              name="cancellationPolicy"
              render={({ field: { onChange, value } }) => (
                <Editor
                  id="inputCancellationPolicy"
                  data={value}
                  onChange={(_event, editor) => onChange(editor.getData())}
                  config={editorConfig}
                />
              )}
            />
          </div>
          <input type="hidden" {...register('propertyId')} />
        </div>
      </ErrorProvider>
    </Layout>
  );
};

export default Terms;
