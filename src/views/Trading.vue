<template>
<div class="director-tab">
<header class="director-tab__header">
  <h1 class="director-tab__title">Trading</h1>
  <nav class="director-tab__nav">
    <ul class="director-tab__nav-list">
      <li class="director-tab__nav-item">
        <router-link
          :to='{ name: "trading-dashboard" }'
          class="director-tab__nav-link"
          :class='{"inline-nav-link-active": $route.name === "trading-dashboard"}'>
            Dashboard
        </router-link>
      </li>
      <li class="director-tab__nav-item">
        <router-link
          :to='{ name: "trading" }'
          class="director-tab__nav-link"
          :class='{"inline-nav-link-active": $route.name === "trading"}'>
            Trading
        </router-link>
      </li>
    </ul>
  </nav>
</header>
<main class="director-tab__view">
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
  methods: {
    ...mapActions('transactions', [
      'getTransactions',
    ]),
  },
  created() {
    this.getTransactions();
  },
};
</script>
