import { useCallback, useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useMutation } from 'react-query';
import { useDispatch, useSelector } from 'react-redux';
import Actions from 'components/pages/my-page/property/Actions';
import useStep from 'components/pages/my-page/property/Actions/useStep';
import Layout from 'components/pages/my-page/property/Layout';
import SideDescription from 'components/pages/my-page/property/Video/SideDescription';
import {
  UpdatePropertyVideoInput,
  UpdatePropertyVideoSchema,
} from 'lib/forms/property';
import { myPagePropertySelector } from 'lib/store/selectors/my-page/property';
import { Property } from 'types/models/Property';
import * as propertyApi from 'lib/apis/property';
import { ErrorProvider } from 'components/Error/Provider';
import InvalidFeedback from 'components/Error/InvalidFeedback';
import { saveVideo, nextStep } from 'lib/store/slices/my-page/property';
import Alert from 'components/Alert';

const convertPropertyToModel = (property: Property | null) => ({
  propertyId: property?.id!,
  video: property?.video || '',
});

const Video: typeof Layout = ({
  title = 'Video Can Bring Your Space to Life',
  description = 'Add video of areas guests have access to.',
  sideTitle = 'Guests Love Video',
  sideDescription = SideDescription,
}) => {
  const dispatch = useDispatch();
  const property = useSelector(myPagePropertySelector);
  const actionProps = useStep();

  const {
    register,
    formState: { errors },
    reset: resetForm,
    handleSubmit,
  } = useForm<UpdatePropertyVideoInput>({
    resolver: yupResolver(UpdatePropertyVideoSchema),
    defaultValues: convertPropertyToModel(property),
  });

  const [isContinuing, setIsContinuing] = useState(false);

  const { mutate, isLoading, error, data, reset } = useMutation(
    propertyApi.updatePropertyVideo,
  );

  const onSubmit: SubmitHandler<UpdatePropertyVideoInput> = useCallback(
    (input) => mutate(input),
    [mutate],
  );

  const handleSave = useCallback(
    (continuing: boolean) => {
      handleSubmit(onSubmit)();
      setIsContinuing(continuing);
    },
    [handleSubmit, onSubmit],
  );

  const renderActions = () => (
    <Actions {...actionProps} isLoading={isLoading} onSave={handleSave} />
  );

  /**
   * onSaveSuccess
   */
  useEffect(() => {
    if (data) {
      dispatch(saveVideo(data.video));
      if (isContinuing) {
        dispatch(nextStep());
      }
    }
  }, [dispatch, data, isContinuing]);

  /**
   * onPropertyUpdate
   */
  useEffect(() => {
    resetForm(convertPropertyToModel(property));
  }, [property, resetForm]);

  /**
   * componentWillUnmount
   */
  useEffect(() => () => reset(), [reset]);

  return (
    <Layout
      title={title}
      description={description}
      sideTitle={sideTitle}
      sideDescription={sideDescription}
      step="video"
    >
      {renderActions()}
      <div className="bg-white p-6 shadow-lg my-4">
        {!!data && (
          <Alert
            severity="success"
            message="Video url has been saved successfully"
          />
        )}
        <ErrorProvider server={error} client={errors}>
          <form>
            <input
              type="hidden"
              {...register('propertyId')}
              defaultValue={property?.id}
            />
            <div className="flex flex-col">
              <label className="mb-2 font-bold" htmlFor="inputVideo">
                YouTube Embed URL
              </label>
              <input
                className="p-2 border w-full"
                id="inputVideo"
                type="text"
                placeholder="e.g. https://www.youtube.com/embed/MFh0Fd7BsjE"
                {...register('video')}
              />
            </div>
            <InvalidFeedback name="video" />
          </form>
        </ErrorProvider>
      </div>
      {renderActions()}
    </Layout>
  );
};

export default Video;
