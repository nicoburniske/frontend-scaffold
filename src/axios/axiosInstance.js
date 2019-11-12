/* eslint-disable camelcase */
/* eslint-disable no-param-reassign */
/* eslint-disable arrow-parens */
/* eslint-disable no-unused-vars */
import axios from 'axios';
import {
  API_DOMAIN,
} from '../api/endpoints';
import { refreshToken, createRequestInterceptor, createResponseInterceptor } from './axiosUtils';

/** MODULE SUMMARY:
 * This is used to construct a global axios instance that should be used for all
 * secure API calls (at least).
 * This instance should only be used in the src/api folder.
 */

const axiosInstance = axios.create({
  baseURL: API_DOMAIN,
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// init
createRequestInterceptor(axiosInstance);
createResponseInterceptor(axiosInstance, refreshToken);

export default axiosInstance;
