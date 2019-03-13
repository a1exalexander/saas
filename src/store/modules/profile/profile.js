/* eslint-disable */
// Becouse 'no-shadow' and 'no-param-reassing' errors of state aren't errors
import moment from 'moment-timezone';

const state = {
  profile: {
    name: 'Sherlock Holmes',
    userId: 12345678,
    gender: 'male',
    ava: '',
    fundLogo: require('@/assets/images/iin-logo.png'),
    country: 'Ukraine',
    city: 'London',
    street: 'Baker Street',
    postCode: '44444',
    house: '221B',
    apt: '1',
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

const actions = {
  
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
