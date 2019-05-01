<template>
<div class="flag-message-error__wrapper">
  <div
    class="flag-message-error"
    @click='closeMessage'>
    <icon-warning class='flag-message-error__image'/>
    <p class="flag-message-error__text">
      {{ msg }}
    </p>
  </div>
</div>
</template>
<script>
import IconWarning from '@/components/common/icons/IconWarning.vue';
import { mapState, mapMutations } from 'vuex';

export default {
  name: 'FlagMessageError',
  components: {
    IconWarning,
  },
  methods: {
    ...mapMutations('messages', [
      'closeMessage',
    ]),
  },
  computed: {
    ...mapState('messages', {
      msg: state => state.message.error,
    }),
  },
};
</script>
<style lang="scss">
@import '~@/scss/components/flag-message';
.flag-message-error {
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
