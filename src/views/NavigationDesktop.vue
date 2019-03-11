<template>
<nav class='navigation'>
  <transition
    name="custom-classes-transition"
    enter-active-class="animated dur03 fadeIn"
    leave-active-class="animated dur03 fadeOut"
    mode="out-in">
  <invite-popup v-if='invitePopup' @cancel='closeInvitePopup'/>
  </transition>
  <div class="navigation__inner">
    <section class="navigation__header">
      <div class="navigation__header-inner">
        <div class="navigation__logo-wrapper">
          <img class="navigation__logo" :src="getlogo" alt="logo">
        </div>
        <p class="navigation__title">Initial Index Fund</p>
      </div>
    </section>
    <ul class="navigation__list">
      <li class="navigation__item" :class='{"navigation__item--active": routeCustomers }'>
        <icon-investor class='navigation__item-icon'/>
        <router-link to='/director/customers' class="navigation__item-text">Customers</router-link>
      </li>
      <li class="navigation__item" :class='{"navigation__item--active": routeExchanges }'>
        <icon-exchanges class='navigation__item-icon'/>
        <router-link to='/director/exchanges' class="navigation__item-text">Exchanges</router-link>
      </li>
      <li class="navigation__item" :class='{"navigation__item--active": routeTransactions }'>
        <icon-billing class='navigation__item-icon'/>
        <router-link
          to='/director/transactions'
          class="navigation__item-text">Transactions
        </router-link>
      </li>
    </ul>
  </div>
  <div class="navigation__inner">
    <invite-button
      class='navigation__invite-button'
      @click.native='openInvitePopup'/>
    <section class="navigation__profile">
      <div class="navigation__profile-card">
        <div class="navigation__ava-wrapper">
          <img class="navigation__ava" :src="getAva" alt="avatar">
        </div>
        <p class="navigation__profile-name">{{ getName }}</p>
      </div>
      <div
        class="navigation__popover-wrapper"
        @mouseleave="popover = false">
        <a
          href='#'
          class='navigation__profile-button'
          v-html='"\&\#8226\&\#8226\&\#8226"'
          @mouseover="popover = true">
        </a>
        <transition
          name="custom-classes-transition"
          enter-active-class="animated dur03 fadeIn"
          leave-active-class="animated dur02 fadeOut"
          mode="out-in">
        <popover-navigation
          class='navigation__popover'
          @click.native="popover = false"
          v-show="popover"/>
        </transition>
      </div>
    </section>
  </div>
</nav>
</template>
<script>
import IconInvestor from '@/components/common/icons/IconInvestor.vue';
import IconBilling from '@/components/common/icons/IconBilling.vue';
import IconExchanges from '@/components/common/icons/IconExchanges.vue';
import PopoverNavigation from '@/components/common/PopoverNavigation.vue';
import InviteButton from '@/components/inviteInvestor/InviteButton.vue';
import InvitePopup from '@/components/inviteInvestor/InvitePopup.vue';
import { mapState } from 'vuex';

export default {
  name: 'Navigation',
  components: {
    IconInvestor,
    IconBilling,
    IconExchanges,
    PopoverNavigation,
    InviteButton,
    InvitePopup,
  },
  data() {
    return {
      profile: {
        // eslint-disable-next-line
        avatar: require('@/assets/images/ava.jpg'),
        // eslint-disable-next-line
        logo: require('@/assets/images/iin-logo.png'),
      },
      popover: false,
      invitePopup: false,
    };
  },
  methods: {
    closePopover() {
      this.popover = false;
    },
    openInvitePopup() {
      this.invitePopup = true;
    },
    closeInvitePopup() {
      this.invitePopup = false;
    },
  },
  computed: {
    ...mapState('profile', {
      getName: state => state.profile.name,
      getAva: state => state.profile.ava,
      getlogo: state => state.profile.fundLogo,
    }),
    routeCustomers() {
      const { path } = this.$route;
      const re = /(customers)/g;
      return re.test(path);
    },
    routeExchanges() {
      const { path } = this.$route;
      const re = /(exchanges)/g;
      return re.test(path);
    },
    routeTransactions() {
      const { path } = this.$route;
      const re = /(transactions)/g;
      return re.test(path);
    },
  },
};
</script>
<style lang="scss">
.navigation {
  @include flex-col(space-between, stretch);
  display: none;
  @media screen and (min-width: $screen-tablet) {
    display: flex;
    background-color: $N15;
    height: 100vh;
    width: 220px;
    min-width: 220px;
    padding: 28px 22px 22px 20px;
  }
  @media screen and (min-width: $screen-desktop) {
    width: 240px;
  }
  &__logo-wrapper {
    width: 30px;
    height: 30px;
    margin-right: 12px;
    @media screen and (min-width: $screen-desktop) {
      margin-right: 18px;
    }
  }
  &__logo {
    width: 100%;
    height: auto;
  }
  &__header {
    width: 100%;
    @include flex-row(flex-start, center);
    margin-bottom: 44px;
  }
  &__header-inner {
    @include flex-row(flex-start, center);
  }
  &__title {
    font-size: $H100;
    font-weight: 500;
    @media screen and (min-width: $screen-desktop) {
      font-size: $H550;
      font-weight: 400;
    }
  }
  &__profile {
    @include flex-row(space-between, center);
    position: relative;
  }
  &__profile-card {
    @include flex-row(flex-start, center);
  }
  &__profile-button {
    color: $N9;
    padding-bottom: 4px;
    cursor: pointer;
  }
  &__profile-name {
    font-size: $H050;
    font-weight: 600;
    @media screen and (min-width: $screen-desktop) {
      font-size: $H200;
    }
  }
  &__list {
    list-style: none;
  }
  &__item {
    @include flex-row(flex-start, center);
    margin-bottom: 22px;
    cursor: pointer;
    &--active {
      .navigation {
        &__item-icon {
          fill: $N0;
        }
        &__item-text {
          color: $N0;
        }
      }
    }
    &:hover {
      .navigation {
        @media screen and (min-width: $screen-desktop) {
          &__item-icon {
          fill: $N0;
          }
          &__item-text {
            color: $N0;
          }
        }
      }
    }
  }
  &__item-icon {
    fill: $N6;
    width: 22px;
    height: 22px;
    margin-right: 10px;
    pointer-events: none;
    transition-property: color, fill, opacity;
    transition-duration: 0.2s;
    transition-timing-function: ease-in-out;
  }
  &__item-text {
    font-size: $H200;
    color: $N6;
    transition-property: color, fill, opacity;
    transition-duration: 0.2s;
    transition-timing-function: ease-in-out;
  }
  &__ava-wrapper {
    flex-shrink: 0;
    flex-grow: 0;
    width: 32px;
    height: 32px;
    overflow: hidden;
    border-radius: 50%;
    margin-right: 12px;
    @media screen and (min-width: $screen-desktop) {
      margin-right: 16px;
    }
  }
  &__ava {
    width: 100%;
    height: 100%;
  }
  &__popover-wrapper {
    position: relative;
    padding: 5px 0;
  }
  &__popover {
    position: absolute;
    bottom: 12px;
    right: -14px;
    z-index: 2;
  }
  &__invite-button {
    width: 100%;
    margin-bottom: 16px;
  }
}
</style>
