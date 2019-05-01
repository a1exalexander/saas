/* eslint-disable */
// Becouse 'no-shadow' and 'no-param-reassing' errors of state aren't errors
import moment from 'moment-timezone';

const getDefaultState = () => {
  return {
    profile: {
      name_first: 'Hilda',
      name_last: 'Barnett',
      user_id: 45,
      id: 44,
      email: 'cowgarlaf@nuuwific.fo',
      phone: '(213) 354-8274',
      gender: 'female',
      ava: null,
      country: 'Antarctica',
      city: 'Ehedogfa',
      lang: 'english',
      street: '',
      created: '2/6/2079',
      zip: 45764,
      business_name: 'fulle',
      house_number: 6,
      extra_address: '',
      last_seen: '2/19/2107',
      role: 'investor',
      last_date_pwd_change: '1/13/2052',
      email_verified: true,
      phone_verified: true,
    },
    status: true,
    lastChangePassword: '1 oct. 2018',
    subdomain: '',
  }
}

const state = getDefaultState();

const mutations = {
  updateProfile(state, data) {
    Object.keys(data).forEach((key) => {
      state.profile[key] = data[key] === 'null' || data[key] === null?'':data[key];
    });
  },
  setLastChangePassword(state) {
    state.lastChangePassword = moment().format("D MMM. YYYY").toLowerCase();
  },
  cleanProfile(state) {
    Object.assign({}, state, getDefaultState());
  },
  setSubdomain(state, name) {
    state.subdomain = name;
  },
  setFundname(state, name) {
    state.profile.business_name = name;
  },
  setSurvey(state) {
    state.survey = true;
  },
  deleteSurvey(state) {
    state.survey = false;
  },
};

const getters = {
  profile: (state) => state.profile,
  lastChangePassword: (state) => {
    const date = state.profile.last_date_pwd_change;
    if (!date) {
      return moment(state.profile.created*1000).format("D MMM. YYYY").toLowerCase();
    }
    return moment(date*1000).format("D MMM. YYYY").toLowerCase();
  },
  getProfileToEdit: (state) => {
    return {
      name_first: state.profile.name_first,
      name_last: state.profile.name_last,
      gender: state.profile.gender,
      country: state.profile.country,
      city: state.profile.city,
      street: state.profile.street,
      zip: state.profile.zip,
      house_number: state.profile.house_number,
      extra_address: state.profile.extra_address,
    };
  },
};

// TODO: Promis functions must be replaced by Http requests
const actions = {
  getFundAsync: ({  }) => {
    return new Promise((resolve, reject) => {
      resolve(); 
    });
  },
  getFundSync: ({  }) => {
      
  },
  getProfile({  }) {
    
  },
  getProfileAsync({  }) {
    return new Promise((resolve, reject) => {
      resolve();   
    })   
  },
  updateProfile({  }, data) {
    return new Promise((resolve, reject) => {
      resolve();  
    });
  },
  deleteProfile({  }) {
    return new Promise((resolve, reject) => {
      resolve();
    })
  }  
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
