/* eslint-disable */
// Becouse 'no-shadow' and 'no-param-reassing' errors of state aren't errors
import Validation from '@/js/validation';
import http from 'axios';
import { directorAuth } from '@/api/api';

const state = {
  personalInfo: {
    name_first: '',
    name_last: '',
    email: '',
    phone: '',
    age: '',
    gender: '',
  },
  fund: {
    business_name: '',
    country: '',
    business_type: '',
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
  token: {
    stepOne: '',
    resendEmail: '',
  },
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
  openDropCountriesMenu(state) {
    state.dropMenu.countries = true;
  },
  setToken(state, [type, token]) {
    state.token[type] = token;
  },
  setCountry(state, value) {
    state.fund.country = value;
  },
};

const getters = {
  readyPersonalInfoStep: (state) => {
    return Validation.name(state.personalInfo.name_first)
      && Validation.email(state.personalInfo.email)
      && state.personalInfo.gender;
  },
  readyFundStep: (state) => {
    return state.fund.business_name && state.fund.country && state.fund.business_type;
  },
  readyPasswordStep: state => Validation.password(state.password.value) && state.password.agree,
  activePersonalInfoStep: state => state.routerStatus.personalInfo,
  activeFundStep: (state, getters) => getters.readyPersonalInfoStep && state.routerStatus.fund,
  activePasswordStep: (state, getters) => {
    return getters.readyPersonalInfoStep
          && getters.readyFundStep
          && state.routerStatus.password;
  },
  activeEmailStep: (state, getters) => getters.allReady && state.routerStatus.email,
  getPasswordStatus: state => !!state.password.value,
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
    };
  },
  stepOne({ commit }) {
    return new Promise((resolve, reject) => {
      commit('setRouterStatus', 'fund');
      commit('setStepStatus', 'personalInfo');
      resolve();
    });
  },
  stepTwo({ commit, state }) {
    const data = Object.assign(state.personalInfo, state.fund);
    return new Promise((resolve, reject) => {
      http.post(directorAuth.signUp1, data)
        .then((response) => {
          const { auth_token: token } = response.data;
          commit('setToken', ['stepOne', token]);
          resolve(response);
        })
        .catch((error) => {
          reject(error);
        });
    });
  },
  stepThree({ commit, state }) {
    const data = {
      'password-1': state.password.value,
      'password-2': state.password.value,
      auth_token: state.token.stepOne,
    };
    return new Promise((resolve, reject) => {
      http.post(directorAuth.signUp2, data)
        .then((response) => {
          resolve(response);
        })
        .catch((error) => {
          reject(error);
        });
    });
  },
  resendEmail({ state }) {
    return new Promise((resolve, reject) => {
      http.post(directorAuth.resendEmail, state.personalInfo.email)
        .then((response) => {
          const { auth_token: token } = response.data;
          commit('setToken', ['resendEmail', token]);
          resolve(response);
        })
        .catch((error) => {
          reject(error);
        });
    });
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
