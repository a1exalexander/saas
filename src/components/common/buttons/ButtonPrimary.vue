<template>
  <button class='button-primary' :disabled='disabled'>
    <div class="button-primary__border"></div>
    <slot/>
  </button>
</template>
<script>
export default {
  name: 'ButtonPrimary',
  props: {
    disabled: {
      type: Boolean,
      default: false,
    },
  },
};
</script>
<style lang="scss">
.button-primary {
  background-color: $B4;
  @include flex-row(center, center);
  color: $N0;
  font-size: $H500;
  font-weight: 400;
  border-radius: 2px;
  padding: 16px 20px;
  line-height: 1;
  transition-property: color, background-color, min-height, font-size, opacity;
  transition-duration: 0.2s;
  transition-timing-function: ease-in-out;
  position: relative;
  p, span {
    transition-property: color, background-color, min-height, font-size, opacity;
    transition-duration: 0.2s;
    transition-timing-function: ease-in-out;
  }
  @media screen and (min-width: $screen-tablet) {
    padding: 10px 20px;
    font-size: $H200;
    &:hover {
      background-color: $B3;
    }
  }
  &:focus &__border {
    visibility: visible;
    opacity: 1;
  }
  &:active {
    background-color: $B5;
  }
  &:active &__border {
    opacity: 0;
  }
  &:disabled {
    background-color: $N10;
    color: $N8;
  }
  &__border {
    position: absolute;
    background-color: transparent;
    border-radius: 2px;
    border: 1px solid $B4;
    left: -2px;
    right: -2px;
    top: -2px;
    bottom: -2px;
    visibility: hidden;
    opacity: 0;
  }
}
</style>
