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
    width: 18px;
    height: 18px;
    fill: $N6;
  }
}
</style>
