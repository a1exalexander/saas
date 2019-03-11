<template>
<div class="method-popup">
  <div class="method-popup__card">
    <close-button
      class='method-popup__close'
      @click.native="close"/>
    <div class="method-popup__header">
      <h2 class="method-popup__title">Add your Cryptocurrency Wallet Address</h2>
      <p class="method-popup__text">Available only for Payments recieving</p>
    </div>
    <div class="method-popup__main">
      <div class="method-popup__inner method-popup__inner--margin">
        <p class="method-popup__label-text">Token name</p>
        <div class="method-popup__inner">
          <div class="method-popup__row method-popup__row--margin">
            <label class="method-popup__radio">
              <input
                type="radio"
                name='methods'
                class="method-popup__radio-input"
                value='Bitcoin'
                v-model='method.name'>
              <div class="method-popup__radio-button method-popup__radio-button--left">Bitcoin</div>
            </label>
            <label class="method-popup__radio">
              <input
                type="radio"
                name='methods'
                class="method-popup__radio-input"
                value='Ethereum'
                v-model='method.name'>
              <div
                class="method-popup__radio-button method-popup__radio-button--right"
                >Ethereum
              </div>
            </label>
          </div>
          <label class="method-popup__label">
            <p class="method-popup__label-text">Wallet address</p>
            <input
              type="text"
              class="method-popup__input"
              v-model='method.address'>
          </label>
        </div>
      </div>
      <div class="method-popup__buttons-wrapper">
        <button-secondary
          class='method-popup__button method-popup__button--secondary'
          @click.native='close'>Cancel
        </button-secondary>
        <button-primary
          class="method-popup__button method-popup__button--primary"
          :disabled='!ready'
          @click.native='addNewMethod'>Save
        </button-primary>
        <button-transparent
          class="method-popup__button method-popup__button--transparent"
          @click.native="close">Cancel
        </button-transparent>
      </div>
    </div>
  </div>
</div>
</template>
<script>
import ButtonPrimary from '@/components/common/buttons/ButtonPrimary.vue';
import ButtonSecondary from '@/components/common/buttons/ButtonSecondary.vue';
import ButtonTransparent from '@/components/common/buttons/ButtonTransparent.vue';
import CloseButton from '@/components/common/buttons/CloseButton.vue';
import { mapActions } from 'vuex';

export default {
  name: 'AddMethodPopup',
  components: {
    ButtonPrimary,
    ButtonTransparent,
    CloseButton,
    ButtonSecondary,
  },
  data() {
    return {
      method: {
        name: '',
        address: '',
      },
    };
  },
  methods: {
    ...mapActions('billing', [
      'addMethod',
    ]),
    addNewMethod() {
      this.addMethod(this.method);
      this.close();
    },
    close() {
      this.$emit('close');
    },
  },
  computed: {
    ready() {
      return this.method.name && this.readyAddress;
    },
    readyAddress() {
      return this.method.address.length > 25 && this.method.address.length < 36;
    },
  },
};
</script>
<style lang="scss">
.method-popup {
  position: fixed;
  min-height: 100vh;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  overflow-y: auto;
  z-index: 100;
  @media screen and (min-width: $screen-tablet) {
    padding: 32px;
    background: rgba(10,11,12,0.80);
    display: flex;
    justify-content: center;
    align-items: center;
  }
  &__card {
    position: relative;
    background-color: $N13;
    padding: 28px;
    height: 100%;
    @include flex-col(flex-start, stretch);
    @media screen and (min-width: $screen-tablet) {
      flex: 0 1 35%;
      min-width: 480px;
      padding: 32px 40px;
      height: auto;
    }
  }
  &__header {
    margin-bottom: 24px;
  }
  &__title {
    @include text($H800, 500, $N0);
    margin-bottom: 14px;
    padding-right: 28px;
    line-height: 1.4;
    @media screen and (min-width: $screen-tablet) {
      font-weight: 600;
    }
  }
  &__text {
    @include text($H500, 500, $N6);
  }
  &__row {
    @include flex-row(space-between, center);
    @media screen and (min-width: $screen-tablet) {
      justify-content: flex-start;
    }
    &--margin {
      margin-bottom: 30px;
      @media screen and (min-width: $screen-tablet) {
        margin-bottom: 24px;
      }
    }
  }
  &__radio {
    @extend %radio-button-label;
    flex: 0 0 45%;
    @media screen and (min-width:$screen-tablet) {
      flex: 0 1 auto;
      min-width: 94px;
    }
    &:first-child {
      @media screen and (min-width:$screen-tablet) {
        border-right: 1px solid $N8;
        margin-right: 0;
      }
    }
  }
  &__radio-input {
    @extend %radio-button-input;
    &:checked + .method-popup__radio-button {
      @extend %radio-button-checked;
    }
  }
  &__radio-button {
    @extend %radio-button;
    @media screen and (min-width: $screen-tablet) {
      &--left {
        border-radius: 2px 0 0 2px;
      }
      &--right {
        border-radius: 0 2px 2px 0;
      }
    }
  }
  &__inner {
    &--margin {
      margin-bottom: 32px;
    }
  }
  &__label {
    display: block;
  }
  &__label-text {
    @extend %input-label-text;
  }
  &__input {
    @extend %input;
    width: 100%;
    color: $N3;
  }
  &__main {
    flex: 1 1;
    @include flex-col(space-between, stretch);
  }
  &__close {
    position: absolute;
    top: 32px;
    right: 24px;
  }
  &__button {
    width: 100%;
    @media screen and (min-width: $screen-tablet) {
      width: auto;
    }
    &--primary {
      margin-bottom: 20px;
      @media screen and (min-width: $screen-tablet) {
        margin: 0;
      }
    }
    &--transparent {
      @media screen and (min-width: $screen-tablet) {
        display: none;
      }
    }
    &--secondary {
      display: none;
      @media screen and (min-width: $screen-tablet) {
        display: flex;
        margin-right: 20px;
      }
    }
  }
  &__buttons-wrapper {
    @media screen and (min-width: $screen-tablet) {
      display: flex;
      justify-content: flex-end;
      align-items: center;
    }
  }
}
</style>
