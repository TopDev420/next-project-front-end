import { useEffect, useCallback } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import { SubmitHandler, useForm } from 'react-hook-form';
import { LoginInput, LoginSchema } from 'lib/forms/login';
import { useMutation, useQuery } from 'react-query';
import { getCurrentUser, login } from 'lib/apis/user';
import Alert from 'components/Alert';
import { useDispatch } from 'react-redux';
import { setUser } from 'lib/store/slices/user';
import FacebookButton from 'components/SocialAuth/FacebookButton';
import LoadingIndicator from 'components/LoadingIndicator';
import useHash from 'lib/hooks/useHash';
import { ErrorProvider } from 'components/Error/Provider';
import InvalidFeedback from 'components/Error/InvalidFeedback';
import { useRouter } from 'next/router';
import { getQueryParameter } from 'lib/helpers/url';
import ModalPresentLink from 'components/Modal/ModalPresentLink';

const Login = () => {
  const router = useRouter();
  const [, setHash] = useHash();
  const dispatch = useDispatch();
  const redirect = getQueryParameter('redirect');

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginInput>({
    resolver: yupResolver(LoginSchema),
  });

  const {
    reset: resetLogin,
    mutate: handleLogin,
    data: loginResult,
    isError,
    error: loginError,
    isLoading: loginLoading,
  } = useMutation<boolean, Error, LoginInput>(login);

  const onSubmit: SubmitHandler<LoginInput> = useCallback(
    (val) => {
      handleLogin(val);
    },
    [handleLogin],
  );

  // fetch user after login is successful
  const {
    data: user,
    remove: resetUserQuery,
    isLoading: userLoading,
  } = useQuery('user', getCurrentUser, {
    enabled: !!loginResult,
  });

  useEffect(() => {
    setHash('login');
  }, [setHash]);

  // set store user after user is fetched
  useEffect(() => {
    if (user) {
      dispatch(setUser(user));
      if (redirect) {
        router.push(redirect);
      }
    }
  }, [dispatch, redirect, router, user]);

  useEffect(
    () => () => {
      resetLogin();
      resetUserQuery();
    },
    [resetLogin, resetUserQuery],
  );

  return (
    <form method="POST" className="px-6 py-8" onSubmit={handleSubmit(onSubmit)}>
      <ErrorProvider client={errors} server={loginError}>
        <h2 className="uppercase text-xl mb-4 pb-4 border-b">Log In</h2>
        {isError && <Alert severity="danger" title="Login failed" />}
        <div className="flex flex-col">
          <div className="mb-4 flex flex-col">
            <input
              className={`border ${
                errors.email ? 'border-red' : ''
              } p-2 rounded`}
              placeholder="Email Address"
              defaultValue=""
              {...register('email')}
            />
            <InvalidFeedback name="email" />
          </div>
          <div className="mb-4 flex flex-col">
            <input
              type="password"
              className={`border ${
                errors.password ? 'border-red' : ''
              } p-2 rounded`}
              placeholder="Password"
              defaultValue=""
              {...register('password')}
            />
            <InvalidFeedback name="password" />
          </div>
          <div className="flex flex-row items-center border-b pb-4 mb-2 text-sm">
            <div className="flex flex-1 flex-row items-center">
              <input
                className="mr-2 h-4 w-4"
                type="checkbox"
                {...register('remember')}
              />
              <span>Remember Me</span>
            </div>
            <div className="flex flex-1 flex-row items-center justify-end">
              <ModalPresentLink
                type="forgot-password"
                className="text-blue-500 hover:underline"
              >
                Forgot Password?
              </ModalPresentLink>
            </div>
          </div>
          <button
            type="submit"
            className="mt-4 p-3 bg-red-600 hover:bg-red-500 text-white rounded shadow-xl"
          >
            {(loginLoading || userLoading) && <LoadingIndicator left light />}
            Log In
          </button>
          <FacebookButton />
          <div className="flex mt-4 justify-center border-t pt-4 text-sm">
            <span>Don&apos;t have an account?</span>
            <ModalPresentLink
              type="signup"
              className="ml-1 text-blue-500 hover:underline"
            >
              Sign Up
            </ModalPresentLink>
          </div>
        </div>
      </ErrorProvider>
    </form>
  );
};
export default Login;
