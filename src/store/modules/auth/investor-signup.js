/* eslint-disable */
// Becouse 'no-shadow' and 'no-param-reassing' errors of state aren't errors

const state = {
  name: '',
  email: '',
  password: '',
  agree: '',
};

const mutations = {
  setPassword(state, value) {
    state.password = value;
  },
  setName(state, value) {
    state.name = value;
  },
  setEmail(state, value) {
    state.email = value;
  },
  toggleAgree(state) {
    state.agree = !state.agree;
  },
};

const getters = {
  
};

const actions = {
  
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
