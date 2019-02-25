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
  padding: 6px;
  &__image {
    width: 20px;
    height: 20px;
    fill: $N6;
  }
}
</style>
