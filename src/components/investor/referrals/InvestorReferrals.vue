<template>
<main class="investor-referrals">
   <transition
      name="custom-classes-transition"
      enter-active-class="animated dur02 fadeIn"
      leave-active-class="animated dur02 fadeOut"
      appear
      mode="out-in"
    >
  <invite-referrals
    @close='referralPopup = false'
    v-if='referralPopup'
    key='referral'/>
  <referral-request
    @close='referralWithdraw = false'
    v-if='referralWithdraw'
    key='withdraw'/>
  </transition>
  <div class="investor-referrals__balance">
    <h2 class="investor-referrals__subtitle investor-referrals__subtitle--mobile">Your referrals</h2>
    <span class="investor-referrals__balance-label">Total bonuses earned:</span>
    <span class="investor-referrals__balance-value">$ 2 210,00</span>
  </div>
  <header class="investor-referrals__header">
    <h1 class='investor-referrals__title'>Referral program</h1>
    <div class="investor-referrals__col investor-referrals__col--end">
      <div class="investor-referrals__balance-desktop">
        <span class="investor-referrals__balance-label">Total bonuses earned:</span>
        <span class="investor-referrals__balance-value">$ 2 210,00</span>
      </div>
      <subtle-icon
        @click.native='referralWithdraw = true'>
        <icon-wallet class='icon-button-left'/>
        <span>Withdraw money</span>
      </subtle-icon>
    </div>
  </header>
  <div class="investor-referrals__row">
    <h2 class="investor-referrals__subtitle">Your referrals</h2>
    <subtle-icon
      class="investor-referrals__add-button-mobile"
      @click.native='referralWithdraw = true'>
      <icon-wallet class='icon-button-left'/>
      <span>Withdraw</span>
    </subtle-icon>
    <subtle-icon
      class="investor-referrals__add-button-mobile"
      @click.native='referralPopup = true'>
      <icon-plus class='icon-button-left'/>
      <span>Invite referrals</span>
    </subtle-icon>
    <button-primary-icon
      class="investor-referrals__add-button"
      v-if='referrals.length'
      @click.native='referralPopup = true'>
      <icon-add-person class="icon-button-left"/>
      <span>Invite referrals</span>
    </button-primary-icon>
  </div>
  <table class='investor-referrals__table'>
    <col span='5' class="investor-referrals__table-col">
    <thead>
      <tr>
        <th class='investor-referrals__cell investor-referrals__cell--large'>
          <span>Full name</span>
        </th>
        <th class='investor-referrals__cell investor-referrals__cell--large'>
          <span>Email</span>
        </th>
        <th class='investor-referrals__cell investor-referrals__cell--small'>
          <span>Signed Up Date</span>
        </th>
        <th class='investor-referrals__cell'>
          <span>Invested Amount</span>
        </th>
        <th class='investor-referrals__cell investor-referrals__cell--small'>
          <span>Reached bonuses</span>
        </th>
      </tr>
    </thead>
    <tbody v-if='referrals.length'>
      <tr v-for='(item, index) in referrals' :key='index'>
        <td class='investor-referrals__cell investor-referrals__cell--large 
        investor-history__cell--capitalize'>
        <div class="investor-referrals__name-wrapper">
          <div class="investor-referrals__img-wrapper">
            <img
              :src="item.ava"
              alt="ava"
              class="investor-head__image"
              v-if='item.ava'>
            <icon-ava
              class="default-ava"
              v-else/>
          </div>
          <span>{{ item.name }}</span>
            </div>
        </td>
        <td class='investor-referrals__cell investor-referrals__cell--large'>
          <span>{{ item.email }}</span>
        </td>
        <td class='investor-referrals__cell investor-referrals__cell--small'>
          <span>{{ item.date }}</span
        ></td>
        <td class='investor-referrals__cell'>
          <span>$ {{ item.invest | numeral('0,0.[000000]') }}</span>
        </td>
        <td class='investor-referrals__cell investor-referrals__cell--small'>
          <span>{{ item.bonuses | numeral('0,0.[000000]') }} {{ item.currency }}</span>
        </td>
      </tr>
    </tbody>
  </table>
  <div class="investor-referrals__mobile-list">
    <investor-referral-mobile
      :referral='referral'
      v-for='(referral, index) in referrals'
      :key='`n${index}`'/>
  </div>
  <investor-no-referrals
    @invite='referralPopup = true'
    v-if='!referrals.length'/>
</main>
</template>
<script>
import { mapGetters } from 'vuex';
import moment from 'moment-timezone';
import IconAddPerson from '@/components/common/icons/IconAddPerson.vue';
import IconWallet from '@/components/common/icons/IconWallet.vue';
import IconAva from '@/components/common/icons/IconAva.vue';
import IconPlus from '@/components/common/icons/IconPlus.vue';
import InvestorNoReferrals from '@/components/investor/referrals/components/InvestorNoReferrals.vue';
import InviteReferrals from '@/components/investor/referrals/InviteReferrals.vue';
import InvestorReferralMobile from '@/components/investor/referrals/components/InvestorReferralMobile.vue';
import ReferralRequest from '@/components/investor/referrals/components/ReferralRequest.vue';
import { onReferrals } from '@/helpers/referrals';

export default {
  name: 'InvestorReferrals',
  components: {
    IconAddPerson,
    IconAva,
    IconWallet,
    InvestorNoReferrals,
    InviteReferrals,
    IconPlus,
    InvestorReferralMobile,
    ReferralRequest,
  },
  data() {
    return {
      referralPopup: false,
      referralWithdraw: false,
      referrals: [],
    };
  },
  methods: {
    showConsoleLog(msg) {
      if (this.$dev) console.log(msg);
    },
  },
  created() {
    this.referrals = [ ...onReferrals ];
  },
};
</script>
<style lang="scss">
@import '~@/scss/components/investor';
@import '~@/scss/components/table';
.investor-referrals {
  @extend %investor-main;
  padding-top: 32px;
  @include flex-col(flex-start, flex-start);
  width: 100%;
  &__balance {
    margin-bottom: 25px;
    padding: 0 24px;
    @media screen and (min-width: $screen-tablet) {
      display: none;
      padding: 0;
      width: auto;
     }
    }
  &__balance-label {
    display: block;
    @include text($H200, 400, $N6);
    margin-bottom: 10px;
    @media screen and (min-width: $screen-tablet) {
      color: $N0;
      font-size: $H600;
      font-weight: 500;
      margin: 0 8px 0 0;
    }
  }
  &__balance-value {
    @include text($H800, 400, $G2);
    @media screen and (min-width: $screen-tablet) {
      font-weight: 500;
      color: $G1;
    }
  }
  &__title {
    display: none;
    @media screen and (min-width: $screen-tablet) {
      display: inline-block;
    }
    @extend %investor-title;
  }
  &__header {
    display: none;
    @media screen and (min-width: $screen-tablet) {
      display: flex;
      flex-direction: row;
      width: 100%;
      justify-content: space-between;
      align-items: baseline;
      margin-bottom: 32px;
    }
  }
  &__col {
    @include flex-col(flex-start, stretch);
    &--end {
      align-items: flex-end;
    }
  }
  &__subtitle {
    @include text($H800, 500);
    display: none;
    @media screen and (min-width: $screen-tablet) {
      display: inline-block;
    }
    &--mobile {
      margin-bottom: 18px;
      display: inline-block;
    }
  }
  &__balance-desktop {
    @include flex-row(flex-start, baseline);
    margin-bottom: 8px;
  }
  &__row {
    display: flex;
    justify-content: space-between;
    margin-bottom: 10px;
    width: 100%;
    padding: 0 24px;
    @media screen and (min-width: $screen-tablet) {
     margin-bottom: 25px;
     padding: 0;
   }
  }
  &__mobile-list {
    width: 100%;
    @media screen and (min-width: $screen-tablet) {
      display: none;
    }
  }
  &__table {
    @extend %saas-table;
    display: none;
    @media screen and (min-width: $screen-tablet) {
      display: table;
    }
    tbody {
      max-height: 55vh;
    }
  }
  &__cell {
    width: 15%;
    &--large {
      width: 25%;
    }
    &--small {
      width: 10%;
    }
    &--capitalize {
      text-transform: capitalize;
    }
  }
  &__name-wrapper {
    @include flex-row(flex-start, center);
  }
  &__img-wrapper {
    @extend %image-wrapper;
    width: 40px;
    height: 40px;
    margin-right: 20px;
  }
  &__add-button {
    display: none;
    @media screen and (min-width: $screen-tablet) {
      display: flex;
    }
  }
  &__add-button-mobile {
    display: flex;
    @media screen and (min-width: $screen-tablet) {
      display: none;
    }
  }
}
</style>
