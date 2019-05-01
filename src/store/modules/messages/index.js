/* eslint-disable */
// Becouse 'no-shadow' and 'no-param-reassing' errors of state aren't errors
const defaultError = 'Try Again Later. Something happened.';
const defaultSuccess = 'Success';
const defaultInfo = 'Try Again Later.';

const state = {
  isMessage: {
    error: false,
    success: false,
    info: false,
  },
  message: {
    error: '',
    success: '',
    info: '',
  },
};

const mutations = {
  setErrorMessage(state, msg) {
    state.message.error = msg;
  },
  setInfoMessage(state, msg) {
    state.message.info = msg;
  },
  setSuccessMessage(state, msg) {
    state.message.success = msg;
  },
  showMessage(state, type) {
    state.isMessage[type] = true;
    setTimeout(() => {
      state.isMessage[type] = false;
    }, 4000);
  },
  closeMessage(state) {
    Object.keys(state.isMessage).forEach(key => state.isMessage[key] = false);
  },
};

const actions = {
  showErrorMessage({ commit }, msg = defaultError) {
    commit('setErrorMessage', msg);
    commit('closeMessage');
    setTimeout(() => commit('showMessage', 'error'), 15);
  },
  showSuccessMessage({ commit }, msg = defaultSuccess) {
    commit('setSuccessMessage', msg);
    commit('closeMessage');
    setTimeout(() => commit('showMessage', 'success'), 15);
  },
  showInfoMessage({ commit }, msg = defaultInfo) {
    commit('setInfoMessage', msg);
    commit('closeMessage');
    setTimeout(() => commit('showMessage', 'info'), 15);
  },
};

export default {
  namespaced: true,
  state,
  actions,
  mutations,
};
