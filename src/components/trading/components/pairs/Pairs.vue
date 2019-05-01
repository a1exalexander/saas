<template>
  <div>
    <label
      class="trading-card__search-label trading-card__search-label--margin">
      <icon-search class="trading-card__search-icon"/>
      <input
        type="text"
        class="trading-card__search-input"
        placeholder="Search..."
        v-model="searchPair"
        @change="applySearchFilter()"/>

    </label>
    <table class='trading-card__table trading-card__table--pairs'>
      <thead>
        <tr>
          <th><span>Pair</span></th>
          <th><span>Price</span></th>
          <th><span>Change (week)</span></th>
        </tr>
      </thead>
      <tbody>

        <!--
          // data.data => {
          //   "ETH/BTC": {
          //     "id": 1,
          //     "price": 0.032864,
          //     "change24h": 0.47,
          //     "pair": "ETH/BTC",
          //     "baseAsset": "BTC",
          //     "quoteAsset": "ETH",
          //     "baseAssetPrecision": 0,
          //     "quoteAssetPrecision": 0,
          //     "status": true
          //   },
          // }
        -->


        <tr v-for="obj in getPairs" :key="obj.pair">
          <td>
            <span
              @click=" obj.isInWishList ? _wishListsRemove( {id: obj.wishListId} ) : _wishListsAdd( obj )"
            >
              {{ obj.isInWishList ? '' : '' }}
              <icon-star
                class="trading-card__star"
                :class='{"trading-card__star--select": obj.isInWishList}'
              />
            </span>

            <span
              class="pair-selector"
              @click.prevent="selectPair( obj.pair )"
            >
              {{obj.pair}}
            </span>

          </td>
          <td><span>{{ obj.price | numeral('0.[000000]') }}</span></td>
          <td>
            <span :class="obj.change24h < 0 ? 'red' : 'green'"> 
              {{obj.change24h}} %
            </span>
          </td>
        </tr>

        <!--
        <tr v-for='n in 16' :key='n'>
          <td>
            <icon-star
              class="trading-card__star"
              :class='{"trading-card__star--select": n%2}'/>
            <span>BTC/BTC</span>
          </td>
          <td><span>{{ 2.535 | numeral('0.[000]') }}</span></td>
          <td><span>+55.6%</span></td>
        </tr>
        -->

      </tbody>
    </table>
  </div>
</template>
<script>
import IconStar from '@/components/common/icons/IconStar.vue';
import IconSearch from '@/components/common/icons/IconSearch.vue';
import { mapState, mapActions, mapGetters } from 'vuex';
import '@/scss/components/trading-card.scss';

export default {
  name: 'Pairs',
  props: ['info'],
  components: {
    IconStar,
    IconSearch,
  },
  data() {
    return {
      searchPair: '',
      list: [],
    };
  },

  computed: {
    ...mapState('trading', [
      'tradingPairs',
    ]),

    getPairs() {
      this.searchPair = this.searchPair.trim();
      if (this.searchPair) {
        let res = {};
        const re = new RegExp((this.searchPair).trim(), 'gi');
        Object.keys(this.tradingPairs).map((pair)=>{
          if( (pair).trim().toLowerCase().match(re) ) res[ pair ] = this.tradingPairs[ pair ];
        });
        return res;
      }
      return this.tradingPairs;
    },
    computedList: function () {
      var vm = this;
      // FIXME: change VALUE and LIST to target arrays or values
      return this.list.filter((item) => {
        return item.value.toLowerCase().indexOf(vm.search.toLowerCase()) !== -1
      })
    },

  },
  methods:{
    ...mapActions('trading', [
      'downloadTradingPairs',
      'wishListsAdd',
      'wishListsRemove',
    ]),

    _wishListsAdd( obj ){ this.wishListsAdd( obj ); },
    _wishListsRemove( obj ){ this.wishListsRemove( obj ); },
    selectPair(pair){ this.$emit('select-pair', pair); },

  },
  beforeMount() {
    this.downloadTradingPairs();
  },

};

</script>
<style lang="scss">

.pair-selector{
  &:hover{
    cursor: pointer;
    color: #07F;
  }
}

.change24h {

  &__positive{
    /*cursor: pointer;*/
    color: #ca2c78;
  }

  &__negative{
    /*cursor: pointer;*/
    color: #73c921;
  }

}
</style>


