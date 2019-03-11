<template>
<div
  class="investor"
  :class='{"investor--open": dropMenu}'>
  <div class="investor__card">
    <ul class="investor__list">
      <li class="investor__item investor__item--name">
        <div class="investor__image-wrapper">
          <!-- TODO: change to image URL by API -->
          <img class="investor__image" src="@/assets/images/ava.jpg" alt="">
        </div>
        <div class="investor__name-wrapper">
          <p class="investor__text investor__text--name">{{ investor.name }}</p>
          <div class="investor__status">
            <p
              class="investor__status-name"
              >{{ investor.status?'Online':'Offline' }}
            </p>
            <span
              class="investor__status-dot"
              :class='{"status-offline": !investor.status}'>
            </span>
          </div>
        </div>
      </li>
      <li class="investor__item">
        <a
          :href="`mailto:${investor.email}`"
          class="investor__text investor__text--email">{{ investor.email }}</a>
      </li>
      <li class="investor__item investor__item--phone investors__head-item--end">
        <a
          :href="`mailto:${investor.phone}`"
          class="investor__text">{{ investor.phone }}</a>
      </li>
      <li class="investor__item">
        <div class="investor__image-wrapper investor__image-wrapper--small">
          <!-- TODO: change to image URL by API -->
          <img class="investor__image" src="@/assets/images/ava.jpg" alt="">
        </div>
        <p class="investor__text">{{ investor.manager }}</p>
      </li>
      <li class="investor__item investor__item--balance investors__head-item--end">
        <p class="investor__text">$ {{ investor.balance | numeral('0,0') }}</p>
        <button
          class="investor__icon-arrow-button"
          @click.stop.prevent='dropMenu = !dropMenu'>
        <icon-arrow-down
          class='investor__icon-arrow'
          :class='{"rotate-180": dropMenu}'/>
        </button>
      </li>
      <li class="investor__item investor__item--tokens investors__head-item--end">
        <p class="investor__text">{{ investor.tokens }}</p>
      </li>
      <li class="investor__item">
        <span class="investor__request-label">Dividend withdrawal</span>
      </li>
      <li class="investor__item investor__item--dots">
        <a href='#' @click.prevent='openProfile(investor.id)' class="investor__button">
          <icon-dots class='investor__icon-dots'/>
        </a>
      </li>
    </ul>
  </div>
  <transition
    name="custom-classes-transition"
    enter-active-class="animated dur04 fadeIn"
    leave-active-class="animated dur03 fadeOut"
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
import IconDots from '@/components/common/icons/IconDots.vue';
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
    IconDots,
  },
  data() {
    return {
      dropMenu: false,
    };
  },
  methods: {
    openProfile(id) {
      this.$router.push({ path: `/director/customers/profile/${id}` });
    },
  },
};
</script>
<style lang="scss">
.investor {
  transition-property: height, max-height, flex;
  transition-duration: 0.2s;
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
      grid-template-columns: 3fr 2.5fr 2fr 2.2fr 1.4fr 1fr 2fr 0.5fr;
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
    &--phone {
      margin-right: 20px;
    }
    &--tokens {
      margin-right: 20px;
    }
  }
  &__image-wrapper {
    width: 28px;
    height: 28px;
    flex-shrink: 0;
    flex-grow: 0;
    overflow: hidden;
    border-radius: 50%;
    margin-right: 12px;
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
    display: grid;
    grid-template-columns: 1fr 1fr;
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
  &__status {
    display: none;
    @media screen and (min-width: $screen-tablet) {
      display: flex;
      justify-content: flex-start;
      align-items: center;
    }
  }
  &__status-name {
    font-size: $H300;
    margin-right: 8px;
    line-height: 1;
    color: $N6;
  }
  &__status-dot {
    @extend %status-dot;
    margin-top: 4px;
  }
  &__request-label {
    border-radius: 2px;
    background-color: $N9;
    padding: 4px 8px;
    font-size: $H100;
  }
  &__button {
    color: $B3;
  }
  &__icon-dots {
    width: 24px;
    height: 24px;
    fill: $B3;
  }
}
</style>
