<template>
<label class='strategy-exchange-checkbox'>
  <input
    type="checkbox"
    class="strategy-exchange-checkbox__input"
    :value="val"
    v-model="checked"
    @change="onChange">
  <div class='strategy-exchange-checkbox__checkbox-border'></div>
  <div class='strategy-exchange-checkbox__row'>
    <div class='strategy-exchange-checkbox__inner'>
      <div class='strategy-exchange-checkbox__image-wrapper'>
        <img src='' alt='image' v-if='false'/>
      </div>
      <span class='strategy-exchange-checkbox__text'>{{ label }}</span>
    </div>
    <div class='strategy-exchange-checkbox__checkbox'>
      <div class="strategy-exchange-checkbox__checkbox-inner">
        <div class="strategy-exchange-checkbox__checkbox-cell">
          <icon-check class='strategy-exchange-checkbox__checkbox-image'/>
        </div>
      </div>
    </div>
  </div>
</label>
</template>
<script>
import IconCheck from '@/components/common/icons/IconCheck.vue';

export default {
  name: 'ExchangeCheckbox',
 props: ['val', 'value', 'label'],
  components: {
    IconCheck,
  },
  computed: {
	  checked: {
      get() {
        return this.value;
      },
      set(val) {
        this.checkedProxy = val;
      }
    }
  },
  methods: {
    onChange(e) {
      this.$emit('input', this.checkedProxy)
    }
  },
};
</script>
<style lang="scss">
$strategy-exchange-checkbox: strategy-exchange-checkbox;
.#{$strategy-exchange-checkbox} {
  position: relative;
  padding: 12px 16px;
  border: 1px solid $N10;
  background-color: $N13;
  border-radius: 4px;
  width: 100%;
  margin-bottom: 13px;
  z-index: 2;
  @include flex-row(stretch, stretch);
  &:last-of-type {
    margin-bottom: 24px;
  }
  &__row {
    flex: 1 1;
    @include flex-row(space-between, center);
  }
  &__inner {
    @include flex-row(space-between, center);
  }
  &__image-wrapper {
    width: 24px;
    height: 24px;
    background-color: $N10;
    border-radius: 50%;
    overflow: hidden;
    margin-right: 8px;
  }
  &__image {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
  &__text {
    @include text($H400, 600, $N6);
    transition: color ease 0.2s;
  }
  &__checkbox {
    position: static;
    @include flex-row(flex-start, center);
  }
  &__checkbox-border {
    position: absolute;
    top: -1px;
    right: -1px;
    left: -1px;
    bottom: -1px;
    border: 1px solid transparent;
    background-color: transparent;
    border-radius: 4px;
    transition: border-color ease 0.2s;
    z-index: 3;
  }
  &__input {
    position: absolute;
    left: 2px;
    top: 6px;
    opacity: 0;
    z-index: -1;
    visibility: hidden;
    &:checked + .#{$strategy-exchange-checkbox}__checkbox-border {
      border-color: $B3;
    }
    &:checked ~ .#{$strategy-exchange-checkbox}__row {
      .#{$strategy-exchange-checkbox}__text {
          color: $N0;
        }
      .#{$strategy-exchange-checkbox}__checkbox {
        .#{$strategy-exchange-checkbox}__checkbox-cell {
          background-color: $B4;
          border-color: $B4;
        }
        .#{$strategy-exchange-checkbox}__checkbox-image {
          opacity: 1;
        }
      }
    }
  }
  &__checkbox-inner {
    @include flex-row(flex-start, center);
  }
  &__checkbox-cell {
    width: 22px;
    height: 22px;
    @include flex-row(center, center);
    background-color: $N8;
    border: 1px solid $N9;
    border-radius: 4px;
    transition-property: background-color, border-color;
    transition-duration: 0.2s;
    transition-timing-function: ease-in-out;
    cursor: pointer;
    @media screen and (min-width: $screen-tablet) {
      width: 16px;
      height: 16px;
    }
  }
  &__checkbox-image {
    margin-left: 1px;
    width: 12px;
    height: 12px;
    fill: $N0;
    opacity: 0;
    transition-property: fill, opacity;
    transition-duration: 0.2s;
    transition-timing-function: ease-in-out;
    @media screen and (min-width: $screen-tablet) {
      width: 9px;
      height: 9px;
    }
  }
}
</style>