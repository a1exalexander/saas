<template>
  <div class="strategies-item">
    <div class="strategies-item__img-wrapper">
      <img src="@/assets/images/svg/shuffle.svg" alt="shuffle">
    </div>
    <div class="strategies-item__col">
      <h2 class="strategies-item__title">Top 10 sells</h2>
      <p class="strategies-item__balance">Total balance: <span class="strategies-item__value">1000$</span></p>
      <p class="strategies-item__balance">Total invested balance: <span class="strategies-item__value">500$</span></p>
    </div>
    <div
      @mouseover="popover.edit = true"
      class="strategies-item__icon-wrapper">
      <button class="strategies-item__icon-btn">
        <icon-action-vertical/>
      </button>
    </div>
    <transition
          name="custom-classes-transition"
          enter-active-class="animated dur02 fadeIn"
          leave-active-class="animated dur02 fadeOut"
          mode="out-in">
        <div
          @mouseover.native="popover.edit = true"
          @mouseleave="popover.edit = false"
          class="popover-menu strategies-item__popover"
          v-if='popover.edit'>
          <div class="popover-menu__inner" @click.stop.prevent>
            <a class="popover-menu__item">
              <icon-pencil class='popover-menu__icon'/>
              <span class="popover-menu__text">Edit</span>
            </a>
            <a class="popover-menu__item">
              <icon-trash class='popover-menu__icon'/>
              <span class="popover-menu__text">Remove</span>
            </a>
          </div>
        </div>
   </transition>
  </div>
</template>
<script>
import IconActionVertical from '@/components/common/icons/IconActionVertical.vue';
import IconPencil from '@/components/common/icons/IconPencil.vue';
import IconTrash from '@/components/common/icons/IconTrash.vue';

export default {
   name: 'StrategiesItem',
   components: {
    IconActionVertical,
    IconPencil,
    IconTrash,
  },
  data() {
    return {
      dropMenu: false,
      removePopup: false,
      popover: {
        edit: false,
      }
    };
  },
}
</script>

<style lang="scss">
.strategies-item {
  @include flex-row(flex-start, center);
  cursor: pointer;
  padding: 10px 16px 14px 22px;
  background-color: $N13;
  border: 1px solid $N10;
  border-radius: 2px;
  width: 340px;
  min-height: 82px;
  margin-bottom: 24px;
  position: relative;
  margin-right: 32px;
  &:last-child {
    margin-bottom: 0;
    margin-right: 0;
  }
  &__img-wrapper {
    $size: 32px;
    width: $size;
    height: $size;
    margin-right: 22px;
  }
  &__title {
    @include text($H500, 500, $N0);
    margin-bottom: 6px;
  }
  &__balance {
    @include text($H100, 600, $N8);
    margin-bottom: 2px;
    display: block;
  }
  &__value {
    @include text($H100, 500, $N0);
    display: inline-block;
    margin-left: 8px;
  }
  &__icon-wrapper {
    position: absolute;
    top: 8px;
    right: 4px;
  }
  &__icon-btn {
   $size: 24px;
    width: $size;
    height: $size;
    &>* {
      fill: $N0;
      transition: fill .2s ease;
      &:hover {
      fill: $B2;
      }
    }
  }
  &__popover {
    padding-top: 6px !important;
    padding-right: 32px !important;
    top: 2px;
    right: 0;
  }
}
</style>

