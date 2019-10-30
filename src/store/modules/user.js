/* eslint-disable no-shadow */
import axiosInstance from '../../auth/axiosInstance';
import { API_LOGIN,
  LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE, SIGNUP_REQUEST, API_SIGNUP, SIGNUP_FAILURE, SIGNUP_SUCCESS } from '../../auth/constants';

const state = {
  status: '',
  access_token: '', // token stored in state is access token. Not sure if necessary.
  refresh_token: localStorage.getItem('refresh_token') || '',
  user: {},
  isAuthenticated: false,
};

const getters = {

};

const mutations = {
  /**
   * Used to set state status to a request. Indicates a request is being made.
   */
  authRequest(state, status) {
    state.status = status;
    state.isAuthenticated = false;
  },
  authSuccess(state, payload) {
    state.status = payload.status;
    state.access_token = payload.access;
    state.refresh_token = payload.refresh;
    state.isAuthenticated = true;
  },
  authFailure(state, status) {
    state.status = status;
    state.isAuthenticated = false;
  },
  refreshSucess(state, payload) {
    state.status = payload.status;
    state.access_token = payload.access;
    state.isAuthenticated = true;
  },
  logOut(state) {
    state.status = '';
    state.access_token = '';
    state.refresh_token = '';
    state.user = {};
    state.isAuthenticated = false;
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
  },
};

const actions = {
  async login(context, user) {
    context.commit('authRequest', LOGIN_REQUEST);
    try {
      const response = await axiosInstance.post(API_LOGIN, user);
      if (response.status === 201) {
        context.commit('authSuccess', { status: LOGIN_SUCCESS,
          access: response.data.access_token,
          refresh: response.data.refresh_token });
        // context.dispatch('getUser'); // not implemented yet
      } else {
        context.commit('authFailure', LOGIN_FAILURE);
        throw new Error(response.status);
      }
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error);
      context.commit('authFailure', LOGIN_FAILURE);
      throw new Error('Login Failed ');
    }
  },
  async signup(context, user) {
    context.commit('authRequest', SIGNUP_REQUEST);
    try {
      const response = await axiosInstance.post(API_SIGNUP, user);
      if (response.status === 201) {
        context.commit('authSuccess',
          { status: SIGNUP_SUCCESS,
            access: response.data.access_token,
            refresh: response.data.refresh_token });
        // context.dispatch('getUser'); // not implemented yet
      }
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error);
      context.commit('authFailure', SIGNUP_FAILURE);
      throw new Error('Signup Failed ');
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
