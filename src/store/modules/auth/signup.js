/* eslint-disable */
// Becouse 'no-shadow' and 'no-param-reassing' errors of state aren't errors
import Validation from '@/js/validation';

const state = {
  personalInfo: {
    name: '',
    email: '',
    phone: '',
    age: '',
    gender: '',
  },
  fund: {
    name: '',
    country: '',
    operation: '',
  },
  password: {
    value: '',
    agree: false,
  },
  signUpStatus: {
    personalInfo: false,
    fund: false,
    password: false,
    email: false,
  },
  routerStatus: {
    personalInfo: true,
    fund: false,
    password: false,
    email: false,
  },
  dropMenu: {
    countries: false,
    operations: false,
  },
  emailConfirmMessage: false,
};

const mutations = {
  toggleEmailConfirmedMessage(state, value) {
    state.emailConfirmMessage = !!value;
  },
  setPersonalInfo(state, [type, value]) {
    state.personalInfo[type] = value;
  },
  setEmail(state, value) {
    state.personalInfo.email = value;
  },
  setFund(state, [type, value]) {
    state.fund[type] = value;
  },
  setPassword(state, value) {
    state.password.value = value;
  },
  togglePasswordAgree(state) {
    state.password.agree = !state.password.agree;
  },
  setStepStatus(state, type) {
    state.signUpStatus.start = false;
    state.signUpStatus[type] = true;
  },
  setRouterStatus(state, type) {
    Object.keys(state.routerStatus).forEach((key) => {
      state.routerStatus[key] = false;
    });
    state.routerStatus[type] = true;
  },
  delStepStatus(state, type) {
    state.signUpStatus[type] = false;
  },
  closeDropMenus(state) {
    state.dropMenu.countries = false;
    state.dropMenu.operations = false;
  },
  toggleDropMenu(state, type) {
    Object.keys(state.dropMenu).forEach( (key) => {
      if (key !== type) state.dropMenu[key] = false;
    })
    state.dropMenu[type] = !state.dropMenu[type];
  },
  closeDropMenu(state, type) {
    state.dropMenu[type] = false;
  },
};

const getters = {
  readyPersonalInfoStep: (state) => {
    return Validation.name(state.personalInfo.name)
      && Validation.email(state.personalInfo.email)
      && state.personalInfo.gender;
  },
  readyFundStep: (state) => {
    return state.fund.name && state.fund.country && state.fund.operation;
  },
  readyPasswordStep: (state) => {
    return Validation.password(state.password.value) && state.password.agree;
  },
  activePersonalInfoStep: (state) => {
    return  state.routerStatus.personalInfo;
  },
  activeFundStep: (state, getters) => {
    return getters.readyPersonalInfoStep && state.routerStatus.fund;
  },
  activePasswordStep: (state, getters) => {
    return getters.readyPersonalInfoStep
          && getters.readyFundStep
          && state.routerStatus.password;
  },
  activeEmailStep: (state, getters) => {
    return  getters.allReady && state.routerStatus.email;
  },
  getPasswordStatus: (state) => {
    return !!state.password.value;
  },
  allReady: (state, getters) => {
    return  getters.readyPersonalInfoStep
          && getters.readyFundStep
          && getters.readyPasswordStep;
  },
};

const actions = {
  changeRouterStatus({ state, commit, getters }, type) {
    if (type === 'personalInfo') {
      commit('setRouterStatus', type);
    } else if (type == 'fund') {
      if (getters.readyPersonalInfoStep) commit('setRouterStatus', type);
    } else if (type === 'password') {
      if (getters.readyPersonalInfoStep && getters.readyFundStep) {
        commit('setRouterStatus', type);
      }
    } else if (type === 'email') {
      if (getters.allReady) {
        commit('setRouterStatus', type);
      }
    }
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
