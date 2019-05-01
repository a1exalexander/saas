<template>
<div class="signup" @click='closeDropMenus'>
  <aside class="signup__aside">
    <icon-logo2 class="signup__logo"/>
    <h1 class="signup__title">{{ $t('auth.titles.aside') }}
    </h1>
  </aside>
  <main class="signup__main">
    <header class="signup-step">
      <div class="signup-step__mobile-header">
        <icon-logo class="signup-step__horizontal-logo"/>
        <router-link @click.stop.prevent to='/auth' class="signup-step__close-button">
          <icon-close class="signup-step__close-image"/>
        </router-link>
      </div>
      <ul class="signup-step__list">
        <li
          class="signup-step__item"
          :class='{"active-step": activePersonalInfoStep}'
          @click="changeRouterStatus('personalInfo')">
          <div class="signup-step__image-wrapper">
            <icon-investor
              class='signup-step__image'
              v-if='!readyPersonalInfoStep || activePersonalInfoStep'/>
            <icon-check2
              class='signup-step__image signup-step__image--check'
              v-else/>
          </div>
          <p
            class="signup-step__text"
            :class='{"signup-step__text--checked": readyPersonalInfoStep}'
            >{{ $t('auth.steps.info') }}
          </p>
          <div class="signup-step__bar">
            <div
              class="signup-step__bar-element signup-step__bar-element--check">
            </div>
            <div
              class="signup-step__bar-element"
              :class='{"signup-step__bar-element--check": nameStatus}'>
            </div>
            <div
              class="signup-step__bar-element"
              :class='{"signup-step__bar-element--check": nameStatus && emailStatus}'>
            </div>
            <div
              class="signup-step__bar-element"
              :class='{"signup-step__bar-element--check":
                nameStatus && emailStatus && getGender}'>
            </div>
          </div>
        </li>
        <li
          class="signup-step__item"
          :class='{"active-step": activeFundStep}'
          @click="changeRouterStatus('fund')">
          <div class="signup-step__image-wrapper">
            <icon-fund
              class='signup-step__image'
              v-if='!readyFundStep || activeFundStep'/>
            <icon-check2
              class='signup-step__image signup-step__image--check'
              v-else/>
          </div>
          <p
            class="signup-step__text"
            :class='{"signup-step__text--checked": readyFundStep}'
            >{{ $t('auth.steps.fund') }}
          </p>
          <div class="signup-step__bar">
            <div
              class="signup-step__bar-element"
              :class='{"signup-step__bar-element--check": fundNameStatus}'>
            </div>
            <div
              class="signup-step__bar-element"
              :class='{"signup-step__bar-element--check": fundNameStatus && countryStatus}'>
            </div>
            <div
              class="signup-step__bar-element"
              :class='{"signup-step__bar-element--check":
                fundNameStatus && countryStatus}'>
            </div>
          </div>
        </li>
        <li
          class="signup-step__item"
          :class='{"active-step": activePasswordStep}'
          @click="changeRouterStatus('password')">
          <div class="signup-step__image-wrapper">
            <icon-lock
              class='signup-step__image'
              v-if='!readyPasswordStep || activePasswordStep'/>
            <icon-check2
              class='signup-step__image signup-step__image--check'
              v-else/>
          </div>
          <p
            class="signup-step__text"
            :class='{"signup-step__text--checked": readyPasswordStep}'
            >{{ $t('auth.steps.password') }}
          </p>
          <div class="signup-step__bar">
            <div
              class="signup-step__bar-element"
              :class='{"signup-step__bar-element--check": passwordStatus}'>
            </div>
            <div
              class="signup-step__bar-element"
              :class='{"signup-step__bar-element--check":
                passwordStatus && passwordAgreeStatus}'>
              </div>
          </div>
        </li>
        <li
          class="signup-step__item"
          :class='{"active-step": activeEmailStep}'
          @click="changeRouterStatus('email')">
          <div class="signup-step__image-wrapper">
            <icon-mail
              class='signup-step__image'/>
          </div>
          <p
            class="signup-step__text"
            :class='{"signup-step__text--checked": activeEmailStep}'
            >{{ $t('auth.steps.email') }}
          </p>
          <div class="signup-step__bar">
            <div
              class="signup-step__bar-element"
              :class='{"signup-step__bar-element--check": activeEmailStep}'>
            </div>
          </div>
        </li>
      </ul>
    </header>
    <personal-info-step
      class='signup__form-field'
      v-if='activePersonalInfoStep'
      key='personalInfo'/>
    <fund-step
      class='signup__form-field'
      v-else-if='activeFundStep'
      key='fund'/>
    <password-step
      class='signup__form-field'
      v-else-if='activePasswordStep'
      key='password'/>
    <email-step
      class='signup__form-field'
      v-else-if='activeEmailStep'
      key='email'/>
  </main>
</div>
</template>
<script>
import PersonalInfoStep from '@/components/auth/signup/personal-info/PersonalInfoStep.vue';
import FundStep from '@/components/auth/signup/fund/FundStep.vue';
import PasswordStep from '@/components/auth/signup/password/PasswordStep.vue';
import EmailStep from '@/components/auth/signup/email/EmailStep.vue';
import IconInvestor from '@/components/common/icons/IconInvestor.vue';
import IconFund from '@/components/common/icons/IconFund.vue';
import IconLock from '@/components/common/icons/IconLock.vue';
import IconMail from '@/components/common/icons/IconMail.vue';
import IconLogo from '@/components/common/icons/IconLogo.vue';
import IconLogo2 from '@/components/common/icons/IconLogo2.vue';
import IconClose from '@/components/common/icons/IconClose.vue';
import IconCheck2 from '@/components/common/icons/IconCheck2.vue';
import Validation from '@/js/validation';
import {
  mapGetters,
  mapState,
  mapMutations,
  mapActions,
} from 'vuex';

export default {
  name: 'SignUp',
  components: {
    PersonalInfoStep,
    FundStep,
    PasswordStep,
    EmailStep,
    IconInvestor,
    IconFund,
    IconLock,
    IconMail,
    IconLogo2,
    IconCheck2,
    IconLogo,
    IconClose,
  },
  computed: {
    ...mapGetters('signup', [
      'readyPersonalInfoStep',
      'readyFundStep',
      'readyPasswordStep',
      'activePersonalInfoStep',
      'activeFundStep',
      'activePasswordStep',
      'activeEmailStep',
      'allReady',
    ]),
    ...mapState('signup', {
      getName: state => state.personalInfo.name_first,
      getEmail: state => state.personalInfo.email,
      getGender: state => state.personalInfo.gender,
      getFundName: state => state.fund.name,
      getCountry: state => state.fund.country,
      getPassword: state => state.password.value,
      getAgreePassword: state => state.password.agree,
    }),
    nameStatus() {
      return Validation.name(this.getName);
    },
    emailStatus() {
      return Validation.email(this.getEmail);
    },
    fundNameStatus() {
      return !!this.getFundName;
    },
    countryStatus() {
      return !!this.getFundName && !!this.getCountry;
    },
    passwordStatus() {
      return Validation.password(this.getPassword);
    },
    passwordAgreeStatus() {
      return this.getAgreePassword;
    },
  },
  methods: {
    ...mapMutations('signup', [
      'closeDropMenus',
      'setRouterStatus',
      'cleanData',
    ]),
    ...mapActions('signup', [
      'changeRouterStatus',
    ]),
  },
  created() {
    this.cleanData();
  },
};
</script>
<style lang="scss">
.signup {
  @include flex-row(flex-start, stretch);
  min-height: 100vh;
  flex: 1 1;
  &__aside {
    display: none;
    @media screen and (min-width: $screen-tablet) {
      display: block;
      flex: 1 1 20%;
      min-width: 200px;
      background-color: $N14;
      padding: 96px 4%;
    }
    @media screen and (min-width: $screen-tablet-large) {
      display: block;
      flex: 1 1 22%;
      min-width: 240px;
      background-color: $N14;
      padding: 96px 4%;
    }
    @media screen and (min-width: $screen-desktop) {
      display: block;
      flex: 1 1 27.5%;
      min-width: 300px;
      background-color: $N14;
      padding: 96px 6%;
    }
  }
  &__logo {
    fill: $N0;
    margin-bottom: 100px;
  }
  &__title {
    font-weight: 400;
    line-height: 1.3;
    @media screen and (min-width: $screen-tablet) {
      font-size: $H800;
    }
    @media screen and (min-width: $screen-desktop) {
      font-size: $H900;
    }
  }
  &__main {
    background-color: $N13;
    padding: 28px 28px 100px;
    flex: 100%;
    @media screen and (min-width: $screen-tablet) {
      flex: 1 1 80%;
      padding: 96px 4%;
    }
    @media screen and (min-width: $screen-tablet-large) {
      flex: 1 1 78%;
      padding: 96px 6%;
    }
    @media screen and (min-width: $screen-desktop) {
      flex: 1 1 72.5%;
      padding: 96px 8.8%;
    }
  }
}

.signup-step {
  @media screen and (min-width: $screen-tablet) {
    margin-bottom: 46px;
    min-height: 100px;
  }
  &__bar {
    @include flex-row(flex-start, flex-start);
    @media screen and (min-width: $screen-tablet) {
      display: none;
    }
  }
  &__bar-element {
    width: 12px;
    height: 3px;
    background-color: $N9;
    margin-right: 4px;
    transition: background-color ease-in-out 0.2s;
    @media screen and (min-width: $screen-iphone-6) {
      width: 16px;
    }
    @media screen and (min-width: $screen-iphone-plus) {
      width: 18px;
    }
    @media screen and (min-width: $screen-tablet-small) {
      width: 24px;
    }
    &--check {
      background-color: $B4;
    }
  }
  &__list {
    list-style: none;
    margin-bottom: 32px;
    @include flex-row(space-between, flex-start);
    @media screen and (min-width: $screen-tablet) {
      justify-content: flex-start;
      margin-bottom: 0;
    }
  }
  &__mobile-header {
    flex: 100%;
    @include flex-row(space-between, center);
    margin-bottom: 24px;
    @media screen and (min-width: $screen-tablet) {
      display: none;
    }
  }
  &__horizontal-logo {
    width: 110px;
    height: 40px;
  }
  &__close-button {
    padding: 6px;
    position: relative;
    left: 6px;
  }
  &__close-image {
    width: 20px;
    height: 20px;
    fill: $N6;
    pointer-events: none;
  }
  &__item {
    cursor: pointer;
    @media screen and (min-width: $screen-tablet) {
      margin-right: 14px;
      flex: 1 0 130px;
      margin-right: 0;
      padding-right: 40px;
    }
  }
  &__image-wrapper {
    display: none;
    @media screen and (min-width: $screen-tablet) {
      display: flex;
      border-radius: 50%;
      background-color: $N10;
      width: 40px;
      height: 40px;
      margin-bottom: 8px;
      justify-content: center;
      align-items: center;
      transition-property: box-shadow, background-color;
      transition-duration: 0.2s;
      transition-timing-function: ease-in-out;
    }
  }
  &__image {
    width: 20px;
    height: 20px;
    fill: $N8;
    transition-property: fill;
    transition-duration: 0.2s;
    transition-timing-function: ease-in-out;
    &--check {
      fill: $N0;
    }
  }
  &__text {
    white-space: nowrap;
    color: $N8;
    font-size: $H200;
    line-height: 1.4;
    transition-property: color, font-weight;
    transition-duration: 0.2s;
    transition-timing-function: ease-in-out;
    margin-bottom: 9px;
    @media screen and (min-width: $screen-iphone-6) {
      font-size: $H300;
    }
    @media screen and (min-width: $screen-iphone-plus) {
      font-size: $H400;
    }
    @media screen and (min-width: $screen-tablet-small) {
      font-size: $H600;
    }
    @media screen and (min-width: $screen-tablet) {
      font-size: $H400;
      color: $N9;
      margin-bottom: 0;
    }
    &--checked {
      color: $N0;
      @media screen and (min-width: $screen-tablet) {
        color: $N9;
      }
    }
  }
  &__mobile-nav {
    @media screen and (min-width: $screen-tablet) {
      display: none;
    }
  }
  &__mobile-list {
    @include flex-row(space-between, flex-start);
  }
}

.active-step {
  .signup-step {
    &__image {
      @media screen and (min-width: $screen-tablet) {
        fill: $B4;
      }
    }
    &__image-wrapper {
      @media screen and (min-width: $screen-tablet) {
        box-shadow: 0 8px 10px 0 rgba(37,80,217,0.24);
        background-color: $N0;
      }
    }
    &__text {
      color: $N0;
      @media screen and (min-width: $screen-tablet) {
        font-size: $H600;
        font-weight: 500;
      }
      @media screen and (min-width: $screen-tablet-large) {
        font-size: $H800;
        font-weight: 500;
      }
    }
  }
}
</style>
