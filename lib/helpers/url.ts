/* eslint-disable no-param-reassign */
/* eslint-disable one-var */
/* eslint-disable vars-on-top */
/* eslint-disable no-var */
/* eslint-disable no-prototype-builtins */
/* eslint-disable no-restricted-syntax */
import config from 'config';

export const serializeToQuery = (
  obj: Record<string, any>,
  prefix: string = '',
): string => {
  const str = [];
  for (const p in obj) {
    if (obj.hasOwnProperty(p)) {
      var k = prefix ? `${prefix}[${p}]` : p,
        v = obj[p] ?? '';
      str.push(
        v !== null && typeof v === 'object'
          ? serializeToQuery(v, k)
          : `${encodeURIComponent(k)}=${encodeURIComponent(v)}`,
      );
    }
  }
  return str.join('&');
};

export const getQueryParameter = (key: string, defaultValue: string = '') => {
  if (typeof window === 'undefined') {
    return defaultValue;
  }

  const url = new URLSearchParams(window.location.search);
  const value = url.get(key);
  if (value === null) {
    return defaultValue;
  }
  return value;
};

export const getUrlWithParam = (
  baseUrl: string,
  params: Record<string, any>,
): string => {
  const Url = new URL(baseUrl);
  Url.search = serializeToQuery(params);
  return Url.toString();
};

export const getAbsoluteUrl = (url: string, baseUrl = '') => {
  if (url.startsWith('http://') || url.startsWith('https://')) {
    return url;
  }
  if (!url.startsWith('/')) {
    url = `/${url}`;
  }
  return `${baseUrl}${url}`;
};

export const normalizeHash = (hash: string) => {
  if (!hash) {
    return '';
  }

  if (hash.startsWith('/')) {
    hash = hash.slice(1);
  }
  if (hash.startsWith('#')) {
    hash = hash.slice(1);
  }

  return hash;
};

export const removeHash = () => {
  if (typeof window === 'undefined') {
    return;
  }
  window.history.replaceState(null, window.document.title, ' ');
};

export const removeQueryString = () => {
  if (typeof window === 'undefined') {
    return;
  }
  window.history.replaceState(
    null,
    window.document.title,
    window.location.pathname,
  );
};

export const getBackendURL = (path: string) => `${config.API_URL}/${path}`;

export const getQueryStringParams = (query: string) =>
  query
    ? (/^[?#]/.test(query) ? query.slice(1) : query)
        .split('&')
        .reduce((params, param) => {
          const [key, value] = param.split('=');
          params[key] = value
            ? decodeURIComponent(value.replace(/\+/g, ' '))
            : '';
          return params;
        }, {})
    : {};

export const joinPaths = (...paths: string[]) =>
  paths
    .map((path) => {
      if (path.startsWith('/')) {
        path = path.substring(1);
      }
      if (path.endsWith('/')) {
        path = path.slice(0, -1);
      }
      return path;
    })
    .join('/');
