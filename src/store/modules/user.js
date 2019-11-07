/* eslint-disable no-shadow */
import axiosInstance from '../../auth/axiosInstance';
import { API_LOGIN, API_SIGNUP, API_REFRESH_TOKEN,
  LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE,
  SIGNUP_REQUEST, SIGNUP_FAILURE, SIGNUP_SUCCESS,
  LOGOUT_REQUEST, LOGOUT_SUCCESS,
  PERSIST_SUCCESS, PERSIST_REQUEST, PERSIST_FAILURE } from '../../auth/constants';
import { isJWTValid } from '../../auth/jwtUtils';
import tokenService from '../../auth/tokenService';

const state = {
  status: '',
  user: {},
  isAuthenticated: false,
};

const getters = {
  /* shouldRefresh(state) {
    const access = state.access_token && isJWTValid(state.access_token);
  },  */
};

const mutations = {
  /**
   * Used to set state status to a request constant. See constants.js.
   */
  authRequest(state, status) {
    state.status = status;
    state.isAuthenticated = false;
  },
  /**
   * Used to set the state status to a success constant. See constants.js.
   */
  authSuccess(state, status) {
    state.status = status;
    state.isAuthenticated = true;
  },
  /**
   * Used to set the state status to a failure constant.
   */
  authFailure(state, status) {
    state.status = status;
    state.isAuthenticated = false;
  },
  /**
   * Used to indicate a user has logged out.
   * Resets entire vuex module and removes all tokens from localstorage.
   */
  logout(state, payload = LOGOUT_SUCCESS) {
    state.status = payload;
    state.user = {};
    state.isAuthenticated = false;
    delete axiosInstance.defaults.headers['X-Access-Token'];
    tokenService.removeAccessToken();
    tokenService.removeRefreshToken();
  },
};

const actions = {
  async login(context, user) {
    context.commit('authRequest', LOGIN_REQUEST);
    try {
      const response = await axiosInstance.post(API_LOGIN, user);
      if (response.status === 201) {
        context.commit('authSuccess', LOGIN_SUCCESS);
        tokenService.setAccessToken(response.data.access_token);
        tokenService.setRefreshToken(response.data.refresh_token);
        axiosInstance.defaults.headers['X-Access-Token'] = response.data.access_token;
        // context.commit('setUser');
      } else {
        context.commit('authFailure', LOGIN_FAILURE);
        throw new Error(response.status);
      }
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error);
      context.commit('authFailure', LOGIN_FAILURE);
      throw new Error('Login Failed');
    }
  },
  async signup(context, user) {
    context.commit('authRequest', SIGNUP_REQUEST);
    try {
      const response = await axiosInstance.post(API_SIGNUP, user);
      if (response.status === 201) {
        context.commit('authSuccess', SIGNUP_SUCCESS);
        tokenService.setAccessToken(response.data.access_token);
        tokenService.setRefreshToken(response.data.refresh_token);
        axiosInstance.defaults.headers['X-Access-Token'] = response.data.access_token;
        // context.commmit('setUser');
      }
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error);
      context.commit('authFailure', SIGNUP_FAILURE);
      throw new Error('Signup Failed');
    }
  },
  async logout(context) {
    context.commit('authRequest', LOGOUT_REQUEST);
    try {
      const response = await axiosInstance.delete(API_LOGIN,
        { access_token: context.state.access_token,
          refresh_token: context.state.refresh_token });
      context.commit('logout');
      if (response.status !== 204) {
        throw new Error(`Logout failed with response status ${response.status}`);
      }
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error);
    }
  },
  async persistUser(context) {
    const access = tokenService.getAccessToken();
    const refresh = tokenService.getRefreshToken();

    if (isJWTValid(access)) {
      context.commit('authSuccess', PERSIST_SUCCESS);
    } else if (isJWTValid(refresh)) {
      context.commit('authRequest', PERSIST_REQUEST);
      try {
        const { data } = await axiosInstance.post(API_REFRESH_TOKEN, { refresh_token: refresh });
        context.commit('authSuccess', PERSIST_SUCCESS);
        tokenService.setAccessToken(data.access_token);
        // all future requests will use the new access token.
        axiosInstance.defaults.headers['X-Access-Token'] = data.access_token;
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error(error);
        context.dispatch('logout', PERSIST_FAILURE);
      }
    } else {
      context.commit('logout', PERSIST_FAILURE);
    }
  },
  /**
    async getUser(context) {

    },
  * */
};

export default {
  state,
  getters,
  mutations,
  actions,
};
