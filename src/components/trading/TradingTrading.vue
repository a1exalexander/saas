<template>
<div class="trading-trading">

  <div class="trading-trading__terminal">
    
    <div>
      <button
        @click.prevent="tradingViewAction"
      >
        {{ showTradingView ? 'Hide' : 'Show' }} Terminal
      </button>    
    </div>

    <trading-terminal
      v-on:select-exchange="selectExchange"
      class="trading-trading__card trading-trading__card--terminal"
      :info="info"
      v-if="showTradingView"
      />
  </div>

  <div class="trading-trading__row">
    <trading-order-book
      v-on:set-price="setPrice"
      v-on:set-amount="setAmount"
      class="trading-trading__card trading-trading__card--book"
      :info="info"
      />

    <trading-pairs-container
      v-on:select-pair="selectPair"
      class="trading-trading__card trading-trading__card--pairs"
      :info="info"
      />

    <trading-order-forms
      class="trading-trading__card trading-trading__card--forms"
      :info="info"
      />

  </div>
  <div class="trading-trading__tables">
    <trading-tables
      class="trading-trading__card trading-trading__card--tables"
      :info="info"
      />
  </div>
</div>
</template>
<script>
import TradingOrderBook from '@/components/trading/components/TradingOrderBook.vue';
import TradingPairsContainer from '@/components/trading/components/TradingPairsContainer.vue';
import TradingOrderForms from '@/components/trading/components/TradingOrderForms.vue';
import TradingTerminal from '@/components/trading/components/TradingTerminal.vue';
import TradingTables from '@/components/trading/components/TradingTables.vue';
import { mapState, mapActions, mapGetters } from 'vuex';
import '@/scss/components/trading-card.scss';

export default {
  name: 'TradingTrading',
  components: {
    TradingOrderBook,
    TradingPairsContainer,
    TradingOrderForms,
    TradingTerminal,
    TradingTables,
  },

  data(){
    return {
      // current object is used as global micro-storage for all children
      // update it from child by event
      showTradingView: false,
      info: {
        price: 0,
        amount: 0,
        bestBuyPrice: 0,
        bestSellPrice: 0,
        avgPrice: 0,
        currentExchange: '',
        currentPair: '',
        decimals: 4,
      }
    }
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
  methods:{

    // events
    setPrice(val){ 
      this.info.price = (+val); 
      this.$store.dispatch('trading/updateOrderTemplateItem', {price: this.info.price}, {root: true} );
    },
    setAmount(val){ 
      this.info.amount = (+val); 
      this.$store.dispatch('trading/updateOrderTemplateItem', {amount: this.info.amount}, {root: true} );
    },
    selectPair(pair){
      this.info.currentPair = pair;
      this.$store.dispatch('trading/setCurrentPair', pair, {root: true} );
    },
    selectExchange(exchange) {
      this.info.currentExchange = exchange;
      this.$store.dispatch('trading/setCurrentExchange', exchange, {root: true} );
    },
    tradingViewAction(){
      localStorage[ ( (!this.showTradingView) ? 'setItem' : 'removeItem' )]('TV:charts','true');
      this.showTradingView = !this.showTradingView;
    },

    init(){
      this.showTradingView = localStorage.getItem('TV:charts') ? true : false;
      this.info.bestBuyPrice = this.bestBuyPrice;
      this.info.bestSellPrice = this.bestSellPrice;
      this.info.currentExchange = this.currentExchange;
      this.info.currentPair = this.currentPair;
      this.info.avgPrice = +( (this.bestBuyPrice + this.bestSellPrice).toFixed( 8 ) );
    },

  },
  beforeMount(){
    this.$store.dispatch('trading/resetOrderTemplate', null, {root: true} );
    this.init();
  },

};
</script>
<style lang="scss">
.trading-trading {
  &__row {
    @include flex-row(stretch, flex-start);
    flex-wrap: wrap;
    @media screen and (min-width: $screen-hd) {
      flex-wrap: nowrap;
    }
  }
  &__card {
    flex: 0 0 100%;
    max-height: 440px;
    margin-bottom: 16px;
    &--book {
      flex-basis: calc(30% - 16px);
    }
    &--pairs {
      flex-basis: calc(30% - 16px);
    }
    &--forms {
      flex-basis: 40%;
    }
    &--terminal {
      max-height: fit-content;
    }
    @media screen and (min-width: $screen-tablet) {
      &--book {
        flex-basis: calc(50% - 16px);
        margin-right: 16px;
      }
      &--pairs {
        flex-basis: calc(50%);
      }
      &--forms {
        flex-basis: 100%;
      }
    }
    @media screen and (min-width: $screen-hd) {
      &--book {
        flex-basis: calc(30% - 16px);
      }
      &--pairs {
        flex-basis: calc(30% - 16px);
        margin-right: 16px;
      }
      &--forms {
        flex-basis: 40%;
      }
    }
  }
  &__terminal {
    text-align: center;
    margin-bottom: 16px;
  }
}
</style>
