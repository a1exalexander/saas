<template>
  <div class="trading-card">
    <header class="trading-card__header trading-card__header--start">
      <div class="tumbler trading-card__tumbler">
        <label
          class="tumbler__label"
          v-for="(item, index) in tables"
          :key='index'>
          <input
            type="radio"
            class="tumbler__input"
            name='tables'
            :value='index + 1'
            v-model='table'>
          <span class="tumbler__text">{{ item }}</span>
        </label>
      </div>
      <label
        class="trading-card__search-label trading-card__search-label--fix">
        <icon-search class="trading-card__search-icon"/>
        <input
          type="text"
          class="trading-card__search-input"
          v-model='search'
          placeholder="Search...">

      </label>
    </header>
    <div class="trading-card__table-wrapper">
      <transition
        name="custom-classes-transition"
        enter-active-class="animated dur02 fadeIn"
        leave-active-class="animated dur02 fadeOut"
        mode="out-in"
      >
        <open-orders v-if='table === 1'/>
        <balance v-else-if='table === 2'/>
        <trade-history v-else-if='table === 3'/>
        <pricing-alerts v-else/>
      </transition>
    </div>
  </div>
</template>
<script>
import OpenOrders from '@/components/trading/components/tables/OpenOrders.vue';
import Balance from '@/components/trading/components/tables/Balance.vue';
import TradeHistory from '@/components/trading/components/tables/TradeHistory.vue';
import PricingAlerts from '@/components/trading/components/tables/PricingAlerts.vue';
import IconSearch from '@/components/common/icons/IconSearch.vue';
import '@/scss/components/trading-card.scss';
import '@/scss/components/tumbler.scss';

export default {
  name: 'TradingTables',
  components: {
    OpenOrders,
    Balance,
    TradeHistory,
    PricingAlerts,
    IconSearch,
  },
  data() {
    return {
      tables: ['Open orders', 'Balance', 'Trade history', 'Pricing alerts'],
      table: 1,
      search:'',
    };
  },
};
</script>
