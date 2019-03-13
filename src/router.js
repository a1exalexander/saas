import Vue from 'vue';
import Router from 'vue-router';
import store from './store';

// Director
import Director from '@/views/Director.vue';

// Auth
import Auth from '@/views/Auth.vue';
import Login from '@/components/auth/login/Login.vue';
import SignUp from '@/components/auth/signup/SignUp.vue';
import AccountRecovery from '@/components/auth/recovery/AccountRecovery.vue';

// Transactions
import Transactions from '@/views/Transactions.vue';
import Payouts from '@/components/transactions/Payouts.vue';
import Deposits from '@/components/transactions/Deposits.vue';
import TransactionsSettings from '@/components/transactions/TransactionsSettings.vue';

// Profile
import Profile from '@/views/Profile.vue';

// Exchanges
import Exchanges from '@/views/Exchanges.vue';

// Customers
import Customers from '@/views/Customers.vue';
import Investors from '@/components/customers/Investors.vue';
import CustomerProfile from '@/views/CustomerProfile.vue';
import CustomerIntroduction from '@/components/customers/CustomerIntroduction.vue';

// Investor
import Investor from '@/views/Investor.vue';
import InvestorDashboard from '@/components/investor/dashboard/InvestorDashboard.vue';
import InvestorProfile from '@/components/investor/profile/InvestorProfile.vue';
import InvestorSignup from '@/components/investor/auth/InvestorSignup.vue';
import InvestorLogin from '@/components/investor/auth/InvestorLogin.vue';
import InvestorRecovery from '@/components/investor/auth/recovery/InvestorRecovery.vue';

Vue.use(Router);

const ifNotAuthenticated = (to, from, next) => {
  if (!store.getters['login/isAuthenticated']) {
    next();
  } else {
    next('/');
  }
};

const ifAuthenticated = (to, from, next) => {
  if (store.getters['login/isAuthenticated']) {
    next();
  } else {
    next('/auth');
  }
};

export default new Router({
  mode: 'history',
  base: process.env.NODE_ENV === 'production' ? '/saas' : '/',
  routes: [
    {
      path: '*',
      redirect: '/director/transactions',
    },
    {
      path: '/',
      name: 'home',
      redirect: '/director/transactions',
    },
    {
      path: '/director',
      component: Director,
      children: [
        {
          path: '',
          name: 'director',
          component: Transactions,
          redirect: '/director/transactions',
          beforeEnter: ifAuthenticated,
        },
        {
          path: 'transactions',
          component: Transactions,
          children: [
            {
              path: '',
              name: 'transactions',
              component: Payouts,
              beforeEnter: ifAuthenticated,
            },
            {
              path: 'payouts',
              name: 'payouts',
              component: Payouts,
              beforeEnter: ifAuthenticated,
            },
            {
              path: 'deposits',
              name: 'deposits',
              component: Deposits,
              beforeEnter: ifAuthenticated,
            },
            {
              path: 'settings',
              name: 'methods',
              component: TransactionsSettings,
              beforeEnter: ifAuthenticated,
            },
          ],
        },
        {
          path: 'profile',
          name: 'Profile',
          component: Profile,
          beforeEnter: ifAuthenticated,
        },
        {
          path: 'exchanges',
          name: 'Exchanges',
          component: Exchanges,
          beforeEnter: ifAuthenticated,
        },
        {
          path: 'customers',
          component: Customers,
          children: [
            {
              path: '',
              name: 'Customers',
              component: Investors,
              beforeEnter: ifAuthenticated,
            },
            {
              path: 'investors',
              name: 'Investors',
              component: Investors,
              beforeEnter: ifAuthenticated,
            },
          ],
        },
        {
          path: 'customer-profile/:id',
          component: CustomerProfile,
          alias: '/director/customers/profile/:id',
          children: [
            {
              path: '',
              name: 'customer-introduction',
              component: CustomerIntroduction,
            },
          ],
        },
      ],
    },
    {
      path: '/investor',
      component: Investor,
      children: [
        {
          path: '',
          component: InvestorDashboard,
        },
        {
          path: 'dashboard',
          name: 'investor-dashboard',
          component: InvestorDashboard,
        },
        {
          path: 'profile',
          name: 'investor-profile',
          component: InvestorProfile,
        },
      ],
    },
    {
      path: '/auth',
      component: Auth,
      children: [
        {
          path: '',
          name: 'login',
          component: Login,
          beforeEnter: ifNotAuthenticated,
        },
        {
          path: 'signup',
          name: 'signup',
          component: SignUp,
        },
        {
          path: 'recovery',
          name: 'recovery',
          component: AccountRecovery,
        },
        {
          path: 'investor',
          name: 'investor-login',
          component: InvestorLogin,
        },
        {
          path: 'investor/signup',
          name: 'investor-signup',
          component: InvestorSignup,
        },
        {
          path: 'investor/recovery',
          name: 'investor-recovery',
          component: InvestorRecovery,
        },
      ],
    },
  ],
});
