<template>
<nav class='nav'>
  <transition
    name="custom-classes-transition"
    enter-active-class="animated dur03 fadeIn"
    leave-active-class="animated dur03 fadeOut"
    mode="out-in">
  <invite-popup v-if='invitePopup' @cancel='closeInvitePopup'/>
  </transition>
  <transition
    name="custom-classes-transition"
    enter-active-class="animated dur03 slideInLeft"
    leave-active-class="animated dur02 slideOutLeft"
    mode="out-in">
  <section class="nav__menu" v-if='visible'>
    <div class="nav__inner">
      <section class="nav__header">
        <div class="nav__header-inner">
          <div class="nav__logo-wrapper">
            <img class="nav__logo" :src="getlogo" alt="logo">
          </div>
          <p class="nav__title">Initial Index Fund</p>
        </div>
      </section>
      <ul @click='hideNavDelay' class="nav__list">
        <router-link
          to='/customers'
          tag='li'
          class="nav__item"
          :class='{"nav__item--active": routeCustomers }'>
          <icon-investor class='nav__item-icon'/>
          <p class="nav__item-text">Customers</p>
        </router-link>
        <router-link
          to='/exchanges'
          tag='li'
          class="nav__item"
          :class='{"nav__item--active": routeExchanges }'>
          <icon-exchanges class='nav__item-icon'/>
          <p class="nav__item-text">Exchanges</p>
        </router-link>
        <router-link
          to='/transactions'
          tag='li'
          class="nav__item"
          :class='{"nav__item--active": routeTransactions }'>
          <icon-billing class='nav__item-icon'/>
          <p class="nav__item-text">Transactions</p>
        </router-link>
        <router-link
          to='/legal'
          tag='li'
          class="nav__item"
          :class='{"nav__item--active": routeLegal }'>
          <icon-legal class='nav__item-icon'/>
          <p class="nav__item-text">Legal</p>
        </router-link>
      </ul>
    </div>
    <div class="nav__inner">
      <invite-button
        @click.native='openInvitePopup'
        class='nav__invite-button'/>
      <section class="nav__profile">
        <div class="nav__profile-card">
          <div class="nav__ava-wrapper">
            <img class="nav__ava" :src="getAva" alt="avatar">
          </div>
          <p class="nav__profile-name">{{ getName }}</p>
        </div>
        <button class='nav__profile-button' v-html='"\&\#8226\&\#8226\&\#8226"'></button>
      </section>
    </div>
  </section>
  </transition>
  <div
    class="nav__bg-inner animated slow fadeIn"
    @click='hideNav'
    v-if='visible'>
    <close-button
      class="nav__close-button"
      @click.native='hideNav'/>
  </div>
</nav>
</template>
<script>
import CloseButton from '@/components/common/buttons/CloseButton.vue';
import IconInvestor from '@/components/common/icons/IconInvestor.vue';
import IconBilling from '@/components/common/icons/IconBilling.vue';
import IconLegal from '@/components/common/icons/IconLegal.vue';
import IconExchanges from '@/components/common/icons/IconExchanges.vue';
import InviteButton from '@/components/inviteInvestor/InviteButton.vue';
import InvitePopup from '@/components/inviteInvestor/InvitePopup.vue';
import { mapState } from 'vuex';

export default {
  name: 'NavigationMobile',
  components: {
    CloseButton,
    IconInvestor,
    IconBilling,
    IconLegal,
    IconExchanges,
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
      visible: false,
      invitePopup: false,
    };
  },
  methods: {
    hideNav() {
      this.visible = false;
      this.$emit('hideNav');
    },
    hideNavDelay() {
      setTimeout(() => {
        this.hideNav();
      }, 100);
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
    routeLegal() {
      const { path } = this.$route;
      const re = /(legal)/g;
      return re.test(path);
    },
  },
  mounted() {
    this.visible = true;
  },
};
</script>
<style lang="scss">
.nav {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  height: 100vh;
  width: 100vw;
  z-index: 11;
  background-color: transparent;
  @include flex-row(stretch, stretch);
  @media screen and (min-width: $screen-tablet) {
    display: none;
  }
  &__bg-inner {
    flex: 1 1;
    background-color: $NAV-BG-WRAPPER-COLOR;
    @include flex-col(flex-start, flex-end);
    padding: 24px;
  }
  &__logo-wrapper {
    width: 30px;
    height: 30px;
    margin-right: 20px;
  }
  &__logo {
    width: 100%;
    height: auto;
  }
  &__menu {
    flex: 0 0 280px;
    height: 100%;
    background-color: $N13;
    padding: 32px 28px 68px;
    @include flex-col(space-between, stretch);
  }
  &__header {
    width: 100%;
    @include flex-row(flex-start, center);
    margin-bottom: 54px;
  }
  &__header-inner {
    @include flex-row(flex-start, center);
  }
  &__title {
    font-size: $H550;
  }
  &__profile {
    @include flex-row(space-between, center);
  }
  &__profile-card {
    @include flex-row(flex-start, center);
  }
  &__profile-button {
    color: $N9;
    padding-bottom: 4px;
  }
  &__profile-name {
    font-size: $H500;
    font-weight: 500;
  }
  &__list {
    list-style: none;
  }
  &__item {
    @include flex-row(flex-start, center);
    margin-bottom: 26px;
    cursor: pointer;
    &--active {
      .nav {
        &__item-icon {
          fill: $N0;
        }
        &__item-text {
          color: $N0;
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
    font-size: $H500;
    color: $N6;
    transition-property: color, fill, opacity;
    transition-duration: 0.2s;
    transition-timing-function: ease-in-out;
  }
  &__ava-wrapper {
    width: 32px;
    height: 32px;
    overflow: hidden;
    border-radius: 50%;
    margin-right: 16px;
  }
  &__ava {
    width: 100%;
    height: 100%;
  }
  &__invite-button {
    width: 100%;
    margin-bottom: 20px;
  }
}
</style>
