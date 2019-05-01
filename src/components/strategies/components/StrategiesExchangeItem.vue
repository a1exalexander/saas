<template>
  <div class="strategies-exchange-item" :class='{"strategies-exchange-item--move": !selected}'>
    <div class="strategies-exchange-item__img-wrapper">
      <img class="strategies-exchange-item__img" src="@/assets/images/svg/shuffle.svg" alt="shuffle">
    </div>
    <div class="strategies-exchange-item__col">
      <h2 class="strategies-exchange-item__title">{{ exchange.name }}</h2>
      <span class="strategies-exchange-item__subtitle">API Key:</span>
      <p class="strategies-exchange-item__api">{{ exchange.api }}</p>
    </div>
    <icon-move class="strategies-exchange-item__icon-move" v-if='!selected'/>
    <close-button
      @click.native='$emit("removeItem")'
      class="strategies-exchange-item__close-button"
      v-else/>
  </div>
</template>
<script>
import IconMove from '@/components/common/icons/IconMove.vue';
import IconClose from '@/components/common/icons/IconClose.vue';
import CloseButton from '@/components/common/buttons/CloseButton.vue';

export default {
  name: 'StrategiesExchangeItem',
  props: {
    exchange: {
      type: Object,
      required: true,
    },
    selected: {
      type: Boolean,
    },
  },
  components: {
    IconMove,
    IconClose,
    CloseButton,
  },
};
</script>
<style lang="scss">
.strategies-exchange-item {
  @include flex-row(flex-start, center);
  padding: 10px 16px 14px 22px;
  min-height: 82px;
  background-color: $N13;
  border: 1px solid $N10;
  border-radius: 2px;
  margin-bottom: 24px;
  width: 280px;
  position: relative;
  @extend %item-transition;
  @media screen and (min-width: $screen-netbook) {  
    width: 320px;
  }
  @media screen and (min-width: $screen-desktop) {  
    width: 338px;
  }
  &:last-child {
    margin-bottom: 0;
  }
  &--move {
    cursor: move;
  }
  &__img-wrapper {
    $size: 32px;
    width: $size;
    height: $size;
    overflow: hidden;
    margin-right: 22px;
  }
   &__img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
  &__title {
    @include text($H400, 500);
    margin-bottom: 6px;
    @media screen and (min-width: $screen-netbook) {  
      font-size: $H500;
    }
  }
  &__subtitle {
    @include text($H100, 600, $N8);
    margin-bottom: 2px;
    display: block;
  }
  &__api {
    @include text($H200, 500, $N5);
    @media screen and (min-width: $screen-netbook) {  
      font-size: $H300;
    }
  }
  &__icon-move {
    $size: 16px;
    width: $size;
    height: $size;
    fill: $N9;
    position: absolute;
    right: 12px;
    top: 12px;
  }
  &__close-button {
    position: absolute;
    right: 8px;
    top: 6px;
    svg {
      $size: 10px;
      width: $size;
      height: $size;
    }
  }
}
</style>

