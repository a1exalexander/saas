/* eslint-disable */
// Becouse 'no-shadow' and 'no-param-reassing' errors of state aren't errors
import moment from 'moment-timezone';

const state = {
  profile: {
    name_first: 'Dr. Watson',
    name_last: '',
    userId: 12345678,
    gender: 'male',
    ava: '',
    country: 'Ukraine',
    city: 'Kiyv',
    street: 'Khreschatyk str.',
    postal: '00001',
    house: '1',
    apt: '23',
  },
  status: true,
  lastChangePassword: '1 oct. 2018',
};

const mutations = {
  updateProfile(state, data) {
    Object.keys(data).forEach((key) => {
      state.profile[key] = data[key];
    });
  },
  setLastChangePassword(state) {
    state.lastChangePassword = moment().format("D MMM. YYYY").toLowerCase();
  },
};

const getters = {
  getProfileToEdit: (state) => {
    return {
      name_first: state.profile.name_first,
      name_last: state.profile.name_first,
      gender: state.profile.gender,
      country: state.profile.country,
      city: state.profile.city,
      street: state.profile.street,
      postal: state.profile.postal,
      house: state.profile.house,
      apt: state.profile.apt,
      ava: state.profile.ava,
      dom: state.profile.dom,
    };
  },
};

// TODO: Promis functions must be replaced by Http requests
const actions = {
  
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
