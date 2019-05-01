<template>
<div
  class="investor-history-mobile">
  <div class="investor-history-mobile__card">
    <ul class="investor-history-mobile__list">
      <li class="investor-history-mobile__item">
        <p class="investor-history-mobile__text investor-history-mobile__text--date">{{ history.date }}</p>
        <p class="investor-history-mobile__text investor-history-mobile__text--type">{{ history.type }}</p>
      </li>
      <li class="investor-history-mobile__item">
        <p class="investor-history-mobile__text">$ {{ history.balance_usd | numeral('0,0.[000000]') }}</p>
        <button
          class="investor-history-mobile__icon-arrow-button"
          @click.stop.prevent='dropMenu = !dropMenu'>
        <icon-arrow-down
          class='investor-history-mobile__icon-arrow'
          :class='{"rotate-180": dropMenu}'/>
        </button>
      </li>
    </ul>
  </div>
 <transition
      v-on:enter="enter"
      v-on:leave="leave">
  <div class="investor-history-mobile__drop-menu" v-if='dropMenu'>
    <div class="investor-history-mobile__drop-item">
      <p class="investor-history-mobile__drop-label">Address</p>
      <p class="investor-history-mobile__drop-text">{{ history.payoutAddress }}</p>
    </div>
    <div class="investor-history-mobile__drop-item">
      <p class="investor-history-mobile__drop-label">Amount</p>
      <p class="investor-history-mobile__drop-text">{{ history.balance | numeral('0,0.[000000]') }} {{ history.currency }}</p>
    </div>
  </div>
  </transition>
</div>
</template>
<script>
import IconArrowDown from '@/components/common/icons/IconArrowDown.vue';
import IconAva from '@/components/common/icons/IconAva.vue';
import 'velocity-animate';

export default {
  name: 'InvestorHistoryMobile',
  props: {
    history: {
      type: Object,
    },
  },
  components: {
    IconArrowDown,
    IconAva,
  },
  data() {
    return {
      dropMenu: false,
    };
  },
  methods: {
    enter(el, done) {
      Velocity(el, "slideDown", { duration: 200 })
    },
    leave(el, done) {
      Velocity(el, "slideUp", { duration: 200 })
    }
  },
};
</script>
<style lang="scss">
.investor-history-mobile {
  width: 100%;
  &__card {
    padding: 18px 20px 18px 28px;
    border-bottom: 1px solid $N10;
  }
  &__list {
    list-style: none;
    @include flex-row(space-between, center);
  }
  &__item {
    @include flex-row(flex-start, center);
  }
  &__icon-arrow-button {
    margin-left: 16px;
    padding: 4px;
  }
  &__icon-arrow {
    width: 28px;
    height: 28px;
    fill: $N0;
  }
  &__text {
    @include text($H400, 500);
    transition: color ease-in-out 0.2s;
    &--name {
      margin-right: 12px;
    }
    &--date {
      @include text($H100, 500, $N6);
      margin-right: 12px;
    }
    &--type {
      text-transform: capitalize;
    }
  }
  &__drop-menu {
    padding: 16px 28px;
    background-color: $N15;
    border-bottom: 1px solid $N10;
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-auto-rows: auto;
    grid-gap: 16px;
    justify-content: space-between;
  }
  &__drop-item {
    margin-bottom: 12px;
    &:last-child {
      margin: 0;
    }
  }
  &__drop-label {
    color: $N7;
    font-weight: 500;
    font-size: $H300;
    margin-bottom: 8px;
  }
  &__drop-text {
    font-size: $H400;
    word-break: break-all;
  }
  &__button {
    color: $B3;
  }
}
</style>
