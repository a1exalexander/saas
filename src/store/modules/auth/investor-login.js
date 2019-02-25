/* eslint-disable */
// Becouse 'no-shadow' and 'no-param-reassing' errors of state aren't errors

const state = {
  token: localStorage.getItem('investor-token') || '',
  authStatus: '',
  userStatus: '',
  keepUser: false,
  offRecaptcha: false,
  resetMessage: false,
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

// TODO: Promis functions must be replaced by Http requests
const actions = {
  AUTH_REQUEST: ({ commit, dispatch }, user) => {
    return new Promise((resolve, reject) => {
      commit('AUTH_REQUEST');
      localStorage.setItem('investor-token', 'super-token');
      commit('AUTH_SUCCESS', 'super-token');
      dispatch('USER_REQUEST');
      resolve();
    });
  },
  AUTH_LOGOUT: ({ commit }) => {
    return new Promise(resolve => {
      commit('AUTH_LOGOUT');
      localStorage.removeItem('investor-token');
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
