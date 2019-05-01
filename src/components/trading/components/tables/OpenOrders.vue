<template>
  <table class='trading-card__table'>
    <thead>
      <tr>
        <th><span>Pair</span></th>
        <th><span>Type</span></th>
        <th><span>Exchange</span></th>
        <th><span>Amount</span></th>
        <th><span>Price</span></th>
        <th><span>Date</span></th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="o in filteredData" :key="o.id">
        <td><span>{{ o.pair }}</span></td>
        <td><span>{{ o.type }}</span></td>
        <td><span>{{ o.exchange }}</span></td>
        <td><span>{{ o.amount | numeral('0,0.[000000]') }}</span></td>
        <td><span>{{ o.price | numeral('0,0.[000000]') }}</span></td>
        <td><span>{{ toDate((+o.date)) }}</span></td>
      </tr>
    </tbody>
  </table>
</template>
<script>

import { mapState, mapActions, mapGetters } from 'vuex';

export default {
  name: 'OpenOrders',
  props: ['searchValue'],
  data(){
    return {}
  },

  computed:{
    ...mapState('trading', ['openOrders']),
    // openOrders => 
    // 'exchange'  : 'Binance',
    // 'id'        : 'id',
    // 'pair'      : 'ETH/BTC',
    // 'type'      : 'buy',
    // 'amount'    : '<amount>',
    // 'filed'     : '<filed>',
    // 'price'     : '<price>',
    // 'stop'      : '<stop>',
    // 'date'      : '<date>',
    // 'status'    : '<status>',,
    // 'profit'    : 0,

    filteredData(){

      let searchValue = this.searchValue.trim();
      if (searchValue) {

        let res = [];

        const re = new RegExp(searchValue, 'gi');
        this.openOrders.map((obj)=>{

          // by Exchange
          if( (obj.exchange).trim().toLowerCase().match(re) )
            res.push(obj);

          // by Currency
          else if( (obj.pair).trim().toLowerCase().match(re) )
            res.push(obj);
        });

        return res;
      }
      return this.openOrders;
    },

  },

  methods:{
    ...mapActions('trading', ['downloadOpenOrders']),

    toDate(stamp){
      return (new Date()).setTime((+stamp));
    }

  },

  beforeMount(){
    this.downloadOpenOrders();
  }
};
</script>