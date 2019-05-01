<template>
<main class="investor-dashboard">
  <message-info-absolute
    class='auth__message'
    v-if='message.info'
    @click.native='message.info = false'>
    {{ messageText }}
  </message-info-absolute>
  <transition
    name="custom-classes-transition"
    enter-active-class="animated dur03 fadeIn"
    leave-active-class="animated dur03 fadeOut"
    mode="out-in">
  <invest
    class='investor-dashboard__popup'
    v-if='invest'
    @close='invest = false'/>
  <request
    class='investor-dashboard__popup'
    v-else-if='request'
    @close='request = false'/>
  </transition>
  <div class="investor-dashboard__balance-wrapper">
    <p class="investor-dashboard__text investor-dashboard__text--balance">Balance:</p>
    <p class="investor-dashboard__balance">{{ balance | numeral('0,0') }} $</p>
  </div>
  <section class="investor-dashboard__card">
    <a
      href='#'
      class="investor-dashboard__card-wrapper"
      @click.prevent="toInvest">
    </a>
    <div class="investor-dashboard__icon-wrapper">
      <icon-invest class="investor-dashboard__icon"/>
    </div>
    <h2 class="investor-dashboard__caption">Invest in Fund</h2>
    <icon-long-arrow-right class="investor-dashboard__icon-arrow"/>
    <p class="investor-dashboard__card-text"
      >You got personal Bitcoin and Ethereum wallets
        after sign up. Money will be under fund's
        trust management. You can track your balance
        changing history in Profit / Loss chart
    </p>
    <button-primary
      class='investor-dashboard__button'
      @click.native="toInvest">Invest
    </button-primary>
  </section>
  <section class="investor-dashboard__card">
    <a
      href='#'
      class="investor-dashboard__card-wrapper"
      @click.prevent="request = true">
    </a>
    <div class="investor-dashboard__icon-wrapper">
      <icon-invest class="investor-dashboard__icon"/>
    </div>
    <h2 class="investor-dashboard__caption">Request your payout</h2>
    <icon-long-arrow-right class="investor-dashboard__icon-arrow"/>
    <p class="investor-dashboard__card-text"
      >You can withdraw a custom amount from
        your balance on your Bitcoin or Ethereum
        cold wallets. It can be as total balance withdraw
        or profit payout
    </p>
    <button-primary
      class='investor-dashboard__button'
      @click.native="request = true">Payout request
    </button-primary>
  </section>
  <survey-investor v-if='surveyI'/>
</main>
</template>
<script>
import IconInvest from '@/components/common/icons/IconInvest.vue';
import IconLongArrowRight from '@/components/common/icons/IconLongArrowRight.vue';
import ButtonPrimary from '@/components/common/buttons/ButtonPrimary.vue';
import Invest from '@/components/investor/dashboard/Invest.vue';
import Request from '@/components/investor/dashboard/Request.vue';
import SurveyInvestor from '@/components/common/SurveyInvestor.vue';
import MessageInfoAbsolute from '@/components/common/messages/MessageInfoAbsolute.vue';
import { mapActions, mapState, mapGetters, mapMutations } from 'vuex';

export default {
  name: 'InvestorDashboard',
  components: {
    IconInvest,
    IconLongArrowRight,
    ButtonPrimary,
    Invest,
    Request,
    MessageInfoAbsolute,
    SurveyInvestor,
  },
  data() {
    return {
      invest: false,
      request: false,
      popoverMenu: false,
      message: {
        info: false,
      },
      messageText: '',
      surveyI: false,
    };
  },
  methods: {
    ...mapMutations('investorProfile', [
      'deleteSurvey',
    ]),
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
          .then(() => this.$router.push('auth/investor'));
      }
    },
    createFund() {
      this.AUTH_LOGOUT()
        .then(() => this.$router.push('auth/signup'));
    },
    showError() {
      if (this.message.info) {
        this.message.info = false;
        setTimeout(() => {
          this.message.info = true;
        }, 15);
      } else {
        this.message.info = true;
      }
      setTimeout(() => {
        this.message.info = false;
      }, 6000);
    },
    toInvest() {
      this.getAddresses()
        .then(() => {
          this.invest = true;
        })
        .catch(() => {
          this.messageText = 'This fund currently does not accept investments';
          this.showError();
        });
    },
  },
  computed: {
    ...mapState('investorProfile', [
      'profile',
      'survey',
    ]),
    ...mapGetters('request', [
      'balance',
      'isAddresses',
    ]),
  },
  created() {
    this.getAddresses()
      .then()
      .catch((error) => {
          this.messageText = 'This fund currently does not accept investments';
        });
  },
};
</script>
<style lang="scss">
@import '~@/scss/components/investor';
.investor-dashboard {
  @extend %investor-main;
  padding: 24px 24px 0;
    @media screen and (min-width: $screen-tablet) {
      min-width: 600px;
      max-width: 700px;
      padding: 48px 0 0;
    }
  &__row {
    @include flex-row(flex-start, center);
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
  &__title {
    @include text($H400, 500, $N0);
    @media screen and (min-width: $screen-tablet) {
      font-size: $H750;
      margin-bottom: 4px;
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
  &__card-text {
    padding-top: 18px;
    @include text($H100, 400, $N6);
    line-height: 1.5;
    @media screen and (min-width: $screen-tablet) {
      padding: 0;
      grid-area: text;
      font-size: $H300;
    }
  }
  &__image {
    @extend %image;
  }
  &__caption {
    @extend %investor-caption;
    flex: 1 1 calc(100% - 58px);
    @media screen and (min-width: $screen-tablet) {
      grid-area: title;
      flex-basis: auto;
    }
  }
  &__icon {
    width: 32px;
    height: 32px;
    fill: $N0;
    @media screen and (min-width: $screen-tablet) {
      width: 70px;
      height: 70px;
    }
  }
  &__icon-arrow {
    flex-shrink: 0;
    width: 18px;
    height: 18px;
    fill: $N0;
    @media screen and (min-width: $screen-tablet) {
      display: none;
    }
  }
  &__balance-wrapper {
    margin-bottom: 26px;
    @media screen and (min-width: $screen-tablet) {
      display: none;
    }
  }
  &__balance {
    @include text($H800, 500, $N0);
    @media screen and (min-width: $screen-tablet) {
      font-size: $H100;
      font-weight: 700;
      color: $N2;
    }
  }
  &__card {
    background-color: $N13;
    border-radius: 4px;
    margin-bottom: 26px;
    padding: 28px 24px 20px;
    position: relative;
    @include flex-row(space-between, center);
    flex-wrap: wrap;
    transition: background-color ease-in-out 0.2s;
    &:active {
      background-color: $N12;
    }
    @media screen and (min-width: $screen-tablet) {
      background-color: $N111;
      margin-bottom: 34px;
      display: grid;
      border: 0.5px solid $N9;
      border-radius: 3px;
      grid-template-columns: 164px auto;
      grid-template-rows: repeat(3, auto);
      justify-content: stretch;
      justify-items: start;
      align-items: start;
      grid-row-gap: 18px;
      grid-template-areas:
      'icon title'
      'icon text'
      'icon button';
      padding: 34px;
      padding-left: 0;
      &:active {
        background-color: $N111;
      }
    }
    &:last-of-type {
      margin: 0;
    }
  }
  &__card-wrapper {
    position: absolute;
    top: 0;
    right: 0;
    left: 0;
    bottom: 0;
    z-index: 2;
    background-color: transparent;
    @media screen and (min-width: $screen-tablet) {
      display: none;
    }
  }
  &__icon-wrapper {
    margin-right: 8px;
    flex: 0 0 32px;
    @media screen and (min-width: $screen-tablet) {
      flex-basis: auto;
      width: 100%;
      display: flex;
      justify-content: center;
      padding-top: 10px;
      margin: 0;
      grid-area: icon;
    }
  }
  &__button {
    display: none;
    @media screen and (min-width: $screen-tablet) {
      display: flex;
      grid-area: button;
      min-width: 126px;
    }
  }
}
</style>
