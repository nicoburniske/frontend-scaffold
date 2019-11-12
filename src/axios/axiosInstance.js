/* eslint-disable camelcase */
/* eslint-disable no-param-reassign */
/* eslint-disable arrow-parens */
/* eslint-disable no-unused-vars */
import axios from 'axios';
import {
  API_DOMAIN, API_REFRESH_TOKEN,
} from '../api/endpoints';
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
export async function refreshToken(instance, pastRequest) {
  const refresh_token = tokenService.getRefreshToken();
  try {
    const { data } = await instance.post(API_REFRESH_TOKEN, { refresh_token });
    tokenService.setAccessToken(data.access_token);
    pastRequest.response.config.headers['X-Access-Token'] = data.access_token;
    return Promise.resolve();
  } catch (error) {
    return Promise.reject('Original request failed. Refresh attempted and failed');
  }
}

/**
 * Creates request interceptor for outgoing requests.
 * Ensures that the request has the latest available access_token.
 */
export function createRequestInterceptor(instance) {
  instance.interceptors.request.use(request => {
    request.headers['X-Access-Token'] = tokenService.getAccessToken();
    return request;
  });
}
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
 * Then we await the fulfillment of the refreshCall.
 *
 * - if it succeeds then eject the queue interceptor and redo the failed request.
 *
 * - if an error is thrown (or promise is rejected) we then enter the catch branch.
 * - here the queue interceptor is ejected and we return the failed request. (forced logout?)
 *
 * - FINALLY BLOCK IS VERY IMPORTANT.
 * - Recursive call ensures we revert to the default interceptor.
 *
 * TODO: forced logout if rerequest fails. Add 3rd interceptor.
 * @param {*} instance instance of axios to include interceptor.
 * @param {*} onRefresh function to be called on failed request.
 */
export function createResponseInterceptor(instance, onRefresh) {
  const interceptorID = instance.interceptors.response.use(
    response => response,
    async (error) => {
      if (error.response && refreshStatusCodes.includes(error.response.status)) {
        instance.interceptors.response.eject(interceptorID);
        let refreshRequestQueueId;
        try {
          // attempt to refresh token
          const refreshCall = onRefresh(instance, error);
          // queue up all requests while token is refreshing
          refreshRequestQueueId = instance.interceptors.request
            .use(request => refreshCall.then(() => request));
          // await the evaluation of the onRefresh function.
          await refreshCall;
          instance.interceptors.request.eject(refreshRequestQueueId);
          return instance(error.response.config);
        } catch (failedRefresh) {
          instance.interceptors.request.eject(refreshRequestQueueId);
          return Promise.reject(failedRefresh);
        } finally {
          createResponseInterceptor(instance, onRefresh);
        }
      }
      return Promise.reject(error);
    },
  );
  return axiosInstance; // should we keep this?
}

// init
createRequestInterceptor(axiosInstance);
createResponseInterceptor(axiosInstance, refreshToken);

export default axiosInstance;
