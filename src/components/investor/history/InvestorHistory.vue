<template>
<main class="investor-history">
  <h1 class='investor-history__title'>History</h1>
  <table class='investor-history__table'>
    <col span='5' class="investor-history__table-col">
    <thead>
      <tr>
        <th class='investor-history__cell'>
          <span>Date</span>
        </th>
        <th class='investor-history__cell'>
          <span>Operation type</span>
        </th>
        <th class='investor-history__cell investor-history__cell--largest'>
          <span>Address</span>
        </th>
        <th class='investor-history__cell'>
          <span>Amount $</span>
        </th>
        <th class='investor-history__cell'>
          <span>Amount</span>
        </th>
      </tr>
    </thead>
    <tbody>
      <tr v-for='(item, index) in history' :key='index'>
        <td class='investor-history__cell'>
          <span>{{ item.date }}</span>
        </td>
        <td class='investor-history__cell investor-history__cell--capitalize'>
          <span>{{ item.type }}</span>
        </td>
        <td class='investor-history__cell investor-history__cell--largest'>
          <span>{{ item.payoutAddress }}</span
        ></td>
        <td class='investor-history__cell'>
          <span>$ {{ item.balance_usd | numeral('0,0.[000000]') }}</span>
        </td>
        <td class='investor-history__cell'>
          <span>{{ item.balance | numeral('0,0.[000000]') }} {{ item.currency }}</span>
        </td>
      </tr>
    </tbody>
  </table>
  <div class="investor-history__mobile-box">
    <investor-history-mobile
    v-for='(item, index) in history'
    :key='`n${index}`'
    :history='item'/>
  </div>
</main>
</template>
<script>
import { mapGetters } from 'vuex';
import moment from 'moment-timezone';
import InvestorHistoryMobile from '@/components/investor/history/components/InvestorHistoryMobile.vue';
import { onDeposits, onPayouts } from '@/helpers/transactions';

export default {
  name: 'InvestorHistory',
  components: {
    InvestorHistoryMobile,
  },
  data() {
    return {
      deposits: [],
      payouts: [],
    };
  },
  methods: {
    showConsoleLog(msg) {
      if (this.$dev) console.log(msg);
    },
    getDeposits() {
      this.deposits = [ ...onDeposits ];
    },
    getPayouts() {
      this.payouts = [ ...onPayouts ];
    },
  },
  computed: {
    history() {
      let history = [ ...this.deposits, ...this.payouts ];
      const mask = 'DD/MM/YYYY HH:mm';
      history.sort((a, b) => {
        return moment(a.date, mask).unix() - moment(b.date, mask).unix();
      })
      return history;
    },
  },
  created() {
    this.getDeposits();
    this.getPayouts();
  },
};
</script>
<style lang="scss">
@import '~@/scss/components/investor';
@import '~@/scss/components/table';
.investor-history {
  @extend %investor-main;
  padding-top: 32px;
  &__title {
    @extend %investor-title;
    padding: 0 24px;
    margin-bottom: 24px;
    @media screen and (min-width: $screen-tablet) {
      padding: 0;
    }
  }
  &__mobile-box {
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
      tbody {
        max-height: 70vh;
      }
    }
  }
  &__cell {
    width: 15%;
    &--largest {
      width: 40%;
    }
    &--capitalize {
      text-transform: capitalize;
    }
  }
}
</style>
