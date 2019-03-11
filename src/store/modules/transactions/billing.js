/* eslint-disable */
// Becouse 'no-shadow' and 'no-param-reassing' errors of state aren't errors

const state = {
  methods: [],
};

const mutations = {
  setValue(state, [type, id, value]) {
    const index = state.payouts.findIndex((item) => {
      return item.id === id;
    });
    state.payouts[index][type] = value;
  },
  addMethod(state, data) {
    state.methods.push(data);
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
};

const getters = {
  isMethods: (state) => {
    return state.methods.length;
  },
};

// TODO: Promis functions must be replaced by Http requests
const actions = {
  addMethod({ commit, state }, data) {
    const newId = Math.ceil(Math.random() * 500000);
      const obj = {
        id: newId,
        name: '',
        address: '',
        menu: false,
      };
      const newData = Object.assign(obj, data);
      commit('addMethod', newData);
  },
  toggleMenu({ state, commit }, [id, value]) {
    const index = state.methods.findIndex((item) => {
      return item.id === id;
    })
    commit('toggleMenu', [index, value]);
  },
  removeMethod({ state, commit }, id) {
    const index = state.methods.findIndex((item) => {
      return item.id === id;
    })
    commit('removeMethod', index);
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
