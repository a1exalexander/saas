<template>
  <div class="">
    <VueTradingView :options="TVOptions"></VueTradingView>
  </div>
</template>

<script>
import VueTradingView from 'vue-trading-view';
import { mapGetters, mapState, mapMutations } from 'vuex';

export default {
  name: 'trading-traiding-view',
  props: ['info'],
  components: {
    VueTradingView,
  },

  computed: {
    ...mapState('trading', {
      options: state => state.tradingViewOptions,
      exchange: state => state.currentExchange,
      currentPair: state => state.currentPair,
    }),

    TVOptions(){
      const symbol = ( ( this.exchange ? this.exchange+':' : '' )+(this.currentPair.replace('/','')) );
      return Object.assign({}, this.options, {symbol})
    },

  },
  beforeMount() {
    // this.options.symbol = this.exchange+':'+this.currentPair;
  },
  mounted() {
    // setInterval( (self)=>{
    //   self.flashInfo( self.options.symbol+' '+self.currentPair );
    // }, 2000, this );
  },

};

// {
//   "width": 980,
//   "height": 610,
//   "symbol": "NASDAQ:AAPL",
//   "interval": "D",
//   "timezone": "Etc/UTC",
//   "theme": "Light",
//   "style": "1",
//   "locale": "en",
//   "toolbar_bg": "#f1f3f6",
//   "enable_publishing": false,
//   "allow_symbol_change": true,
//   "container_id": "tradingview_cf513"
// }


</script>
