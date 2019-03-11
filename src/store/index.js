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
import payouts from './modules/transactions/payouts';
import deposits from './modules/transactions/deposits';
import billing from './modules/transactions/billing';

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
    payouts,
    deposits,
    billing,
  },
});

Vue.use(VuexI18n.plugin, store);

export default store;
