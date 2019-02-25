import Vue from 'vue';
import Router from 'vue-router';

// Auth
import Auth from '@/views/Auth.vue';
import Login from '@/components/auth/login/Login.vue';
import SignUp from '@/components/auth/signup/SignUp.vue';
import AccountRecovery from '@/components/auth/recovery/AccountRecovery.vue';
import InvestorSignup from '@/components/auth/investor/InvestorSignup.vue';
import InvestorLogin from '@/components/auth/investor/InvestorLogin.vue';
import InvestorRecovery from '@/components/auth/investor/recovery/InvestorRecovery.vue';

// Profile
import Profile from '@/views/Profile.vue';

// Exchanges
import Exchanges from '@/views/Exchanges.vue';

// Customers
import Customers from '@/views/Customers.vue';
import Investors from '@/components/customers/Investors.vue';
import CustomerProfile from '@/views/CustomerProfile.vue';
import CustomerIntroduction from '@/components/customers/CustomerIntroduction.vue';

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.NODE_ENV === 'production' ? '/saas/dist' : '/',
  routes: [
    {
      path: '*',
      name: 'home',
      component: Auth,
      beforeEnter: (to, from, next) => {
        next('/auth');
      },
    },
    {
      path: '/',
      name: 'auth',
      component: Auth,
      beforeEnter: (to, from, next) => {
        next('/auth');
      },
    },
    {
      path: '/auth',
      component: Auth,
      children: [
        {
          path: '',
          name: 'login',
          component: Login,
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
          path: 'investor-signup',
          name: 'investor-signup',
          component: InvestorSignup,
        },
        {
          path: 'investor-login',
          name: 'investor-login',
          component: InvestorLogin,
        },
        {
          path: 'investor-recovery',
          name: 'investor-recovery',
          component: InvestorRecovery,
        },
      ],
    },
    {
      path: '/profile',
      name: 'Profile',
      component: Profile,
    },
    {
      path: '/exchanges',
      name: 'Exchanges',
      component: Exchanges,
    },
    {
      path: '/customers',
      component: Customers,
      redirect: '/customers/investors',
      children: [
        {
          path: 'investors',
          name: 'Investors',
          component: Investors,
        },
      ],
    },
    {
      path: '/customer-profile/:id',
      component: CustomerProfile,
      alias: '/customers/profile/:id',
      children: [
        {
          path: '/',
          name: 'customer-introduction',
          component: CustomerIntroduction,
        },
      ]
    },
  ],
});
