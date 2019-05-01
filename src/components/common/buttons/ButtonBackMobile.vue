<template>
  <a @click.prevent class='button-back-mobile'>
    <div class="button-back-mobile__image-wrapper">
      <icon-long-arrow-left class="button-back-mobile__image"/>
    </div>
    <p class="button-back-mobile__text"><slot/>{{ label }}</p>
  </a>
</template>
<script>
import IconLongArrowLeft from '@/components/common/icons/IconLongArrowLeft.vue';

export default {
  name: 'ButtonBackMobile',
  props: {
    label: {
      type: String,
      default: '',
    },
  },
  components: {
    IconLongArrowLeft,
  },
};
</script>

<style lang="scss" scoped>
.button-back-mobile {
  @include flex-row(flex-start, center);
  &:active {
    .button-back-mobile__text {
      color: $B5;
    }
  }
  &__image-wrapper {
    width: 20px;
    height: 20px;
    @include flex-row(center, center);
    margin-right: 12px;
    background-color: $B2;
    border-radius: 50%;
  }
  &__image {
    width: 16px;
    height: 16px;
    fill: $N12;
    transition: fill ease-in-out 0.2s;
  }
  &__text {
    font-size: $H400;
    color: $B2;
    font-weight: 500;
    padding-bottom: 1px;
    transition: color ease-in-out 0.2s;
    @media screen and (min-width: $screen-tablet) {
      font-size: $H200;
    }
  }
}
</style>
