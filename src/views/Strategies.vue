<template>
<div class="strategies-root">
  <transition
      name="custom-classes-transition"
      enter-active-class="animated dur02 fadeIn"
      leave-active-class="animated dur02 fadeOut"
      appear
      mode="out-in"
    >
  <strategies-new-local-assets
    @close='show.asset = false'
    v-if='show.asset'
    key='asset'/>
  <exchanges-add-new-api-popup
    @close='show.exchange = false'
    v-if='show.exchange'
    key='exhange'/>
  </transition>
  <template v-if='show.home'>
    <strategies-home
      @addAsset='show.asset = true'
      @addExchange='show.exchange = true'
      @showDetails='showDetails'
      key='home'/>
    <strategies-home-mobile
      @addAsset='show.asset = true'
      @addExchange='show.exchange = true'
      @showDetails='showDetails'
      key='home-mobile'/>
  </template>
  <transition
      name="custom-classes-transition"
      enter-active-class="animated dur02 fadeIn"
      leave-active-class="animated dur02 fadeOut"
      appear
      mode="out-in"
    >
  <strategies-details
    :detailsId='detailsId'
    @close='showSome("home")'
    @addAsset='show.asset = true'
    v-if='show.details'
    key='details'/>
  </transition>
</div>
</template>
<script>
// import { mapActions } from 'vuex';
import StrategiesHome from '@/components/strategies/StrategiesHome.vue';
import StrategiesHomeMobile from '@/components/strategies/StrategiesHomeMobile.vue';
import StrategiesNewLocalAssets from '@/components/strategies/components/StrategiesNewLocalAssets.vue';
import StrategiesDetails from '@/components/strategies/StrategiesDetails.vue';
import ExchangesAddNewApiPopup from '@/components/exchanges/ExchangesAddNewApiPopup.vue';

export default {
  name: 'Strategies',
  components: {
    StrategiesHome,
    StrategiesHomeMobile,
    StrategiesNewLocalAssets,
    StrategiesDetails,
    ExchangesAddNewApiPopup,
  },
  data() {
    return {
      show: {
        details: false,
        asset: false,
        home: true,
        exchange: false,
        detailsId: null,
      }
    }
  },
  methods: {
    async showDetails(id) {
      this.detailsId = id;
      await this.showSome('details');
    },
    async showSome(type) {
      Object.keys(this.show).forEach(key => this.show[key] = false);
      await this.$nextTick();
      this.show[type] = true;
    },
  }
};
</script>
<style lang="scss">
.strategies-root {
  position: relative;
  background-color: $B12;
  min-height: 100vh;
  @media screen and (min-width: $screen-tablet) {
    flex: 1 1;
  }
}
</style>
