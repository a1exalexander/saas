/* eslint-disable */
// Becouse 'no-shadow' and 'no-param-reassing' errors of state aren't errors
import moment from 'moment-timezone';

const state = {
  deposits: [
    {
      id: 123,
      name: 'Petro Poroshenko',
      date: '24/01/2019',
      time: '11:23 AM',
      balance: 732000,
      currency: 'Ethereum',
      recieved: 'Ethereum',
      email: 'elisabeth@example.com',
      status: 'rejected',
      fees: '1,5% by Blockchain',
    },
    {
      id: 1233,
      name: 'Pavlo Zibrov',
      date: '24/01/2019',
      time: '11:23 AM',
      balance: 8989000,
      currency: 'Ethereum',
      recieved: 'Ethereum',
      email: 'elisabeth@example.com',
      status: 'on verifying',
      fees: '1,5% by Blockchain',
    },
    {
      id: 17333,
      name: 'Pavlo Zibrov',
      date: '24/01/2019',
      time: '11:23 AM',
      balance: 8989000,
      currency: 'Ethereum',
      recieved: 'Ethereum',
      email: 'elisabeth@example.com',
      status: 'successful',
      fees: '1,5% by Blockchain',
    },
  ],
  search: '',
};

const mutations = {
  setValue(state, [type, id, value]) {
    const index = state.deposits.findIndex((item) => {
      return item.id === id;
    });
    state.deposits[index][type] = value;
  },
  setSearch(state, chars) {
    state.search = chars;
  },
};

const getters = {
  getDeposits: (state) => {
    if (state.search) {
      return state.deposits.filter((item) => {
        return item.name.toLowerCase().indexOf(state.search.toLowerCase()) !== -1;
      });
    }
    return state.deposits;
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
