import axios from 'axios';
import store from '../store/store';
import { TOKEN_REFRESH_FAILURE, TOKEN_REFRESH_SUCCESS, API_DOMAIN, TOKEN_REFRESH_REQUEST, API_REFRESH_TOKEN } from './constants';

const axiosInstance = axios.create({
  baseURL: API_DOMAIN,
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
    'X-Access-Token': localStorage.getItem('access_token'),
  },
});

// use response interceptor for silent refresh
axiosInstance.interceptors.response.use(
  response => response,
  async (error) => {
    const pastRequest = error.config;
    // if unauthorized
    if (error.response.status === 401) {
      const refreshToken = localStorage.getItem('refresh_token');
      store.commit('authRequest', TOKEN_REFRESH_REQUEST);

      try {
        // should I have a check for status code?
        const { data } = await axiosInstance.post(API_REFRESH_TOKEN, { refreshToken });
        store.commit('authSuccess', data.refresh_token, TOKEN_REFRESH_SUCCESS);
        localStorage.setItem('access_token', data.access_token);
        // all future requests will use the new access token.
        axiosInstance.defaults.headers['X-Access-Token'] = data.access_token;
        // redo current failed request with new access token
        pastRequest.headers['X-Access-Token'] = data.access_token;
        return axios(pastRequest);
      } catch (err) {
        // eslint-disable-next-line no-console
        console.log(err);
        axiosInstance.defaults.headers['X-Access-Token'] = '';
        store.commit('authFailure', TOKEN_REFRESH_FAILURE); // todo: logging error message
        store.commit('logout');
      }
    }
    return Promise.reject(error);
  },
);


export default axiosInstance;
