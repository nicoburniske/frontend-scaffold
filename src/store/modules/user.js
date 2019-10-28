import axios from 'axios';

const axiosAPI = axios.create({
  baseURL: '',
  timeout: 5000,
})

const state = {
  status : '',
  token : localStorage.getItem('token') || '',
  user : {},
};

const getters = {
  isLoggedIn(state) {
    return !!state.token;
  },
  authHeader(state) {
    return (state.user && state.token) ? {'Authorization' : 'Bearer ' + state.token} : {};
  }

};

const mutations = {
  authRequest(state) {
    state.status = 'working'
  },
  authSuccess(state, token, user) {
    state.status = 'success';
    state.token = token;
    state.user = user;
  },
  authError(state) {
    state.status = 'error';
  },
  logOut(state) {
    state.status = '';
    state.token = '';
    state.user = {};
  }
};

const actions = {

  async login(context, user) {
    const url = '';
    context.commit('authRequest');
    const response = await axiosAPI.post(url, user);
    if (response.status === 200) {
      localStorage.setItem('token', response.data.token)
      context.commit('authSuccess', response.data.token, response.data.user);
    } else {
      // eslint-disable-next-line no-console
      console.log(error, 'Invalid Login');
      context.commit('authError'); 
      throw new Error(response.status);     
    } 
  },
};

export default {
  state, 
  getters, 
  mutations, 
  actions,
};