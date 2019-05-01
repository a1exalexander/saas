<template>
  <div class="step-item">
    <step-image
      class='step-item__image'
      :success='readySecond'
      :class='{"status-bar-active": readyFirst}'>{{ stepNumber }}
    </step-image>
    <p class="step-item__label">{{ label }}</p>
    <div
      class="step-item__line"
      v-if='line'
      :class='{"status-bar-active": readySecond}'>
    </div>
    <div class='step-item__input-box' v-if='readyFirst'>
      <slot/>
    </div>
  </div>
</template>
<script>
import StepImage from '@/components/common/StepImage.vue';

export default {
  name: 'StepItem',
  components: {
    StepImage,
  },
  props: {
    label: {
      type: String,
    },
    line: {
      type: Boolean,
      default: true,
    },
    readyFirst: {
      type: Boolean,
    },
    readySecond: {
      type: Boolean,
    },
    stepNumber: {
      type: Number,
    },
  },
};
</script>
<style lang="scss">
.step-item {
  @extend %status-bar-grid;
  grid-template-areas:
    'image-step label-step'
    'line-step input-step';
  margin-bottom: 18px;
  &__input-box {
    width: 100%;
    grid-area: input-step;
  }
  &__label {
    grid-area: label-step;
  }
  &__image {
    grid-area: image-step;
  }
  &__line {
    @extend %status-bar-line-new;
    grid-area: line-step;
  }
}
</style>

