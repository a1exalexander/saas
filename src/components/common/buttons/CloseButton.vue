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
.close-button {
  padding: 4px;
  &__image {
    width: 16px;
    height: 16px;
    fill: $N6;
  }
}
</style>
