<template>
<div class="tumbler">
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
</template>
<script>
import '@/scss/components/tumbler.scss';

export default {
  name: 'StrategiesChartFilterDesktop',
  data() {
    return {
      filterTime: 'all',
      FilterTimeValues: [
        {name: '1 week', value: 'week'},
        {name: '1 month', value: 'month'},
        {name: '1 year', value: 'year'},
        {name: 'All time', value: 'all'},
      ],
    };
  },
  methods: {
    updateData(timeline) {
      this.$emit('updateData', timeline);
    },
  }
}
</script>

