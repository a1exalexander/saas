<template>
  <button class='subtle-icon'>
    <div class="subtle-icon__border"></div>
    <slot/>
  </button>
</template>
<script>
export default {
  name: 'SubtleIcon',
};
</script>
<style lang="scss">
.subtle-icon {
  background-color: transparent;
  @include flex-row(flex-start, center);
  color: $B2;
  font-size: $H500;
  font-weight: 500;
  line-height: 1;
  transition: color ease-in-out 0.2s;
  position: relative;
  border-radius: 2px;
  @media screen and (min-width: $screen-tablet) {
    font-size: $H200;
    &:hover {
      color: $B1;
      svg {
        fill: $B1;
      }
    }
  }
  &:focus {
    svg {
      fill: $B2;
    }
  }
  &:focus &__border {
    visibility: visible;
    opacity: 1;
  }
  &:active {
    color: $B5;
    svg {
      fill: $B5;
    }
  }
  &:active &__border {
    opacity: 0;
  }
  span, p {
    position: relative;
    bottom: 1px;
  }
  svg {
    transition: fill ease-in-out 0.2s;
    fill: $B2;
    width: 16px;
    height: 16px;
  }
  &:disabled {
    color: $N9;
    svg {
      fill: $N9;
    }
  }
  &__border {
    position: absolute;
    background-color: transparent;
    border-radius: 2px;
    border: 1px solid $B2;
    left: -6px;
    right: -6px;
    top: -4px;
    bottom: -4px;
    visibility: hidden;
    opacity: 0;
  }
}
</style>
