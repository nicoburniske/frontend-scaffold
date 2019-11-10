/* eslint-disable camelcase */
import axiosInstance from './axiosInstance';
import {
  API_LOGIN, API_SIGNUP, API_REFRESH_TOKEN, API_USER,
} from './endpoints';

/**
 * MODULE SUMMARY
 * Used as a wrapper around user authentication api calls. Exposes certain functions that can
 * be looked at as routes. These functions should be called in Vuex Modules.
 *
 * One of these files should be made for every group of api calls (e.g. notesApi.js)
 */

function login(user) {
  return axiosInstance.post(API_LOGIN, user);
}

function signup(user) {
  return axiosInstance.post(API_SIGNUP, user);
}

function logout(access_token, refresh_token) {
  return axiosInstance.delete(API_LOGIN, { access_token, refresh_token });
}

function refresh(refresh_token) {
  return axiosInstance.post(API_REFRESH_TOKEN, { refresh_token });
}

function getUser() {
  return axiosInstance.get(API_USER);
}

function setAccessTokenHeader(access) {
  axiosInstance.defaults.headers['X-Access-Token'] = access;
}

function deleteAccessTokenHeader() {
  delete axiosInstance.defaults.headers['X-Access-Token'];
}

export default {
  login, signup, logout, refresh, getUser, setAccessTokenHeader, deleteAccessTokenHeader,
};
