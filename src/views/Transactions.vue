<template>
<div class="director-tab">
<header class="director-tab__header">
  <h1 class="director-tab__title">Transactions</h1>
  <nav class="director-tab__nav">
    <ul class="director-tab__nav-list">
      <li class="director-tab__nav-item">
        <router-link
          to='/director/transactions/payouts'
          class="director-tab__nav-link"
          :class='{"inline-nav-link-active": routeName === "payouts"
            || routeName === "transactions"}'
          >Payouts
        </router-link>
      </li>
      <li class="director-tab__nav-item">
        <router-link
          to='/director/transactions/deposits'
          class="director-tab__nav-link"
          :class='{"inline-nav-link-active": routeName === "deposits"}'>Deposits
        </router-link>
      </li>
      <li class="director-tab__nav-item">
        <router-link
          to='/director/transactions/settings'
          class="director-tab__nav-link"
          :class='{"inline-nav-link-active": routeName === "methods"}'>Settings
        </router-link>
      </li>
    </ul>
  </nav>
</header>
<main class="transactions__main">
  <transition
    name="custom-classes-transition"
    enter-active-class="animated dur02 fadeIn"
    leave-active-class="animated dur02 fadeOut"
    mode="out-in">
  <router-view/>
  </transition>
</main>
</div>
</template>
<script>
import { mapActions } from 'vuex';
import '@/scss/components/director.scss';

export default {
  name: 'Transactions',
  computed: {
    routeName() {
      return this.$route.name;
    },
  },
  methods: {
    ...mapActions('transactions', [
      'getTransactions',
      'getCost',
    ]),
  },
  created() {
    this.getTransactions();
  },
};
</script>
