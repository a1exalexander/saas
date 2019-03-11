<template>
<div class="method-card">
  <div class="method-card__head">
    <div class="method-card__name-wrapper">
      <icon-wallet class='method-card__icon'/>
      <p class="method-card__text method-card__text--name">{{ method.name }}</p>
    </div>
    <a href="#" class="method-card__button" @click.stop.prevent='togglePopupMenu(!method.menu)'>
      <icon-dots class='method-card__button-icon'/>
      <div
      @click.stop.prevent
      class="method-card__popup"
      v-if='method.menu'>
        <a href='#' class="method-card__popup-item">Edit</a>
        <a
          href='#'
          @click.prevent="removeMethod(method.id)"
          class="method-card__popup-item">Remove
        </a>
      </div>
    </a>
  </div>
  <p class="method-card__text method-card__text--address">{{ method.address }}</p>
  <p class="method-card__status">{{ method.status }}</p>
</div>
</template>
<script>
import IconWallet from '@/components/common/icons/IconWallet.vue';
import IconDots from '@/components/common/icons/IconDots.vue';
import { mapActions } from 'vuex';

export default {
  name: 'MethodCard',
  components: {
    IconWallet,
    IconDots,
  },
  props: {
    method: {
      type: Object,
    },
  },
  data() {
    return {
      popup: false,
    };
  },
  methods: {
    ...mapActions('billing', [
      'removeMethod',
      'toggleMenu',
    ]),
    togglePopupMenu(value) {
      this.toggleMenu([this.method.id, value]);
    },
  },
};
</script>
<style lang="scss">
.method-card {
  width: 100%;
  padding: 12px;
  border: 1px solid #313438;
  border-radius: 2px;
  position: relative;
  @media screen and (min-width: $screen-tablet) {
    width: auto;
    display: flex;
    flex-direction: column;
  }
  &__text {
    @include text($H300, 500, $N0);
    &--name {
      font-size: $H500;
    }
    &--address {
      margin-bottom: 6px;
    }
  }
  &__status {
    @include text($H050, 600, $N7);
  }
  &__head {
    @include flex-row(space-between, flex-start);
  }
  &__name-wrapper {
    @include flex-row(flex-start, center);
    margin-bottom: 6px;
  }
  &__icon {
    width: 32px;
    height: 32px;
    fill: $B4;
    margin-right: 8px;
  }
  &__button {
    display: block;
    position: relative;
  }
  &__button-icon {
    width: 22px;
    height: 22px;
    fill: $N0;
    pointer-events: none;
  }
  &__popup-wrapper {
    position: fixed;
    min-height: 100vh;
    z-index: 2;
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
    background-color: rgba(204, 26, 26, 0.308);
  }
  &__popup {
    @extend %inline-menu;
    position: absolute;
    border-color: $N10;
    z-index: 3;
    right: 0;
    top: 100%;
  }
  &__popup-item {
    @extend %inline-menu-text;
    font-size: $H400;
    font-weight: 500;
    margin-bottom: 16px;
    &:last-child {
      margin: 0;
    }
  }
}
</style>
