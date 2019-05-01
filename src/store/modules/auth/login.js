const state = {
  token: 'demo-token',
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
    
  },
  AUTH_LOGOUT: ({ commit }) => {
    
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
