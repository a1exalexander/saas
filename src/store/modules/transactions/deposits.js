/* eslint-disable */
// Becouse 'no-shadow' and 'no-param-reassing' errors of state aren't errors
import moment from 'moment-timezone';

const state = {
  deposits: [
    {
      id: 123,
      name: 'Aaron Lawson',
      date: '24/01/2019',
      time: '11:23 AM',
      balance: 732000,
      currency: 'Ethereum',
      recieved: 'Ethereum',
      email: 'tasaw@fegjoim.vg',
      status: 'rejected',
      fees: '1,5% by Blockchain',
      ava: '',
    },
    {
      id: 443,
      name: 'Cora Lawrence',
      date: '24/01/2019',
      time: '11:23 AM',
      balance: 8989000,
      currency: 'Ethereum',
      recieved: 'Ethereum',
      email: 'hupubice@tudiuze.hu',
      status: 'on verifying',
      fees: '1,5% by Blockchain',
      ava: '',
    },
    {
      id: 3433,
      name: 'Allen Lee',
      date: '24/01/2019',
      time: '11:23 AM',
      balance: 8989000,
      currency: 'Ethereum',
      recieved: 'Ethereum',
      email: 'hag@ere.nc',
      status: 'successful',
      fees: '1,5% by Blockchain',
      ava: '',
    },
    {
      id: 1883,
      name: 'Mabel Wilkerson',
      date: '24/01/2019',
      time: '11:23 AM',
      balance: 8989000,
      currency: 'Ethereum',
      recieved: 'Ethereum',
      email: 'zedufu@ronve.mn',
      status: 'successful',
      fees: '1,5% by Blockchain',
      ava: '',
    },
    {
      id: 833,
      name: 'Evan Lowe',
      date: '24/01/2019',
      time: '11:23 AM',
      balance: 8989000,
      currency: 'Ethereum',
      recieved: 'Ethereum',
      email: 'hudefifa@teda.jo',
      status: 'on verifying',
      fees: '1,5% by Blockchain',
      ava: '',
    },
    {
      id: 1333,
      name: 'Elizabeth Rivera',
      date: '24/01/2019',
      time: '11:23 AM',
      balance: 8989000,
      currency: 'Ethereum',
      recieved: 'Ethereum',
      email: 'butacgi@vih.lk',
      status: 'on verifying',
      fees: '1,5% by Blockchain',
      ava: '',
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
