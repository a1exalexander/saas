<template>
<div class="message-success-absolute__wrapper">
  <div
    class="message-success-absolute"
    @click='close'>
    <div class="message-success-absolute__image-wrapper">
      <icon-check class='message-success-absolute__image'/>
    </div>
    <p class="message-success-absolute__text">
      <slot/>
    </p>
  </div>
</div>
</template>
<script>
import IconCheck from '@/components/common/icons/IconCheck.vue';

export default {
  name: 'MessageSuccessAbsolute',
  components: {
    IconCheck,
  },
  methods: {
    close() {
      this.$emit('close');
    },
  },
};
</script>
<style lang="scss">
@import '~@/scss/components/flag-message';
.message-success-absolute {
  @extend %flag-message;
  background-color: $G2;
  border-radius: 0;
  @media screen and (min-width: $screen-tablet) {
    border-radius: 2px;
  }
  &__wrapper {
    @extend %flag-message-wrapper;
  }
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
