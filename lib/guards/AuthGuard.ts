/* eslint-disable class-methods-use-this */
/*
|--------------------------------------------------------------------------
| Authenticator.
|--------------------------------------------------------------------------
|
| A set of functions related to user authentication.
|
*/
import { csrfCookie } from 'lib/apis/sanctum';
import { IncomingMessage, ServerResponse } from 'http';
import { User } from 'types/models/User';
import { get, getServerSidePropsRequestHeader } from 'lib/helpers/api';
import { NextPageContext } from 'next';
import { isProtectedRoute } from 'lib/helpers/support';

export class AuthGuard {
  /**
   * Get the current user from the database and redirect to dashboard if successful.
   *
   * @param {IncomingMessage} req
   *   The request object.
   * @param {ServerResponse} res
   *   The response object.
   * @param {string} destination
   *   The destination URL the user will be redirected to if he's authenticated.
   *
   * @return {object}
   *  An empty object. It is still necessary to return obj as getServerSideProps() requires it.
   */
  public async redirectOnAuthentication(
    req: IncomingMessage,
    res: ServerResponse,
    destination: string,
  ): Promise<object> {
    try {
      // CSRF.
      await csrfCookie();

      /**
       * As the API call is executed on the server it by
       * default does not have the cookies set in the browser.
       * Fortunately, we can extract these cookies from the req object
       * and attach them to the api call.
       */
      const user: any = await get(
        'user',
        undefined,
        getServerSidePropsRequestHeader(req),
      );

      if (user.status === 200) {
        res.writeHead(301, {
          Location: destination,
        });
        res.end();
        return { props: {} };
      }
      return {
        props: {},
      };
    } catch (error) {
      return { props: {} };
    }
  }

  /**
   * Load the currently logged in user from DB.
   *
   * @param {object} req
   *   The request object.
   */
  public async authenticateUser(ctx: NextPageContext) {
    const { req, res, pathname, asPath } = ctx;
    if (!req || !res) {
      return {};
    }
    const isNoProtectedRoute = this.isNoProtectedRoute(pathname);
    try {
      // CSRF.
      await csrfCookie();

      // If there are no cookies and the route is protected, redirect to login.
      if (!req.headers.cookie && !isNoProtectedRoute) {
        /**
         * No further redirect if we're already on the login
         * path, as we otherwisely would be caught in an
         * infinite loop of redirections to /user/login.
         */
        if (pathname === '/#login') {
          res.end();
          return { user: null };
        }

        res.writeHead(302, {
          Location: `/?redirect=${encodeURIComponent(asPath || '')}#login`,
        });
        res.end();
        return { user: null };
      }

      /**
       * As the API call is executed on the server it by
       * default does not have the cookies set in the browser.
       * Fortunately, we can extract these cookies from the req object
       * and attach them to the api call.
       */
      const currentUser: User = await get(
        'user',
        undefined,
        getServerSidePropsRequestHeader(req),
      );

      // If user is authenticated and he requests login or register, redirect to dashboard.
      if (currentUser && (pathname === '/#signup' || pathname === '/#login')) {
        res.writeHead(302, {
          Location: '/',
        });
        res.end();
      }
      // Redirect to login if user is not authenticated and tries to access protected route.
      else if (!currentUser && !isNoProtectedRoute) {
        res.writeHead(302, {
          Location: `/?redirect=${encodeURIComponent(asPath || '')}#login`,
        });
        res.end();
        return { user: null };
      }
      // Redirect to email verification page when user has not verified her email
      else if (
        currentUser &&
        !currentUser.emailVerifiedAt &&
        !isNoProtectedRoute &&
        !pathname.includes('email-verification')
      ) {
        res.writeHead(302, {
          Location: '/email-verification',
        });
        res.end();
        return { user: currentUser };
      }
      // Return the currently authenticated user.
      return {
        user: currentUser,
      };
    } catch (error: any) {
      /**
       * If the authentication fails (e.g. invalid session)
       * the API will send a 401 response. If we're on a
       * protected route, redirect to the login page.
       */
      if (
        error.response &&
        error.response.status === 401 &&
        !isNoProtectedRoute
      ) {
        if (pathname === '/#login') {
          return { user: null };
        }
        res.writeHead(302, {
          Location: `/?redirect=${encodeURIComponent(asPath || '')}#login`,
        });
        res.end();
      }
      return { user: null };
    }
  }

  /**
   * Check if a given path is a protected one.
   *
   * @param {string} pathname
   *   The current pathname.
   *
   * @return {boolean}
   *   True if it is a protected route.
   */
  public isNoProtectedRoute(pathname: string): boolean {
    return !isProtectedRoute(pathname);
  }
}
