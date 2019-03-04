<template>
<div class="remove-investor-popup">
  <div class="remove-investor-popup__card">
    <close-button class="remove-investor-popup__close-button"/>
    <p class="remove-investor-popup__heading">Remove a customer</p>
    <p
      class="remove-investor-popup__text"
      >Are you sure that you want to remove this customer? You can not
      delete if the account has money
    </p>
    <div class="remove-investor-popup__buttons-wrapper">
      <button-transparent
        class="remove-investor-popup__button remove-investor-popup__button--cancel-mobile"
        @click.native='cancel'>Cancel
      </button-transparent>
      <subtle
        class="remove-investor-popup__button remove-investor-popup__button--remove-mobile"
        @click.native='removeInvestor'>Remove
      </subtle>
      <button-secondary
        class="remove-investor-popup__button remove-investor-popup__button--cancel-desktop"
        @click.native='cancel'>Cancel
      </button-secondary>
      <button-primary
        class="remove-investor-popup__button remove-investor-popup__button--remove-desktop"
        :class='{"button-loading": loading}'
        @click.native.once='removeInvestor'>Remove
      </button-primary>
    </div>
  </div>
</div>
</template>
<script>
import ButtonTransparent from '@/components/common/buttons/ButtonTransparent.vue';
import ButtonPrimary from '@/components/common/buttons/ButtonPrimary.vue';
import ButtonSecondary from '@/components/common/buttons/ButtonSecondary.vue';
import CloseButton from '@/components/common/buttons/CloseButton.vue';
import Subtle from '@/components/common/buttons/Subtle.vue';
import { mapActions } from 'vuex';

export default {
  name: 'RemovePopup',
  components: {
    ButtonTransparent,
    Subtle,
    CloseButton,
    ButtonPrimary,
    ButtonSecondary,
  },
  data() {
    return {
      loading: false,
    };
  },
  methods: {
    ...mapActions('investors', [
      'removeInvestor',
    ]),
    cancel() {
      this.$emit('cancel');
    },
  },
};
</script>
<style lang="scss">
.remove-investor-popup {
position: fixed;
  z-index: 11;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  min-height: 100vh;
  background-color: rgba(10,11,12,0.80);
  padding: 100px 28px 0;
  @media screen and (min-width: $screen-tablet) {
    padding: 24px;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
  }
  &__card {
    background-color: $N13;
    border: 1px solid $N11;
    box-shadow: 0 20px 28px 0 rgba(0,0,0,0.32);
    padding: 32px 20px;
    position: relative;
    @media screen and (min-width: $screen-tablet) {
      padding: 24px 40px 32px;
      flex: 0 1 37%;
      min-width: 532px;
    }
  }
  &__close-button {
    position: absolute;
    right: 14px;
    top: 14px;
    svg {
      width: 14px;
      height: 14px;
    }
  }
  &__heading {
    font-size: $H600;
    font-weight: 500;
    margin-bottom: 12px;
    padding-right: 26px;
    @media screen and (min-width: $screen-tablet) {
      padding-right: 44px;
      margin-bottom: 14px;
    }
  }
  &__text {
    font-size: $H400;
    color: $N6;
    margin-bottom: 12px;
  }
  &__buttons-wrapper {
    @include flex-row(flex-end, center);
    padding-right: 12px;
  }
  &__button {
    &--cancel-mobile {
      margin-right: 32px;
      @media screen and (min-width: $screen-tablet) {
        display: none;
      }
    }
    &--cancel-desktop {
      display: none;
      @media screen and (min-width: $screen-tablet) {
        display: flex;
        margin-right: 24px;
      }
    }
    &--remove-mobile {
      @media screen and (min-width: $screen-tablet) {
        display: none;
      }
    }
    &--remove-desktop {
      display: none;
      @media screen and (min-width: $screen-tablet) {
        display: flex;
      }
    }
  }
}
</style>
