/* eslint-disable no-shadow */
import axiosInstance from '../../auth/axiosInstance';
import { API_LOGIN,
  LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE } from '../../auth/constants';

const state = {
  status: '',
  token: localStorage.getItem('access_token') || '', // token stored in state is access token
  user: {},
  isAuthenticated: false,
};

const getters = {

};

const mutations = {
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
    state.status = state;
    state.isAuthenticated = false;
  },
  logOut(state) {
    state.status = '';
    state.token = '';
    state.user = {};
    state.isAuthenticated = false;
  },
};

const actions = {
  // login needs to retrieve JWT and then dispatch another action to retrieve user.
  async login(context, user) {
    context.commit('authRequest', LOGIN_REQUEST);
    try {
      const response = await axiosInstance.post(API_LOGIN, user);
      if (response.status === 200) {
        localStorage.setItem('access_token', response.data.access_token);
        localStorage.setItem('refresh_token', response.data.refresh_token);
        context.commit('authSuccess', response.data.access_token, LOGIN_SUCCESS);
        context.dispatch('getUser');
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
