const state = {
  currencies: ['BTC', "ETH"],
  cost: {
    BTC: 0.213234324324,
    ETH: 0.234324343243,
  },
  balance: {
    BTC: 345.3455345,
    ETH: 124.2342344,
  },
  addresses: {
    BTC: '1MhyofUSBZvrziVojiVyUDZvEG178m82jP',
    ETH: '0xf5ab6c2308999291a2772d64b2312c2084daa9eb',
  },
};

const mutations = {
  updateCurrencies(state, data) {
    state.currencies = [...data];
  },
  updateCost(state, data) {
    state.cost = Object.assign({}, state.cost, data);
  },
  updateBalance(state, data) {
    state.balance = Object.assign({}, state.balance, data);
  },
  updateAddresses(state, data) {
    state.addresses = Object.assign({}, state.addresses, data);
  },
};

const getters = {
  isCurrencies: (state) => !!state.currencies.length,
  balance: (state) => {
    return Object.values(state.balance).reduce((sum, current) => {
      return Math.round(Number(sum) + Number(current));
    });
  },
  isAddresses: (state) => {
    Object.values(state.addresses).every(item => item);
  },
};

const actions = {
  payoutRequest({ rootGetters }, data) {
    return new Promise((resolve, reject) => {
      resolve();
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
