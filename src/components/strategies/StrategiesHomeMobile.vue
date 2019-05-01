<template>
<div class="strategies-mobile">
    <transition
      name="custom-classes-transition"
      enter-active-class="animated dur02 fadeIn"
      leave-active-class="animated dur02 fadeOut"
      appear
      mode="out-in"
    >
    <strategies-new-strategy-popup
      @addAsset='addAsset' 
      @addExchange='addExchange'
      @close='show.newStrategy = false'
      v-if='show.newStrategy'/>
    </transition>
    <strategies-empty v-if='show.empty'/>
    <div class="strategies-mobile__list" v-else>
      <strategies-mobile-item
        @showDetails='showDetails(n)'
        v-for='n in 12'
        :key="n"/>
    </div>
  <div class="strategies-mobile__button">
    <button-primary-icon
      label='Create new Strategy'
      @click.native='show.newStrategy = true'>
      <icon-plus class='icon-button-left'/>
    </button-primary-icon>
  </div>
</div>
</template>
<script>
// import { mapActions } from 'vuex';
import StrategiesEmpty from '@/components/strategies/components/StrategiesEmpty.vue';
import StrategiesMobileItem from '@/components/strategies/components/StrategiesMobileItem.vue';
import StrategiesNewStrategyPopup from './components/StrategiesNewStrategyPopup.vue';
import IconPlus from '@/components/common/icons/IconPlus.vue';

export default {
  name: 'StrategiesHomeMobile',
  components: {
    StrategiesEmpty,
    StrategiesMobileItem,
    StrategiesNewStrategyPopup,
    IconPlus,
  },
  data() {
    return {
      show: {
        newStrategy: false,
        empty: false,
      },
    };
  },
  methods: {
    showDetails(id) {
      this.$emit('showDetails', id);
    },
    async addAsset() {
      this.show.newStrategy = false;
      await this.$nextTick();
      this.$emit('addAsset');
    },
    async addExchange() {
      this.show.newStrategy = false;
      await this.$nextTick();
      this.$emit('addExchange');
    },
  }
};
</script>
<style lang="scss">
.strategies-mobile {
  min-height: 100vh;
  @media screen and (min-width: $screen-tablet) {
    display: none;
  }
  &__button {
    width: 100%;
    padding: 64px 28px 32px;
    background-image: linear-gradient(180deg, rgba(23,24,26,0.24) 0%, rgba(23,24,26,0.80) 91%);
    position: fixed;
    bottom: 0;
    left: 0;
    &>* {
      width: 100%;
    }
  }
}
</style>
