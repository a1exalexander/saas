<template>
  <table class='trading-card__table'>
    <thead>
      <tr>
        <th><span>Date</span></th>
        <th><span>Type</span></th>
        <th><span>Price</span></th>
        <th><span>Volume</span></th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(record, index) in allTradeHistory" :key='index'>
        <td><span>{{ (record.date).split('/')[0]+'/'+(record.date).split('/')[1] }}</span></td>
        <td><span :class="record.type == 'sell' ? 'red' : 'green' ">{{ record.type.toUpperCase() }}</span></td>
        <td><span>{{ record.price | numeral('0,0.[000000]') }}</span></td>
        <td><span>{{ record.amount | numeral('0,0.[000000]') }}</span></td>

      </tr>
    </tbody>
  </table>
</template>
<script>
import { mapState, mapActions, mapGetters } from 'vuex';
import '@/scss/components/trading-card.scss';

export default {
  name: 'RecentTrades',

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
