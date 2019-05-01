<template>
<section class='trading-card'>
  <header class="trading-card__header">
    <h2 class="trading-card__title">Holdings</h2>
  </header>
  <div class="trading-card__table-wrapper trading-card__table-wrapper--holdings">
    <table class='trading-card__table'>
      <thead>
        <tr>
          <th><span>Exchange</span></th>
          <th><span>Coin</span></th>
          <th><span>Amount</span></th>
          <th><span>Price USD</span></th>
          <th><span>Value USD</span></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(coin, index) in balances" :key='index'>
          <td><span>{{ coin.type }}</span></td>
          <td><span>{{ coin.asset }}</span></td>
          <td><span>{{ Number(coin.amount).toFixed(6) | numeral('0,0.[000000]') }}</span></td>
          <td><span>$ {{ coin.price_usd | numeral('0,0.[000000]') }}</span></td>
          <td><span>$ {{ Number(coin.total_in_usd).toFixed(6) | numeral('0,0.[000000]') }}</span></td>
        </tr>
      </tbody>
    </table>
  </div>
</section>
</template>
<script>
import '@/scss/components/trading-card.scss';
import { mapState, mapActions, mapGetters } from 'vuex';

export default {
  name: 'TradingHoldings',

  data() {
    return {
      total_btc: 0,
      total_usd: 0,
    };
  },
  computed: {
    ...mapState('trading', [
      'allBalances',
    ]),
    balances(){
      this.total_btc = this.allBalances.meta.total_btc;
      this.total_usd = this.allBalances.meta.total_usd;
      return this.allBalances.coins;
    },

  },
  methods: {
    ...mapActions('trading', [
      'downloadBalanceFromAllExchanges',
    ]),
  },
  beforeMount() {
    this.downloadBalanceFromAllExchanges();
  },

};
</script>