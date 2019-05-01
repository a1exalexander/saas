/* eslint-disable */
// Becouse 'no-shadow' and 'no-param-reassing' errors of state aren't errors

import moment from 'moment-timezone';

const state = {
  vueLoaderIsLoading: false,
  flashMessages: [],
  totalMsgs: 0,
};

const mutations = {
  reset(state) { },
  setLoader(state, val){
    state.vueLoaderIsLoading = val;
  },
  pushMsg(state, msgObj){
    state.flashMessages.push( msgObj );
    state.totalMsgs = state.flashMessages.length;
  },
  popMsg(state){
    state.flashMessages.pop();
    state.totalMsgs = state.flashMessages.length;
  },
};

const actions = {

  showLoader({ commit }) {
    commit('setLoader', true );
  },
  hideLoader({ commit }) {
    commit('setLoader', false );
  },

  pushMsg({ commit }, msgObj ){

    if( !msgObj.msg ){
      msgObj = {
        msg: msgObj,
        type: 'info',
      }
    }else{
      msgObj.type = (msgObj.type || 'info'); 
    }

    commit('pushMsg', msgObj);
    // used in App.vue => 
    // this.flashError(' This is Error message ...');
    // this.flashInfo(' This is Info message ...');
    // this.flashSuccess(' This is Success message ...');
    // this.flashWarning(' This is Warning message ...');

  },

  popMsg({ commit }){
    commit('popMsg');
  },

};

export default {
  namespaced: true,
  state,
  actions,
  mutations,
};
