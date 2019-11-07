import axios from 'axios';
import store from '../store/store';
import { TOKEN_REFRESH_FAILURE, TOKEN_REFRESH_SUCCESS, API_DOMAIN, TOKEN_REFRESH_REQUEST, API_REFRESH_TOKEN } from './constants';
import tokenService from './tokenService';

const axiosInstance = axios.create({
  baseURL: API_DOMAIN || 'http://www.mocky.io/v2/5dc43b9c3000008fae347a5f',
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// use response interceptor for silent refresh
axiosInstance.interceptors.response.use(
  response => response,
  async (error) => {
    const pastRequest = error.config;
    // if unauthorized and the access token exists
    if (error.response.status === 401 && tokenService.getAccessToken()) {
      const refreshToken = tokenService.getRefreshToken();
      store.commit('authRequest', TOKEN_REFRESH_REQUEST);
      try {
        const { data } = await axiosInstance.post(API_REFRESH_TOKEN,
          { refresh_token: refreshToken });
        store.commit('authSuccess', TOKEN_REFRESH_SUCCESS);
        tokenService.setAccessToken(data.access_token);
        // all future requests will use the new access token.
        axiosInstance.defaults.headers['X-Access-Token'] = data.access_token;
        // redo current failed request with new access token
        pastRequest.headers['X-Access-Token'] = data.access_token;
        return axios(pastRequest);
      } catch (err) {
        // eslint-disable-next-line no-console
        console.log(err);
        store.dispatch('logout', TOKEN_REFRESH_FAILURE);
      }
    }
    return Promise.reject(error);
  },
);


export default axiosInstance;
