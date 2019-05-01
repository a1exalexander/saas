<template>
<div class="flag-message-success__wrapper">
  <div
    class="flag-message-success"
    @click='closeMessage'>
    <div class="flag-message-success__image-wrapper">
      <icon-check class='flag-message-success__image'/>
    </div>
    <p class="flag-message-success__text">
      {{ msg }}
    </p>
  </div>
</div>
</template>
<script>
import IconCheck from '@/components/common/icons/IconCheck.vue';
import { mapState, mapMutations } from 'vuex';

export default {
  name: 'FlagMessageSuccess',
  components: {
    IconCheck,
  },
  methods: {
    ...mapMutations('messages', [
      'closeMessage',
    ]),
  },
  computed: {
    ...mapState('messages', {
      msg: state => state.message.success,
    }),
  },
};
</script>
<style lang="scss">
@import '~@/scss/components/flag-message';
.flag-message-success {
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
