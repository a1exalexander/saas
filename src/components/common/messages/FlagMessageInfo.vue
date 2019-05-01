<template>
<div class="flag-message-info__wrapper">
  <div
    class="flag-message-info"
    @click='closeMessage'>
    <icon-info class='flag-message-info__image'/>
    <p class="flag-message-info__text">
      {{ msg }}
    </p>
  </div>
</div>
</template>
<script>
import IconInfo from '@/components/common/icons/IconInfo.vue';
import { mapState, mapMutations } from 'vuex';

export default {
  name: 'FlagMessageInfo',
  components: {
    IconInfo,
  },
  methods: {
    ...mapMutations('messages', [
      'closeMessage',
    ]),
  },
  computed: {
    ...mapState('messages', {
      msg: state => state.message.info,
    }),
  },
};
</script>
<style lang="scss">
@import '~@/scss/components/flag-message';
.flag-message-info {
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
