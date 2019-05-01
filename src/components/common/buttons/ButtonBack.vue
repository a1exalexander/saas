<template>
  <a class='button-back'>
    <div class="button-back__image-wrapper">
      <icon-long-arrow-left class="button-back__image"/>
    </div>
    <p class="button-back__text"><slot/>{{ label }}</p>
  </a>
</template>
<script>
import IconLongArrowLeft from '@/components/common/icons/IconLongArrowLeft.vue';

export default {
  name: 'ButtonBack',
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
.button-back {
  @include flex-row(flex-start, center);
  @media screen and (min-width: $screen-desktop) {
    &:hover {
      .button-back__text {
        color: $N6;
      }
      .button-back__image-wrapper {
        background-color: $N6;
      }
    }
  }
  &:active {
    .button-back-mobile__text {
      color: $B5;
    }
    .button-back__image-wrapper {
      background-color: $B5;
    }
  }
  @media screen and (min-width: $screen-tablet) {
    &:active {
      .button-back__text {
        color: $N8;
      }
      .button-back__image-wrapper {
        background-color: $N8;
      }
    }
  }
  &__image-wrapper {
    width: 20px;
    height: 20px;
    @include flex-row(center, center);
    margin-right: 12px;
    background-color: $B2;
    transition: background-color ease 0.2s;
    border-radius: 50%;
    @media screen and (min-width: $screen-tablet) {
      width: 18px;
      height: 18px;
      background-color: $N8;
    }
  }
  &__image {
    width: 16px;
    height: 16px;
    fill: $N12;
    transition: fill ease 0.2s;
    @media screen and (min-width: $screen-tablet) {
      fill: $B12;
    }
  }
  &__text {
    @include text($H400, 500, $B2);
    padding-bottom: 1px;
    transition: color ease 0.2s;
    @media screen and (min-width: $screen-tablet) {
      font-size: $H200;
      color: $N8;
    }
  }
}
</style>
