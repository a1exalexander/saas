/* eslint-disable */
// Becouse 'no-shadow' and 'no-param-reassing' errors of state aren't errors
const state = {
  investors: [],
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
}
const mutations = {
  addInvestor(state, data) {
    state.investors.push(data); 
  },
  removeInvestor(state, id) {
    const index = state.investors.findIndex((item) => {
      return item.id === id;
    });
    state.investors.splice(index, 1);
  },
};

const getters = {
  isInvestors: (state) => {
    return !!state.investors.length;
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
