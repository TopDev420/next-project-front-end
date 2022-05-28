import 'styles/globals.scss';
import { useEffect, useRef } from 'react';
import App from 'next/app';
import type { AppContext, AppProps } from 'next/app';
import PageLayout from 'components/Layouts/PageLayout';
import { Provider, useDispatch } from 'react-redux';
import { QueryClient, QueryClientProvider } from 'react-query';
import store from 'lib/store';
import useSanctumInit from 'lib/hooks/useSanctumInit';
import { AuthGuard } from 'lib/guards/AuthGuard';
import { User } from 'types/models/User';
import { setUser } from 'lib/store/slices/user';
import axios from 'axios';
import { useRouter } from 'next/router';
import useProtectedRoute from 'lib/hooks/useProtectedRoute';
import PageHead from 'components/Layouts/PageHead';

axios.defaults.withCredentials = true;

export type Props = {
  user: User | null;
};

const queryClient = new QueryClient();

function StoreConsumer({ Component, pageProps, user }: AppProps & Props) {
  const dispatch = useDispatch();
  const router = useRouter();
  const userSetRef = useRef(false);

  useSanctumInit();
  useProtectedRoute();

  /**
   * sets current user on mount
   */
  useEffect(() => {
    if (user) {
      dispatch(setUser(user));
    }
    userSetRef.current = true;
  }, [dispatch, router, user]);

  return (
    <QueryClientProvider client={queryClient}>
      <PageHead />
      <PageLayout>
        <Component {...pageProps} />
      </PageLayout>
    </QueryClientProvider>
  );
}

function MyApp(props: AppProps & Props) {
  return (
    <Provider store={store}>
      <StoreConsumer {...props} />
    </Provider>
  );
}

/**
 * Fetch some data server side before rendering the page client side.
 *
 *   The context object.
 */
MyApp.getInitialProps = async (context: AppContext) => {
  const appProps = await App.getInitialProps(context);
  const { req, pathname, res } = context.ctx;
  /**
   * Abort if one var is not present.
   * For example, the req obj will be undefined if we don't
   * have a page reload but a page switch via the Next Router.
   */
  if (!req || !pathname || !res) {
    return { ...appProps, user: null };
  }

  const authenticator = new AuthGuard();
  const result = await authenticator.authenticateUser(context.ctx);
  const props = { ...appProps, ...result };
  return props;
};

export default MyApp;
