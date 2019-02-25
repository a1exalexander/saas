<template>
  <button class='button-secondary' :disabled='disabled'>
    <div class="button-secondary__border"></div>
    <slot/>
  </button>
</template>
<script>
export default {
  name: 'ButtonSecondary',
  props: {
    disabled: {
      type: Boolean,
      default: false,
    },
  },
};
</script>
<style lang="scss">
.button-secondary {
  background-color: $N9;
  @include flex-row(center, center);
  color: $N0;
  font-size: $H500;
  font-weight: 400;
  border-radius: 2px;
  padding: 16px 20px;
  line-height: 1;
  transition-property: color, background-color, min-height, font-size;
  transition-duration: 0.2s;
  transition-timing-function: ease-in-out;
  transition-duration: 0.2s;
  transition-timing-function: ease-in-out;
  position: relative;
  @media screen and (min-width: $screen-tablet) {
    padding: 10px 20px;
    font-size: $H200;
    &:hover {
      background-color: $N5;
      color: $N9;
    }
  }
  &:focus &__border {
    visibility: visible;
    opacity: 1;
  }
  &:active {
    background-color: $N8;
  }
  &:active &__border {
    opacity: 0;
  }
  &:disabled {
    background-color: $N9;
    color: $N8;
  }
  &__border {
    position: absolute;
    background-color: transparent;
    border-radius: 2px;
    border: 1px solid $N6;
    left: -2px;
    right: -2px;
    top: -2px;
    bottom: -2px;
    visibility: hidden;
    opacity: 0;
  }
}
</style>
