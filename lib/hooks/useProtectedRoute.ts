import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import { userSelector } from 'lib/store/selectors/user';
import { isProtectedRoute } from 'lib/helpers/support';

const useProtectedRoute = () => {
  const router = useRouter();
  const { value: user, initial } = useSelector(userSelector);

  useEffect(() => {
    if (!isProtectedRoute(router.pathname) || initial) {
      return;
    }
    if (!user) {
      router.push('/');
      return;
    }
    if (!user.emailVerifiedAt) {
      router.push('/email-verification');
    }
  }, [initial, router, user]);
};

export default useProtectedRoute;
