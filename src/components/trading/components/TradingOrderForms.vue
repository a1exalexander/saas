<template>
  <div class="trading-card">
    <header class="trading-card__header trading-card__header--col">
      <div class="tumbler trading-card__order-tumbler">
        <label
          class="tumbler__label"
          v-for="(item, index) in tables"
          :key='index'>
          <input
            type="radio"
            class="tumbler__input"
            name='order-forms'
            :value='index'
            v-model='table'
            >
          <span class="tumbler__text">{{ item }}</span>
        </label>
      </div>
      <p class="trading-card__text trading-card__text--secondary"
        >Avialable balance:
        <span class="trading-card__text"><b>{{baseAsset}}</b> {{ baseAssetBalance | numeral('0,0.[00000000]') }} </span> 
        <span class="trading-card__text"><b>{{quoteAsset}}</b> {{ quoteAssetBalance | numeral('0,0.[00000000]') }} </span>
      </p>
    </header>

    <div class="trading-card__inner">
      <transition
        name="custom-classes-transition"
        enter-active-class="animated dur02 fadeIn"
        leave-active-class="animated dur02 fadeOut"
        mode="out-in">
        <limit-order :info="info" v-if='table === 0'/>
        <market-order :info="info" v-else-if='table === 1'/>
        <stoploss :info="info" v-else-if='table === 2'/>
        <shadow-order :info="info" v-else/>

      </transition>
    </div>
  </div>
</template>
<script>
import MarketOrder from '@/components/trading/components/market/MarketOrder.vue';
import LimitOrder from '@/components/trading/components/market/LimitOrder.vue';
import ShadowOrder from '@/components/trading/components/market/ShadowOrder.vue';
import Stoploss from '@/components/trading/components/market/Stoploss.vue';
import { mapState, mapActions, mapGetters } from 'vuex';
import '@/scss/components/trading-card.scss';
import '@/scss/components/tumbler.scss';

export default {
  name: 'TradingOrderForms',
  components: {
    MarketOrder,
    LimitOrder,
    ShadowOrder,
    Stoploss,
  },
  props: ['info'],
  data() {
    return {
      tables: [
        'Limit order', 
        'Market order', 
        'Limit/Stop-loss',
        // 'Shadow order', 
      ],

      table: 0,
    };
  },
  methods:{

  },

  computed: {
    ...mapState('trading', [
      'currentExchange',
      'currentPair',
      'bestBuyPrice',
      'bestSellPrice',
      'baseAsset',
      'quoteAsset',
      'baseAssetBalance',
      'quoteAssetBalance',
    ]),
  },

  mounted(){
    // console.log({amount: this.amount});
  },

};
</script>
<style lang="scss">
.pairs-tables {
  &__table {

  }
}

</style>
