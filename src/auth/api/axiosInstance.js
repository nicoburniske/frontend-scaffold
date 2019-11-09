/* eslint-disable camelcase */
/* eslint-disable no-param-reassign */
/* eslint-disable arrow-parens */
/* eslint-disable no-unused-vars */

import axios from 'axios';
import store from '../../store/store';
import {
  TOKEN_REFRESH_SUCCESS,
  API_DOMAIN, TOKEN_REFRESH_REQUEST, API_REFRESH_TOKEN, TOKEN_REFRESH_FAILURE,
} from '../constants';
import tokenService from '../tokenService';

const axiosInstance = axios.create({
  baseURL: API_DOMAIN,
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
  },
});

const refreshStatusCodes = [
  401, // unauthorized
];

async function refreshToken(pastRequest) {
  const refresh_token = tokenService.getRefreshToken();
  store.commit('authRequest', TOKEN_REFRESH_REQUEST);
  try {
    const { data } = await axiosInstance.post(API_REFRESH_TOKEN, { refresh_token });
    store.commit('authSuccess', TOKEN_REFRESH_SUCCESS);
    tokenService.setAccessToken(data.access_token);
    pastRequest.response.config.headers['X-Access-Token'] = data.access_token;
    return Promise.resolve();
  } catch (error) {
    store.commit('authFailure', TOKEN_REFRESH_FAILURE);
    return Promise.reject();
  }
}

axiosInstance.interceptors.request.use(request => {
  request.headers['X-Access-Token'] = tokenService.getAccessToken();
  return request;
});

// use response interceptor for silent refresh
function createInterceptor(onRefresh) {
  const id = axiosInstance.interceptors.response.use(
    response => response,
    error => {
      // eslint-disable-next-line no-console
      console.log('interceptor called');
      if (error.response && refreshStatusCodes.includes(error.response.status)) {
        axiosInstance.interceptors.response.eject(id);
        // attempt to refresh token
        const refreshCall = onRefresh(error);
        // queue up all requests while token is refreshing
        const refreshRequestQueueId = axiosInstance.interceptors.request
          .use(request => refreshCall.then(() => request));
        // excecute
        return refreshCall
          .then(() => {
            axiosInstance.interceptors.request.eject(refreshRequestQueueId);
            return axiosInstance(error.response.config);
          })
          .catch(err => {
            axiosInstance.interceptors.request.eject(refreshRequestQueueId);
            return Promise.reject(err);
          });
      }
      return Promise.reject(error);
    },
  );
  return axiosInstance;
}

createInterceptor(refreshToken);

export default axiosInstance;
