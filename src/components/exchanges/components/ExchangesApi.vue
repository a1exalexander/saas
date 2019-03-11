<template>
<div
  class="exchanges-api"
  :class='{"exchanges-api--open": dropMenu}'>
  <transition
    name="custom-classes-transition"
    enter-active-class="animated dur04 fadeIn"
    leave-active-class="animated dur03 fadeOut"
    mode="out-in">
  <exchanges-api-remove-popup
    @removeMyApi='removeMyApi'
    :api='api'
    @cancel='removePopup = false'
    v-if='removePopup'/>
  </transition>
  <ul class="exchanges-api__list">
    <li class="exchanges-api__item">
      <div class="exchanges-api__logo-wrapper">
        <img class="exchanges-api__logo" :src='apiImage' alt="logo">
      </div>
      <p class="exchanges-api__name">{{ api.name }}</p>
    </li>
    <li class="exchanges-api__item">
      <p class="exchanges-api__text">{{ api.apiKey }}</p>
    </li>
    <li class="exchanges-api__item exchanges-api__item--secret">
      <p class="exchanges-api__text" v-html='formatedSecretKey'></p>
    </li>
    <li class="exchanges-api__item">
      <span
        class="exchanges-api__status"
        :class='{"exchanges-api__status--success": api.status}'
        >{{ api.status?'Success':'failed' }}
      </span>
    </li>
    <li class="exchanges-api__item exchanges-api__item--right">
      <p class="exchanges-api__text">$ {{ api.balance | numeral('0,0') }}</p>
    </li>
    <li class="exchanges-api__item
      exchanges-api__item--relative
      exchanges-api__item--right">
      <p
        class="exchanges-api__text exchanges-api__text--dots"
        v-html='`\&\#8226\&\#8226\&\#8226`'>
      </p>
      <div class="exchanges-api__inline-message">
        <div class="exchanges-api__inline-message-inner">
          <button class="exchanges-api__inline-button">
            <icon-link class="exchanges-api__inline-icon"/>
            <p class="exchanges-api__inline-text">Open Exchange</p>
          </button>
          <button
            class="exchanges-api__inline-button"
            @click='openRemovePopup'>
            <icon-trash class="exchanges-api__inline-icon"/>
            <p class="exchanges-api__inline-text">Remove</p>
          </button>
        </div>
      </div>
    </li>
  </ul>
  <div class="exchanges-api__mobile">
    <div class="exchanges-api__inner">
      <div class="exchanges-api__logo-wrapper">
        <img class="exchanges-api__logo" :src='apiImage' alt="logo">
      </div>
      <p class="exchanges-api__name">{{ api.name }}</p>
    </div>
    <div class="exchanges-api__inner">
      <p
        class="exchanges-api__balance"
        :class='{"exchanges-api__balance--success": api.status}'
        >$ {{ api.balance | numeral('0,0') }}
      </p>
      <button
        class="exchanges-api__icon-arrow-button"
        @click.prevent='dropMenu = !dropMenu'>
        <icon-arrow-down
          class='exchanges-api__icon-arrow'
          :class='{"rotate-180": dropMenu}'/>
      </button>
    </div>
  </div>
  <transition
    name="custom-classes-transition"
    enter-active-class="animated dur04 fadeIn"
    leave-active-class="animated dur02 fadeOut"
    mode="out-in">
  <div class="exchanges-api__drop" v-show='dropMenu'>
    <p class="exchanges-api__drop-text">API Key</p>
    <p class="exchanges-api__drop-value">{{ api.apiKey }}</p>
    <div class="exchanges-api__row">
      <subtle-icon class='exchanges-api__button'>
        <icon-link class='icon-large icon-button-left'/>
        <span>Open Exchange</span>
      </subtle-icon>
      <subtle-icon
        @click.native='openRemovePopup'>
        <icon-trash class='icon-large icon-button-left'/>
        <span>Remove</span>
      </subtle-icon>
    </div>
  </div>
  </transition>
</div>
</template>
<script>
import IconArrowDown from '@/components/common/icons/IconArrowDown.vue';
import ExchangesApiRemovePopup from '@/components/exchanges/ExchangesApiRemovePopup.vue';
import IconTrash from '@/components/common/icons/IconTrash.vue';
import IconLink from '@/components/common/icons/IconLink.vue';
import SubtleIcon from '@/components/common/buttons/SubtleIcon.vue';
import { mapGetters, mapMutations } from 'vuex';

export default {
  name: 'ExchangesApi',
  props: {
    api: {
      type: Object,
    },
  },
  components: {
    IconArrowDown,
    SubtleIcon,
    IconLink,
    IconTrash,
    ExchangesApiRemovePopup,
  },
  data() {
    return {
      dropMenu: false,
      removePopup: false,
    };
  },
  computed: {
    ...mapGetters('exchanges', [
      'getImages',
    ]),
    apiImage() {
      if (this.api.name) {
        const image = this.getImages[this.api.name];
        // eslint-disable-next-line
        return require(`@/assets/images/${image}`);
      }
      return '';
    },
    formatedSecretKey() {
      const charSum = this.api.secretKey.length;
      return new Array(charSum).join('&#8226');
    },
  },
  methods: {
    ...mapMutations('exchanges', [
      'removeApi',
    ]),
    openRemovePopup() {
      this.removePopup = true;
    },
    removeMyApi() {
      this.dropMenu = false;
      setTimeout(() => {
        this.removePopup = false;
        setTimeout(() => {
          this.removeApi(this.api.apiKey);
        }, 500);
      }, 500);
    },
  },
};
</script>
<style lang="scss">
.exchanges-api {
  background-color: transparent;
  border-radius: 2px;
  padding: 0;
  transition-property: height, max-height, flex;
  transition-duration: 0.4s;
  position: relative;
  transition-timing-function: linear;
  max-height: 80px;
  &--open {
    max-height: 300px;
  }
  @media screen and (min-width: $screen-tablet) {
    max-height: auto;
  }
  &__icon-wrapper {
    border-radius: 50%;
    background-color: $B4;
    @include flex-row(center, center);
    width: 20px;
    height: 20px;
    margin-right: 19px;
  }
  &__icon {
    fill: $N0;
    width: 12px;
    height: 12px;
  }
  &__logo-wrapper {
    border-radius: 50%;
    background-color: $N0;
    @include flex-row(center, center);
    width: 24px;
    height: 24px;
    margin-right: 11px;
    overflow: hidden;
  }
  &__logo {
    width: 19px;
    height: 19px;
  }
  &__name {
    font-size: $H400;
    font-weight: 500;
    text-transform: capitalize;
    letter-spacing: 0.48px;
  }
  &__mobile {
    width: 100%;
    background-color: $N13;
    @include flex-row(space-between, center);
    border-bottom: 1px solid $N10;
    padding: 20px 28px;
    position: relative;
    z-index: 2;
    @media screen and (min-width: $screen-tablet) {
      display: none;
    }
  }
  &__mobile-drop {
    display: none;
  }
  &__inner {
    @include flex-row(space-between, center);
  }
  &__icon-arrow-button {
    padding: 4px;
  }
  &__icon-arrow {
    width: 24px;
    height: 24px;
    fill: $N0;
    transition: transform ease-in-out 0.2s;
  }
  &__balance {
    color: $R1;
    font-size: $H400;
    font-weight: 500;
    margin-right: 20px;
    transition: color ease-in-out 0.2s;
    &--success {
      color: $G1;
    }
  }
  &__drop {
    border-bottom: 1px solid $N10;
    padding: 16px 28px 39px;
    @media screen and (min-width: $screen-tablet) {
      display: none;
    }
  }
  &__drop-text {
    font-size: $H200;
    color: $N6;
    margin-bottom: 6px;
  }
  &__drop-value {
    font-size: $H300;
    color: $N8;
    margin-bottom: 24px;
  }
  &__row {
    @include flex-row(flex-start, center);
  }
  &__button {
    margin-right: 30px;
  }
  &__list {
    display: none;
    @media screen and (min-width: $screen-tablet) {
      display: grid;
      grid-template-columns: 1.4fr 2.8fr repeat(3, 1fr);
      grid-column-gap: 12px;
      justify-content: space-between;
      list-style: none;
      border-bottom: 1px solid $N9;
      padding: 22px 0;
    }
    @media screen and (min-width: $screen-desktop) {
      grid-template-columns: 1.5fr 2fr 1.2fr repeat(3, 1fr);
    }
  }
  &__item {
    @include flex-row(flex-start, center);
    &--right {
      justify-self: end;
    }
    &--secret {
      display: none;
      @media screen and (min-width: $screen-desktop) {
        display: flex;
      }
    }
    &--relative {
      position: relative;
    }
  }
  &__status {
    text-transform: uppercase;
    font-size: $H100;
    border-radius: 2px;
    background-color: $R1;
    padding: 4px;
    width: 66px;
    text-align: center;
    &--success {
      background-color: $G3;
    }
  }
  &__text {
    font-size: $H300;
    white-space: nowrap;
    &--dots {
      color: $B2;
      font-size: $H600;
      padding-right: 16px;
      cursor: pointer;
      &:hover + .exchanges-api__inline-message {
        display: block;
      }
    }
  }
  &__inline-message {
    display: none;
    position: absolute;
    top: 24px;
    right: 0;
    @extend %inline-menu;
    &:hover {
      display: block;
    }
  }
  &__inline-text {
    @extend %inline-menu-text;
  }
  &__inline-button {
    margin-bottom: 12px;
    @include flex-row(flex-start, center);
    @media screen and (min-width: $screen-desktop) {
      &:hover .exchanges-api {
        &__inline-text {
          color: $N3;
        }
        &__inline-icon {
          fill: $N3;
        }
      }
    }
    &:active .exchanges-api {
      &__inline-text {
        color: $N4;
      }
      &__inline-icon {
        fill: $N4;
      }
    }
    &:last-child {
      margin-bottom: 0;
    }
  }
  &__inline-icon {
    margin-right: 6px;
    @extend %inline-menu-icon;
  }
}
</style>
