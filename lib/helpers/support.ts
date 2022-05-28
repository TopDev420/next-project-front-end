import logger from 'lib/logger';

export const protectedRoutes = ['/my-page', '/email-verification'];

export const suppress = <T, U = null>(
  cb: () => T,
  defaultValue: U = null,
): T | U => {
  try {
    return cb();
  } catch (e) {
    logger.warn(e);
    return defaultValue;
  }
};

export const isProtectedRoute = (pathname: string): boolean =>
  !protectedRoutes.every((route) => !pathname.startsWith(route));
