/* eslint-disable no-param-reassign */
/* eslint-disable no-underscore-dangle */
import axios from 'axios';
import secureStorageUtils from '@/utils/secureStorage';
import { SecureStorageEnum } from '@/types/secureStorage.enum';
import { AuthRoutesEnum } from '@/types/routes.enum';
import EventEmitter from '@/utils/eventEmitter';

let isRefreshing = false;

export const getIsRefreshing = () => isRefreshing;

export const setIsRefreshing = (val: boolean) => {
  isRefreshing = val;
};

const eventChannel = new EventEmitter();
const accessToken =
  secureStorageUtils
    .getItem(SecureStorageEnum.refreshToken)
    ?.replace(/^"(.*)"$/, '$1') || '';

const AXIOS = axios.create({
  baseURL: import.meta.env.VITE_APP_BASE_END_POINT,
  headers: {
    Authorization: `Bearer ${accessToken}`,
    'Content-Type': 'application/json'
  },
  timeout: 60000
});

AXIOS.interceptors.request.use(config => {
  // Use latest 'accessToken' in auth header when reference is expired
  const latestAccessToken = secureStorageUtils
    .getItem(SecureStorageEnum.accessToken)
    ?.replace(/^"(.*)"$/, '$1');

  // renew accessToken
  if (latestAccessToken !== accessToken) {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    config.headers!.Authorization = `Bearer ${latestAccessToken}`;
  }

  return config;
});

AXIOS.interceptors.response.use(
  response => {
    if (response.status === 200 || response.status === 201) {
      return response.data;
    }
    return response;
  },
  interceptorError => {
    const originalRequest = interceptorError.config;
    if (
      interceptorError.response &&
      interceptorError.response.status === 401 &&
      originalRequest.url !== AuthRoutesEnum.renew &&
      originalRequest.url !== AuthRoutesEnum.login
    ) {
      // only make renew token when there are no renew request being processed
      if (!isRefreshing) {
        isRefreshing = true;
        AXIOS.post(AuthRoutesEnum.renew, {
          refreshToken: secureStorageUtils
            .getItem(SecureStorageEnum.refreshToken)
            ?.replace(/^"(.*)"$/, '$1')
        })
          .then((res: any) => {
            if (res?.accessToken) {
              secureStorageUtils.setItem(
                SecureStorageEnum.accessToken,
                res.accessToken
              );
              secureStorageUtils.setItem(
                SecureStorageEnum.refreshToken,
                res.refreshToken
              );
              // Emit event to channel for other know about it
              eventChannel.emit('refresh', res.accessToken);
              // Remove all listener since all the receivers has received event
              eventChannel.removeAllListener();
            } else {
              throw new Error(`Refresh failed with status ${res.status}`);
            }
          })
          .catch(error => {
            eventChannel.emit('refresh', error);
            // Remove all listener since all the receivers has received error
            eventChannel.removeAllListener();
            // logout user anyway
            secureStorageUtils.removeItem(SecureStorageEnum.accessToken);
            secureStorageUtils.removeItem(SecureStorageEnum.refreshToken);
          })
          .finally(() => {
            isRefreshing = false;
          });
      }
      // Wait for renew token process
      return new Promise((resolve, reject) => {
        eventChannel.addListener('refresh', (payload: string | Error) => {
          if (typeof payload === 'string') {
            originalRequest.headers.Authorization = `Bearer ${payload}`;
            resolve(AXIOS(originalRequest));
          } else if (payload instanceof Error) {
            reject(payload);
          } else {
            resolve('');
          }
        });
      });
    }
    return Promise.reject(interceptorError);
  }
);

export default AXIOS;
