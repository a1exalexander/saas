<template>
<transition
      v-on:enter="enter"
      v-on:leave="leave">
  <div class="strategy-drop-menu-mobile">
    <strategy-drop-subitem v-for='n in 2' :key='n' :strategy="strategy"/>
    <div class="strategy-drop-menu-mobile__buttons">
    <subtle-icon>
      <icon-pencil class="icon-button-left"/>
      <span>Edit</span>
    </subtle-icon>
    <subtle-icon>
      <icon-trash class="icon-button-left"/>
      <span>Remove</span>
    </subtle-icon>
   </div>
  </div>
  </transition>
</template>
<script>
import 'velocity-animate';
import IconPencil from '@/components/common/icons/IconPencil.vue';
import IconTrash from '@/components/common/icons/IconTrash.vue';
import StrategyDropSubitem from './StrategyDropSubitem.vue';

export default {
  components: {
    IconPencil,
    IconTrash,
    StrategyDropSubitem,
  },
  data() {
    return {
      strategy: {
        avatar: '',
        name: 'Binance Crypto Fund',
        key: 'HX8S1XML-UHR780E',
        amount: '13,124.912',
      },
    };
  },
  methods: {
    enter(el, done) {
      Velocity(el, "slideDown", { duration: 200 })
    },
    leave(el, done) {
      Velocity(el, "slideUp", { duration: 200 })
    }
  },
}
</script>

<style lang="scss">
.strategy-drop-menu-mobile {
    padding: 0 28px 16px;
    background-color: $N15;
    border-bottom: 1px solid $N10;
  &__inner {
    @include flex-row(space-between, center);
    padding-bottom: 14px;
    border-bottom: 1px solid $N10;
  }
  &__item {
    @include flex-row(flex-start, center);
  }
  .image-wrapper {
    $size: 32px;
    width: $size;
    height: $size;
    flex-shrink: 0;
    flex-grow: 0;
    border-radius: 50%;
    margin-right: 12px;
    position: relative;
  }
  &__image {
    width: 100%;
    height: 100%;
    border-radius: 50%;
    background-color: white;
    object-fit: cover;
  }
  &__label {
    @include text($H500, 500, $N0);
    margin-bottom: 8px;
  }
  &__api {
     @include text($H100, 400, $N6);
  }
  &__value {
    @include text($H300, 500, $G1);
  }
  &__buttons {
    @include flex-row(space-between, center);
    max-width: 50%;
    padding: 25px 0;
  }
}
</style>

