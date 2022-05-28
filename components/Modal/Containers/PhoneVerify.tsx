import { yupResolver } from '@hookform/resolvers/yup';
import { useCallback, useEffect } from 'react';
import { verifyOTP, sendPhoneOTPRequest } from 'lib/apis/user';
import { VerifyOtpInput, VerifyOtpSchema } from 'lib/forms/user';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useMutation } from 'react-query';
import { ErrorProvider } from 'components/Error/Provider';
import Alert from 'components/Alert';
import InvalidFeedback from 'components/Error/InvalidFeedback';
import LoadingIndicator from 'components/LoadingIndicator';

type PhoneVerifyProps = {
  onClose: () => void;
  onVerified: () => void;
};

const PhoneVerify: React.FC<PhoneVerifyProps> = ({ onClose, onVerified }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<VerifyOtpInput>({
    resolver: yupResolver(VerifyOtpSchema),
  });

  const {
    isLoading: resendLoading,
    mutate: resendMutate,
    reset: resendReset,
  } = useMutation(sendPhoneOTPRequest);

  const { reset, mutate, data, isError, error, isLoading } =
    useMutation(verifyOTP);

  const onSubmit: SubmitHandler<VerifyOtpInput> = useCallback(
    (val) => mutate(val),
    [mutate],
  );

  useEffect(
    () => () => {
      reset();
    },
    [reset],
  );

  useEffect(() => {
    if (data) onVerified();
  }, [onVerified, data]);

  useEffect(
    () => () => {
      resendReset();
    },
    [resendReset],
  );

  return (
    <div>
      <div className="flex flex-row justify-between text-white mb-4 p-4 bg-blue-700">
        <h2 className="font-bold">Phone Number Verification</h2>
        <button
          className="text-3xl outline-none"
          type="button"
          onClick={() => onClose()}
        >
          &times;
        </button>
      </div>

      <div className="p-4 pr-8 pl-8">
        <form
          method="POST"
          className="px-6 py-8"
          onSubmit={handleSubmit(onSubmit)}
        >
          <ErrorProvider client={errors} server={error}>
            <h4 className="mb-4 pb-4">
              An one-time password has been sent to your phone. Please input
              here to verify your phone.
            </h4>
            {isError && (
              <Alert
                severity="danger"
                title={
                  (error as any)?.response?.status !== 429
                    ? 'There was an error'
                    : 'Too many tries, please try later.'
                }
              />
            )}
            <div className="flex flex-col">
              <div className="px-16 mb-4 flex flex-col">
                <input
                  className={`border ${
                    errors.otp ? 'border-red' : ''
                  } p-2 rounded`}
                  placeholder="verification code"
                  defaultValue=""
                  {...register('otp')}
                />
                <InvalidFeedback name="otp" />
              </div>
              <div className="flex flex-row mt-4 justify-center border-t pt-4 text-sm ">
                <button
                  type="button"
                  disabled={resendLoading}
                  className="hover:underline cursor-pointer text-blue-500"
                  onClick={() => resendMutate()}
                >
                  {resendLoading && <LoadingIndicator left light />}
                  Didn&apos;t receive it? Click to resend.
                </button>
              </div>
              <div className="flex flex-row mt-4 justify-end">
                <button
                  disabled={isLoading}
                  type="submit"
                  className="p-3 pl-8 pr-8 bg-blue-600 hover:bg-blue-500 text-white rounded shadow-xl"
                >
                  {isLoading && <LoadingIndicator left light />}
                  Verify
                </button>
              </div>
            </div>
          </ErrorProvider>
        </form>
      </div>
    </div>
  );
};

export default PhoneVerify;
