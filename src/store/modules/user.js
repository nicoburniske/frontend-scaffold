/* eslint-disable no-shadow */
import axiosInstance from '../../auth/axiosInstance';
import { API_LOGIN,
  LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE, SIGNUP_REQUEST, API_SIGNUP, SIGNUP_FAILURE, SIGNUP_SUCCESS } from '../../auth/constants';

const state = {
  status: '',
  token: localStorage.getItem('access_token') || '', // token stored in state is access token. Not sure if necessary.
  user: {},
  isAuthenticated: false,
};

const getters = {

};

const mutations = {
  /**
   * Used to set state status to a request. Indicates a request is being made.
   */
  authRequest(state, constant) {
    state.status = constant;
    state.isAuthenticated = false;
  },
  authSuccess(state, token, constant) {
    state.status = constant;
    state.token = token;
    state.isAuthenticated = true;
  },
  authFailure(state, constant) {
    state.status = constant;
    state.isAuthenticated = false;
  },
  logOut(state) {
    state.status = '';
    state.token = '';
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
        localStorage.setItem('access_token', response.data.access_token);
        localStorage.setItem('refresh_token', response.data.refresh_token);
        context.commit('authSuccess', response.data.access_token, LOGIN_SUCCESS);
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
        localStorage.setItem('access_token', response.data.access_token);
        localStorage.setItem('refresh_token', response.data.refresh_token);
        context.commit('authSuccess', response.data.access_token, SIGNUP_SUCCESS);
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
