<template>
  <table class='trading-card__table'>
    <thead>
      <tr>
        <th><span>Pair</span></th>
        <th><span>Exchange</span></th>
        <th><span>Amount</span></th>
        <th><span>Price</span></th>
        <th><span>Date</span></th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(record, index) in filteredData" :key='index'>
        <td><span>{{ record.pair }}</span></td>
        <td><span>{{ record.exchange }}</span></td>
        <td><span>{{ record.amount | numeral('0,0.[000000]') }}</span></td>
        <td><span>{{ record.price | numeral('0,0.[000000]') }}</span></td>
        <td><span>{{ record.date }}</span></td>
      </tr>
    </tbody>
  </table>
</template>
<script>
import { mapState, mapActions, mapGetters } from 'vuex';

export default {
  name: 'TradeHistory',

  data(){
    return { }
  },
  props: ['searchValue'],
  computed: {
    ...mapState('trading', [
      'allTradeHistory',
    ]),

    filteredData(){

      let searchValue = this.searchValue.trim();
      if (searchValue) {

        let res = [];

        const re = new RegExp(searchValue, 'gi');
        this.allTradeHistory.map((obj)=>{

          // by Exchange
          if( (obj.exchange).trim().toLowerCase().match(re) )
            res.push(obj);

          // by Currency
          else if( (obj.pair).trim().toLowerCase().match(re) )
            res.push(obj);
        });

        return res;
      }
      return this.allTradeHistory;
    },

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