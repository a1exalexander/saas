<template>
  <div class="graph-filter">
    <div @click='date = !date' class="graph-filter__placeholder">
      <span class="graph-filter__caption">Date</span>
      <div class="graph-filter__icon-wrapper">
        <span class="graph-filter__text"
        >{{ params.find(e => e.value === selected).name }}</span>
        <icon-arrow-down
          :class="{'rotate-180': date}"
          class='graph-filter__icon'/>
      </div>
    </div>
    <transition
      v-on:enter="enter"
      v-on:leave="leave">
    <ul v-if='date' class="graph-filter__list">
      <li
        class="graph-filter__item"
        v-for='(item, index) in params'
        :key='index'>
        <label class="graph-filter__label">
          <input
            type="radio"
            class="graph-filter__input"
            name='allfunds-time'
            :value='item.value'
            v-model='selected'>
          <span
            class="graph-filter__text"
            >{{ item.name }}</span>
          <icon-check2
            class='graph-filter__icon
              graph-filter__icon--selected
              animated dur02 fadeIn'
            />
        </label>
      </li>
    </ul>
    </transition>
  </div>
</template>
<script>
import IconArrowDown from '@/components/common/icons/IconArrowDown.vue';
import IconCheck2 from '@/components/common/icons/IconCheck2.vue';
import '@/scss/components/director-graph.scss';
import 'velocity-animate';

export default {
  name: 'AllFundsFilter',
  data() {
    return {
      params: [
        {name: '1 week', value: 'week'},
        {name: '1 month', value: 'month'},
        {name: '1 year', value: 'year'},
        {name: 'All time', value: 'all'},
      ],
      selected: 'week',
      date: false,
    }
  },
  components: {
    IconArrowDown,
    IconCheck2,
  },
  methods: {
    select(item) {
      this.selected = item;
    },
    enter(el, done) {
      Velocity(el, "slideDown", { duration: 200 })
    },
    leave(el, done) {
      Velocity(el, "slideUp", { duration: 200 })
    }
  }
};
</script>
