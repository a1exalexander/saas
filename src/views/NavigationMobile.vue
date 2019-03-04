<template>
<nav class='nav'>
  <section class="nav__menu">
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
        <router-link to='/customers' tag='li' class="nav__item">
          <icon-investor class='nav__item-icon'/>
          <p class="nav__item-text">Customers</p>
        </router-link>
        <router-link to='/exchanges' tag='li' class="nav__item">
          <icon-exchanges class='nav__item-icon'/>
          <p class="nav__item-text">Exchanges</p>
        </router-link>
        <router-link to='/transactions' tag='li' class="nav__item">
          <icon-billing class='nav__item-icon'/>
          <p class="nav__item-text">Transactions</p>
        </router-link>
        <router-link to='/legal' tag='li' class="nav__item">
          <icon-legal class='nav__item-icon'/>
          <p class="nav__item-text">Legal</p>
        </router-link>
      </ul>
    </div>
    <section class="nav__profile">
      <div class="nav__profile-card">
        <div class="nav__ava-wrapper">
          <img class="nav__ava" :src="getAva" alt="avatar">
        </div>
        <p class="nav__profile-name">{{ getName }}</p>
      </div>
      <button class='nav__profile-button' v-html='"\&\#8226\&\#8226\&\#8226"'></button>
    </section>
  </section>
  <div
    class="nav__bg-inner"
    @click='hideNav'>
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
import { mapState } from 'vuex';

export default {
  name: 'NavigationMobile',
  components: {
    CloseButton,
    IconInvestor,
    IconBilling,
    IconLegal,
    IconExchanges,
  },
  data() {
    return {
      profile: {
        // eslint-disable-next-line
        avatar: require('@/assets/images/ava.jpg'),
        // eslint-disable-next-line
        logo: require('@/assets/images/iin-logo.png'),
      },
    };
  },
  methods: {
    hideNav() {
      this.$emit('hideNav');
    },
    hideNavDelay() {
      setTimeout(() => {
        this.hideNav();
      }, 100);
    },
  },
  computed: {
    ...mapState('profile', {
      getName: state => state.profile.name,
      getAva: state => state.profile.ava,
      getlogo: state => state.profile.fundLogo,
    }),
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
  background-color: $NAV-BG-WRAPPER-COLOR;
  @include flex-row(stretch, stretch);
  @media screen and (min-width: $screen-tablet) {
    display: none;
  }
  &__bg-inner {
    flex: 0 0 80px;
    background-color: $NAV-BG-WRAPPER-COLOR;
    @include flex-col(flex-start, center);
    padding: 16px 0;
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
    width: 100%;
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
  }
  &__item-icon {
    fill: $N6;
    width: 22px;
    height: 22px;
    margin-right: 10px;
    pointer-events: none;
  }
  &__item-text {
    font-size: $H500;
    color: $N6;
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
}
</style>
