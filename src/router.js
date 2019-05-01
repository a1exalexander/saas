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

// Dashboard
import Dashboard from '@/views/Dashboard.vue';


// Portfolio
import Portfolio from '@/views/Portfolio.vue';

// Transactions
import Transactions from '@/views/Transactions.vue';
import Payouts from '@/components/transactions/Payouts.vue';
import Deposits from '@/components/transactions/Deposits.vue';
import TransactionsSettings from '@/components/transactions/TransactionsSettings.vue';

// Trading
import Trading from '@/views/Trading.vue';
import TradingDashboard from '@/components/trading/TradingDashboard.vue';
import TradingTrading from '@/components/trading/TradingTrading.vue';

// Profile
import Profile from '@/views/Profile.vue';

// Exchanges
import Exchanges from '@/views/Exchanges.vue';

// Strategies
import Strategies from '@/views/Strategies.vue';

// Customers
import Customers from '@/views/Customers.vue';
import Investors from '@/components/customers/Investors.vue';
import CustomerProfile from '@/views/CustomerProfile.vue';
import CustomerIntroduction from '@/components/customers/CustomerIntroduction.vue';

// Investor
import Investor from '@/views/Investor.vue';
import InvestorMain from '@/components/investor/InvestorMain.vue';
import InvestorDashboard from '@/components/investor/dashboard/InvestorDashboard.vue';
import InvestorProfile from '@/components/investor/profile/InvestorProfile.vue';
import InvestorSignup from '@/components/investor/auth/InvestorSignup.vue';
import InvestorLogin from '@/components/investor/auth/InvestorLogin.vue';
import InvestorRecovery from '@/components/investor/auth/recovery/InvestorRecovery.vue';
import InvestorHistory from '@/components/investor/history/InvestorHistory.vue';
import InvestorReferrals from '@/components/investor/referrals/InvestorReferrals.vue';

Vue.use(Router);

const router = new Router({
  mode: 'history',
  base: process.env.NODE_ENV === 'production' ? '/saas' : '/',
  routes: [
    {
      path: '*',
      redirect: { name: 'payouts' },
    },
    {
      path: '/',
      name: 'home',
      redirect: { name: 'payouts' },
    },
    {
      path: '/director',
      component: Director,
      redirect: { name: 'payouts' },
      children: [
        {
          path: 'clients/profile/:id',
          component: CustomerProfile,
          children: [
            {
              path: '',
              name: 'introduction',
              component: CustomerIntroduction,
            },
          ],
        },
        {
          path: 'dashboard',
          name: 'Dashboard',
          component: Dashboard,

        },
        {
          path: 'strategies',
          name: 'Strategies',
          component: Strategies,

        },
        {
          path: 'portfolio',
          name: 'Portfolio',
          component: Portfolio,

        },
        {
          path: 'trading',
          component: Trading,
          redirect: { name: 'payouts' },
          children: [
            {
              path: 'dashboard',
              name: 'trading-dashboard',
              component: TradingDashboard,
    
            },
            {
              path: 'trading',
              name: 'trading',
              component: TradingTrading,
    
            },
          ],
        },
        {
          path: 'transactions',
          component: Transactions,
          redirect: { name: 'payouts' },
          children: [
            {
              path: 'payouts',
              name: 'payouts',
              component: Payouts,
    
            },
            {
              path: 'deposits',
              name: 'deposits',
              component: Deposits,
    
            },
            {
              path: 'settings',
              name: 'methods',
              component: TransactionsSettings,
    
            },
          ],
        },
        {
          path: 'profile',
          name: 'Profile',
          component: Profile,

        },
        {
          path: 'exchanges',
          name: 'Exchanges',
          component: Exchanges,
        
        },
        {
          path: 'clients',
          component: Customers,
          redirect: { name: 'Investors' },
          children: [
            {
              path: 'investors',
              name: 'Investors',
              component: Investors,
            
            },
          ],
        },
      ],
    },
    {
      path: '/investor/profile',
      name: 'investor-profile',
      component: InvestorProfile,
      
    },
    {
      path: '/investor',
      component: Investor,
      redirect: { name: 'investor-dashboard' },
      children: [
        {
          path: 'dashboard',
          name: 'investor-dashboard',
          component: InvestorDashboard,
          
        },
        {
          path: 'history',
          name: 'investor-history',
          component: InvestorHistory,
          
        },
        {
          path: 'referrals',
          name: 'investor-referrals',
          component: InvestorReferrals,
          
        },
      ],
    },
    {
      path: '/auth',
      component: Auth,
      children: [
        {
          path: '',
          name: 'auth',
          component: Login,
          props: route => ({
            query: route.query.code,
            message: route.query.message,
            token: route.query.token,
          }),
          
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
          props: route => ({ query: route.query.code, message: route.query.message }),
          component: InvestorLogin,
      
        },
        {
          path: 'investor/signup',
          name: 'investor-signup',
          props: route => ({ query: route.query.invite }),
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


export default router;
