<template>
<div>
  <label
    class="trading-card__search-label trading-card__search-label--margin">
    <icon-search class="trading-card__search-icon"/>
    <input
      type="text"
      class="trading-card__search-input"
      v-model='search'
      placeholder="Search...">
  </label>
  <table class='trading-card__table trading-card__table--pairs'>
    <thead>
      <tr>
        <th><span>Pair</span></th>
        <th><span>Price</span></th>
        <th><span>Change</span></th>
      </tr>
    </thead>
    <tbody>
      <tr v-for='n in 0' :key='n'>
        <td>
          <icon-star
            class="trading-card__star"
            :class='{"trading-card__star--select": n%2}'/>
          <span>BTC/BTC</span></td>
        <td><span>{{ 2.535 | numeral('0.[000]') }}</span></td>
        <td><span>+55.6%</span></td>
      </tr>
    </tbody>
  </table>
</div>
</template>
<script>
import IconStar from '@/components/common/icons/IconStar.vue';
import IconSearch from '@/components/common/icons/IconSearch.vue';
import '@/scss/components/trading-card.scss';

export default {
  name: 'Favorites',
  components: {
    IconStar,
    IconSearch,
  },
  props: ['info'],
  data() {
    return {
      search: '',
      list: [],
    };
  },
  computedList: function () {
      var vm = this;
      // FIXME: change VALUE and LIST to target arrays or values
      return this.list.filter((item) => {
        return item.value.toLowerCase().indexOf(vm.search.toLowerCase()) !== -1
      })
    }
};
</script>
