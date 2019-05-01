<template>
<div
  class="strategies-mobile-details-item">
  <div class="strategies-mobile-details-item__card">
    <ul class="strategies-mobile-details-item__list">
      <li class="strategies-mobile-details-item__item">
        <div class="strategies-mobile-details-item__image-wrapper">
           <img 
            class="strategies-mobile-details-item__image"
            src="@/assets/images/svg/StrategiesAva.svg"
            alt="">
        </div> 
        <p class="strategies-mobile-details-item__text strategies-mobile-details-item__text--name">Ethereum</p>
      </li>
      <li class="strategies-mobile-details-item__item">
         <p class="strategies-mobile-details-item__text strategies-mobile-details-item__text--value">76 078 $</p>
        <button
          class="strategies-mobile-details-item__icon-arrow-button"
          @click.stop.prevent='dropMenu = !dropMenu'>
        <icon-arrow-down
          class='strategies-mobile-details-item__icon-arrow'
          :class='{"rotate-180": dropMenu}'/>
        </button>
      </li>
    </ul>
  </div>
  <strategies-mobile-details-item-drop v-if='dropMenu'/>
</div>
</template>
<script>
import IconArrowDown from '@/components/common/icons/IconArrowDown.vue';
import StrategiesMobileDetailsItemDrop from './StrategiesMobileDetailsItemDrop';

export default {
  name: 'StrategiesMobileItem',
  components: {
    IconArrowDown,
    StrategiesMobileDetailsItemDrop,
  },
  data() {
    return {
      dropMenu: false,
    };
  },
  methods: {
  },
};
</script>
<style lang="scss">
.strategies-mobile-details-item {
  &__card {
    padding: 14px 28px;
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
  &__image {
    margin-right: 10px;
    width: 24px;
    height: 24px;
  }
}
</style>

