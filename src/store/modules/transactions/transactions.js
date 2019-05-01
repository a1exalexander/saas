import moment from 'moment-timezone';
import { onDeposits, onPayouts, onTransactions } from '@/helpers/transactions';

const state = {
  transactions: onTransactions,
  payouts: onPayouts,
  deposits: onDeposits,
  searchPayouts: '',
  searchDeposits: '',
  cost: {
    BTC: 0,
    ETH: 0,
  },
};

const mutations = {
  updateTransactions(state, data) {
    state.transactions = [...data];
  },
  updateCost(state, data) {
    state.cost = Object.assign({}, state.cost, data);
  },
  setPayoutValue(state, [type, id, value]) {
    const index = state.payouts.findIndex((item) => {
      return item.id === id;
    });
    state.payouts[index][type] = value;
  },
  setDepositValue(state, [type, id, value]) {
    const index = state.deposits.findIndex((item) => {
      return item.id === id;
    });
    state.deposits[index][type] = value;
  },
  setPayoutSearch(state, chars) {
    state.searchPayouts = chars;
  },
  setDepositSearch(state, chars) {
    state.searchDeposits = chars;
  },
  clearSearch(state) {
    state.searchPayouts = '';
    state.searchDeposits = '';
  },
  updatePayouts(state, data) {
    state.payouts = [...data];
  },
  updateDeposits(state, data) {
    state.deposits = [...data];
  },
};

const getters = {
  getPayouts: (state) => {
    if (state.searchPayouts) {
      return state.payouts.filter((item) => {
        return item.name.toLowerCase().indexOf(state.searchPayouts.toLowerCase()) !== -1;
      });
    }
    return state.payouts;
  },
  getDeposits: (state) => {
    if (state.searchDeposits) {
      return state.deposits.filter((item) => {
        return item.name.toLowerCase().indexOf(state.searchDeposits.toLowerCase()) !== -1;
      });
    }
    return state.deposits;
  },
};

// TODO: Promis functions must be replaced by Http requests
const actions = {
  getTransactions({ }) {
    return;
  },
  getPayouts({  }) {
    return new Promise((resolve, reject) => {
      resolve();
    });
  },
  getDeposits({  }) {
    return new Promise((resolve, reject) => {
      resolve();
    });
  },
  getCost({  }) {
    return;
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
