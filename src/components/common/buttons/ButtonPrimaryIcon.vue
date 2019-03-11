<template>
  <button class='button-primary-icon'>
    <div class="button-primary-icon__border"></div>
    <slot/>
  </button>
</template>
<script>
export default {
  name: 'ButtonPrimary',
};
</script>
<style lang="scss">
.button-primary-icon {
  background-color: $B4;
  @include flex-row(center, center);
  color: $N0;
  font-size: $H500;
  font-weight: 400;
  padding: 16px 24px;
  border-radius: 2px;
  line-height: 1;
  transition-property: color, background-color, min-height, font-size;
  transition-duration: 0.2s;
  transition-timing-function: ease-in-out;
  position: relative;
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
    svg {
      fill: $N8;
    }
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
  svg {
    transition: fill ease-in-out 0.2s;
    fill: $N0;
    @media screen and (min-width: $screen-tablet) {
      align-self: flex-end;
    }
  }
  span, p {
    padding-bottom: 1px;
  }
}
</style>
