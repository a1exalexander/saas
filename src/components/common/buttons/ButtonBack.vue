<template>
  <a class='button-back'>
    <div class="button-back__image-wrapper">
      <icon-long-arrow-left class="button-back__image"/>
    </div>
    <p class="button-back__text"><slot/></p>
  </a>
</template>
<script>
import IconLongArrowLeft from '@/components/common/icons/IconLongArrowLeft.vue';

export default {
  name: 'ButtonBack',
  components: {
    IconLongArrowLeft,
  },
};
</script>

<style lang="scss" scoped>
.button-back {
  @include flex-row(flex-start, center);
  display: none;
  @media screen and (min-width: $screen-tablet) {
    display: flex;
  }
  @media screen and (min-width: $screen-desktop) {
    &:hover {
      .button-back__text {
        color: $N6;
      }
    }
  }
  &:active {
    .button-back__text {
      color: $N4;
    }
  }
  &__image-wrapper {
    width: 18px;
    height: 18px;
    @include flex-row(center, center);
    margin-right: 12px;
    background-color: $N8;
    border-radius: 50%;
  }
  &__image {
    width: 16px;
    height: 16px;
    fill: $B12;
    transition: fill ease-in-out 0.2s;
  }
  &__text {
    font-size: $H200;
    color: $N8;
    font-weight: 500;
    padding-bottom: 2px;
    transition: color ease-in-out 0.2s;
  }
}
</style>
