import React, { useEffect, useState, useCallback } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import { useDispatch, useSelector } from 'react-redux';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { useMutation } from 'react-query';
import dayjs from 'dayjs';
import { useDerivedState } from '@glinda93/use-derived-state';
import { Image } from 'types/models/Image';
import ImageUploader from 'components/pages/my-page/profile/ImageUploader';
import Input from 'components/pages/my-page/profile/Input';
import { ErrorProvider } from 'components/Error/Provider';
import LoadingIndicator from 'components/LoadingIndicator';
import { currentUserSelector } from 'lib/store/selectors/user';
import { readFile } from 'lib/helpers/file';
import { UpdateProfileInput, UpdateProfileSchema } from 'lib/forms/user';
import * as userApi from 'lib/apis/user';
import * as userTransformer from 'lib/transformers/user';
import { setUser } from 'lib/store/slices/user';
import Alert, { AlertProps } from 'components/Alert';
import Genders from 'static/gender.json';
import PhoneVerify from 'components/pages/my-page/profile/PhoneVerify';
import PhoneVerifyModal from 'components/Modal/Containers/PhoneVerify';
import Modal from 'components/Modal';
import PhoneInput from 'react-phone-input-2';

const imageToImageUrl = (image: Image) => image?.url || '';

const phoneNumberValidator = (phone: string) : boolean => {
  const re = /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/im;
  return re.test(phone)
}

const Profile: React.FC = () => {
  const dispatch = useDispatch();

  const user = useSelector(currentUserSelector);

  const [isPhoneVerified, setIsPhoneVerified] = useState(
    !!user?.phoneVerifiedAt,
  );

  const [isPhoneValidated, setIsPhoneValidated] = useState(
    phoneNumberValidator(user?.phone),
  );

  const [isPhoneUpdated, setIsPhoneUpdated] = useState(false);

  const [alert, setAlert] = useState<Omit<AlertProps, 'onChange'>>();

  const [verifyModalVisible, setVerifyModalVisible] = useState(false);

  const [image, setImage] = useState<Image | null>(null);

  const {
    control,
    formState: { errors },
    reset: resetForm,
    setValue,
    handleSubmit,
    register,
  } = useForm({
    resolver: yupResolver(UpdateProfileSchema),
    defaultValues: userTransformer.convertToProfileModel(user, image),
  });

  const {
    mutate: updateProfile,
    isLoading: isUpdating,
    reset: resetUpdate,
    data: updated,
    error: updateError,
  } = useMutation(userApi.updateProfile);

  const [imageUrl, setImageUrl] = useDerivedState(image, imageToImageUrl);
  const [file, setFile] = useState<File>();

  const onFileChange = useCallback(
    async (f: File) => {
      if (!f) {
        setImageUrl('');
        return;
      }
      const fileData = await readFile(f);
      setImageUrl(fileData.uri);
    },
    [setImageUrl],
  );

  const onSubmit: SubmitHandler<UpdateProfileInput> = useCallback(
    (input) => {
      updateProfile(input);
    },
    [updateProfile],
  );

  const fetchUserImage = useCallback(async () => {
    const imageData = await userApi.showImage();
    setImage(imageData);
  }, []);

  const handleVerified = useCallback(() => {
    setVerifyModalVisible(false);
    setIsPhoneVerified(true);
  }, []);

  const handleVerficationError = useCallback(() => {
    setAlert({
      severity: 'danger',
      message: 'There is an error.',
    });
  }, []);

  const handleVerifyButNotValidated = useCallback(() => {
    if (!isPhoneValidated) {
      setAlert({
        severity: 'danger',
        message: 'Phone number is invalid!',
      });
    } else if (!isPhoneUpdated) {
      setAlert({
        severity: 'warn',
        message: 'Please save phone number before verify.',
      });
    }
    
  }, [isPhoneUpdated, isPhoneValidated])

  /**
   * update image url
   */
  useEffect(() => {
    if (file) {
      onFileChange(file);
    }
  }, [file, onFileChange]);

  /**
   * update form when user is changed
   */
  useEffect(() => {
    resetForm(userTransformer.convertToProfileModel(user, image));
  }, [resetForm, user, image]);

  useEffect(() => {
    fetchUserImage();
  }, [fetchUserImage]);

  /**
   * update image
   */
  useEffect(() => {
    if (file) {
      setValue('image', {
        file,
      });

      return;
    }
    if (image) {
      setValue('image', {
        id: image.id,
      });

      return;
    }

    setValue('image', undefined);
  }, [image, file, setValue]);

  useEffect(() => {
    if (updated) {
      fetchUserImage();
      setAlert({
        severity: 'success',
        message: 'Profile updated successfully',
      });
      dispatch(setUser(updated));
      setIsPhoneUpdated(true);
    }
  }, [dispatch, fetchUserImage, updated, setIsPhoneUpdated]);

  useEffect(() => {
    if (updateError) {
      setAlert({
        severity: 'danger',
        message: 'Update failed',
      });
    }
  }, [updateError]);

  /**
   * componentWillUnmount
   */
  useEffect(
    () => () => {
      resetUpdate();
    },
    [resetUpdate],
  );

  return (
    <div className="flex flex-col max-w-screen-lg mx-auto p-4 md:p-0">
      <div className="flex flex-col md:flex-row">
        <ErrorProvider server={updateError} client={errors}>
          <input type="hidden" {...register('id')} />
          <Controller
            control={control}
            name="image"
            render={({ field: _field }) => (
              <ImageUploader
                imageUrl={imageUrl}
                data={image?.id ? { file } : { id: image?.id, file }}
                onChange={setFile}
              />
            )}
          />
          <div className="flex-1 ml-0 mt-6 md:mt-0 md:ml-6">
            {!!alert && (
              <Alert
                severity={alert.severity}
                message={alert.message}
                onClose={() => setAlert(undefined)}
              />
            )}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <Controller
                control={control}
                name="firstName"
                render={({ field }) => (
                  <Input
                    top="First Name"
                    name={field.name}
                    value={field.value}
                    onChange={field.onChange}
                    required
                  />
                )}
              />
              <Controller
                control={control}
                name="lastName"
                render={({ field }) => (
                  <Input
                    top="Last Name"
                    name={field.name}
                    value={field.value}
                    onChange={field.onChange}
                    required
                  />
                )}
              />
              <Controller
                control={control}
                name="email"
                render={({ field }) => (
                  <Input
                    top="Email"
                    name={field.name}
                    value={field.value}
                    onChange={field.onChange}
                    required
                  />
                )}
              />
              <Controller
                control={control}
                name="phone"
                render={({ field }) => (
                  <Input
                    top={
                      <PhoneVerify
                        onVerify={() => setVerifyModalVisible(true)}
                        onVerifyButNotValidated={handleVerifyButNotValidated}
                        onError={handleVerficationError}
                        isVerified={isPhoneVerified}
                        isValidated={isPhoneValidated}
                        isUpdated={isPhoneUpdated}
                      />
                    }
                    name={field.name}
                    as = "div"
                    classname = "w-full"
                  >
                    <PhoneInput
                      country='us'
                      value={field.value}
                      onChange={(v) => {
                        setIsPhoneValidated(phoneNumberValidator(v));
                        setIsPhoneUpdated(false);
                        field.onChange(v);
                      }}
                    />
                  </Input>
                )}
              />
              <Controller
                control={control}
                name="password"
                render={({ field }) => (
                  <Input
                    type="password"
                    top="Password"
                    name={field.name}
                    value={field.value}
                    onChange={field.onChange}
                  />
                )}
              />
              <Controller
                control={control}
                name="passwordConfirmation"
                render={({ field }) => (
                  <Input
                    type="password"
                    top="Password Confirmation"
                    name={field.name}
                    value={field.value}
                    onChange={field.onChange}
                  />
                )}
              />
              <Controller
                control={control}
                name="genderId"
                render={({ field }) => (
                  <Input
                    select
                    top="Gender"
                    name={field.name}
                    value={field.value}
                    onChange={field.onChange}
                  >
                    {Genders.map((gender) => (
                      <option key={gender.id} value={gender.id}>
                        {gender.name}
                      </option>
                    ))}
                  </Input>
                )}
              />
              <Controller
                control={control}
                name="dob"
                render={({ field }) => (
                  <Input
                    type="datetime"
                    top="Date of Birth"
                    name={field.name}
                    value={dayjs(field.value).format('YYYY-MM-DD')}
                    onChange={field.onChange}
                  />
                )}
              />
              <Controller
                control={control}
                name="address"
                render={({ field }) => (
                  <Input
                    top="Address"
                    name={field.name}
                    value={field.value}
                    onChange={field.onChange}
                  />
                )}
              />
              <Controller
                control={control}
                name="school"
                render={({ field }) => (
                  <Input
                    top="School"
                    name={field.name}
                    value={field.value}
                    onChange={field.onChange}
                  />
                )}
              />
              <Controller
                control={control}
                name="job"
                render={({ field }) => (
                  <Input
                    top="Job"
                    name={field.name}
                    value={field.value}
                    onChange={field.onChange}
                  />
                )}
              />
              <Controller
                control={control}
                name="website"
                render={({ field }) => (
                  <Input
                    top="Website"
                    name={field.name}
                    value={field.value}
                    onChange={field.onChange}
                  />
                )}
              />
              <Controller
                control={control}
                name="profile"
                render={({ field }) => (
                  <Input
                    containerClass="col-span-2"
                    top="Profile"
                    textarea
                    name={field.name}
                    value={field.value}
                    onChange={field.onChange}
                  />
                )}
              />
            </div>
            <div className="mt-6">
              <button
                type="button"
                className="btn btn-primary"
                onClick={handleSubmit(onSubmit)}
              >
                {isUpdating && <LoadingIndicator left light />}
                Save
              </button>
            </div>
          </div>
        </ErrorProvider>
      </div>
      <Modal
        open={verifyModalVisible}
        onClose={() => setVerifyModalVisible(false)}
        containerClass="sm:max-w-3xl"
      >
        <PhoneVerifyModal
          onClose={() => setVerifyModalVisible(false)}
          onVerified={handleVerified}
        />
      </Modal>
    </div>
  );
};

export default Profile;
