/* eslint-disable */
// Becouse 'no-shadow' and 'no-param-reassing' errors of state aren't errors
import apiCall from '@/helpers/api/exchanges';

const state = {
  myApi: [],
  api: [],
};

const mutations = {
  setApi(state, data) {
    state.api = data; 
  },
  addApi(state, api) {
    state.myApi.unshift(api);
  },
  removeApi(state, key) {
    const index = state.myApi.findIndex((item) => {
      return item.apiKey === key;
    });
    state.myApi.splice(index, 1);
  },
};

const getters = {
  isApi: (state) => {
    return !!state.myApi.length;
  },
  getImages: (state) => {
    const images = {};
    state.api.forEach((element) => {
      images[element.name] = element.image; 
    });
    return images;
  },
};

// TODO: Promis functions must be replaced by Http requests
const actions = {
  downloadApi({ commit }) {
    apiCall('api')
      .then((response) => {
        commit('setApi', response);
      })
      .catch((error) => {
        console.log(error);
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
