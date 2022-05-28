import React, { useEffect, useState, useCallback } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { useMutation } from 'react-query';
import { useDispatch, useSelector } from 'react-redux';
import _ from 'lodash';
import { yupResolver } from '@hookform/resolvers/yup';
import Actions from 'components/pages/my-page/property/Actions';
import useStep from 'components/pages/my-page/property/Actions/useStep';
import AmenitiesSideDescription from 'components/pages/my-page/property/Amenities/SideDescription';
import Layout from 'components/pages/my-page/property/Layout';
import {
  UpdatePropertyAmenitiesInput,
  UpdatePropertyAmenitiesSchema,
} from 'lib/forms/property';
import { myPagePropertySelector } from 'lib/store/selectors/my-page/property';
import AmenityCategories from 'static/amenity-category.json';
import * as propertyApi from 'lib/apis/property';
import { Property } from 'types/models/Property';
import { nextStep, saveAmenitiesIds } from 'lib/store/slices/my-page/property';
import { ErrorProvider } from 'components/Error/Provider';
import InvalidFeedback from 'components/Error/InvalidFeedback';
import useIsMobile from 'lib/hooks/ui/useIsMobile';
import { getAmenitiesByCategoryId } from 'lib/helpers/master-type';
import Alert from 'components/Alert';

const convertPropertyToModel = (property: Property | null) => ({
  propertyId: property?.id || 0,
  amenitiesIds: property?.amenitiesIds || [],
});

const Amenities: typeof Layout = ({
  title = 'Tell Travelers About Your Space',
  description = 'Every space on Vacation.Rentals is unique. Highlight what makes your listing welcoming so that it stands out to guests who want to stay in your area.',
  sideTitle = 'Amenities',
  sideDescription = AmenitiesSideDescription,
}) => {
  const [isContinuing, setIsContinuing] = useState(false);
  const dispatch = useDispatch();
  const property = useSelector(myPagePropertySelector);

  const isMobile = useIsMobile();

  const scrollToTop = useCallback(() => {
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0 });
    }
  }, []);

  const {
    control,
    register,
    formState: { errors },
    handleSubmit,
    reset: resetForm,
  } = useForm<UpdatePropertyAmenitiesInput>({
    resolver: yupResolver(UpdatePropertyAmenitiesSchema),
    defaultValues: convertPropertyToModel(property),
  });

  const { mutate, data, error, reset, isLoading } = useMutation(
    propertyApi.updateProperyAmenities,
  );

  const actionProps = useStep();

  const onSubmit: SubmitHandler<UpdatePropertyAmenitiesInput> = useCallback(
    (input) => {
      mutate(input);
    },
    [mutate],
  );

  const onSave = useCallback(
    (continuing: boolean) => {
      setIsContinuing(continuing);
      handleSubmit(onSubmit)();
    },
    [onSubmit, handleSubmit],
  );

  const renderAction = () => (
    <Actions {...actionProps} isLoading={isLoading} onSave={onSave} />
  );

  /**
   * onSaveSuccess
   */
  useEffect(() => {
    if (data) {
      dispatch(saveAmenitiesIds(data));
      if (isContinuing) {
        dispatch(nextStep());
        return;
      }
      scrollToTop();
    }
  }, [data, dispatch, isContinuing, scrollToTop]);

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
      step="amenities"
    >
      <ErrorProvider server={error} client={errors}>
        {renderAction()}
        <form method="PUT" className="my-4" onSubmit={handleSubmit(onSubmit)}>
          {!!data && <Alert severity="success" title="Saved successfully" />}
          <input type="hidden" {...register('propertyId')} />
          <InvalidFeedback name="amenitiesIds" />
          <Controller
            control={control}
            name="amenitiesIds"
            render={({ field }) => (
              <>
                {AmenityCategories.map((category) => (
                  <React.Fragment key={`category_${category.id}`}>
                    <div className="bg-white p-6 shadow-lg my-4">
                      <h3 className="mb-4">{category.name}</h3>
                      {_.chunk(
                        getAmenitiesByCategoryId(category.id),
                        isMobile ? 1 : 3,
                      ).map((amenities, chunkIndex) => (
                        <div
                          className="flex w-full flex-wrap mb-2"
                          key={`chunk_row_${category.id}_${chunkIndex}`}
                        >
                          {amenities.map((amenity) => (
                            <label
                              className={isMobile ? 'w-full' : 'w-1/3'}
                              key={`amentiy_${category.id}_${chunkIndex}_${amenity.id}`}
                            >
                              <input
                                type="checkbox"
                                className="mr-1"
                                {...field}
                                checked={field.value?.includes(amenity.id)}
                                value={amenity.id}
                                onChange={() =>
                                  field.onChange(
                                    _.xor(field.value || [], [amenity.id]),
                                  )
                                }
                              />
                              {amenity.name}
                            </label>
                          ))}
                        </div>
                      ))}
                    </div>
                    {renderAction()}
                  </React.Fragment>
                ))}
              </>
            )}
          />
        </form>
      </ErrorProvider>
    </Layout>
  );
};

export default Amenities;
