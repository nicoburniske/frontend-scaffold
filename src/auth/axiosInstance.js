import axios from 'axios';
import store from '../store/store';
import { TOKEN_REFRESH_FAILURE, TOKEN_REFRESH_SUCCESS, API_DOMAIN, API_LOGIN, TOKEN_REFRESH_REQUEST } from './constants';

const axiosInstance = axios.create({
  baseURL: API_DOMAIN,
  timeout: 5000,
  headers: {
    contentType: 'application/json',
    accept: 'application/json',
    Authorization: localStorage.getItem('access_token'),
  },
});

axiosInstance.interceptors.response.use(
  response => response,
  async (error) => {
    const pastRequest = error.config;
    // if unauthorized
    if (error.response.status === 401) {
      const refreshToken = localStorage.getItem('refresh_token');
      store.commit('authRequest', TOKEN_REFRESH_REQUEST);

      try {
        const { data } = await axiosInstance.post(API_LOGIN, { refreshToken });
        store.commit('authSuccess', data.refresh_token, TOKEN_REFRESH_SUCCESS);
        localStorage.setItem('access_token', data.access_token);
        axiosInstance.defaults.headers.Authorization = data.access_token;
        pastRequest.headers.Authorization = data.access_token; // which of these do I use? Both?
        return axios(pastRequest);
      } catch (err) {
        // eslint-disable-next-line no-console
        console.log(err);
        store.commit('authFailure', TOKEN_REFRESH_FAILURE); // todo: logging error message
      }
    }
    return Promise.reject(error);
  },
);

export default axiosInstance;
