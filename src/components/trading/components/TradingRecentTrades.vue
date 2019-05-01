<template>
<section class='trading-card'>
  <header class="trading-card__header">
    <h2 class="trading-card__title">Recent trades</h2>
  </header>
  <div class="trading-card__table-wrapper">
    <table class='trading-card__table'>
      <thead>
        <tr>
          <th><span>Time</span></th>
          <th><span>Echange</span></th>
          <th><span>Type</span></th>
          <th><span>Currency</span></th>
          <th><span>Price</span></th>
          <th><span>Amount</span></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(record, index) in allTradeHistory" :key='index'>
          <td><span>{{ record.date }}</span></td>
          <td><span>{{ record.exchange }}</span></td>
          <td><span>{{ record.type }}</span></td>
          <td><span>{{ record.pair }}</span></td>
          <td><span>{{ record.price | numeral('0,0.[000000]') }}</span></td>
          <td><span>{{ record.amount | numeral('0,0.[000000]') }}</span></td>
        </tr>

          <!--[
            data.data[ 0 ] => 
            {
              "exchange": "Binance",
              "orderId": "27139089",
              "pair": "ETH/BTC",
              "type": "sell",
              "amount": 0.009,
              "price": 0.000945324,
              "date": 1517179594723,
              "status": "n/a",
              "profit": "n/a"
            },
          ]-->

      </tbody>
    </table>
  </div>
</section>
</template>
<script>
import '@/scss/components/trading-card.scss';
import { mapState, mapActions, mapGetters } from 'vuex';
import moment from 'moment-timezone';

export default {
  name: 'TradingRecentTrades',
  data() {
    return { };
  },
  computed: {
    ...mapState('trading', [
      'allTradeHistory',
    ]),
  },
  methods: {
    ...mapActions('trading', [
      'downloadTradeHistoryFromAllExchanges',
    ]),
  },
  beforeMount() {
    this.downloadTradeHistoryFromAllExchanges();
  },

};

</script>