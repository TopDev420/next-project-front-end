import { useEffect, useState, useCallback, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useMutation } from 'react-query';
import { PropertyImageInput } from 'lib/forms/image';
import { myPagePropertySelector } from 'lib/store/selectors/my-page/property';
import * as propertyApi from 'lib/apis/property';
import { getDataUrl } from 'lib/helpers/image';
import { nextStep, saveImages } from 'lib/store/slices/my-page/property';
import logger from 'lib/logger';
import { convertToPropertyImagesInput } from 'lib/transformers/property';
import Layout from 'components/pages/my-page/property/Layout';
import useStep from 'components/pages/my-page/property/Actions/useStep';
import Actions from 'components/pages/my-page/property/Actions';
import ImageInput from 'components/pages/my-page/property/Photos/ImageInput';
import ImagePreview from 'components/pages/my-page/property/Photos/ImagePreview';
import { ErrorProvider } from 'components/Error/Provider';
import InvalidFeedback from 'components/Error/InvalidFeedback';
import Alert from 'components/Alert';

const Photos: typeof Layout = ({
  title = 'Photos Can Bring Your Space to Life',
  description = 'Add photos of areas guests have access to. You can always come back later and add more.',
  sideTitle = 'Guests Love Photos',
  sideDescription = 'Show your guests how many bedrooms and bathrooms your property has.',
}) => {
  const dispatch = useDispatch();
  const property = useSelector(myPagePropertySelector);
  const [value, setValue] = useState(convertToPropertyImagesInput(property));

  const [isContinuing, setIsContinuing] = useState(false);

  const scrollToTop = useCallback(() => {
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0 });
    }
  }, []);

  const { mutate, isLoading, reset, error, data } = useMutation(
    propertyApi.updatePropertyImages,
  );

  const handleSave = useCallback(
    (continuing: boolean) => {
      setIsContinuing(continuing);
      mutate(value);
    },
    [mutate, value],
  );

  const actionProps = useStep();

  const renderAction = () => (
    <Actions {...actionProps} isLoading={isLoading} onSave={handleSave} />
  );

  const handleSelectImages = useCallback(
    async (
      files: File[] | null,
      images: PropertyImageInput[],
      callback: (val: PropertyImageInput[]) => void,
    ) => {
      if (!files) {
        return;
      }
      const promises = files.map(
        (file) =>
          new Promise<PropertyImageInput | null>((resolve) =>
            getDataUrl(file)
              .then((url) => resolve({ file, url }))
              .catch((e) => {
                logger.warn(e);
                resolve(null);
              }),
          ),
      );
      let newFiles = await Promise.all(promises);
      newFiles = images.concat(
        newFiles.filter((item) => !!item) as PropertyImageInput[],
      );
      callback(newFiles as PropertyImageInput[]);
    },
    [],
  );

  const handleChangeAlt = useCallback(
    (
      images: PropertyImageInput[],
      alt: string,
      index: number,
      callback: (val: PropertyImageInput[]) => void,
    ) => {
      if (!images[index]) {
        return;
      }
      const newImages = [...images];
      newImages[index] = { ...newImages[index], alt };
      callback(newImages);
    },
    [],
  );

  const handleDeleteImage = useCallback(
    (
      images: PropertyImageInput[],
      index: number,
      callback: (val: PropertyImageInput[]) => void,
    ) => {
      const newImages = [...images];
      newImages.splice(index, 1);
      callback(newImages);
    },
    [],
  );

  const handleMoveImage = useCallback(
    (
      images: PropertyImageInput[],
      dragIndex: number,
      hoverIndex: number,
      callback: (val: PropertyImageInput[]) => void,
    ) => {
      if (dragIndex === hoverIndex) {
        return;
      }
      const newImages = [...images];
      newImages[hoverIndex] = images[dragIndex];
      newImages[dragIndex] = images[hoverIndex];
      callback(newImages);
    },
    [],
  );

  const missingAltImageCount = useMemo(() => {
    if (!property?.images?.length) {
      return 0;
    }
    return property.images.filter((item) => !item?.metadata?.alt)?.length || 0;
  }, [property]);

  /**
   * onSaveSuccess
   */
  useEffect(() => {
    if (data) {
      dispatch(saveImages(data));
      if (isContinuing) {
        dispatch(nextStep());
        return;
      }
      scrollToTop();
    }
  }, [data, scrollToTop, dispatch, isContinuing]);

  /**
   * componentWillUnmount
   */
  useEffect(() => () => reset(), [reset]);

  useEffect(() => {
    setValue(convertToPropertyImagesInput(property));
  }, [property]);

  return (
    <Layout
      title={title}
      description={description}
      sideTitle={sideTitle}
      sideDescription={sideDescription}
      step="photos"
    >
      {!!data && <Alert severity="success" message="Saved successfully" />}
      {!!missingAltImageCount && (
        <Alert
          severity="warn"
          message={`Please fill alt for ${missingAltImageCount} image(s)`}
        />
      )}
      {renderAction()}
      <ErrorProvider server={error}>
        <ImageInput
          isLoading={isLoading}
          imagesCount={value.images.length}
          onChange={(files) => {
            handleSelectImages(files, value.images, (val) =>
              mutate({ images: val, propertyId: property!.id }),
            );
          }}
        />
        <InvalidFeedback name="images" />
        <ImagePreview
          images={value.images}
          onAltChange={(val, idx) =>
            handleChangeAlt(value.images, val, idx, (images) => {
              setValue((old) => ({ ...old, images }));
            })
          }
          onDeleteImage={(idx) =>
            handleDeleteImage(value.images, idx, (images) => {
              setValue((old) => ({ ...old, images }));
            })
          }
          moveImage={(dragIndex, hoverIndex) => {
            handleMoveImage(value.images, dragIndex, hoverIndex, (images) => {
              setValue((old) => ({ ...old, images }));
            });
          }}
        />
      </ErrorProvider>
      {renderAction()}
    </Layout>
  );
};

export default Photos;
