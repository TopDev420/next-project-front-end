import Config from 'config';
import { useEffect, useCallback } from 'react';
import useHash from 'lib/hooks/useHash';
import PhoneInput from 'react-phone-input-2';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { SignUpInput, SignUpSchema } from 'lib/forms/user';
import { yupResolver } from '@hookform/resolvers/yup';
import { useMutation } from 'react-query';
import { User } from 'types/models/User';
import { signUp } from 'lib/apis/user';
import { useDispatch, useSelector } from 'react-redux';
import { socialAuthSelector } from 'lib/store/selectors/socialAuth';
import { setUser } from 'lib/store/slices/user';
import Alert, { AlertProps } from 'components/Alert';
import { ErrorProvider } from 'components/Error/Provider';
import InvalidFeedback from 'components/Error/InvalidFeedback';
import LoadingIndicator from 'components/LoadingIndicator';
import ModalPresentLink from 'components/Modal/ModalPresentLink';
import genders from 'static/gender.json';

type SignUpProps = {
  alert?: AlertProps;
};

const SignUp: React.FC<SignUpProps> = ({ alert }) => {
  const dispatch = useDispatch();
  const [, setHash] = useHash();
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm<SignUpInput>({
    resolver: yupResolver(SignUpSchema),
  });

  const socialAuth = useSelector(socialAuthSelector);

  const {
    reset: resetSignUp,
    mutate: handleSignUp,
    data: signUpResult,
    isError,
    error: signUpError,
    isLoading,
  } = useMutation<User, Error, SignUpInput>(signUp);

  const onSubmit: SubmitHandler<SignUpInput> = useCallback(
    (val) => {
      if (socialAuth.socialUser?.token) {
        handleSignUp({
          ...val,
          social: {
            provider: socialAuth.provider!,
            accessToken: socialAuth.socialUser.token,
          },
        });
      } else {
        handleSignUp(val);
      }
    },
    [handleSignUp, socialAuth],
  );

  useEffect(() => {
    setHash('signup');
  }, [setHash]);

  useEffect(() => {
    if (signUpResult) {
      dispatch(setUser(signUpResult));
    }
  }, [dispatch, signUpResult]);

  useEffect(
    () => () => {
      resetSignUp();
    },
    [resetSignUp],
  );

  return (
    <form method="POST" className="px-6 py-8" onSubmit={handleSubmit(onSubmit)}>
      <ErrorProvider client={errors} server={signUpError}>
        <h2 className="uppercase text-xl mb-4 pb-4 border-b">Sign Up</h2>
        {!!alert && <Alert {...alert} />}
        {isError && (
          <Alert
            severity="danger"
            title="Sign up failed"
            message={signUpError!.message!}
          />
        )}
        <div className="flex flex-col">
          <div className="mb-2 flex">
            <div className="flex-1 mr-2">
              <input
                className="border p-2 rounded w-full"
                placeholder="First Name"
                defaultValue=""
                {...register('firstName')}
              />
              <InvalidFeedback name="firstName" />
            </div>
            <div className="flex-1">
              <input
                className="border p-2 rounded w-full"
                placeholder="Last Name"
                defaultValue=""
                {...register('lastName')}
              />
              <InvalidFeedback name="lastName" />
            </div>
          </div>
          <div className="mb-2 flex">
            <div className="flex-1 mr-2">
              <Controller
                control={control}
                name="phone"
                render={({ field: { onChange, value } }) => (
                  <PhoneInput
                    country="us"
                    value={value}
                    placeholder="Phone number (optional)"
                    onChange={(_val, _data, e) => onChange(e)}
                    containerStyle={{ height: 42 }}
                  />
                )}
              />
              <InvalidFeedback name="phone" />
            </div>
            <div className="flex-1">
              <input
                className="border p-2 rounded w-full"
                placeholder="Email Address"
                defaultValue=""
                {...register('email')}
              />
              <InvalidFeedback name="email" />
            </div>
          </div>
          <div className="mb-2 flex">
            <div className="flex-1 mr-2">
              <input
                className="border p-2 rounded w-full"
                type="password"
                placeholder="Password"
                defaultValue=""
                {...register('password')}
              />
              <InvalidFeedback name="password" />
            </div>
            <div className="flex-1">
              <input
                className="border p-2 rounded w-full"
                type="password"
                placeholder="Password Confirmation"
                defaultValue=""
                {...register('passwordConfirmation')}
              />
              <InvalidFeedback name="passwordConfirmation" />
            </div>
          </div>
          <div className="mb-2 flex-col border-t mt-4">
            <div className="flex-col">
              <h3 className="text-lg mt-2">Date of Birth</h3>
              <p className="text-sm">
                You must be {Config.USER_MIN_AGE}+ to register
              </p>
            </div>
            <div className="mt-3">
              <input
                className="border p-2 rounded w-full"
                type="date"
                placeholder="Select your date of birth"
                defaultValue="1990-01-01"
                {...register('dob')}
              />
              <InvalidFeedback name="dob" />
            </div>
          </div>
          <div className="mb-2 flex">
            <div className="mt-2 flex flex-1 items-center">
              <h3 className="flex-1 text-lg">Gender</h3>
              <select
                className="flex-1 border p-2 rounded w-full"
                {...register('genderId')}
              >
                {genders.map((gender) => (
                  <option key={gender.id} value={gender.id}>
                    {gender.name}
                  </option>
                ))}
              </select>
              <InvalidFeedback name="genderId" />
            </div>
          </div>
          <div className="mt-2 items-center text-sm">
            <input type="checkbox" className="mr-2" {...register('isAgreed')} />
            By signing up I agree to Vacation.Rental&apos;s Terms of Service and
            Privacy Policy
            <InvalidFeedback container="div" name="isAgreed" />
          </div>
          <button
            type="submit"
            className="w-full mt-4 p-3 bg-blue-600 hover:bg-blue-500 text-white rounded shadow-xl"
          >
            {isLoading && <LoadingIndicator left light />}
            Submit
          </button>
          <div className="mt-4 pt-3 border-t text-center text-sm">
            Already a Vacation.Rental&apos;s member?
            <ModalPresentLink
              type="login"
              className="ml-1 text-blue-500 hover:underline"
            >
              Log In
            </ModalPresentLink>
          </div>
        </div>
      </ErrorProvider>
    </form>
  );
};
export default SignUp;
