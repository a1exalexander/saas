<template>
<table class='strategies-details-table'>
    <thead>
      <tr>
        <th>
          <button
            @click='onSortChars("name")'
            class='strategies-details-table__sort-button'>
            <span class='strategies-details-table__head-text'>Asset name</span>
            <icon-triangle
              :class='{"rotate-180": sortType.name }'
              class='strategies-details-table__icon-sort'/>
          </button>
        </th>
        <th>
          <button
            @click='onSortNumbers("price")'
            class='strategies-details-table__sort-button'>
            <span class='strategies-details-table__head-text'>Asset price, $</span>
            <icon-triangle
              :class='{"rotate-180": sortType.price }'
              class='strategies-details-table__icon-sort'/>
          </button>
        </th>
        <th>
          <button
            @click='onSortNumbers("balance")'
            class='strategies-details-table__sort-button'>
            <span class='strategies-details-table__head-text'>Balance</span>
            <icon-triangle
              :class='{"rotate-180": sortType.balance }'
              class='strategies-details-table__icon-sort'/>
          </button>
        </th>
        <th>
          <button
            @click='onSortNumbers("balanceUsd")'
            class='strategies-details-table__sort-button'>
            <span class='strategies-details-table__head-text'>Balance, $</span>
            <icon-triangle
              :class='{"rotate-180": sortType.balanceUsd }'
              class='strategies-details-table__icon-sort'/>
          </button>
        </th>
        <th>
          <button
            @click='onSortChars("location")'
            class='strategies-details-table__sort-button'>
            <span class='strategies-details-table__head-text'>Location</span>
            <icon-triangle
              :class='{"rotate-180": sortType.location }'
              class='strategies-details-table__icon-sort'/>
          </button>
        </th>
        <th></th>    
      </tr>
    </thead>
    <tbody>
      <tr v-for="item in table" :key="item.price">
        <td><span>{{ item.name }}</span></td>
        <td><span>{{ item.price }} $</span></td>
        <td><span>{{ item.balance }}</span></td>
        <td><span>{{ item.balanceUsd }} $</span></td>
        <td><span>{{ item.location }}</span></td>
        <td><button class='strategies-details-table__dots'><icon-dots/></button></td>
      </tr>
    </tbody>
  </table>
</template>

<script>
import IconTriangle from '@/components/common/icons/IconTriangle.vue';
import IconDots from '@/components/common/icons/IconDots.vue';

export default {
  name: 'StrategiesDetailsTable',
  components: {
    IconTriangle,
    IconDots,
  },
  data() {
    return {
      sortType: {
        name: false,
        price: false,
        balance: false,
        balanceUsd: false,
        location: false,
      },
      sortNumers: true,
      table: [],
    }
  },
  methods: {
    async onSortNumbers(type) {
      this.onToggleSort(type);
      await this.$nextTick();
      if (this.sortType[type]) {
        this.table.sort((a, b) => Number(a[type]) - Number(b[type]));
      } else {
        this.table.reverse();
      }
      
    },
    async onSortChars(type) {
      this.onToggleSort(type);
      await this.$nextTick();
      if (this.sortType[type]) {
        this.table.sort((a, b) => {
          if (a[type] > b[type]) {
            return 1;
          }
          if (a[type] < b[type]) {
            return -1;
          }
          return 0;
        });
      } else {
        this.table.reverse();
      }
    },
    onToggleSort(type) {
      Object.keys(this.sortType).forEach(key => {
        key === type? this.sortType[key] = !this.sortType[key] : this.sortType[key] = false;
      })
    }
  },
  created() {
    for (let i = 0; i < 12; i++) {
      this.table.push({
        name: 'Etherium',
        price: `123${i}123`,
        balance: `432${i}134`,
        balanceUsd: `1244${i}324`,
        location: 'local',
      })
    }
  }
};
</script>

<style lang="scss">
@import '~@/scss/components/table';
.strategies-details-table {
  @extend %saas-table;
  thead {
    background-color: transparent;
  }
  tbody {
    max-height: auto;
    overflow-y: visible;
  }
  td {
    padding: {
      top: 24px !important;
      bottom: 24px !important;
    };
    border-bottom: 1px solid $N10;
  }
  td:first-child,
  th:first-child {
    padding-left: 40px !important;
  }
  td:last-child,
  th:last-child {
    padding-right: 40px !important;
  }
  &__sort-button {
    @include text($H200, 500, $N6);
    fill: $N6;
    @extend %text-transition;
    &:hover {
      color: $N4;
      fill: $N4;
    }
    &:active {
      color: $N6;
      fill: $N6;
    }
  }
  &__head-text {
    margin-right: 8px;
  }
  &__icon-sort {
    @extend %icon-transition;
    fill: inherit;
    width: 8px;
    height: 8px;
  }
  &__dots {
    fill: $B4;
    width: 24px;
    height: 24px;
  }
}
</style>
