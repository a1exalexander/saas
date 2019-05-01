<template>
<header class="investor-head">
  <div class="investor-head__row">
    <div class="investor-head__logo-wrapper">
      <icon-fund-platform class="investor-head__logo"/>
    </div>
    <div class="investor-head__col">
      <h1 class="investor-head__title">{{ profile.business_name }}</h1>
      <div class="investor-head__row tablet-flex">
        <p class="investor-head__text investor-head__text--balance">Balance:</p>
        <p class="investor-head__balance">{{ balance | numeral('0,0') }} $</p>
      </div>
    </div>
  </div>
  <investor-nav class='investor-head__nav'/>
  <div class="investor-head__row">
    <button-primary
      class='investor-head__button'
      @click.native="createFund">Create fund
    </button-primary>
    <router-link to='/investor/profile' class="investor-head__ava-wrapper">
      <img
        :src="profile.ava"
        alt="ava"
        class="investor-head__image"
        v-if='profile.ava'>
      <icon-ava
        class="default-ava"
        v-else/>
    </router-link>
    <router-link to='/investor/profile' class="investor-head__name"
      >{{ fullName }}
    </router-link>
    <div class="investor-head__row investor-head__row--relative">
      <icon-dots
        @mouseenter.native="popoverMenu = true"
        class='investor-head__dots-icon'/>
      <transition
        name="custom-classes-transition"
        enter-active-class="animated dur02 fadeIn"
        leave-active-class="animated dur02 fadeOut">
      <div
        class="investor-head__popover-wrapper"
        v-if='popoverMenu'
        @mouseenter.native="popoverMenu = true"
        @mouseleave="popoverMenu = false">
        <div class="investor-head__popover">
          <router-link
            to='/investor/profile'
            class="investor-head__popover-item"
            >Open Profile
          </router-link>
          <button
            @click.prevent="logout"
            class="investor-head__popover-item"
            >Log Out
          </button>
        </div>
      </div>
      </transition>
    </div>
  </div>
</header>
</template>
<script>
import { mapActions, mapState, mapGetters, mapMutations } from 'vuex';
import ButtonPrimary from '@/components/common/buttons/ButtonPrimary.vue';
import IconDots from '@/components/common/icons/IconDots.vue';
import IconFundPlatform from '@/components/common/icons/IconFundPlatform.vue';
import IconAva from '@/components/common/icons/IconAva.vue';
import InvestorNav from '@/components/investor/components/InvestorNav.vue';

export default {
  name: 'InvestorHead',
  components: {
    ButtonPrimary,
    IconDots,
    IconFundPlatform,
    IconAva,
    InvestorNav,
  },
  data() {
    return {
      popoverMenu: false,
    }
  },
  methods: {
    ...mapActions({
      getProfile: 'investorProfile/getProfile',
      AUTH_LOGOUT: 'investorLogin/AUTH_LOGOUT',
      getBalance: 'request/getBalance',
      getAddresses: 'request/getAddresses',
    }),
    logout() {
      if (this.survey) {
        this.surveyI = true;
        this.deleteSurvey();
      } else {
        this.AUTH_LOGOUT()
          .then(() => {
            this.$router.push({ name: 'investor-login' })
          });
      }
    },
    createFund() {
      this.AUTH_LOGOUT()
        .then(() => this.$router.push('auth/signup'));
    },
  },
  computed: {
    ...mapState('investorProfile', [
      'survey',
    ]),
    ...mapGetters({
      profile: 'investorProfile/profile',
      balance: 'request/balance',
      isAddresses: 'request/isAddresses',
    }),
    fullName() {
      return `${this.profile.name_first} ${this.profile.name_last}`;
    },
  },
  created() {
    this.getProfile();
    this.getBalance();
  },
};
</script>
<style lang="scss">
.investor-head {
  // white-space: nowrap;
  @include flex-row(space-between, center);
  display: none;
  // padding: 16px 24px;
  // border-bottom: 1px solid $N10;
  // background-color: $N12;
  @media screen and (min-width: $screen-tablet) {
    border-bottom: 1px solid $N10;
    display: flex;
    white-space: nowrap;
    position: sticky;
    background-color: $N12;
    top: 0;
    z-index: 4;
    width: 100%;
    padding: 20px 0 15px;
    // min-width: $screen-tablet;
  }
  &__nav {
    display: none;
    @media screen and (min-width: $screen-tablet) {
      display: flex;
      position: relative;
      bottom: -16px;
    }
  }
  &__row {
    @include flex-row(flex-start, center);
    flex: 0 0;
    &--relative {
      position: relative;
    }
  }
  &__col {
    @include flex-col(flex-start, flex-start);
    &--center {
      align-items: center;
    }
  }
  &__text {
    @include text($H100, 400, $N6);
    &--balance {
      font-size: $H200;
      margin-bottom: 6px;
      @media screen and (min-width: $screen-tablet) {
        margin: 0 8px 0 0;
      }
    }
  }
  &__logo-wrapper {
    height: 32px;
    flex: 0 0 32px;
    @include flex-row(center, center);
    margin-right: 17px;
    @media screen and (min-width: $screen-tablet) {
      flex-basis: 40px;
      height: 40px;
    }
  }
  &__title {
    @include text($H400, 500, $N0);
    @media screen and (min-width: $screen-tablet) {
      font-size: $H750;
      margin-bottom: 4px;
    }
  }
  &__logo {
    width: 90%;
    height: 100%;
    fill: $N0;
  }
  &__name {
    display: none;
    @media screen and (min-width: $screen-tablet) {
      display: inline-block;
      font-size: $H200;
      font-weight: 600;
      color: $N0;
      margin-right: 12px;
    }
  }
  &__ava-wrapper {
    @extend %image-wrapper;
    @media screen and (min-width: $screen-tablet) {
      margin-right: 16px;
      width: 32px;
      height: 32px;
    }
  }
  &__image {
    @extend %image;
  }
  &__balance-wrapper {
    margin-bottom: 26px;
    @media screen and (min-width: $screen-tablet) {
      display: none;
    }
  }
  &__balance {
    @include text($H800, 500, $N0);
    white-space: nowrap;
    @media screen and (min-width: $screen-tablet) {
      font-size: $H100;
      font-weight: 700;
      color: $N2;
    }
  }
  &__button {
    display: flex;
    margin-right: 24px;
    white-space: nowrap;
    padding: 8px 12px;
    @media screen and (min-width: $screen-tablet) {
      padding: 10px 20px;
    }
  }
  &__dots-icon {
    display: none;
    @media screen and (min-width: $screen-tablet) {
      display: block;
      height: 18px;
      width: 18px;
      fill: $N0;
    }
  }
  &__popover-wrapper {
    position: absolute;
    padding: 18px 12px 12px;
    z-index: 3;
    top: 0;
    right: -12px;
  }
  &__popover {
    @extend %inline-menu;
    border-color: $N10;
  }
  &__popover-item {
    @extend %inline-menu-text;
    font-size: $H400;
    font-weight: 500;
    margin-bottom: 16px;
    &:last-child {
      margin: 0;
    }
  }
}
</style>
