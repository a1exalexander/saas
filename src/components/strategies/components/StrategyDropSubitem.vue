<template>
<div class="strategy-drop-subitem">
  <div class="strategy-drop-subitem__item">
    <div class="image-wrapper">
      <img 
        class="image"
        :src="strategy.avatar"
        alt="avatar"
        v-if='strategy.avatar'>
      <icon-ava
        class="default-ava"
        v-else/>
    </div> 
    <div class="strategy-drop-subitem__text">
      <p class="strategy-drop-subitem__label">{{ strategy.name }}</p>
      <p class="strategy-drop-subitem__api">{{ strategy.key }}</p>
    </div>
  </div>
  <div class="strategy-drop-subitem__item">
    <p class="strategy-drop-subitem__value">$ {{ strategy.amount }}</p>
  </div>
</div>
</template>
<script>
import IconAva from '@/components/common/icons/IconAva.vue';

export default {
  name: 'StrategyDropSubitem',
  components: {
    IconAva,
  },
  props: {
    strategy: {
      type: Object,
      required: true,
    },
  },
};
</script>
<style lang="scss">
.strategy-drop-subitem {
  @include flex-row(space-between, center);
  padding: 16px 0 14px;
  border-bottom: 1px solid $N10;
  &__label {
    @include text($H500, 500, $N0);
    margin-bottom: 8px;
  }
  &__api {
     @include text($H100, 400, $N6);
  }
  &__value {
    @include text($H300, 500, $G1);
  }
   &__item {
    @include flex-row(flex-start, center);
  }
}
</style>
