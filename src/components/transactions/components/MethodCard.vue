<template>
<div class="method-card">
  <div class="method-card__head">
    <div class="method-card__name-wrapper">
      <icon-wallet class='method-card__icon'/>
      <p class="method-card__text method-card__text--name">{{ method.currency }}</p>
    </div>
    <a
      href="#"
      class="method-card__button"
      @click.stop.prevent='popup = !popup'
      @mouseover="popup = true">
      <icon-dots class='method-card__button-icon'/>
      <transition
        name="custom-classes-transition"
        enter-active-class="animated dur02 fadeIn"
        leave-active-class="animated dur02 fadeOut"
        mode="out-in">
      <div
        class="method-card__popup-wrapper"
        @mouseover="popup = true"
        @mouseleave="popup = false"
        v-if='popup'>
        <div
          @click.stop.prevent
          class="method-card__popup">
          <a href='#' class="method-card__popup-item">Edit</a>
          <a
            href='#'
            @click.prevent="remove"
            class="method-card__popup-item">Remove
          </a>
        </div>
      </div>
      </transition>
    </a>
  </div>
  <p class="method-card__text method-card__text--address">{{ method.public_key }}</p>
  <p class="method-card__status">Payments Receiving</p>
</div>
</template>
<script>
import IconWallet from '@/components/common/icons/IconWallet.vue';
import IconDots from '@/components/common/icons/IconDots.vue';
import { mapActions, mapState } from 'vuex';

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
    remove() {
      this.popup = false;
      console.log(this.method.id);
      this.removeMethod(this.method.id);
    },
    close() {
      this.popup = false;
    },
  },
  computed: {
    ...mapState('billing', [
      'currencies',
    ]),
    currency() {
      const { name } = this.currencies.find(item => item.id === this.method.currencyId);
      return name;
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
    position: absolute;
    right: -12px;
    top: 0;
    z-index: 3;
    background-color: transparent;
    padding: 20px 12px;
  }
  &__popup {
    @extend %inline-menu;
    border-color: $N10;
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
