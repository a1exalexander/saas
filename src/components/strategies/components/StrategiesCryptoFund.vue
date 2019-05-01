<template>
  <div class="strategies-crypto-fund">
    <div class="strategies-crypto-fund__back-button"></div>
    <main class="strategies-crypto-fund__main">
      <h1 class="strategies-crypto-fund__title">Binance Crypto Fund</h1>
      <div class="strategies-crypto-fund__block">
        <div class="strategies-crypto-fund__info">
          <span class="strategies-crypto-fund__subtitle">Lock-up period</span>
          <span class="strategies-crypto-fund__value">Week</span>
        </div>
        <div class="strategies-crypto-fund__info">
          <span class="strategies-crypto-fund__subtitle">Currency</span>
          <span class="strategies-crypto-fund__value">BTC</span>
        </div>
        <div class="strategies-crypto-fund__info">
          <span class="strategies-crypto-fund__subtitle">Transactions</span>
          <span class="strategies-crypto-fund__value">15</span>
        </div>
        <div class="strategies-crypto-fund__info">
          <span class="strategies-crypto-fund__subtitle">Min investment</span>
          <span class="strategies-crypto-fund__value">40 BTC</span>
        </div>
      </div>
      <div class="strategies-crypto-fund__descr">
        <span class="strategies-crypto-fund__subtitle">Description</span>
        <p class="strategies-crypto-fund__value strategies-crypto-fund__value--text">The most popular trading strategy amongst most crypto traders and blockchain enthusiasts is HODL, an acronym for “Hold on for Dear Life.” These are the investors and traders who are ready to keep crypto coins for an indefinite period, irrespective of the price or current price fluctuations</p>
      </div>
    </main>
  </div>
</template>
<script>
export default {

}
</script>
<style lang="scss">
.strategies-crypto-fund {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  min-height: 100vh;
  z-index: 10;
  background-color: $N13;
  padding: 20px 28px;
  &__back-button {
    min-height: 36px;
  }
  &__main {
  }
  &__title {
    margin-bottom: 15px;
    @include text($H700, 500, $N0);
  }
  &__block {
    @include flex-row(space-between, flex-start);
    flex-wrap: wrap;
  }
  &__info {
    flex-basis: 40%;
    @include flex-col(flex-start, flex-start);
    margin-bottom: 24px;
  }
  &__subtitle {
    @include text($H200, 400, $N6);
    margin-bottom: 6px;
  }
  &__value {
    @include text($H300, 400, $N2);
    &--text {
      line-height: 20px;
    }
  }
  &__descr {
    margin-bottom: 28px;
  }
}
</style>



