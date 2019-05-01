<template>
<label class="radio-input">
  <input
    type="radio"
    class="radio-input__input"
    :value="val"
    v-model="checked"
    @change="onChange">
  <div class="radio-input__inner">
    <div class="radio-input__cell" :class='{"radio-input__cell--margin": !!label}'>
      <div class='radio-input__image'></div>
    </div>
    <span v-if='!!label' class='radio-input__text'>{{ label }}</span>
  </div>
</label>
</template>
<script>

export default {
  name: 'Radio',
  props: ['val', 'value', 'label'],
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
}
</script>
<style lang="scss">
$radio-input: radio-input;
.#{$radio-input} {
  position: relative;
  @include flex-row(flex-start, center);
  z-index: 1;
  &__input {
    position: absolute;
    left: 2px;
    top: 6px;
    opacity: 0;
    z-index: -1;
    visibility: hidden;
    &:checked + .#{$radio-input}__inner {
      .#{$radio-input}__cell {
        background-color: $B4;
        border-color: $B4;
      }
      .#{$radio-input}__image {
        opacity: 1;
      }
      .#{$radio-input}__text {
        color: $N0;
      }
    }
  }
  &__inner {
    @include flex-row(flex-start, center);
  }
  &__cell {
    width: 16px;
    height: 16px;
    @include flex-row(center, center);
    background-color: $N8;
    border: 1px solid $N9;
    border-radius: 50%;
    transition-property: background-color, border-color;
    transition-duration: 0.2s;
    transition-timing-function: ease;
    cursor: pointer;
    &--margin {
        margin-right: 8px;
    }
  }
  &__image {
    width: 8px;
    height: 8px;
    background-color: $N0;
    opacity: 0;
    border-radius: 50%;
    transition-property: opacity;
    transition-duration: 0.2s;
    transition-timing-function: ease;
  }
  &__text {
    @include text($H500, 400, $N6);
    line-height: 1;
    transition: color ease-in-out 0.2s;
    cursor: pointer;
    @media screen and (min-width: $screen-tablet) {
      font-size: $H200;
    }
  }
}
</style>