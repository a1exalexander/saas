import { exchanges } from '@/helpers/exchanges';

const state = {
  myApi: [],
  api: [],
};

const mutations = {
  updateExhanges(state, data) {
    state.myApi = [...data]; 
  },
  setApi(state, data) {
    state.api = [...data]; 
  },
  addApi(state, api) {
    state.myApi.unshift(api);
  },
  removeApi(state, key) {
    const idx = state.myApi.findIndex((item) => item.apiKey === key);
    state.myApi.splice(idx, 1);
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
    commit('setApi', exchanges);
  },
  addExchange({ dispatch, commit }, data) {
    return new Promise((resolve, reject) => {
      const newData = Object.assign({}, data);
      commit('addApi', newData);
      dispatch('messages/showSuccessMessage', undefined, {root: true});
      resolve();
    })
  },
  deleteExchange({ commit }, key) {
    commit('removeApi', key);
    dispatch('messages/showInfoMessage', undefined, {root: true});
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
