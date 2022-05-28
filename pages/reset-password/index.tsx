import { yupResolver } from '@hookform/resolvers/yup';
import Alert from 'components/Alert';
import { ErrorProvider } from 'components/Error/Provider';
import InvalidFeedback from 'components/Error/InvalidFeedback';
import LoadingIndicator from 'components/LoadingIndicator';
import { resetPassword } from 'lib/apis/user';
import {
  ResetPasswordInput,
  ResetPasswordSchema,
} from 'lib/forms/reset-password';
import { GetServerSideProps, NextPage } from 'next';
import { useCallback, useEffect } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useMutation } from 'react-query';
import { useSelector } from 'react-redux';
import { currentUserSelector } from 'lib/store/selectors/user';
import { useRouter } from 'next/router';

type ResetPasswordProps = {
  token: string;
};

const ResetPassword: NextPage<ResetPasswordProps> = ({ token }) => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ResetPasswordInput>({
    resolver: yupResolver(ResetPasswordSchema),
  });

  const { reset, mutate, data, isError, error, isLoading } =
    useMutation(resetPassword);

  const onSubmit: SubmitHandler<ResetPasswordInput> = useCallback(
    (val) => mutate(val),
    [mutate],
  );

  const user = useSelector(currentUserSelector);

  useEffect(() => {
    if (user) {
      router.push('/');
    }
  }, [user, router]);

  useEffect(() => () => reset(), [reset]);

  return (
    <div className="content max-w-screen-md mx-auto">
      <h1 className="text-center mb-6">Reset Password</h1>
      {!data ? (
        <form
          method="POST"
          className="px-6 py-8"
          onSubmit={handleSubmit(onSubmit)}
        >
          <ErrorProvider client={errors} server={error}>
            {isError && <Alert severity="danger" title="There was an error" />}
            <div className="flex flex-col">
              <div className="mb-4 flex flex-col">
                <input
                  className={`border ${
                    errors.email ? 'border-red' : ''
                  } p-2 rounded`}
                  placeholder="Input the email address you have received the reset link"
                  defaultValue=""
                  {...register('email')}
                />
                <input
                  type="hidden"
                  defaultValue={token}
                  {...register('token')}
                />
                <InvalidFeedback name="email" />
                <InvalidFeedback name="token" />
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
              <div className="mb-4 flex flex-col">
                <input
                  className="border p-2 rounded w-full"
                  type="password"
                  placeholder="Password Confirmation"
                  defaultValue=""
                  {...register('passwordConfirmation')}
                />
                <InvalidFeedback name="passwordConfirmation" />
              </div>
              {!data && (
                <button
                  type="submit"
                  className="mt-4 p-3 bg-indigo-600 hover:bg-indigo-500 text-white rounded shadow-xl"
                >
                  {isLoading && <LoadingIndicator left light />}
                  Reset Password
                </button>
              )}
            </div>
          </ErrorProvider>
        </form>
      ) : (
        <Alert
          severity="success"
          title="Password has been updated successfully"
        />
      )}
    </div>
  );
};

export default ResetPassword;

export const getServerSideProps: GetServerSideProps<
  ResetPasswordProps
> = async (context) => {
  if (!context.query?.token) {
    context.res.writeHead(301, {
      Location: '/',
    });
  }

  return {
    props: {
      token: String(context.query.token),
    },
  };
};
