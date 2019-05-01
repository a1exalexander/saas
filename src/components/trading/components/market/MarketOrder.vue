<template>
  <div class="market-orders">
    <div class="market-orders__form">

      <!--
      <div class="market-orders__row">
        <span class="market-orders__balance-value">{{baseAsset}} </span>
      </div>
      <div class="market-orders__row">
        <span class="market-orders__balance">Balance:</span>
        <span class="market-orders__balance-value">{{baseAssetBalance}}</span>
      </div>
      -->

      <div class="market-orders__label">
        <span class="market-orders__label-text">Amount</span>
        <input
          class="market-orders__input"
          type='text'
          :value="orderTemplate.amount"
          v-on:input="orderTemplate.amount = $event.target.value"/>
      </div>

      <div class='market-orders__features'>
        <subtle
          v-for="(item, index) in amountPercent" :key="index" class="market-orders__subtle"
          @click.native="setAmountInPercent( index, baseAssetBalance, 'buy' )"
        >
          <span>{{ item }}%</span>
        </subtle>
      </div>

      <button-primary @click="_createOrder('buy')" class="market-orders__button">
        <span>Buy <b>{{quoteAsset}}</b></span>
      </button-primary>

    </div>
    <div class="market-orders__form">

      <!--
      <div class="market-orders__row">
        <span class="market-orders__balance-value">{{quoteAsset}} </span>
      </div>
      <div class="market-orders__row">
        <span class="market-orders__balance">Balance:</span>
        <span class="market-orders__balance-value">{{quoteAssetBalance}}</span>
      </div>
      -->

      <div class="market-orders__label">
        <span class="market-orders__label-text">Amount</span>
        <input
          class="market-orders__input"
          type='text'
          :value="orderTemplate.amount"
          v-on:input="orderTemplate.amount = $event.target.value"/>
      </div>

      <div class='market-orders__features'>
        <subtle
          v-for="(item, index) in amountPercent" :key="index" class="market-orders__subtle"
          @click.native="setAmountInPercent( index, quoteAssetBalance, 'sell' )"
        >
          <span>{{ item }}%</span>
        </subtle>
      </div>

      <button-primary @click="_createOrder('sell')" class="market-orders__button">
        <span>Sell <b>{{quoteAsset}}</b></span>
      </button-primary>

    </div>
  </div>
</template>
<script>
import Subtle from '@/components/common/buttons/Subtle.vue';
import ButtonPrimary from '@/components/common/buttons/ButtonPrimary.vue';
import { mapState, mapActions, mapGetters } from 'vuex';
import '@/scss/components/market-orders.scss';

export default {
  name: 'MarketOrder',
  components: {
    Subtle,
    ButtonPrimary,
  },
  data() {
    return {
      amountPercent: [5, 20, 50, 75, 100],
      orderType: 'market',
    }
  },

  computed: {
    ...mapState('trading', [
      'currentExchange',
      'currentPair',
      'bestBuyPrice',
      'bestSellPrice',
      'orderTemplate',
      'baseAsset',
      'quoteAsset',
      'baseAssetBalance',
      'quoteAssetBalance',
    ]),
  },

  methods:{

    ...mapActions('trading', [
      'createOrder',
    ]),
    _createOrder( direction ){
      this.orderTemplate.direction = direction;
      this.$store.dispatch('trading/updateOrderTemplateItem', this.orderTemplate, {root: true} );
      this.createOrder();
    },

    onPriceChange( direction ){ this.onAmoutChange( direction ); },

    onAmoutChange( direction ){
      this.orderTemplate.total = ( direction == 'sell' )
        ? +((+this.orderTemplate.amount) / (+this.orderTemplate.price)).toFixed(8)
        : +((+this.orderTemplate.amount) * (+this.orderTemplate.price)).toFixed(8);

    },

    onTotalChange( direction ){

      this.orderTemplate.amount = ( direction == 'sell' )
        ? +((+this.orderTemplate.total) * (+this.orderTemplate.price)).toFixed(8)
        : +((+this.orderTemplate.total) / (+this.orderTemplate.price)).toFixed(8);

    },

    setAmountInPercent( index, anyBalance, direction ){
      this.orderTemplate.amount = ((anyBalance) / 100 * this.amountPercent[ index ]).toFixed(8);
      this.onAmoutChange( direction );
    }

  },
  mounted(){
    this.$store.dispatch('trading/updateOrderTemplateItem', {type: this.orderType}, {root: true} );
  },

};
</script>