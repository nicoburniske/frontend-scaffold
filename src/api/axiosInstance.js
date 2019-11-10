/* eslint-disable camelcase */
/* eslint-disable no-param-reassign */
/* eslint-disable arrow-parens */
/* eslint-disable no-unused-vars */
import axios from 'axios';
import {
  API_DOMAIN, API_REFRESH_TOKEN,
} from './endpoints';
import tokenService from '../auth/tokenService';


/** MODULE SUMMARY:
 * This is used to construct a global axios instance that should be used for all
 * secure API calls (at least). The main thing that is built here is the axios interceptor.
 *
 * This instance should only be used in the src/api folder.
 */

const axiosInstance = axios.create({
  baseURL: API_DOMAIN,
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
  },
});


/**
 * An array containing the list of http status codes where the axios interceptor
 * will be called.
 */
const refreshStatusCodes = [
  401, // unauthorized
];

/**
 * Function to add an http status code to the refreshStatusCodes array.
 * @param {*} code http status code to be added.
 */
function addInterceptorCode(code) {
  refreshStatusCodes.push(code);
}

/**
 * The function that will be passed into createInterceptor as an argument.
 * @param {*} pastRequest that latest failed request that resulted in a response code
 * contained in refreshStatusCodes.
 */
async function refreshToken(pastRequest) {
  const refresh_token = tokenService.getRefreshToken();
  try {
    const { data } = await axiosInstance.post(API_REFRESH_TOKEN, { refresh_token });
    tokenService.setAccessToken(data.access_token);
    pastRequest.response.config.headers['X-Access-Token'] = data.access_token;
    return Promise.resolve();
  } catch (error) {
    return Promise.reject();
  }
}

/**
 * Interceptor for outgoing requests.
 * Ensures that the request has the latest available access_token.
 */
axiosInstance.interceptors.request.use(request => {
  request.headers['X-Access-Token'] = tokenService.getAccessToken();
  return request;
});

/**
 * Interceptor for request responses. COMPLICATED AND REQUIRES TESTING.
 * All JWT refresh logic is encapsulated here.
 * If a request fails and is unauthorized, the interceptor first 'ejects' itself
 * (to avoid an infinite loop), and then the interceptor will attempt to obtain a new
 * access token using the argument (a function) onRefresh.
 *
 * While this operation is occuring, all other requests are queued up so that we can ensure we have
 * the latest access_token.
 *
 * Once the refresh has been completed (either resolved or rejected) then we go to the final branch
 *
 * TODO: forced logout if rerequest fails.
 * @param {*} onRefresh function to be called on failed request.
 */
function createInterceptor(onRefresh) {
  const interceptorID = axiosInstance.interceptors.response.use(
    response => response,
    error => {
      // eslint-disable-next-line no-console
      console.log('interceptor called');
      if (error.response && refreshStatusCodes.includes(error.response.status)) {
        axiosInstance.interceptors.response.eject(interceptorID);
        // attempt to refresh token
        const refreshCall = onRefresh(error);
        // queue up all requests while token is refreshing
        const refreshRequestQueueId = axiosInstance.interceptors.request
          .use(request => refreshCall.then(() => request));
        // excecute once refreshCall has finished.
        return refreshCall
          // if token refresh is successful, retry the request with new token.
          .then(() => {
            axiosInstance.interceptors.request.eject(refreshRequestQueueId);
            return axiosInstance(error.response.config);
          })
          // if token refresh is unsuccessful, don't redo the request.
          .catch(err => {
            axiosInstance.interceptors.request.eject(refreshRequestQueueId);
            return Promise.reject(err);
          });
      }
      return Promise.reject(error);
    },
  );
  return axiosInstance; // should we keep this?
}

createInterceptor(refreshToken);

export default axiosInstance;
