import { billingMethods } from '@/helpers/methods';

const state = {
  currencies: ['ETH', 'BTC'],
  methods: billingMethods,
};

const mutations = {
  updateMethods(state, data) {
    state.methods = [...data];
  },
  updateCurrencies(state, data) {
    state.currencies = [...data];
  },
  toggleMenu(state, [id, value]) {
    state.methods[id].menu = value;
  },
  closeAllMenu(state) {
    state.methods.forEach((item, index) => {
      state.methods[index].menu = false;
    });
  },
  removeMethod(state, index) {
    state.methods.splice(index, 1);
  },
  addMethod(state, data) {
    state.methods.push(data);
  },
};

const getters = {
  isMethods: (state) => !!state.methods.length,
};

// TODO: Promis functions must be replaced by Http requests
const actions = {
  addMethod({ commit, dispatch }, data) {
    commit('addMethod', data);
    dispatch('messages/showSuccessMessage', null, {root: true});
  },
  toggleMenu({ state, commit }, [id, value]) {
    const index = state.methods.findIndex((item) => {
      return item.id === id;
    });
    commit('toggleMenu', [index, value]);
  },
  removeMethod({ dispatch, commit, state }, id) {
    const idx = state.methods.findIndex((item) => {
      return item.id === id;
    });
    commit('removeMethod', idx);
    dispatch('messages/showInfoMessage', 'Success deleted', {root: true});
  },
  getMethods({  }) {
    
  },
  getCurrencies({  }) {
    
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
