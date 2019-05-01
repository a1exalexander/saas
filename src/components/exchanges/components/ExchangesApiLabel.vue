<template>
<div class="exchanges-api-label">
  <div class="exchanges-api-label__icon-wrapper">
    <icon-plus class='exchanges-api-label__icon'/>
  </div>
  <div class="exchanges-api-label__logo-wrapper">
    <img
      class="exchanges-api-label__logo"
      :src='apiImage'
      alt="logo"
      v-if='apiImage'>
  </div>
  <p class="exchanges-api-label__name">{{ apiName }}</p>
</div>
</template>
<script>
import IconPlus from '@/components/common/icons/IconPlus.vue';
import { mapGetters } from 'vuex';

export default {
  name: 'ExchangesApiLabel',
  props: {
    apiName: {
      type: String,
    },
  },
  components: {
    IconPlus,
  },
  computed: {
    ...mapGetters('exchanges', [
      'getImages',
    ]),
    apiImage() {
      if (this.apiName in this.getImages) {
        const image = this.getImages[this.apiName];
        // eslint-disable-next-line
        return require(`@/assets/images/${image}`);
      }
      return '';
    },
  },
};
</script>
<style lang="scss">
.exchanges-api-label {
  background-color: $N12;
  border-radius: 2px;
  flex-grow: 0;
  flex-shrink: 0;
  border: 1px solid $N10;
  padding: 16px 24px;
  cursor: pointer;
  @include flex-row(flex-start, center);
  transition-property: baclground-color;
  transition-duration: 0.2s;
  transition-timing-function: ease-in-out;
  @media screen and (min-width: $screen-tablet) {
    flex: 0 0 120px;
    max-height: 120px;
    background-color: $N13;
    padding: 8px 16px 16px;
    border-width: 0.5px;
    display: grid;
    grid-auto-columns: auto;
    grid-auto-rows: auto;
    grid-template-areas:
    'name button'
    'image .';
    grid-row-gap: 12px;
    justify-content: space-between;
  }
  &:active {
    background-color: $N11;
  }
  &__icon-wrapper {
    border-radius: 50%;
    background-color: $B4;
    @include flex-row(center, center);
    width: 20px;
    height: 20px;
    margin-right: 19px;
    @media screen and (min-width: $screen-tablet) {
      grid-area: button;
      margin: 0;
    }
  }
  &__icon {
    fill: $N0;
    width: 12px;
    height: 12px;
  }
  &__logo-wrapper {
    border-radius: 50%;
    background-color: $N0;
    @include flex-row(center, center);
    width: 29px;
    height: 29px;
    margin-right: 11px;
    @media screen and (min-width: $screen-tablet) {
      grid-area: image;
      margin: 0;
      width: 36px;
      height: 36px;
    }
  }
  &__logo {
    width: 19px;
    height: 19px;
  }
  &__name {
    font-size: $H500;
    font-weight: 500;
    text-transform: capitalize;
    @media screen and (min-width: $screen-tablet) {
      grid-area: name;
    }
  }
}
</style>
