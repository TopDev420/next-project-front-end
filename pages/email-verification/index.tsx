import EmailNotVerified from 'components/EmailVerification/EmailNotVerified';
import EmailVerified from 'components/EmailVerification/EmailVerified';
import { currentUserSelector } from 'lib/store/selectors/user';
import { NextPage } from 'next';
import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getQueryParameter } from 'lib/helpers/url';
import { useMutation } from 'react-query';
import { verifyEmail } from 'lib/apis/user';
import EmailVerifying from 'components/EmailVerification/EmailVerifying';
import { setUserAttribute } from 'lib/store/slices/user';
import dayjs from 'dayjs';

const EmailVerification: NextPage = () => {
  const dispatch = useDispatch();
  const user = useSelector(currentUserSelector);
  const [link] = useState<string>(getQueryParameter('link', ''));
  const { mutate, data, reset, isLoading } = useMutation('verifyEmail', () =>
    verifyEmail(link),
  );

  useEffect(() => {
    if (!user?.emailVerifiedAt && link) {
      mutate();
    }
  }, [user, link, mutate]);

  useEffect(() => {
    if (data) {
      dispatch(setUserAttribute({ emailVerifiedAt: dayjs().toISOString() }));
    }
  }, [data, dispatch]);

  useEffect(() => () => reset(), [reset]);

  if (isLoading) {
    return <EmailVerifying />;
  }

  if (user?.emailVerifiedAt) {
    return <EmailVerified />;
  }

  return <EmailNotVerified />;
};

export default dynamic(() => Promise.resolve(EmailVerification), {
  ssr: false,
});
