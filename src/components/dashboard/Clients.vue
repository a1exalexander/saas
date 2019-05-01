<template>
  <section class="clients-graph">
    <header class="clients-graph__header">
      <div class="clients-graph__row clients-graph__row--end">
        <h2 class="clients-graph__title">Clients</h2>
        <span class="clients-graph__value allfunds__value--secondary tablet-inline"
          >{{ animatedNumber }} members
        </span>
        <div class="tumbler tablet-flex">
          <label
            class="tumbler__label"
            v-for="(item, index) in FilterTimeValues"
            :key='index'>
            <input
              type="radio"
              class="tumbler__input"
              name='filter-time-clients'
              :value='item.value'
              @change='updateData($event.target.value)'
              v-model='filterTime'>
            <span class="tumbler__text">{{ item.name }}</span>
          </label>
        </div>
      </div>
      <subtle-icon
        @click.native='filter = !filter'
        class="mobile-flex">
        <span>Filters</span>
        <icon-arrow-down
          :class="{'rotate-180': filter}"
          class='icon-button-right icon-larger'/>
      </subtle-icon>
      <button class="clients-graph__button tablet-flex">
        <icon-action-vertical class="clients-graph__button-icon"/>
      </button>
    </header>
    <transition
      name="custom-classes-transition"
      enter-active-class="animated dur02 fadeIn"
      leave-active-class="animated dur02 fadeOut"
      mode="out-in">
    <ClientsFilter @selectFilter='updateData' v-if='filter'/>
    </transition>
    <div class="clients-graph__row clients-graph__row--padding">
      <div class="clients-graph__col clients-graph__col--label mobile-flex">
        <span class="clients-graph__label">Members</span>
        <span class="clients-graph__value allfunds__value--secondary">{{ animatedNumber }}</span>
      </div>
      <div class="clients-graph__graph">
        <apexchart type=area height=120 :options="options" :series="series" />
      </div>
    </div>
  </section>
</template>
<script>
import SubtleIcon from '@/components/common/buttons/SubtleIcon.vue';
import IconArrowDown from '@/components/common/icons/IconArrowDown.vue';
import VueApexCharts from 'vue-apexcharts';
import IconActionVertical from '@/components/common/icons/IconActionVertical.vue';
import ClientsFilter from '@/components/dashboard/components/ClientsFilter.vue';
import '@/scss/components/tumbler.scss';
import '@/scss/components/graph-tooltip.scss';
import { TweenLite } from 'gsap';
import { mapGetters } from 'vuex';
import moment from 'moment-timezone';

export default {
  name: 'Clients',
  components: {
    IconArrowDown,
    SubtleIcon,
    apexchart: VueApexCharts,
    IconActionVertical,
    ClientsFilter,
  },
  data() {
    return {
      clientsSum: 1233,
      tweenedNumber: 0,
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
          name: 'Clients',
          type: 'line',
          data: [
            [1333922402, 34.430],
            [1333922403, 45.922],
            [1333922404, 47.244],
            [1333922405, 26.302],
            [1333922407, 55.024],
            [1333922409, 39.988],
            [1333922411, 56.62],
            [1333922412, 58.987],
            [1333922415, 48.02],
            [1333922416, 33.547],
          ],
        },
      ],
      options: {
        responsive: [{
          breakpoint: 768,
          options: {
            colors: ['#9399a3'],
            grid: {
              xaxis: {
                lines: {
                  show: false,
                },
              },
            },
            chart: {
              height: 70,
            },
          },
        }],
        colors: ['#3162ff'],
        fill: {
          type: ['gradient'],
          gradient: {
            shade: 'light',
            type: "horizontal",
            shadeIntensity: 0.5,
            gradientToColors: ['#649bff'], // optional, if not defined - uses the shades of same color in series
            inverseColors: false,
            opacityFrom: 1,
            opacityTo: 1,
            stops: [0, 100],
            colorStops: []
          },
        },
        stroke: {
          curve: 'straight',
          width: 2,
        },  
        legend: {
          show: false,
        },
        chart: {
          fontFamily: '"sfpro", -apple-system, BlinkMacSystemFont, sans-serif',
          toolbar: {
            show: false,
          },
        },
        dataLabels: {
          enabled: false
        },
        markers: {
          size: 0
        },
        row: {
          colors: undefined,
          opacity: 0
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
                <span class="graph-tooltip__value"
                >${series[seriesIndex][dataPointIndex]} members</span> 
                <span class="graph-tooltip__date"
                  >${moment.unix(w.config.series[seriesIndex].data[dataPointIndex][0]).format('DD MMMM, YYYY')}
                </span> 
              </div>`
          },
          y: {
            formatter(y) {
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
    }
  },
  methods: {
    updateData(timeline) {
      console.log(timeline);
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
  computed: {
    animatedNumber() {
      return this.tweenedNumber.toFixed(0);
    },
  },
  mounted() {
    TweenLite.to(this.$data, 1, { tweenedNumber: this.clientsSum });
  },
  watch: {
    clientsSum(newValue) {
      TweenLite.to(this.$data, 1, { tweenedNumber: newValue });
    },
  },
};
</script>
<style lang="scss">
.clients-graph {
  overflow-x: hidden;
  &__col {
    @include flex-col(flex-start, flex-start);
    margin-right: 16px;
    &--label {
      padding-top: 6px;
    }
  }
  &__row {
    @include flex-row(flex-start, flex-start);
    &--end {
      align-items: flex-end;
    }
    &--padding {
      padding: 0 28px;
      @media screen and (min-width: $screen-tablet) {
        padding: 0;
      }
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
  &__title {
    @include text($H600, 500);
    @media screen and (min-width: $screen-tablet) {
      font-size: $H800;
      margin-right: 16px;
    }
  }
  &__label {
    @include text($H300, 400, $N6);
    letter-spacing: 0.5px;
    margin-bottom: 12px;
  }
  &__text {
    @include text($H300, 400);
    letter-spacing: 0.5px;
  }
  &__value {
    @include text($H800, 400, $G2);
    @media screen and (min-width: $screen-tablet) {
      font-size: $H500;
      margin-right: 50px;
    }
  }
  &__graph {
    flex: 1 1;
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

