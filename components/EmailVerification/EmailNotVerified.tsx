import Alert from 'components/Alert';
import React, { useEffect } from 'react';
import { sendVerification } from 'lib/apis/user';
import { currentUserSelector } from 'lib/store/selectors/user';
import { useMutation } from 'react-query';
import { useSelector } from 'react-redux';
import LoadingIndicator from 'components/LoadingIndicator';

const EmailNotVerified: React.FC = () => {
  const user = useSelector(currentUserSelector);

  const { reset, mutate, data, isError, error, isLoading } =
    useMutation(sendVerification);

  useEffect(() => () => reset(), [reset]);

  return (
    <div className="content max-w-screen-lg mx-auto">
      {!!user ? (
        <>
          <h1 className="mb-6 text-center">Please verify your email</h1>
          {!!data && (
            <div className="mb-4">
              <Alert
                severity="success"
                title="Verification link has been sent"
              />
            </div>
          )}
          {!!isError && (
            <div className="mb-4">
              <Alert
                severity="danger"
                title="There was an error"
                message={String(error)}
              />
            </div>
          )}
          <p className="mb-4">
            A verification link has been sent to{' '}
            <span className="font-bold">{user.email}</span>. To complete the
            sign-up process, please click the verification link.
          </p>
          <p>
            Did not receive a verification email?{' '}
            <button
              type="button"
              className="ml-1 text-blue-500 hover:underline"
              disabled={isLoading}
              onClick={() => mutate()}
            >
              Resend the link
              {isLoading && <LoadingIndicator right dark />}
            </button>
          </p>
        </>
      ) : (
        <>
          <h1 className="mb-6 text-center">Authentication is required</h1>
          <p>Please login first, and click the verification link</p>
        </>
      )}
    </div>
  );
};

export default EmailNotVerified;
