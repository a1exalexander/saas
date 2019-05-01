<template>
<div class="message-error-absolute__wrapper">
  <div
    class="message-error-absolute"
    @click='close'>
    <icon-warning class='message-error-absolute__image'/>
    <p class="message-error-absolute__text">
      <slot/>
    </p>
  </div>
</div>
</template>
<script>
import IconWarning from '@/components/common/icons/IconWarning.vue';

export default {
  name: 'MessageErrorAbsolute',
  components: {
    IconWarning,
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
.message-error-absolute {
  @extend %flag-message;
  z-index: 101;
  background-color: $Y1;
  border-radius: 0;
  @media screen and (min-width: $screen-tablet) {
    border-radius: 2px;
  }
  &__wrapper {
    @extend %flag-message-wrapper;
  }
  &__image {
    width: 24px;
    height: 24px;
    flex-shrink: 0;
    fill: $N0;
    margin-right: 8px;
  }
  &__text {
    @extend %flag-message-text;
    color: $N0;
  }
}
</style>
