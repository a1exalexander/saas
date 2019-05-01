import Validation from '@/js/validation';

const state = {
  personalInfo: {
    name_first: '',
    name_last: '',
    email: '',
    phone: '',
    age: 25,
    gender: 'male',
  },
  fund: {
    business_name: '',
    country: '',
  },
  password: {
    fund_name: '',
    fund_alias: '',
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
  },
  emailConfirmMessage: false,
  token: {
    stepOne: '',
    resendEmail: '',
  },
};

const mutations = {
  cleanData(state) {
    Object.keys(state.personalInfo).forEach((key) => {
      state.personalInfo[key] = key !== 'gender' ? '' : 'male';
    });
    Object.keys(state.fund).forEach((key) => {
      state.fund[key] = '';
    });
    Object.keys(state.password).forEach((key) => {
      state.password[key] = '';
    });
    Object.keys(state.signUpStatus).forEach((key) => {
      state.signUpStatus[key] = false;
    });
    Object.keys(state.routerStatus).forEach((key) => {
      state.routerStatus[key] = key !== 'personalInfo' ? false : true;;
    });
  },
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
  setPassword(state, [type, value]) {
    state.password[type] = value;
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
      && !!state.personalInfo.gender;
  },
  readyFundStep: (state) => {
    return !!state.fund.business_name && !!state.fund.country;
  },
  readyPasswordStep: state => Validation.password(state.password.value) && state.password.agree,
  activePersonalInfoStep: state => !!state.routerStatus.personalInfo,
  activeFundStep: (state, getters) => getters.readyPersonalInfoStep && !!state.routerStatus.fund,
  activePasswordStep: (state, getters) => {
    return getters.readyPersonalInfoStep
          && getters.readyFundStep
          && !!state.routerStatus.password;
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
  generateAlias({ state, commit }) {
    const name = state.fund.business_name;
    const re = /^([!@#\:\.\+\-\~\$%\^&\*\_\s\=\"\~])/;
    const alias = name.toLowerCase().split('').filter(item => !re.test(item)).join('');
    commit('setPassword', ['fund_alias', alias]);
  },
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
  stepTwo({ commit, state, dispatch }) {
    return new Promise((resolve, reject) => {
      commit('setToken', ['stepOne', '786e540b-d88f-5149-836f-fc20c959b939']);
      dispatch('generateAlias');
      setTimeout(() => resolve(), 1500);
    })
  },
  stepThree({ commit, state }) {
    return new Promise((resolve, reject) => {
      setTimeout(() => resolve(), 1500);
    });
  },
  resendEmail({ state }) {
    return new Promise((resolve, reject) => {
      setTimeout(() => resolve(), 1500);
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
