<template>
  <div class="strategies-chart">
    <header class="strategies-chart__header">
      <h2 class="strategies-chart__title">Chart Balance</h2>
      <subtle-icon
        class="mobile-flex"
        @click.native='filter = !filter'>
        <span>Filters</span>
        <icon-arrow-down
          :class="{'rotate-180': filter}"
          class='icon-button-right icon-larger'/>
      </subtle-icon>
    </header>
    <transition
      name="custom-classes-transition"
      enter-active-class="animated dur02 fadeIn"
      leave-active-class="animated dur02 fadeOut"
      mode="out-in">
    <strategies-chart-filter-mobile
      @updateData='updateData'
      v-if='filter'/>
    </transition>
    <div class="strategies-chart__box-wrapper">
      <div class="strategies-chart__box">
        <strategies-chart-filter-desktop
          @updateData='updateData'
          class="strategies-chart__filter-desktop"/>
        <div class="strategies-chart__graph">
          <apexchart height=150 :options="Chart.options" :series="Chart.series" />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import IconArrowDown from '@/components/common/icons/IconArrowDown.vue';
import StrategiesChartFilterDesktop from './StrategiesChartFilterDesktop.vue';
import StrategiesChartFilterMobile from './StrategiesChartFilterMobile.vue';
import '@/scss/components/graph-tooltip.scss';
import VueApexCharts from 'vue-apexcharts';
import moment from 'moment-timezone';

export default {
  name: 'StrategiesChart',
  components: {
    IconArrowDown,
    StrategiesChartFilterDesktop,
    StrategiesChartFilterMobile,
    apexchart: VueApexCharts,
  },
  data() {
    return {
      filter: false,
      Chart: {
        series: [ {
          name: 'Chart Balance',
          type: 'area',
          data: [
            [1333922402, 33.22],
            [1333922403, 20.61],
            [1333922404, 60.61],
            [1333922405, 53.61],
            [1333922407, 43.61],
            [1333922409, 60.61],
            [1333922411, 62.61],
            [1333922412, 61.61],
            [1333922415, 35.61],
            [1333922416, 45.61],
          ],
        }, ],
        options: {
          responsive: [{
            breakpoint: 768,
            options: {
              chart: {
                height: 120,
              },
            }
          }],
          chart: {
            fontFamily: '"sfpro", -apple-system, BlinkMacSystemFont, sans-serif',
            toolbar: { show: false, },
            type: 'line',
          },
          colors: ['#2550d9'],
          fill: {
            type: ['gradient'],
            gradient: {
              shade: 'dark',
              type: "vertical",
              shadeIntensity: 0.5,
              gradientToColors: undefined,
              inverseColors: false,
              opacityFrom: 0.6,
              opacityTo: 0,
              stops: [0, 100],
              colorStops: []
            },
          },
          stroke: { curve: 'straight', width: 1, },  
          legend: { show: false, },
          
          dataLabels: { enabled: false },
          markers: { size: 0 },
          row: { colors: undefined, opacity: 0 },
          grid: {
            borderColor: '#313438',
            xaxis: { lines: { show: true, }, },
            yaxis: { lines: { show: false, }, }
          },
          xaxis: {
            type: 'datetime',
            labels: { show: false, },
            axisBorder: { show: false, },
            axisTicks: { show: false, },
          },
          yaxis: {
            labels: { show: false, },
            axisBorder: { show: false, },
            axisTicks: { show: false, },
          },
          tooltip: {
            shared: true,
            theme: 'dark',
            intersect: false,
            custom({series, seriesIndex, dataPointIndex, w}) {
              return `<div class="graph-tooltip">
                  <span class="graph-tooltip__name">${w.config.series[seriesIndex].name}</span>
                  <span class="graph-tooltip__value"
                  >$${series[seriesIndex][dataPointIndex]}</span> 
                  <span class="graph-tooltip__date"
                    >${moment.unix(w.config.series[seriesIndex].data[dataPointIndex][0]).format('DD MMMM, YYYY')}
                  </span> 
                </div>`
            },
            y: {
              formatter(y) {
                return (typeof y !== "undefined") ? (y.toFixed(0) + " points") : y;
              },
            },
            x: {
              formatter(x) {
                return (typeof x !== "undefined") ? (moment.unix(x).format('DD.MM.YY HH:mm')) : x;
              },
            },
          },
        },
      },
    };
  },
  methods: {
    updateData(timeline) {
      switch (timeline) {
        case 'week':
          this.Chart.options = Object.assign({}, this.Chart.options, {
            xaxis: {
              min: moment().subtract(1, 'week').unix(),
              max: moment().unix(),
            }
          })
          break;
        case 'month':
          this.Chart.options = {
            xaxis: {
              min: moment().subtract(1, 'month').unix(),
              max: moment().unix(),
            }
          }
          break;
        case 'year':
          this.Chart.options = Object.assign({}, this.Chart.options, {
            xaxis: {
              min: moment().subtract(1, 'year').unix(),
              max: moment().unix(),
            }
          })
          break;
        case 'all':
          this.Chart.options = {
            xaxis: {
              min: undefined,
              max: undefined,
            }
          }
          break;
        default:
      }
    }
  }
}
</script>
<style lang="scss">
.strategies-chart {
  margin-bottom: 28px;
  &__filter-desktop {
    @include isTablet(flex);
    width: max-content;
  }
  &__title {
    @include text($H700, 500, $N0);
    @media screen and (min-width: $screen-tablet) {
      font-size: $H800;
    }
  }
  &__box {
    @extend %card-desktop;
  }
  &__box-wrapper {
    padding: 0 29px;
    @media screen and (min-width: $screen-tablet) {
      padding: 0 40px;
    }
  }
  &__header {
    padding: 0 28px 16px;
    @include flex-row(space-between, center);
    @media screen and (min-width: $screen-tablet) {
      padding: 0 40px 16px;
      margin-bottom: 12px;
    }
  }
}
</style>
