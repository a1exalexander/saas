<template>
  <div class="trading-card pairs-tables">
    <header class="trading-card__header">
      <div class="tumbler">
        <label
          class="tumbler__label"
          v-for="(item, index) in tables"
          :key='index'>
          <input
            type="radio"
            class="tumbler__input"
            name='pairs'
            :value='index + 1'
            v-model='table'>
          <span class="tumbler__text">{{ item }}</span>
        </label>
      </div>
    </header>
    <div class="trading-card__table-wrapper">
      <transition
        name="custom-classes-transition"
        enter-active-class="animated dur02 fadeIn"
        leave-active-class="animated dur02 fadeOut"
        mode="out-in">
        <pairs 
          :info="info" 
          class='pairs-tables__table' 
          v-if='table === 1'
          v-on:select-pair="selectPair"
          />

        <favorites :info="info" class='pairs-tables__table' v-else-if='table === 2'/>
        <recent-trades :info="info" class='pairs-tables__table' v-else/>

      </transition>
    </div>
  </div>
</template>
<script>
import Pairs from '@/components/trading/components/pairs/Pairs.vue';
import Favorites from '@/components/trading/components/pairs/Favorites.vue';
import RecentTrades from '@/components/trading/components/pairs/RecentTrades.vue';
import '@/scss/components/trading-card.scss';
import '@/scss/components/tumbler.scss';

export default {
  name: 'TradingPairsContainer',
  components: {
    Pairs,
    Favorites,
    RecentTrades,
  },
  props: ['info'],
  data() {
    return {
      tables: ['Pairs', 'Favorites', 'Recent trades'],
      table: 1,
    };
  },
  methods:{
    selectPair(pair){ this.$emit('select-pair', pair); },
  }
};
</script>
<style lang="scss">
.pairs-tables {
  &__table {

  }
}
</style>
