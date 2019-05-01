<template>
<div
  class="step-image
        animated dur05 fadeIn">
  <icon-check class="step-image__image" v-if='success'/>
  <span class="step-image__number" v-else>
    <slot/>
  </span>
</div>
</template>
<script>
import IconCheck from '@/components/common/icons/IconCheck.vue';

export default {
  name: 'StepImage',
  props: {
    success: {
      type: Boolean,
    },
  },
  components: {
    IconCheck,
  },
};
</script>
<style lang="scss">
.step-image {
  @extend %status-bar-image-wrapper;
  &__image {
    @extend %status-bar-image;
  }
  &__number {
    @extend %status-bar-number;
  }
}
</style>
