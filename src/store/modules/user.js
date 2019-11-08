/* eslint-disable no-shadow */
import {
  LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE,
  SIGNUP_REQUEST, SIGNUP_SUCCESS, SIGNUP_FAILURE,
  LOGOUT_REQUEST, LOGOUT_SUCCESS,
  PERSIST_SUCCESS, PERSIST_REQUEST, PERSIST_FAILURE,
} from '../../auth/constants';
import jwtUtils from '../../auth/jwtUtils';
import tokenService from '../../auth/tokenService';
import userApi from '../../auth/api/userApi';

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
   * Used to set the state status to a failure constant. See constants.js.
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
    userApi.deleteAccessTokenHeader();
    tokenService.removeAccessToken();
    tokenService.removeRefreshToken();
  },
};

const actions = {
  async login(context, user) {
    context.commit('authRequest', LOGIN_REQUEST);
    try {
      const response = await userApi.login(user);
      if (response.status === 201) {
        context.commit('authSuccess', LOGIN_SUCCESS);
        tokenService.setAccessToken(response.data.access_token);
        tokenService.setRefreshToken(response.data.refresh_token);
        userApi.setAccessTokenHeader(response.data.access_token);
        context.dispatch('getUser');
      } else {
        throw new Error(`Login failed with response status ${response.status}`);
      }
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error);
      context.commit('authFailure', LOGIN_FAILURE);
    }
  },
  async signup(context, user) {
    context.commit('authRequest', SIGNUP_REQUEST);
    try {
      const response = await userApi.signup(user);
      if (response.status === 201) {
        context.commit('authSuccess', SIGNUP_SUCCESS);
        tokenService.setAccessToken(response.data.access_token);
        tokenService.setRefreshToken(response.data.refresh_token);
        userApi.setAccessTokenHeader(response.data.access_token);
        // context.commmit('setUser');
      } else {
        throw new Error(`Signup failed with response status ${response.status}`);
      }
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error);
      context.commit('authFailure', SIGNUP_FAILURE);
    }
  },
  async logout(context) {
    context.commit('authRequest', LOGOUT_REQUEST);
    try {
      context.commit('logout');
      const response = await userApi.logout(tokenService.getAccessToken(),
        tokenService.getRefreshToken());
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

    if (jwtUtils.isJWTValid(access)) {
      context.commit('authSuccess', PERSIST_SUCCESS);
    } else if (jwtUtils.isJWTValid(refresh)) {
      context.commit('authRequest', PERSIST_REQUEST);
      try {
        const { data } = await userApi.refresh(refresh);
        context.commit('authSuccess', PERSIST_SUCCESS);
        tokenService.setAccessToken(data.access_token);
        userApi.setAccessTokenHeader(data.access_token);
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error(error);
        context.dispatch('logout', PERSIST_FAILURE);
      }
    } else {
      context.commit('logout', PERSIST_FAILURE);
    }
  },
  async getUser() {
    try {
      await userApi.getUser();
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('YEEY', error.status);
    }
  },
};

export default {
  state,
  getters,
  mutations,
  actions,
};
