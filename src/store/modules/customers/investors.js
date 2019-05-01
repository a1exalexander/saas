/* eslint-disable */
// Becouse 'no-shadow' and 'no-param-reassing' errors of state aren't errors
import moment from 'moment-timezone';
import router from '@/router';
import { clients, client } from '@/helpers/clients';

const state = {
  clients: [],
  client: {
    id: '',
    name_first: '',
    name_last: '',
    name: '',
    email: '',
    photo: '',
    phone: '',
    company: '',
    city: '',
    country: '',
    balance: 0,
    age: '',
    role: '',
    sphere: '',
    online: true,
    position: '',
    status: '',
    manager: '',
    tokens: 0,
    last_seen: '',
    created: '',
  },
  investorId: '',
  search: '',
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
  status: '',
  manager: '',
  tokens: 0,
  lastSeen: '',
  registrationDate: '',
}
const mutations = {
  setValue(state, [type, value]) {
    state.client = Object.assign({}, state.client, {[type]: value});
  },
  setClientValue(state, [type, value]) {
    state.client = Object.assign({}, state.client, {[type]: value});
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
  updateClients(state, data) {
    state.clients = [...data];
  },
  updateClient(state, data) {
    Object.assign(state.client, data);
  },
  setSearch(state, value) {
    state.search = value;
  },
};

const getters = {
  isInvestors: (state) => {
    return !!state.clients.length;
  },
  getStatus: (state) => {
    return state.client.role;
  },
  getInvestors: (state) => {
    if (state.search) {
      return state.clients.filter((item) => {
        return item.name.toLowerCase().indexOf(state.search.toLowerCase()) !== -1;
      });
    }
    return state.clients;
  },
};

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
      router.push('/director/clients');
      const timer = setInterval(() => {
        const { name } = router.currentRoute;
        if (name === 'Investors' || name === 'Clients') {
          clearInterval(timer);
          resolve();
        }
      }, 10);
    })
  },
  getClients({ commit, rootGetters }) {
    return new Promise((resolve, reject) => {
      commit('updateClients', clients);
    });
  },
  getClientById({ commit, rootGetters }, id) {
    return new Promise((resolve, reject) => {  
      commit('updateClient', response.data.data.client);
      resolve(response);
    });
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
