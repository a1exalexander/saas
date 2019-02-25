<template>
<div
  class="investor"
  :class='{"investor--open": dropMenu}'>
  <div class="investor__card">
    <ul class="investor__list">
      <li class="investor__item">
        <div class="investor__image-wrapper">
          <!-- TODO: change to image URL by API -->
          <img class="investor__image" :src="require('@/assets/images/ava.jpg')" alt="">
        </div>
        <div class="investor__name-wrapper">
          <p class="investor__text">{{ investor.name }}</p>
        </div>
      </li>
      <li class="investor__item">
        <p class="investor__text">$ {{ investor.balance | numeral('0,0') }}</p>
        <button
          class="investor__icon-arrow-button"
          @click.stop.prevent='dropMenu = !dropMenu'>
        <icon-arrow-down
          class='investor__icon-arrow'
          :class='{"rotate-180": dropMenu}'/>
        </button>
      </li>
    </ul>
  </div>
  <transition
    name="custom-classes-transition"
    enter-active-class="animated dur08 fadeIn"
    leave-active-class="animated dur04 fadeOut"
    mode="out-in">
  <div class="investor__drop-menu" v-if='dropMenu'>
    <div class="investor__drop-item">
      <p class="investor__drop-label">User ID</p>
      <p class="investor__drop-text">{{ investor.id }}</p>
    </div>
    <div class="investor__drop-item">
      <p class="investor__drop-label">Email</p>
      <p class="investor__drop-text">{{ investor.email }}</p>
    </div>
    <div class="investor__drop-item">
      <p class="investor__drop-label">Phone</p>
      <p class="investor__drop-text">{{ investor.phone }}</p>
    </div>
  </div>
  </transition>
</div>
</template>
<script>
import IconArrowDown from '@/components/common/icons/IconArrowDown.vue';

export default {
  name: 'Customer',
  props: {
    investor: {
      type: Object,
    },
  },
  components: {
    IconArrowDown,
  },
  data() {
    return {
      dropMenu: false,
    };
  },
};
</script>
<style lang="scss">
.investor {
  transition-property: height, max-height, flex;
  transition-duration: 0.6s;
  transition-timing-function: linear;
  max-height: 80px;
  &--open {
    max-height: 220px;
  }
  @media screen and (min-width: $screen-tablet) {
    max-height: auto;
  }
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
  &__image-wrapper {
    width: 28px;
    height: 28px;
    overflow: hidden;
    border-radius: 50%;
    margin-right: 12px;
  }
  &__image {
    width: 100%;
    height: 100%;
    background-color: white;
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
    font-size: $H400;
    font-weight: 500;
  }
  &__drop-menu {
    padding: 16px 28px;
    background-color: $N15;
    border-bottom: 1px solid $N10;
    display: grid;
    grid-template-columns: 2fr 3fr;
    grid-auto-rows: auto;
    grid-gap: 16px;
    justify-content: space-between;
  }
  &__drop-label {
    color: $N7;
    font-weight: 500;
    font-size: $H300;
    margin-bottom: 8px;
  }
  &__drop-text {
    font-size: $H400;
  }
}
</style>
