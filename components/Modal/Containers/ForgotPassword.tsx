/* eslint-disable @next/next/no-html-link-for-pages */
import { yupResolver } from '@hookform/resolvers/yup';
import { useCallback, useEffect } from 'react';
import { forgotPassword } from 'lib/apis/user';
import {
  ForgotPasswordInput,
  ForgotPasswordSchema,
} from 'lib/forms/forgot-password';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useMutation } from 'react-query';
import useHash from 'lib/hooks/useHash';
import { ErrorProvider } from 'components/Error/Provider';
import Alert from 'components/Alert';
import InvalidFeedback from 'components/Error/InvalidFeedback';
import LoadingIndicator from 'components/LoadingIndicator';
import { useRouter } from 'next/router';
import ModalPresentLink from 'components/Modal/ModalPresentLink';

const ForgotPassword = () => {
  const [, setHash] = useHash();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotPasswordInput>({
    resolver: yupResolver(ForgotPasswordSchema),
  });

  const { reset, mutate, data, isError, error, isLoading } =
    useMutation(forgotPassword);

  const onSubmit: SubmitHandler<ForgotPasswordInput> = useCallback(
    (val) => mutate(val),
    [mutate],
  );

  useEffect(() => {
    setHash('forgot-password');
  }, [setHash]);

  useEffect(
    () => () => {
      reset();
    },
    [reset],
  );

  return (
    <form method="POST" className="px-6 py-8" onSubmit={handleSubmit(onSubmit)}>
      <ErrorProvider client={errors} server={error}>
        <h2 className="uppercase text-xl mb-4 pb-4 border-b">
          Forgot Password
        </h2>
        {isError && <Alert severity="danger" title="There was an error" />}
        {!!data && (
          <Alert
            severity="success"
            title="A password reset email has been sent"
            onClose={() => router.push('/#login', undefined, { shallow: true })}
          />
        )}
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
          <button
            type="submit"
            className="mt-4 p-3 bg-blue-600 hover:bg-blue-500 text-white rounded shadow-xl"
          >
            {isLoading && <LoadingIndicator left light />}
            Send a password reset email
          </button>
          <div className="flex flex-row mt-4 justify-center border-t pt-4 text-sm">
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

export default ForgotPassword;
