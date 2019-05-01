<template>
<div
  class="investor-referral">
  <div class="investor-referral__card">
    <ul class="investor-referral__list">
      <li class="investor-referral__item investor-referral__item--name">
        <div class="investor-referral__image-wrapper">
          <!-- TODO: change to image URL by API -->
          <img
            class="investor-referral__image"
            :src="referral.ava"
            alt=""
            v-if='referral.ava'>
          <icon-ava
            class="default-ava"
            v-else/>
        </div>
        <p class="investor-referral__text investor-referral__text--name">{{ referral.name }}</p>
      </li>
      <li class="investor-referral__item investor-referral__item--balance">
        <button
          class="investor-referral__icon-arrow-button"
          @click.stop.prevent='dropMenu = !dropMenu'>
        <icon-arrow-down
          class='investor-referral__icon-arrow'
          :class='{"rotate-180": dropMenu}'/>
        </button>
      </li>
    </ul>
  </div>
 <transition
      v-on:enter="enter"
      v-on:leave="leave">
  <div class="investor-referral__drop-menu" v-if='dropMenu'>
    <div class="investor-referral__drop-menu-inner">
      <div class="investor-referral__drop-item">
        <p class="investor-referral__drop-label">Email</p>
        <p class="investor-referral__drop-text">{{ referral.email }}</p>
      </div>
      <div class="investor-referral__drop-item">
        <p class="investor-referral__drop-label">Signed Up Date</p>
        <p class="investor-referral__drop-text">{{ referral.date }}</p>
      </div>
      <div class="investor-referral__drop-item">
        <p class="investor-referral__drop-label">Invested Amount</p>
        <p class="investor-referral__drop-text">$ {{ referral.invest | numeral('0,0.[000000]') }}</p>
      </div>
      <div class="investor-referral__drop-item">
        <p class="investor-referral__drop-label">Reached bonuses</p>
        <p class="investor-referral__drop-text">$ {{ referral.bonuses | numeral('0,0.[000]') }}</p>
      </div>
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
  name: 'Customer',
  props: {
    referral: {
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
.investor-referral {
  &__card {
    padding: 18px 24px 18px ;
    border-bottom: 1px solid $N10;
    @media screen and (min-width: $screen-tablet) {
      padding: 12px 40px;
      border-color: $N12;
    }
  }
  &__list {
    list-style: none;
    @include flex-row(space-between, center);
    @media screen and (min-width: $screen-tablet) {
      display: grid;
      grid-template-columns: 3.5fr 2.2fr 1.2fr 2.4fr 0.5fr;
      justify-content: space-between;
      grid-column-gap: 10px;
    }
  }
  &__item {
    @include flex-row(flex-start, center);
    display: none;
    &--name,
    &--balance {
      display: flex;
    }
    @media screen and (min-width: $screen-tablet) {
      display: flex;
    }
  }
  &__image-wrapper {
    width: 28px;
    height: 28px;
    flex-shrink: 0;
    flex-grow: 0;
    border-radius: 50%;
    margin-right: 12px;
    position: relative;
    @media screen and (min-width: $screen-tablet) {
      width: 40px;
      height: 40px;
      margin-right: 20px;
    }
    &--small {
      width: 24px;
      height: 24px;
      margin-right: 10px;
    }
  }
  &__image {
    width: 100%;
    height: 100%;
    border-radius: 50%;
    background-color: white;
    object-fit: cover;
  }
  &__icon-arrow-button {
    margin-left: 16px;
    padding: 4px;
    @media screen and (min-width: $screen-tablet) {
      display: none;
    }
  }
  &__icon-arrow {
    width: 28px;
    height: 28px;
    fill: $N0;
  }
  &__text {
    font-size: $H400;
    font-weight: 500;
    color: $N0;
    transition: color ease-in-out 0.2s;
    @media screen and (min-width: $screen-tablet) {
      font-size: $H200;
      font-weight: 400;
    }
    &--name {
      @media screen and (min-width: $screen-tablet) {
        font-size: $H400;
        margin-bottom: 4px;
        font-weight: 600;
      }
    }
    &--email {
      color: $N4;
      text-decoration: underline;
      @media screen and (min-width: $screen-desktop) {
        &:hover {
          color: $N0;
          text-decoration: underline;
        }
      }
    }
  }
  &__drop-menu {
    padding: 16px 28px;
    background-color: $N15;
    border-bottom: 1px solid $N10;
  }
  &__drop-menu-inner {
    @include flex-row(space-between, center);
    flex-wrap: wrap;
  }
  &__drop-item {
    max-width: 50%;
    &:nth-child(odd) {
      margin-right: 16px;
    }
    &:nth-child(even) {
      min-width: 35%;
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
    margin-bottom: 16px;
  }
  &__button {
    color: $B3;
  }
}
</style>
