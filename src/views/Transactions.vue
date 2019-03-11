<template>
<div class="transactions">
<header class="transactions__header">
  <h1 class="transactions__title">Transactions</h1>
  <nav class="transactions__nav">
    <ul class="transactions__nav-list">
      <li class="transactions__nav-item">
        <router-link
          to='/director/transactions/payouts'
          class="transactions__nav-link"
          :class='{"inline-nav-link-active": routeName === "payouts"
            || routeName === "transactions"}'
          >Payouts
        </router-link>
      </li>
      <li class="transactions__nav-item">
        <router-link
          to='/director/transactions/deposits'
          class="transactions__nav-link"
          :class='{"inline-nav-link-active": routeName === "deposits"}'>Deposits
        </router-link>
      </li>
      <li class="transactions__nav-item">
        <router-link
          to='/director/transactions/settings'
          class="customers__nav-link"
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
export default {
  name: 'Transactions',
  computed: {
    routeName() {
      return this.$route.name;
    },
  },
};
</script>
<style lang='scss'>
.transactions {
  background-color: $N13;
  padding: 56px 0;
  height: 100vh;
  @include flex-col(stretch, stretch);
  @media screen and (min-width: $screen-tablet) {
    padding: 0;
    flex: 1 1;
  }
  &__header {
    background-color: $B12;
    padding: 32px 28px 0;
    @media screen and (min-width: $screen-tablet) {
      padding: 27px 40px 0;
    }
  }
  &__title {
    display: none;
    @media screen and (min-width: $screen-tablet) {
      display: block;
      font-size: $H900;
      font-weight: 600;
      margin-bottom: 32px;
    }
  }
  &__nav-list {
    @extend %inline-nav-list;
  }
  &__nav-item {
    @extend %inline-nav-item;
  }
  &__nav-link {
    @extend %inline-nav-link;
    &--active {
      border-color: $N2;
      color: $N2;
    }
  }
  &__main {
    flex: 1 1;
    @include flex-col(stretch, stretch);
    overflow: auto;
    @media screen and (min-width: $screen-tablet) {
      overflow: hidden;
    }
  }
}
</style>
