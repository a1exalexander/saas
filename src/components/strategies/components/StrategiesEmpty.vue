<template>
<div class="strategies-empty">
  <icon-list class="strategies-empty__icon"/>
  <p class="strategies-empty__title">Strategies list is empty</p>
</div>
</template>
<script>
import IconList from '@/components/common/icons/IconList.vue';

export default {
  name: 'StrategiesEmpty',
  components: {
    IconList,
  }
}
</script>
<style lang="scss">
.strategies-empty {
  padding: 32px 28px;
  @include flex-col(center, center);
  height: calc( 100vh - 56px );
  &__icon{
    $size: 70px;
    width: $size;
    height: $size;
    margin-bottom: 22px;
    fill: $N11;
  }
  &__title {
    @include text($H700, 500, $N9);
  }
}
</style>

