import Vue from 'vue';
import Vuex from 'vuex';
import VuexI18n from 'vuex-i18n';
import login from './modules/auth/login';
import signup from './modules/auth/signup';
import investorSignup from './modules/auth/investor-signup';
import investorLogin from './modules/auth/investor-login';
import profile from './modules/profile/profile';
import investorProfile from './modules/profile/investor-profile';
import exchanges from './modules/exchanges/exchanges';
import investors from './modules/customers/investors';
import transactions from './modules/transactions/transactions';
import billing from './modules/transactions/billing';
import request from './modules/investor/request';
import dashboard from './modules/dashboard/dashboard';
import trading from './modules/trading/trading';
import portfolio from './modules/portfolio/portfolio';
import messages from './modules/messages';
import app from './modules/app';

Vue.use(Vuex);

const store = new Vuex.Store({
  modules: {
    login,
    signup,
    profile,
    exchanges,
    investorSignup,
    investorLogin,
    investorProfile,
    investors,
    billing,
    transactions,
    request,
    dashboard,
    trading,
    portfolio,
    messages,
    app,
  },
  getters: {
    token: (state, getters, rootState) => {
      return { auth_token: rootState.login.token };
    },
    investorToken: (state, getters, rootState) => {
      return { auth_token: rootState.investorLogin.token };
    },
    myApi: ( state, getters, rootState )=>{
      return rootState.exchanges.myApi;
    }
  },
});

Vue.use(VuexI18n.plugin, store);

export default store;
