<template>
  <section class='trading-card trading-card--between'>
    <header class="trading-card__header trading-card__header--start">
      <h2 class="trading-card__title">Order Book</h2>
      <div class="tumbler-drop" @click='drop = !drop'>
        <p class="tumbler-drop__placeholder">{{ info.decimals }}</p>
        <icon-arrow-down
          class="tumbler-drop__icon"
          :class='{"rotate-180": drop}'/>
        <div
          v-if='drop'
          class='tumbler-drop__drop-wrapper'></div>
        <transition
          name="custom-classes-transition"
          enter-active-class="animated dur02 pullDownLight"
          leave-active-class="animated dur02 pullDownLight revers">
        <ul v-if='drop' class="tumbler-drop__drop-list">
          <li
            class="tumbler-drop__drop-item"
            @click='selectDecimal(n)'
            v-for='n in 8'
            :key='n'>{{ n }}</li>
        </ul>
        </transition>
      </div>
    </header>

    <!--[ BIDS::SELLING ]-->
    <div class="trading-card__table-wrapper trading-card__table-wrapper--1-2">
      <table class='trading-card__table'>
        <thead>
          <tr>
            <th><span>Price</span></th>
            <th><span>Amount</span></th>
            <th><span>Total</span></th>
          </tr>
        </thead>
        <tbody>

          <tr v-for="(item, index) in orderBook.bids" :key='index'>
            <td>
                <span
                class="trading-card__table__price__sell"
                @click.prevent="setPrice(item.price)"
              >
                {{ item.price | numeral('0,0.[000000]') }}
              </span>
            </td>
            <td>
              <span
                class="trading-card__table__amount"
                @click.prevent="setAmount(item.amount)"
              >
                {{ item.amount | numeral(`0.[${''.padEnd(info.decimals, '0')}]`) }}
              </span>
            </td>
            <td><span>{{+item.total.toFixed(info.decimals)}}</span></td>
          </tr>

        </tbody>
      </table>
    </div>

    <div class="trading-card__stat-row">
      <span class="trading-card__caption"> {{ (bestBuyPrice).toFixed(info.decimals) }} </span>
      <!--[<span class="trading-card__secondary-text">-5526.97 USD</span>]-->
    </div>

    <!--[ ASKS::BUYING ]-->
    <div class="trading-card__table-wrapper trading-card__table-wrapper--1-2">
      <table class='trading-card__table'>
        <tbody>

          <tr v-for="(item, index) in orderBook.asks" :key='index'>
            <td>
              <span
                class="trading-card__table__price__buy"
                @click.prevent="setPrice(item.price)"
              >
                {{item.price | numeral('0,0.[000000]') }}
              </span>
            </td>
            <td>
              <span
                class="trading-card__table__amount"
                @click.prevent="setAmount(item.amount)"
              >
                {{ item.amount | numeral(`0,0.[${''.padEnd(info.decimals, '0')}]`) }}
              </span>
            </td>
            <td><span>{{+item.total.toFixed(info.decimals)}}</span></td>
          </tr>

        </tbody>
      </table>
    </div>
  </section>
</template>

<script>
import IconArrowDown from '@/components/common/icons/IconArrowDown.vue';
import { mapState, mapActions, mapGetters } from 'vuex';
import '@/scss/components/trading-card.scss';
import '@/scss/components/tumbler.scss';

export default {
  name: 'TradingOrderBook',
  components: {
    IconArrowDown,
  },
  props: ['info'],
  data() {
    return {
      drop: false,
    };
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
      'orderBook',
    ]),

  },
  methods: {
    ...mapActions('trading', [
      'downloadOrderBook',
    ]),
    selectDecimal(n) {
      this.info.decimals = n;
    },
    setPrice(val){ this.$emit('set-price', val); },
    setAmount(val){ this.$emit('set-amount', val); },

  },
  beforeMount() {
    this.downloadOrderBook();
  },

};
</script>

<style lang="scss">

.trading-card {

  &__table{

    &__price{
      &__buy{
        cursor: pointer;
        &:hover{ color: #ca2c78; }
      }

      &__sell{
        cursor: pointer;
        &:hover{ color: #73c921; }
      }

    }

    &__amount{
      cursor: pointer;
      &:hover{
        color: #F70;
      }
    }

  }
}
</style>
