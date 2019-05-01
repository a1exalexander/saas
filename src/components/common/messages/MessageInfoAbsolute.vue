<template>
<div class="message-info-absolute__wrapper">
  <div
    class="message-info-absolute"
    @click='close'>
    <icon-info class='message-info-absolute__image'/>
    <p class="message-info-absolute__text">
      <slot/>
    </p>
  </div>
</div>
</template>
<script>
import IconInfo from '@/components/common/icons/IconInfo.vue';

export default {
  name: 'MessageInfoAbsolute',
  components: {
    IconInfo,
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
.message-info-absolute {
  @extend %flag-message;
  background-color: $N0;
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
    fill: $N9;
    margin-right: 8px;
  }
  &__text {
    @extend %flag-message-text;
    color: $N9;
  }
}
</style>
