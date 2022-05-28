/* eslint-disable no-param-reassign */
import _ from 'lodash';
import { camelCaseKeys, snakeCaseKeys } from 'lib/helpers/object';
import { getUrlWithParam } from 'lib/helpers/url';
import config from 'config';
import axios, { AxiosRequestConfig } from 'axios';
import { RequestMethod } from 'types/Request';
import { IncomingMessage } from 'http';

const getRequestHeaders = () => {
  const headers: Record<string, any> = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  };
  return headers;
};

const normalizeRequestParams = (method: RequestMethod, params: any) => {
  if (typeof FormData !== 'undefined' && params instanceof FormData) {
    return params;
  }
  if (!params) {
    return params;
  }
  if (method === 'GET' || method === 'DELETE') {
    return undefined;
  }
  if (!_.isPlainObject(params) && !_.isArray(params)) {
    return params;
  }
  return snakeCaseKeys(params);
};

const normalizeResponseErrorMessage = (e: any) => {
  if (!e?.response) {
    return 'Unknown error';
  }
  switch (String(e.response.status)) {
    case '403':
    case '404':
      return "We couldn't process your request.";
    case '419':
      return 'Session expired. Please refreh the page';
    case '500':
      return 'There was a problem with the server';
    case '400':
    case '422':
      return e.response.data.message ?? 'Unknown error';
    default:
      return 'Something went wrong. Please try again later';
  }
};

const normalizeResponseData = (data: any) => {
  if (_.isPlainObject(data) || _.isArray(data)) {
    return camelCaseKeys(data as any);
  }

  return data;
};

const apiWrapper = async <T = any>(
  method: 'GET' | 'POST' | 'DELETE' | 'PUT',
  url: string,
  params?: any,
  options?: AxiosRequestConfig,
) => {
  const headers = getRequestHeaders();
  if ((method === 'GET' || method === 'DELETE') && !!params) {
    url = getUrlWithParam(`${config.API_URL}/${url}`, snakeCaseKeys(params));
  }
  try {
    const { data } = await axios({
      method,
      url,
      baseURL: url.startsWith(config.API_URL) ? '' : config.API_URL,
      headers,
      data: normalizeRequestParams(method, params),
      withCredentials: true,
      ...options,
    });

    return normalizeResponseData(data) as T;
  } catch (e: any) {
    e.message = normalizeResponseErrorMessage(e);
    throw e;
  }
};

export const post = <T>(
  url: string,
  params?: any,
  options?: AxiosRequestConfig,
) => apiWrapper<T>('POST', url, params, options);

export const get = <T>(
  url: string,
  params?: any,
  options?: AxiosRequestConfig,
) => apiWrapper<T>('GET', url, params, options);

export const put = <T>(
  url: string,
  params?: any,
  options?: AxiosRequestConfig,
) => apiWrapper<T>('PUT', url, params, options);

export const del = <T>(
  url: string,
  params?: any,
  options?: AxiosRequestConfig,
) => apiWrapper<T>('DELETE', url, params, options);

export const getServerSidePropsRequestHeader = (req: IncomingMessage) => ({
  headers: {
    Cookie: req.headers.cookie || '',
    origin: req.headers.origin || req.headers.host || '',
  },
});

export const getRestfulApis = <
  I extends Record<string, any> = any,
  D extends Record<string, any> = any,
>(
  route: string,
) => {
  const save = (input: I) => {
    if (input.id) {
      return put<D>(`${route}/${input.id}`, _.omit(input, 'id'));
    }

    return post<D>(route, input);
  };

  const destroy = async (id: number) => {
    await del(`${route}/${id}`);

    return id;
  };

  return [save, destroy] as const;
};

export default apiWrapper;
