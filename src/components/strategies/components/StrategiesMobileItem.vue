<template>
<div
  class="strategies-mobile-item">
  <div @click='showDetails' class="strategies-mobile-item__card">
    <ul class="strategies-mobile-item__list">
      <li class="strategies-mobile-item__item">
        <p class="strategies-mobile-item__text strategies-mobile-item__text--name">{{ 'Road to million' }}</p>
      </li>
      <li class="strategies-mobile-item__item">
        <p class="strategies-mobile-item__text strategies-mobile-item__text--value">$ 129,632.725</p>
        <button
          class="strategies-mobile-item__icon-arrow-button"
          @click.stop.prevent='dropMenu = !dropMenu'>
        <icon-arrow-down
          class='strategies-mobile-item__icon-arrow'
          :class='{"rotate-180": dropMenu}'/>
        </button>
      </li>
    </ul>
  </div>
  <strategies-mobile-item-drop v-if='dropMenu'/>
</div>
</template>
<script>
import IconArrowDown from '@/components/common/icons/IconArrowDown.vue';
import StrategiesMobileItemDrop from './StrategiesMobileItemDrop';

export default {
  name: 'StrategiesMobileItem',
  components: {
    IconArrowDown,
    StrategiesMobileItemDrop,
  },
  data() {
    return {
      dropMenu: false,
    };
  },
  methods: {
    showDetails() {
      this.$emit('showDetails');
    },
  },
};
</script>
<style lang="scss">
.strategies-mobile-item {
  &__card {
    padding: 18px 20px 18px 28px;
    border-bottom: 1px solid $N10;
  }
  &__list {
    list-style: none;
    @include flex-row(space-between, center);
  }
  &__item {
    @include flex-row(flex-start, center);
    display: flex;
  }
  
  &__icon-arrow-button {
    margin-left: 16px;
    padding: 4px;
  }
  &__icon-arrow {
    width: 28px;
    height: 28px;
    fill: $N0;
  }
  &__text {
    font-size: $H500;
    font-weight: 500;
    color: $N0;
    transition: color ease-in-out 0.2s;
     &--value {
    @include text($H400, 500, $G1);
   }
  }
  &__button {
    color: $B3;
  }
}
</style>

