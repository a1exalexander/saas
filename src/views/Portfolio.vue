<template>
  <div class="director-tab">
    <header class="director-tab__header">
      <h1 class="director-tab__title">Portfolio</h1>
    </header>
    <div class="director-tab__view">
      <balance-chart/>
      <portfolio-module/>
    </div>
  </div>
</template>
<script>
import PortfolioModule from '@/components/portfolio/PortfolioModule.vue';
import '@/scss/components/director.scss';
import BalanceChart from '@/components/portfolio/BalanceChart.vue';

export default {
  name: 'Portfolio',
  components: {
    PortfolioModule,
    BalanceChart,
  },
};
</script>