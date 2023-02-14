import { message, notification } from 'antd';
import axios, { AxiosRequestConfig, AxiosPromise, AxiosResponse } from 'axios';
import qs from 'qs';
import getErrorMessage from './get-error-message';
import { decrypt, encrypt } from '@/utils/n-crypto';
import { removeToken } from './token';
import { JsonParse } from '@/utils/common';

type Methods = 'post' | 'get' | 'delete' | 'put' | 'option';
type ContentType = 'json' | 'urlencoded' | 'multipart';
const contentTypes = {
  json: 'application/json; charset=utf-8',
  urlencoded: 'application/x-www-form-urlencoded; charset=utf-8',
  multipart: 'multipart/form-data',
};
interface CallApiParams<D = unknown> {
  url: string;
  data?: D | string;
  params?: Record<string, any>;
  method?: Methods;
  prefix?: string;
  contentType?: ContentType;
  options?: AxiosRequestConfig<D | string>;
  withAuthorization?: boolean;
  abortController?: AbortController;
  commonErrorHandle?: boolean;
}

axios.interceptors.response.use(
  (response) => response,
  (err) => {
    if (err.response?.status === 401 && window.location.pathname !== '/login') {
      sessionStorage.setItem('previous_url', window.location.pathname);
      removeToken();
      window.location.replace('/login');
      message.error('请重新登录');
      return new Promise(() => { });
    }
    return Promise.reject(err);
  },
);

/**
 *
 *
 * @template R 响应的类型
 * @template D 传参的类型
 * @param {CallApiParams<D>} {
 *   url = '',
 *   method = 'get',
 *   data,
 *   params,
 *   prefix = '',
 *   contentType = 'json',
 *   options = {},
 *   withAuthorization = true,
 *   abortController,
 * }
 * @return {AxiosPromise<R>}
 */
function callApi<R = unknown, D = unknown>({
  url = '',
  method = 'get',
  data,
  params,
  prefix = '',
  contentType = 'json',
  options = {},
  withAuthorization = true,
  abortController,
  commonErrorHandle = true,
}: CallApiParams<D>) {
  const newOptions = options;
  const headers = options.headers || {
    'Content-Type': contentTypes[contentType],
  };
  newOptions.headers = headers;
  if (withAuthorization) {
    const tk = localStorage.getItem('token');
    if (tk) {
      headers.Authorization = tk;
    }
  }
  let newData: D | string;
  if (data) {
    newData = data;
    if (contentType === 'urlencoded') {
      newData = qs.stringify(data);
    }
    newOptions.data = newData;
  }
  if (params && typeof params === 'object') {
    newOptions.params = params;
    // newOptions.paramsSerializer = (p) =>
    //   qs.stringify(p, { arrayFormat: 'repeat' });
    newOptions.paramsSerializer = {
      serialize: (p) => qs.stringify(p, { arrayFormat: 'repeat' }),
    }
  }
  if (abortController) {
    newOptions.signal = abortController.signal;
  }
  const newOption: AxiosRequestConfig<D | string> = {
    url: `${prefix}${url}`,
    method,
    ...newOptions,
  };
  return new Promise((resolve, reject) => {
    axios(newOption)
      .then((res) => {
        resolve(res);
      })
      .catch((error) => {
        const errcode = error.response?.data?.code;
        const msg = getErrorMessage(
          errcode,
          error.response?.data?.description ||
          error.response?.data?.error_description ||
          error.response?.data?.message,
        );
        if (msg && commonErrorHandle) {
          notification.error({
            message: msg,
          });
        }
        reject(error);
      });
  }) as AxiosPromise<R>;
}

const crypted = async <Res>(url: string, data: object | string, config?: AxiosRequestConfig, withAuthorization = true, contentType: ContentType = 'json') => {
  if (process.env.NODE_ENV === 'development') {
    console.log('----------------------------');
    console.log('请求地址: ', url);
    console.log('请求数据: ', data ?? '无');
  }
  const encryptStr = encrypt(data);
  const headers: Record<string, string> = {
    'Content-Type': contentTypes[contentType]
  }
  if (withAuthorization) {
    const tk = localStorage.getItem('token');
    if (tk) {
      headers.Authorization = tk;
    }
  }
  try {
    const res: AxiosResponse<string> = await axios.create()({
      url,
      data: encryptStr,
      headers,
      transformRequest: [(d) => d],
      ...config,
    });
    if (res.data) {
      const resJson = decrypt(res.data);
      if (resJson) {
        const resObj: Res = JSON.parse(resJson);
        if (process.env.NODE_ENV === 'development') {
          console.log('响应: ', resObj);
          console.log('----------------------------');
        }
        return {
          data: resObj
        };
      }
    }
  } catch (error: any) {
    if (error.response?.status === 401 && window.location.pathname !== '/login') {
      sessionStorage.setItem('previous_url', window.location.pathname);
      removeToken();
      window.location.replace('/login');
    }
    const decrypedErrorJson = decrypt(error.response?.data);
    if (decrypedErrorJson) {
      {
        const decrypedError = JsonParse(decrypedErrorJson);
        if (process.env.NODE_ENV === 'development') {
          console.log('出错: ', decrypedError);
          console.log('----------------------------');
        }
        const errcode = decrypedError?.code
        const msg = getErrorMessage(
          errcode,
          error.response?.data?.description ||
          error.response?.data?.error_description ||
          error.response?.data?.message,
        );
        if (msg) {
          notification.error({
            message: msg,
          });
        }
        throw decrypedError;
      }
    }
    throw error
  }
};

callApi.crypted = function <R = unknown>({
  url = '',
  data = '',
  params,
  method = 'post',
  options = {},
  contentType = 'json',
  withAuthorization
}: CallApiParams<object>) {
  return crypted<R>(url, data, {
    method,
    params,
    ...options,
  }, withAuthorization, contentType)
}

export default callApi;
