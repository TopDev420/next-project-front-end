import { sendPhoneOTPRequest } from 'lib/apis/user';
import { useCallback, useEffect } from 'react';
import { useMutation } from 'react-query';
import StatusBadge from 'components/pages/my-page/listings/StatusBadge';

type PhoneVerifyProps = {
  onVerify: () => void;
  onVerifyButNotValidated: () => void;
  onError: () => void;
  isVerified: boolean;
  isValidated: boolean;
  isUpdated: boolean;
};

const PhoneVerify: React.FC<PhoneVerifyProps> = ({
  onVerify,
  onVerifyButNotValidated,
  onError,
  isVerified,
  isValidated,
  isUpdated,
}) => {
  const { isLoading, mutate, reset, isError } = useMutation(
    sendPhoneOTPRequest,
    {
      onSuccess: () => onVerify(),
    },
  );

  const handleClick = useCallback(() => {
    if (isValidated && isUpdated) {
      mutate();
    } else {
      onVerifyButNotValidated();
    }
  }, [isValidated, isUpdated, mutate, onVerifyButNotValidated]);

  useEffect(() => {
    if (isError) {
      onError();
    }
  }, [isError, onError]);

  useEffect(() => () => reset(), [reset]);

  return (
    <span className="text-sm mb-2 flex justify-between">
      Phone{' '}
      {isVerified ? (
        <StatusBadge title="Verified" color="blue" inverted={true as boolean} />
      ) : (
        <button type="button" onClick={handleClick} disabled={isLoading}>
          <StatusBadge title="Not verified" color="yellow" />
        </button>
      )}
    </span>
  );
};

export default PhoneVerify;
