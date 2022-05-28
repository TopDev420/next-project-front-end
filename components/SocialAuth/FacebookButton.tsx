import { useEffect } from 'react';
import Image from 'next/image';
import Config from 'config';
import Facebook from 'assets/images/facebook.png';
import FacebookLogin from '@greatsumini/react-facebook-login';
import logger from 'lib/logger';
import { useMutation } from 'react-query';
import { fbLogin } from 'lib/apis/user';
import { setUser } from 'lib/store/slices/user';
import { useDispatch } from 'react-redux';
import LoadingIndicator from 'components/LoadingIndicator';

const FacebookButton = () => {
  const dispatch = useDispatch();
  const { reset, mutate, data, isLoading } = useMutation(fbLogin);

  useEffect(
    () => () => {
      reset();
    },
    [reset],
  );

  useEffect(() => {
    if (data) {
      dispatch(setUser(data));
    }
  }, [dispatch, data]);

  return (
    <FacebookLogin
      appId={Config.FB_CLIENT_ID!}
      onFail={logger.warn}
      onSuccess={(resp) => {
        if (resp) {
          mutate(resp);
        }
      }}
    >
      <span className="w-full mt-4 mb-2 p-3 text-white rounded shadow-xl facebook flex flex-row justify-center items-center">
        <Image src={Facebook.src} width={24} height={24} alt="facebook" />
        <span className="ml-2">Log In with Facebook</span>
        {isLoading && <LoadingIndicator />}
      </span>
    </FacebookLogin>
  );
};

const Container = !Config.FB_CLIENT_ID ? () => null : FacebookButton;

export default Container;
