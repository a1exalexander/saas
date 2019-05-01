<template>
  <div class="balance-chart">
    <header class="balance-chart__header">
      <h2 class="balance-chart__title">
        Chart Balance
      </h2>
      <div class="tumbler tablet-flex">
        <label
          class="tumbler__label"
          v-for="(item, index) in Chart.FilterTimeValues"
          :key='index'>
          <input
            type="radio"
            class="tumbler__input"
            name='filter-time-clients'
            :value='item.value'
            @change='updateData($event.target.value)'
            v-model='Chart.filterTime'>
          <span class="tumbler__text">{{ item.name }}</span>
        </label>
      </div>
    </header>
    <div class="balance-chart__graph">
      <apexchart type=area height=220 :options="Chart.options" :series="Chart.series" :key="totalItems" />
    </div>
  </div>
</template>
<script>
import '@/scss/components/tumbler.scss';
import '@/scss/components/graph-tooltip.scss';
import VueApexCharts from 'vue-apexcharts';
import { mapState, mapActions, mapGetters } from 'vuex';
import moment from 'moment-timezone';

export default {
  name: 'BalanceChart',
  components: {
    apexchart: VueApexCharts,
  },
  data() {
    return {

      totalItems: 0, 

      Chart:{

        filter: false,
        filterTime: 'all',
        FilterTimeValues: [
          {name: '1 week', value: 'week'},
          {name: '1 month', value: 'month'},
          {name: '1 year', value: 'year'},
          {name: 'All time', value: 'all'},
        ],
        series: [ {
          name: 'Chart Balance',
          type: 'area',
          data: [
            [1333922402, 39.1646],
            [1333922403, 49.5935],
            [1333922404, 27.3056],
            [1333922405, 34.5365],
            [1333922406, 55.0413],
            [1333922407, 37.9352],
            [1333922408, 37.1809],
            [1333922409, 38.5982],
            [1333922409, 31.3099],
          ],
        }, ],
        options: {
          responsive: [{
            breakpoint: 768,
            options: {
              colors: ['#9399a3'],
              grid: { xaxis: { lines: { show: false, }, }, },
              chart: { height: 70, },
            },
          }],
          colors: ['#3162ff'],
          fill: {
            type: ['gradient'],
            gradient: {
              shade: 'dark', type: "vertical", shadeIntensity: 0.5, gradientToColors: undefined, inverseColors: false, opacityFrom: 0.8, opacityTo: 0, stops: [0, 100], colorStops: []
            },
          },
          stroke: { curve: 'straight', width: 2, },  
          legend: { show: false, },
          chart: {
            fontFamily: '"sfpro", -apple-system, BlinkMacSystemFont, sans-serif',
            toolbar: { show: false, },
          },
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
      }, // Chart
    }
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
  },
};
</script>
<style lang="scss">
@import '~@/scss/components/card';
.balance-chart {
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
  &__header {
    @include flex-row(flex-start, flex-end);
    margin-bottom: 16px;
    padding: 0 28px;
    @media screen and (min-width: $screen-tablet) {
      padding: 0;
    }
  }
  &__title {
    @extend %card-title;
    padding-bottom: 2px;
    margin-right: 24px;
  }
}
</style>

