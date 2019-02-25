/* eslint-disable */
// Becouse 'no-shadow' and 'no-param-reassing' errors of state aren't errors
import moment from 'moment-timezone';

const state = {
  profile: {
    name: 'Petro Proshenko',
    userId: 12345678,
    gender: 'male',
    ava: require('@/assets/images/ava.jpg'),
    fundLogo: require('@/assets/images/iin-logo.png'),
    country: 'Ukraine',
    city: '',
    street: '',
    postCode: '',
    house: '',
    apt: '',
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
      name: state.profile.name,
      gender: state.profile.gender,
      country: state.profile.country,
      city: state.profile.city,
      street: state.profile.street,
      postCode: state.profile.postCode,
      house: state.profile.house,
      apt: state.profile.apt,
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
