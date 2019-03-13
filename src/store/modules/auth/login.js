/* eslint-disable */
// Becouse 'no-shadow' and 'no-param-reassing' errors of state aren't errors
import http from 'axios';
import { directorAuth } from '@/api/api';

const state = {
  token: localStorage.getItem('user-token') || '',
  authStatus: '',
  userStatus: '',
  keepUser: false,
  offRecaptcha: false,
  resetMessage: false,
  recaptcha: localStorage.getItem('recaptcha') || '',
};

const mutations = {
  AUTH_REQUEST: state => {
    state.authStatus = 'loading';
  },
  AUTH_SUCCESS: (state, token) => {
    state.authStatus = 'success';
    state.token = token;
  },
  AUTH_ERROR: state => {
    state.authStatus = 'error';
  },
  USER_REQUEST: state => {
    state.userStatus = 'loading';
  },
  USER_SUCCESS: (state) => {
    state.userStatus = 'success';
  },
  USER_ERROR: state => {
    state.userStatus = 'error';
  },
  AUTH_LOGOUT: state => {
    state.token = '';
  },
  toggleKeepingUser( state ) {
    state.keepUser = !state.keepUser;
  },
  toggleRecaptcha(state, value) {
    if (value) {
      localStorage.setItem('recaptcha', 'off');
    } else {
      localStorage.removeItem('recaptcha');
    }
    state.offRecaptcha = value;
  },
  toggleResetMessage(state, value) {
    state.resetMessage = value;
  },
};

const getters = {
  isAuthenticated: state => !!state.token,
  authStatus: state => state.authStatus,
};

const actions = {
  AUTH_REQUEST: ({ commit, dispatch, state }, user) => {
    return new Promise((resolve, reject) => {
      commit('AUTH_REQUEST');
      http.post(directorAuth.signin, user)
      .then((response) => {
        const { auth_token: token } = response.data;
        if (state.keepUser) {
          localStorage.setItem('user-token', token);
        }
        http.defaults.headers.common['Authorization'] = token;
        commit('AUTH_SUCCESS', token);
        dispatch('USER_REQUEST');
        resolve(response);
      })
      .catch((error) => {
        commit('AUTH_ERROR');
        reject(error);
      })
    });
  },
  AUTH_LOGOUT: ({ commit }) => {
    return new Promise(resolve => {
      commit('AUTH_LOGOUT');
      localStorage.removeItem('user-token');
      resolve();
    });
  },
  USER_REQUEST: ({ commit }) => {
    commit('USER_REQUEST');
    commit('USER_SUCCESS');
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
