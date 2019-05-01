<template>
  <div class="strategies-details">
    <div class="popup-layer"></div>
    <header class="strategies-details__header">
      <button-back
        @click.native='close'
        label='Back to Strategies'
        class="strategies-details__back-button"/>
      <h1 class="strategies-details__title">Binance Crypto Fund {{ detailsId }}</h1>
    </header>
    <main class="strategies-details__main">
      <div class="strategies-details__block">
        <div class="strategies-details__info">
          <span class="strategies-details__subtitle">Lock-up period</span>
          <span class="strategies-details__value">Week</span>
        </div>
        <div class="strategies-details__info">
          <span class="strategies-details__subtitle">Currency</span>
          <span class="strategies-details__value">BTC</span>
        </div>
        <div class="strategies-details__info">
          <span class="strategies-details__subtitle">Transactions</span>
          <span class="strategies-details__value">15</span>
        </div>
        <div class="strategies-details__info">
          <span class="strategies-details__subtitle">Min investment</span>
          <span class="strategies-details__value">40 BTC</span>
        </div>
      </div>
      <div class="strategies-details__descr">
        <span class="strategies-details__subtitle">Description</span>
        <p class="strategies-details__value strategies-details__value--text">The most popular trading strategy amongst most crypto traders and blockchain enthusiasts is HODL, an acronym for “Hold on for Dear Life.” These are the investors and traders who are ready to keep crypto coins for an indefinite period, irrespective of the price or current price fluctuations</p>
      </div>
    </main>
    <div class="strategies-details__chart">
      <strategies-chart/>
    </div>
    <div class="strategies-details__portfolio">
      <h2 class="strategies-details__portfolio-title">Portfolio</h2>
      <subtle-icon
        @click.native='addAsset'
        label='Add local asset'
        class="strategies-details__portfolio-mobile-button">
        <icon-plus class='icon-button-left'/>
      </subtle-icon>
      <button-primary-icon
        @click.native='addAsset'
        label='Add local asset'
        class="strategies-details__portfolio-desktop-button">
        <icon-plus class='icon-button-left'/>
      </button-primary-icon>
    </div>
    <div class="strategies-details__item-list">
      <strategies-mobile-details-item v-for='n in 6' :key='n'/>
    </div>
    <div class="strategies-details__table-wrapper">
      <strategies-details-table/>
    </div>
  </div>
</template>
<script>
import IconPlus from '@/components/common/icons/IconPlus.vue';
import StrategiesMobileDetailsItem from '@/components/strategies/components/StrategiesMobileDetailsItem.vue'
import StrategiesChart from './components/StrategiesChart.vue';
import StrategiesDetailsTable from './components/StrategiesDetailsTable.vue';

export default {
  name: 'StrategiesDetails',
  props: {
    detailsId: {
      type: [Number, String],
      required: true,
    },
  },
  components: {
    IconPlus,
    StrategiesMobileDetailsItem,
    StrategiesChart,
    StrategiesDetailsTable,
  },
  methods: {
    close() {
      this.$emit('close');
    },
    addAsset() {
      this.$emit('addAsset');
    },
  },
};
</script>
<style lang="scss">
.strategies-details {
  position: absolute;
  top: -56px;
  left: 0;
  right: 0;
  // min-height: 100vh;
  z-index: 10;
  background-color: $N13;
  padding: 20px 0;
  overflow-y: auto;
  @media screen and (min-width: $screen-tablet) {
    height: 100vh;
    position: static;
    padding: 24px 0;
  }
  &__table-wrapper {
    @include isTablet(block);
    // padding: 0 40px;
  }
  &__main {
    padding: 0 28px;
    @media screen and (min-width: $screen-tablet) {
      padding: 0 40px;
    }
  }
  &__back-button {
    min-height: 36px;
    margin-bottom: 12px;
    @media screen and (min-width: $screen-tablet) {
      margin-bottom: 18px;
    }
  }
  &__header {
    padding: 0 28px;
    margin-bottom: 16px;
    @media screen and (min-width: $screen-tablet) {
      padding: 0 40px;
      margin-bottom: 32px;
    }
  }
  &__title {
    @include text($H700, 500, $N0);
    @media screen and (min-width: $screen-tablet) {
      font-size: $H800;
    }
  }
  &__block {
    @include flex-row(space-between, flex-start);
    flex-wrap: wrap;
    @media screen and (min-width: $screen-tablet) {
      flex-wrap: nowrap;
      max-width: 60%;
    }
  }
  &__info {
    flex-basis: 40%;
    @include flex-col(flex-start, flex-start);
    margin-bottom: 24px;
  }
  &__subtitle {
    @include text($H200, 400, $N6);
    padding-bottom: 6px;
    @media screen and (min-width: $screen-tablet) {
      padding-bottom: 8px;
    }
  }
  &__value {
    @include text($H300, 400, $N2);
    &--text {
      line-height: 20px;
      margin-top: 8px;
    }
  }
  &__descr {
    margin-bottom: 28px;
    @media screen and (min-width: $screen-tablet) {
      max-width: 50%;
    }
  }
  &__portfolio {
    @include flex-row(space-between, flex-end);
    padding: 0 28px 12px;
    border-bottom: 1px solid $N10;
    @media screen and (min-width: $screen-tablet) {
      border: none;
      align-items: center;
      padding: {
        left: 40px;
        right: 40px;
      }
    }
  }
  &__portfolio-title {
    @include text($H700, 500, $N0);
  }
  &__portfolio-mobile-button {
    @media screen and (min-width: $screen-tablet) {
      display: none;
    }
  }
  &__portfolio-desktop-button {
    display: none;
    @media screen and (min-width: $screen-tablet) {
      display: flex;
    }
  }
  &__item-list {
    @media screen and (min-width: $screen-tablet) {
      display: none;
    }
  }
}
</style>



