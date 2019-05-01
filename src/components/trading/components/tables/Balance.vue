<template>
  <table class='trading-card__table'>
    <thead>
      <tr>
        <th><span>Exchange</span></th>
        <th><span>Currency</span></th>
        <th><span>Amount</span></th>
        <th><span>USD rate</span></th>
        <th><span>Total USD</span></th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(coin, index) in filteredData" :key='index'>
        <td><span>{{ coin.type }}</span></td>
        <td><span>{{ coin.asset }}</span></td>
        <td><span>{{ coin.amount | numeral('0,0.[000000]') }}</span></td>
        <td><span>$ {{ coin.price_usd | numeral('0,0.[000000]') }}</span></td>
        <td><span>$ {{ coin.total_in_usd }}</span></td>
      </tr>
    </tbody>
  </table>
</template>
<script>
import { mapState, mapActions, mapGetters } from 'vuex';

export default {
  name: 'Balance',

  data(){
    return { }
  },
  props: ['searchValue'],
  computed: {
    ...mapState('trading', [
      'allBalances',
    ]),
    filteredData(){
      this.total_btc = this.allBalances.meta.total_btc;
      this.total_usd = this.allBalances.meta.total_usd;

      let searchValue = this.searchValue.trim();
      if (searchValue) {
        let res = {};
        const re = new RegExp((searchValue).trim(), 'gi');
        this.allBalances.coins.map((obj)=>{

          // by Exchange
          if( (obj.type).trim().toLowerCase().match(re) )
            res[ obj.asset ] = obj;

          // by Currency
          if( (obj.asset).trim().toLowerCase().match(re) )
            res[ obj.asset ] = obj;

        });
        return res;
      }

      return this.allBalances.coins;
    },
  },

  methods:{
    ...mapActions('trading', ['downloadBalanceFromAllExchanges']),

  },

  beforeMount(){
    this.downloadBalanceFromAllExchanges();
  },

  mounted(){
    console.log({searchValue: this.searchValue});
  },


};
</script>