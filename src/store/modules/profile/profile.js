/* eslint-disable */
// Becouse 'no-shadow' and 'no-param-reassing' errors of state aren't errors
import moment from 'moment-timezone';

const state = {
  profile: {
    name_first: 'Mittie',
    name_last: 'Patrick',
    email: 'Mittie Patrick',
    id: 14,
    gender: 'male',
    ava: null,
    fundLogo: null,
    country: 'Senegal',
    phone: '0999999999',
    city: 'Omiegtu',
    street: '84 Ageijo Loop',
    zip: 34566,
    business_type: 'fund',
    business_name: 'believed',
    age: 27,
    fund: {
      alias: 'believed',
    },
    created: '8/3/2028',
    house_number: 5,
    extra_address: '',
    invite_code: '7f925d7a-dc25-5130-b6dd-0a70771ec600',
    last_seen: '8/10/2040',
    last_date_pwd_change: '4/24/2021',
    email_verified: true,
    phone_verified: true,
    role: 'director',
  },
  status: true,
  subdomain: 'believed',
};

const mutations = {
  removeSubdomain(state) {
    state.subdomain = '';
  },
  updateProfile(state, data) {
    // Object.assign(state.profile, data);
    Object.keys(data).forEach((key) => {
      state.profile[key] = data[key] === 'null' && data[key] === null?'':data[key];
    });
  },
  setLastChangePassword(state) {
    state.lastChangePassword = moment().format("D MMM. YYYY").toLowerCase();
  },
  setSubdomain(state, name) {
    state.subdomain = name;
  },
  setSurvey(state) {
    state.survey = true;
  },
  deleteSurvey(state) {
    state.survey = false;
  },
};

const getters = {
  getUrl: (state) => {
    const code = state.profile.invite_code;
    const alias = state.subdomain;
    return `http://${alias}.fundplatform.io/auth/investor/signup?invite=${code}`;
  },
  getProfileToEdit: (state) => {
    return {
      name_first: state.profile.name_first,
      gender: state.profile.gender,
      country: state.profile.country,
      city: state.profile.city,
      street: state.profile.street,
      zip: state.profile.zip,
      house_number: state.profile.house_number,
      extra_address: state.profile.extra_address,
    };
  },
  getInviteCode: (state) => {
    return state.profile.invite_code;
  },
  lastChangePassword: (state) => {
    const date = state.profile.last_date_pwd_change;
    if (!date) {
      return moment(state.profile.created*1000).format("D MMM. YYYY").toLowerCase();
    }
    return moment(date*1000).format("D MMM. YYYY").toLowerCase();
  },
};

const actions = {
  getFundAsync: ({ }) => {
    return new Promise((resolve, reject) => {
      resolve();
    });
  },
  getFundSync: ({ }) => {
    
  },
  getProfile({ }) {
    
  },
  getProfileAsync({ }) {
    return new Promise((resolve, reject) => {
      resolve();
    })
  },
  updateProfile({ rootGetters }, data) {
    return new Promise((resolve, reject) => {
      resolve(resp); 
    })
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
