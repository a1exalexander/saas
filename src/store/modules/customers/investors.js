/* eslint-disable */
// Becouse 'no-shadow' and 'no-param-reassing' errors of state aren't errors
import moment from 'moment-timezone';
import router from '@/router'

const state = {
  investors: [],
  investorId: '',
};
const newInvestorData = {
  id: '',
  name: '',
  email: '',
  photo: '',
  phone: '',
  company: '',
  city: '',
  country: '',
  balance: 0,
  age: '',
  sphere: '',
  online: true,
  position: '',
  status: 'investor',
  manager: 'Pavlo Zibrov',
  tokens: 2300,
  lastSeen: '',
  registrationDate: '',
}
const mutations = {
  setValue(state, [type, value]) {
    const index = state.investors.findIndex((item) => {
      return item.id === state.investorId;
    });
    state.investors[index][type] = value;
  },
  updateProfile(state, data) {
    const index = state.investors.findIndex((item) => {
      return item.id === state.investorId;
    })
    Object.keys(data).forEach((key) => {
      state.investors[index][key] = data[key];
    });
  },
  addInvestor(state, data) {
    const profile = Object.assign({}, newInvestorData, data);
    profile.registrationDate = moment().format('DD/MM/YYYY');
    profile.lastSeen = moment().format('DD/MM/YYYY HH:mm:ss');
    state.investors.push(profile); 
  },
  removeInvestorById(state, id) {
    const index = state.investors.findIndex((item) => {
      return item.id === id;
    });
    state.investors.splice(index, 1);
  },
  setInvestorId(state, id) {
    state.investorId = id;
  },
};

const getters = {
  isInvestors: (state) => {
    return !!state.investors.length;
  },
  getInvestorById: (state) => {
    if (state.investorId) {
      const index = state.investors.findIndex((item) => {
        return item.id === state.investorId;
      });
      return state.investors[index];
    }
    return newInvestorData;
  },
};

// TODO: Promis functions must be replaced by Http requests
const actions = {
  checkInvestorById({ commit, state }, id) {
    return new Promise ((resolve, reject) => {
      const flag = state.investors.some((item) => {
        return item.id === id;
      });
      if (flag) {
        commit('setInvestorId', id);
        resolve();
      } else {
        commit('setInvestorId', '');
        reject();
      }
    }) 
  },
  changeRouteBeforeRemove() { 
    return new Promise ((resolve, reject) => {
      router.push('/customers');
      const timer = setInterval(() => {
        if (router.currentRoute.name === 'Investors') {
          clearInterval(timer);
          resolve();
        }
      }, 10);
    })
  },
  removeInvestor({ commit, state, dispatch }) {
    dispatch('changeRouteBeforeRemove').then(() => {
      commit('removeInvestorById', state.investorId);
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
