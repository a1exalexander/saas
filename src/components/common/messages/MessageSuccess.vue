<template>
<div class="message-success">
  <div class="message-success__image-wrapper">
    <icon-check class='message-success__image'/>
  </div>
  <p class="message-success__text">
    <slot/>
  </p>
</div>
</template>
<script>
import IconCheck from '@/components/common/icons/IconCheck.vue';

export default {
  name: 'MessageSuccess',
  components: {
    IconCheck,
  },
};
</script>
<style lang="scss">
@import '~@/scss/components/flag-message';
.message-success {
  background-color: $G2;
  @extend %flag-message;
  &__image-wrapper {
    @extend %flag-message-image-wrapper;
    background-color: $N0;
  }
  &__image {
    @extend %flag-message-image;
    fill: $G2;
  }
  &__text {
    @extend %flag-message-text;
    color: $N0;
  }
}
</style>
