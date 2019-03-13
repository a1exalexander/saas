/* eslint-disable */
// Becouse 'no-shadow' and 'no-param-reassing' errors of state aren't errors
import moment from 'moment-timezone';

const state = {
  payouts: [
    {
      id: 3333,
      name: 'Lena Pittman',
      date: '24/01/2019',
      time: '11:23 AM',
      balance: 732000,
      currency: 'Ethereum',
      payoutAddress: 'Ethereum',
      email: 'nekwe@eluca.al',
      status: 'rejected',
      ava: '',
    },
    {
      id: 133,
      name: 'Juan Bailey',
      date: '24/01/2019',
      time: '11:23 AM',
      balance: 8989000,
      currency: 'Ethereum',
      payoutAddress: 'Ethereum',
      email: 'bede@bo.uz',
      status: 'on verifying',
      ava: '',
    },
    {
      id: 1333,
      name: 'Pearl Burke',
      date: '24/01/2019',
      time: '11:23 AM',
      balance: 8989000,
      currency: 'Ethereum',
      payoutAddress: 'Ethereum',
      email: 'rebud@do.nz',
      status: 'successful',
      ava: '',
    },
    {
      id: 17333,
      name: 'Amelia Little',
      date: '24/01/2019',
      time: '11:23 AM',
      balance: 8989000,
      currency: 'Ethereum',
      payoutAddress: 'Ethereum',
      email: 'si@moupini.as',
      status: 'on verifying',
      ava: '',
    },
    {
      id: 1733,
      name: 'Dylan Brewer',
      date: '24/01/2019',
      time: '11:23 AM',
      balance: 8989000,
      currency: 'Ethereum',
      payoutAddress: 'Ethereum',
      email: 'niofioce@teducajun.mz',
      status: 'successful',
      ava: '',
    },
    {
      id: 17333,
      name: 'Georgie Montgomery',
      date: '24/01/2019',
      time: '11:23 AM',
      balance: 8989000,
      currency: 'Ethereum',
      payoutAddress: 'Ethereum',
      email: 'wilosgi@zo.ar',
      status: 'successful',
      ava: '',
    },
  ],
  search: '',
};

const mutations = {
  setValue(state, [type, id, value]) {
    const index = state.payouts.findIndex((item) => {
      return item.id === id;
    });
    state.payouts[index][type] = value;
  },
  setSearch(state, chars) {
    state.search = chars;
  },
};

const getters = {
  getPayouts: (state) => {
    if (state.search) {
      return state.payouts.filter((item) => {
        return item.name.toLowerCase().indexOf(state.search.toLowerCase()) !== -1;
      });
    }
    return state.payouts;
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
