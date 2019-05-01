<template>
<section class='trading-card'>
  <header class="trading-card__header">
    <h2 class="trading-card__title">Wish list</h2>
  </header>
  <div class="trading-card__table-wrapper">
    <table class='trading-card__table'>
      <thead>
        <tr>
          <th><span>Coin</span></th>
          <th><span>Exchange</span></th>
          <th><span>Price</span></th>
          <th><span>Change</span></th>
          <th><span></span></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for=" item in wishLists " :key="item.id">
          <td><span>{{item.pair}}</span></td>
          <td><span>{{item.exchange}}</span></td>
          <td><span class='blue'>{{item.price_btc}}</span></td>
          <td>
            <span :class="item.change_24h < 0 ? 'red' : 'green'"> 
              {{item.change_24h}} %
            </span>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</section>
</template>
<script>
import { mapState, mapActions, mapGetters } from 'vuex';
import '@/scss/components/trading-card.scss';

export default {
  name: 'TradingWishList',

  data() {
    return {
      searchPair: '',
      list: [],
    };
  },

  computed: {
    ...mapState('trading', [
      'wishLists',
    ]),
  },

  methods:{
    ...mapActions('trading', [
      'wishListsGetAll',
    ]),
  },

  beforeMount(){
    this.wishListsGetAll();
  },

};

</script>