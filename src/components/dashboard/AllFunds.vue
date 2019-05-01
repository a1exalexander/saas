<template>
  <section class="allfunds">
    <header class="allfunds__header">
      <div class="allfunds__row">
        <h2 class="allfunds__title">Amount of money</h2>
        <div class="tumbler tablet-flex">
          <label
            class="tumbler__label"
            v-for="(item, index) in FilterTimeValues"
            :key='index'>
            <input
              type="radio"
              class="tumbler__input"
              name='filter-time'
              :value='item.value'
              @change='updateData($event.target.value)'
              v-model='filterTime'>
            <span class="tumbler__text">{{ item.name }}</span>
          </label>
        </div>
      </div>
      <subtle-icon
        class="mobile-flex"
        @click.native='filter = !filter'>
        <span>Filters</span>
        <icon-arrow-down
          :class="{'rotate-180': filter}"
          class='icon-button-right icon-larger'/>
      </subtle-icon>
      <button class="allfunds__button tablet-flex">
        <icon-action-vertical class="allfunds__button-icon"/>
      </button>
    </header>
    <transition
      name="custom-classes-transition"
      enter-active-class="animated dur02 fadeIn"
      leave-active-class="animated dur02 fadeOut"
      mode="out-in">
    <AllFundsFilter v-if='filter'/>
    </transition>
    <div class="allfunds__value-wrapper">
      <div class="allfunds__row allfunds__row--label">
        <span class="allfunds__label">Invested funds</span>
        <span class="allfunds__value">${{ animatedInvested | numeral('0,0.[000]') }}</span>
      </div>
      <div class="allfunds__row allfunds__row--label">
        <span class="allfunds__label">All funds</span>
        <span class="allfunds__value">${{ animatedAll | numeral('0,0.[000]') }}</span>
      </div>
    </div>
    <div class="allfunds__graph">
      <apexchart type=line height=150 :options="options" :series="series" />
    </div>
  </section>
</template>
<script>
import SubtleIcon from '@/components/common/buttons/SubtleIcon.vue';
import IconActionVertical from '@/components/common/icons/IconActionVertical.vue';
import IconArrowDown from '@/components/common/icons/IconArrowDown.vue';
import AllFundsFilter from '@/components/dashboard/components/AllFundsFilter.vue';
import VueApexCharts from 'vue-apexcharts';
import '@/scss/components/tumbler.scss';
import '@/scss/components/graph-tooltip.scss';
import { TweenLite } from 'gsap';;
import { mapGetters, mapActions, mapState } from 'vuex';
import moment from 'moment-timezone';

export default {
  name: 'AllFunds',
  components: {
    IconArrowDown,
    SubtleIcon,
    AllFundsFilter,
    apexchart: VueApexCharts,
    IconActionVertical,
  },
  data() {
    return {
      total_balance: 234.234234,
      exchange_balance: 24.234234,
      tweenedAll: 0,
      tweenedInvested: 0,
      filter: false,
      filterTime: 'all',
      FilterTimeValues: [
        {name: '1 week', value: 'week'},
        {name: '1 month', value: 'month'},
        {name: '1 year', value: 'year'},
        {name: 'All time', value: 'all'},
      ],
      series: [
        {
          name: 'All Funds',
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
        },
        {
          name: 'Invested Funds',
          type: 'line',
          data: [
            [1333922402, 45.22],
            [1333922403, 33.61],
            [1333922404, 34.588],
            [1333922405, 59.909],
            [1333922407, 44.306],
            [1333922409, 33.317],
            [1333922411, 56.825],
            [1333922412, 24.542],
            [1333922415, 34.40],
            [1333922416, 43.676],
          ]
        },
      ],
      options: {
        responsive: [{
          breakpoint: 768,
          options: {
            chart: {
              height: 200,
            },
          },
        }],
        colors: ['#2550d9', '#ffab00', '#546E7A', '#E91E63', '#00b853'],
        stroke: {
          curve: 'straight',
          width: 2,
        },
        row: {
          colors: undefined,
          opacity: 0.5
        },  
        column: {
          colors: undefined,
          opacity: 0.5
        },  
        legend: {
          show: false,
        },
        fill: {
          type: ['gradient', 'solid'],
          gradient: {
            shade: 'dark',
            type: "vertical",
            shadeIntensity: 0.5,
            gradientToColors: undefined, // optional, if not defined - uses the shades of same color in series
            inverseColors: true,
            opacityFrom: 0.8,
            opacityTo: 0,
            stops: [0, 100],
            colorStops: []
          },
        },
        dataLabels: {
          enabled: false
        },
        markers: {
          size: 0
        },
        chart: {
          fontFamily: '"sfpro", -apple-system, BlinkMacSystemFont, sans-serif',
          toolbar: {
            show: false,
          },
        },
        grid: {
          borderColor: '#313438',
          xaxis: {
            lines: {
              show: true,
            },
          },
          yaxis: {
            lines: {
              show: false,
            },
          }
        },
        xaxis: {
          type: 'datetime',
          labels: {
            show: false,
          },
          axisBorder: {
            show: false,
          },
          axisTicks: {
            show: false,
          },
        },
        yaxis: {
          labels: {
            show: false,
          },
          axisBorder: {
            show: false,
          },
          axisTicks: {
            show: false,
          },
        },
        tooltip: {
          shared: true,
          theme: 'dark',
          intersect: false,
          custom({series, seriesIndex, dataPointIndex, w}) {
            return `<div class="graph-tooltip">
                <span class="graph-tooltip__name">${w.config.series[seriesIndex].name}</span>
                <span class="graph-tooltip__value ${seriesIndex === 1?'graph-tooltip__value--orange':''}"
                >${series[seriesIndex][dataPointIndex]} $</span> 
                <span class="graph-tooltip__date"
                  >${moment.unix(w.config.series[seriesIndex].data[dataPointIndex][0]).format('DD MMMM, YYYY')}
                </span> 
              </div>`
          },
          y: {
            formatter (y) {
              if (typeof y !== "undefined") {
                return y.toFixed(0) + " points";
              }
              return y;
            },
          },
          x: {
            formatter(x) {
              if (typeof x !== "undefined") {
                return  moment.unix(x).format('DD.MM.YY HH:mm');
              }
              return x;
            },
          },
        },
      },
    };
  },
  computed: {
    ...mapState('portfolio',[
      'chartData',
    ]),
    ...mapGetters({
      token: 'token',
    }),
    animatedAll() {
      return this.tweenedAll;
    },
    animatedInvested() {
      return this.tweenedInvested;
    },
  },
  methods: {
    updateData(timeline) {
      switch (timeline) {
        case 'week':
          this.options = Object.assign({}, this.options, {
            xaxis: {
              min: moment().subtract(1, 'week').unix(),
              max: moment().unix(),
            }
          })
          break;
        case 'month':
          this.options = {
            xaxis: {
              min: moment().subtract(1, 'month').unix(),
              max: moment().unix(),
            }
          }
          break;
        case 'year':
          this.options = Object.assign({}, this.options, {
            xaxis: {
              min: moment().subtract(1, 'year').unix(),
              max: moment().unix(),
            }
          })
          break;
        case 'all':
          this.options = {
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
  watch: {
    chartData(data) {
      if (data.length) this.series[0].data = [...data];
    },
    'total_balance'(newValue) {
      TweenLite.to(this.$data, 1, { tweenedAll: newValue });
    },
    'exchange_balance'(newValue) {
      TweenLite.to(this.$data, 1, { tweenedInvested: newValue });
    },
  },
  mounted() {
    TweenLite.to(this.$data, 1, { tweenedAll: this.total_balance });
    TweenLite.to(this.$data, 1, { tweenedInvested: this.exchange_balance });
  },
};
</script>
<style lang="scss">
.allfunds {
  &__row {
    @include flex-row(flex-start, flex-end);
    &--label {
      padding: 0 28px;
      margin-bottom: 8px;
      @media screen and (min-width: $screen-tablet) {
        margin-bottom: 0;
        margin-right: 16px;
      }
    }
    @media screen and (min-width: $screen-tablet) {
      padding: 0;
    }
  }
  &__header {
    @include flex-row(space-between, center);
    margin-bottom: 16px;
    padding: 0 28px;
    @media screen and (min-width: $screen-tablet) {
      padding: 0;
    }
  }
  &__value-wrapper {
    margin-bottom: 12px;
    @include flex-col(flex-start, flex-start);
    @media screen and (min-width: $screen-tablet) {
      flex-direction: row;
    }
  }
  &__title {
    @include text($H600, 500);
    @media screen and (min-width: $screen-tablet) {
      font-size: $H800;
      margin-right: 50px;
    }
  }
  &__label {
    @include text($H200, 400, $N4);
    letter-spacing: 0.5px;
    margin-right: 6px;
    @media screen and (min-width: $screen-tablet) {
      font-size: $H300;
      font-weight: 400;
      color: $N4;
      margin-right: 8px;
    }
  }
  &__text {
    @include text($H300, 400);
    letter-spacing: 0.5px;
  }
  &__value {
    @include text($H600, 500, $G2);
    @media screen and (min-width: $screen-tablet) {
      font-size: $H500;
      font-weight: 500;
    }
    &--secondary {
      color: $N0;
    }
  }
  &__button {
    padding: 4px;
  }
  &__button-icon {
    height: 24px;
    width: 24px;
    fill: $N6;
  }
}
</style>
