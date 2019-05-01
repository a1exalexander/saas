<template>
  <div class='portfolio-module'>
    <transition
      name="custom-classes-transition"
      enter-active-class="animated dur02 fadeIn"
      leave-active-class="animated dur02 fadeOut"
      mode="out-in">

      <assets-popup @close='popup = false' :assets='assets' v-if='popup'/>
      <add-assets-popup @close='addAssetsPopup = false' v-if='addAssetsPopup'/>

    </transition>
    <header class="portfolio-module__header">

      <button-primary-icon @click.native="addAsset" class="portfolio-module__add-asset-btn">
        <icon-plus class='icon-button-left'/>
        <span>Add</span>
      </button-primary-icon>

      <h2 class="portfolio-module__title">
        Portfolio
      </h2>

    </header>
    <table class="portfolio-module__table">
      <thead>
        <tr>
          <th><span>Location</span></th>
          <th><span>Asset Name</span></th>
          <th><span>Balance ()</span></th>
          <th><span>Asset price</span></th>
          <th><span>Balance in $</span></th>
          <th><span>Description</span></th>    
        </tr>
      </thead>
      <tbody v-for="(item, indexIn) in portfolioData" :key="item.location+':'+item.meta.asset+':'+indexIn">
        <tr v-for="(portfolio, indexSub) in item.portfolio" @click="openAsset( item.portfolio )" :key="`sub-${ portfolio.location+':'+portfolio.asset+':'+indexSub }`">
          <td><span>{{ portfolio.location }}</span></td>
          <td><span>{{ portfolio.asset }}</span></td>
          <td><span>{{ +(portfolio.amount.toFixed(8)) }}</span></td>
          <td><span>{{ +(portfolio.priceInUsd.toFixed(8)) }}</span></td>
          <td><span>{{ +(portfolio.totalInUsd.toFixed(2)) }}</span></td>
          <td><span>{{ portfolio.description }}</span></td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
<script>
import AssetsPopup from '@/components/portfolio/components/AssetsPopup.vue';
import AddAssetsPopup from '@/components/portfolio/components/AddAssetsPopup.vue';
import IconPlus from '@/components/common/icons/IconPlus.vue';
import ButtonPrimaryIcon from '@/components/common/buttons/ButtonPrimaryIcon.vue';

import { mapState, mapActions, mapGetters } from 'vuex';

export default {
  name: 'PortfolioModule',
  components: {
    AssetsPopup,
    AddAssetsPopup,
    ButtonPrimaryIcon,
    IconPlus,
  },
  data() {
    return {
      popup: false,
      assets: {},
      addAssetsPopup: false,
    };
  },
  computed: {
    ...mapState('portfolio', [
      'portfolioData',
    ]),
  },
  methods: {

    addAsset(){ this.addAssetsPopup = true; },

    openAsset( portfolio ) {
      // this.assets = [];
      // for( let item of portfolio ) this.assets.push( item );
      this.assets = portfolio;
      this.popup = true;
    },
    ...mapActions({
      downloadPortfolio: 'portfolio/downloadPortfolio',
    }),
  },
  beforeMount(){
    this.downloadPortfolio();
  },
}
</script>
<style lang="scss">
@import '~@/scss/components/card';
@import '~@/scss/components/table';
$portfolio-module: portfolio-module;

.#{$portfolio-module} {
  border-bottom: 1px solid $N10;
  padding: 24px 0;
  @extend %card-desktop;
  @media screen and (min-width: $screen-tablet) {
    padding: 24px;
    margin-bottom: 24px;
    &:last-child {
      margin: 0;
    }
  }

  &__add-asset-btn{
    float: right;
  }
  &__header {
    margin-bottom: 24px;
  }
  &__title {
    @extend %card-title;
  }
  &__table {
    @extend %saas-table;
    thead {
      background-color: transparent;
    }
    tr {
      cursor: pointer;
    }
  }
}
</style>
