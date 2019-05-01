<template>
  <div class="trading-card">
    <header class="trading-card__header trading-card__header--start">
      <h2 class="trading-card__title trading-card__title--padding">Terminal</h2>
      <trading-terminal-drop-list @selectExchange="selectExchange" class='trading-card__droplist'/>
    </header>
    <div class="trading-card__table-wrapper trading-card__table-wrapper--terminal">
      <traiding-view-chart
        :key="currentPair"
        :exchange="info.currentExchange"
        :info="info"
      ></traiding-view-chart>
    </div>
  </div>
</template>

<script>
import TradingTerminalDropList from '@/components/trading/components/TradingTerminalDropList.vue';
import TraidingViewChart from '@/components/trading/components/TraidingViewChart.vue';
import { mapGetters, mapState, mapMutations } from 'vuex';

import '@/scss/components/trading-card.scss';

export default {
  name: 'TradingTerminal',
  props:['info'],
  components: {
    TradingTerminalDropList,
    TraidingViewChart,
  },
  data() {
    return {
      drop: false,
    };
  },
  methods: {
    selectExchange(exchange) {
      this.$emit('select-exchange', exchange );
    },
  },

  computed: {
    ...mapState('trading', {
      currentPair: state => state.currentPair,
    }),
  },

  mounted(){

  }
};
</script>

<style type="text/css">
