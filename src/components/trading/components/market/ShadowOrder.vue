<template>
  <div class="market-orders">
    <div class="market-orders__form">
      <div class="market-orders__row">
        <span class="market-orders__balance">Balance avallable:</span>
        <span class="market-orders__balance-value">USDT</span>
      </div>
      <div class="market-orders__label">
        <span class="market-orders__label-text">Price</span>
        <input
          class="market-orders__input"
          type='text'/>
      </div>
      <div class='market-orders__features'>
        <span class="market-orders__feature-label">Best price</span>
        <span class="market-orders__feature-value">5128.58</span>
      </div>
      <div class="market-orders__label">
        <span class="market-orders__label-text">Amount</span>
        <input
          class="market-orders__input"
          type='text'/>
      </div>
      <div class='market-orders__features'>
        <subtle
          class='market-orders__subtle'
          v-for='(item, index) in amountPercent'
          :key='item + index'>
          <span>{{ item }}%</span>
        </subtle>
      </div>
      <div class="market-orders__label market-orders__label--margin">
        <span class="market-orders__label-text">Total</span>
        <input
          class="market-orders__input"
          type='text'/>
      </div>
      <button-primary class="market-orders__button">
        <span>Buy</span>
      </button-primary>
    </div>
    <div class="market-orders__form">
      <div class="market-orders__row">
        <span class="market-orders__balance">Balance avallable:</span>
        <span class="market-orders__balance-value">BTC</span>
      </div>
      <div class="market-orders__label">
        <span class="market-orders__label-text">Price</span>
        <input
          class="market-orders__input"
          type='text'/>
      </div>
      <div class='market-orders__features'>
        <span class="market-orders__feature-label">Best price</span>
        <span class="market-orders__feature-value">5128.58</span>
      </div>
      <div class="market-orders__label">
        <span class="market-orders__label-text">Amount</span>
        <input
          class="market-orders__input"
          type='text'/>
      </div>
      <div class='market-orders__features'>
        <subtle
          class='market-orders__subtle'
          v-for='(item, index) in amountPercent'
          :key='item + index'>
          <span>{{ item }}%</span>
        </subtle>
      </div>
      <div class="market-orders__label market-orders__label--margin">
        <span class="market-orders__label-text">Total</span>
        <input
          class="market-orders__input"
          type='text'/>
      </div>
      <button-primary class="market-orders__button">
        <span>Sell</span>
      </button-primary>
    </div>
  </div>
</template>
<script>
import Subtle from '@/components/common/buttons/Subtle.vue';
import ButtonPrimary from '@/components/common/buttons/ButtonPrimary.vue';
import '@/scss/components/market-orders.scss';

export default {
  name: 'ShadowOrder',
  components: {
    Subtle,
    ButtonPrimary,
  },
  data() {
    return {
      amountPercent: [5, 20, 50, 75, 100],
    };
  },
};
</script>