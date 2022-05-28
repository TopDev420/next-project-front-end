export const formatError = (error: any, fallback = ''): string => {
  if (!error) {
    return fallback;
  }
  if (typeof error === 'string') {
    return error;
  }
  if (error?.response?.data?.errors) {
    return formatError(error.response.data.errors);
  }
  if (error?.response?.data?.message) {
    return formatError(error.response.data.message);
  }
  if (error?.message) {
    return formatError(error.message);
  }
  if (Array.isArray(error)) {
    return formatError(error[0]);
  }
  if (typeof error === 'object') {
    const string = String(error);
    if (string !== '[object Object]') {
      return formatError(string);
    }
    // eslint-disable-next-line no-restricted-syntax
    for (const key of Object.keys(error)) {
      return formatError(error[key]);
    }
  }
  return String(error) || fallback;
};
