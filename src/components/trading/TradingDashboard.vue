<template>
  <div class="trading-dashboard">
    <div class="trading-dashboard__col">
      <trading-holdings class="trading-dashboard__card trading-dashboard__card--holdings"/>
    </div>
    <div class="trading-dashboard__col">
      <trading-recent-trades class="trading-dashboard__card trading-dashboard__card--1-2"/>
      <trading-wish-list class="trading-dashboard__card trading-dashboard__card--1-2"/>
    </div>
  </div>
</template>
<script>
import TradingHoldings from '@/components/trading/components/TradingHoldings.vue';
import TradingRecentTrades from '@/components/trading/components/TradingRecentTrades.vue';
import TradingWishList from '@/components/trading/components/TradingWishList.vue';

export default {
  name: 'TradingDashboard',
  components: {
    TradingHoldings,
    TradingRecentTrades,
    TradingWishList,
  },
};
</script>
<style lang="scss">
.trading-dashboard {
  @include flex-col(stretch, stretch);
  @media screen and (min-width: $screen-tablet) {
    flex-direction: row;
  }
  &__col {
    @media screen and (min-width: $screen-tablet) {
      &:first-child {
        margin-right: 16px;
      }
      flex: 0 0 50%;
    }
  }
  &__card {
    margin-bottom: 16px;
    @media screen and (min-width: $screen-tablet) {
      max-height: 440px;
    }
    &--holdings {
      @media screen and (min-width: $screen-tablet) {
        margin-bottom: 0;
        max-height: 100%;
      }
    }
    &:last-child {
      margin-bottom: 0;
    }
  }
}
</style>
