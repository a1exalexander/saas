<template>
<button class='close-button'>
  <icon-close class="close-button__image"/>
</button>
</template>
<script>
import IconClose from '@/components/common/icons/IconClose.vue';

export default {
  name: 'CloseButton',
  components: {
    IconClose,
  },
};
</script>
<style lang="scss">
$close-button: close-button;
.#{$close-button} {
  padding: 4px;
  @media screen and (min-width: $screen-tablet) {
    &:hover .#{$close-button}__image {
      fill: $N5;
    }
  }
  &:active .#{$close-button}__image {
    fill: $N8;
  }
  &__image {
    width: 16px;
    height: 16px;
    fill: $N6;
    transition: fill ease-in-out 0.2s;
  }
}
</style>
