<template>
  <div id='invest-form' class="step-card__wrapper invest-form__wrapper" @click.self='close'>
    <transition
      name="custom-classes-transition"
      enter-active-class="animated dur03 fadeIn"
      leave-active-class="animated dur03 fadeOut"
      mode="out-in">
    <message-success-absolute
      class='auth__message'
      v-if='successCopy'
      @click.native='closeMessage'
      key='success'>
      Address copied to clipboard
    </message-success-absolute>
    </transition>
    <div class="step-card invest-form__card">
      <close-button
        class="step-card__close-button"
        @click.native='close'/>
      <h2 class="step-card__title">
        Invest in
        <br class='step-card__wrap'>
        {{ `Initial Index Fund` }}
      </h2>
      <div class="step-card__form invest-form">
        <step-image
          class='step-card__step-image
            step-card__step-image--type
            status-bar-active'
          :success='!!type'>1
        </step-image>
        <p class="step-card__label step-card__label--type">Choose cryptocurrency</p>
        <div
          class="step-card__line step-card__line--type"
          :class='{"status-bar-active": type}'>
        </div>
        <div class="step-card__row
          step-card__row--end
          invest-form__input-box
          invest-form__input-box--type">
          <label class="invest-form__radio">
            <input
              type="radio"
              name='type'
              class="invest-form__radio-input"
              value='Bitcoin'
              v-model='type'>
            <div
              class="invest-form__radio-button"
              >Bitcoin
            </div>
          </label>
          <label class="invest-form__radio">
            <input
              type="radio"
              name='type'
              class="invest-form__radio-input"
              value='Ethereum'
              v-model='type'>
            <div
              class="invest-form__radio-button"
              >Ethereum
            </div>
          </label>
        </div>
        <p
          class="step-card__label invest-form__label invest-form__label--amount"
          >Write amount
        </p>
        <step-image
          class='step-card__step-image
                invest-form__step-image
                invest-form__step-image--amount
                animated dur04 fadeIn'
          :class='{"status-bar-active": type,
                  "status-bar-success": type && amountReady}'
          :success='amountReady'>2
        </step-image>
        <div
          class="step-card__line
                invest-form__line
                invest-form__line--amount
                animated dur04 fadeIn"
          v-show='!!type'
          :class='{"status-bar-active": type && amountReady}'>
        </div>
        <div
          class="step-card__row
            step-card__row--end
            invest-form__input-box
            invest-form__input-box--amount"
          v-show='type'>
          <label class="invest-form__input-label">
            <p class="invest-form__label-text">Amount USD</p>
            <input
              type="text"
              class="invest-form__input"
              v-model.number.trim='amountUSD'>
          </label>
          <span class="invest-form__equally">=</span>
          <label class="invest-form__input-label">
            <p class="invest-form__label-text">Amount BTC</p>
            <input
              type="text"
              class="invest-form__input"
              v-model.number.trim='amountBTC'>
          </label>
        </div>
        <p
          class="step-card__label
                invest-form__label
                invest-form__label--deposit
                animated dur04 fadeIn">Deposit on
        </p>
        <step-image
          class='step-card__step-image
                invest-form__step-image
                invest-form__step-image--deposit
                animated dur04 fadeIn'
          :class='{"status-bar-active": type && amountReady}'>3
        </step-image>
        <div
          class="step-card__col
            invest-form__input-box
            invest-form__input-box--deposit"
          v-show='type && amountReady'>
          <div class="invest-form__qr-wrapper">
            <img src='@/assets/images/qr-code.gif' alt="qr-code" class="invest-form__qr"/>
          </div>
          <a
            href="#"
            class="invest-form__qr-button"
            @click.prevent
            v-clipboard:copy="address"
            v-clipboard:success="onCopy"
            v-clipboard:error="onError">
            <p class="invest-form__qr-text">{{ address }}</p>
            <span class="invest-form__qr-etc">...</span>
            <icon-copy class='invest-form__icon'/>
          </a>
        </div>
      </div>
      <div
        class="invest-form__button-wrapper"
        v-show='type && amountReady'>
        <button-primary
          class="step-card__button"
          >I'm done
        </button-primary>
      </div>
    </div>
  </div>
</template>
<script>
import ButtonPrimary from '@/components/common/buttons/ButtonPrimary.vue';
import StepImage from '@/components/common/StepImage.vue';
import CloseButton from '@/components/common/buttons/CloseButton.vue';
import IconCopy from '@/components/common/icons/IconCopy.vue';
import MessageSuccessAbsolute from '@/components/common/messages/MessageSuccessAbsolute.vue';

export default {
  name: 'Invest',
  components: {
    ButtonPrimary,
    CloseButton,
    StepImage,
    IconCopy,
    MessageSuccessAbsolute,
  },
  data() {
    return {
      type: '',
      amountBTC: '',
      amountUSD: '',
      qr: '',
      address: 'asdasasdsdas42343243242dasdsa',
      successCopy: false,
      errorCopy: false,
    };
  },
  methods: {
    close() {
      this.$emit('close');
    },
    closeMessage() {
      this.successCopy = false;
      this.errorCopy = false;
    },
    onCopy() {
      if (this.successCopy) {
        this.successCopy = false;
        setTimeout(() => {
          this.successCopy = true;
        }, 15);
      } else {
        this.successCopy = true;
      }
      setTimeout(() => {
        this.successCopy = false;
      }, 3000);
    },
    onError() {
      if (this.errorCopy) {
        this.errorCopy = false;
        setTimeout(() => {
          this.errorCopy = true;
        }, 15);
      } else {
        this.errorCopy = true;
      }
      setTimeout(() => {
        this.errorCopy = false;
      }, 3000);
    },
  },
  computed: {
    amountReady() {
      return !!parseFloat(this.amountBTC) && !!parseFloat(this.amountUSD);
    },
  },
  watch: {
    amountBTC(value) {
      const num = parseFloat(value);
      if (!num) {
        this.amountBTC = '';
      }
    },
    amountUSD(value) {
      const num = parseFloat(value);
      if (!num) {
        this.amountUSD = '';
      }
    },
  },
};
</script>
<style lang="scss">
@import '~@/scss/components/step-card';
$invest-form: invest-form;
.#{$invest-form} {
  grid-template-areas:
    'image-type label-type'
    'line-type input-type'
    'image-amount label-amount'
    'line-amount input-amount'
    'image-deposit label-deposit'
    '. input-deposit';
  margin-bottom: 32px;
  &__input-box {
    width: 100%;
    &--type {
      grid-area: input-type;
    }
    &--amount {
      grid-area: input-amount;
    }
    &--deposit {
      grid-area: input-deposit;
    }
  }
  &__input-label {
    display: block;
    flex: 0 0 45%;
  }
  &__label-text {
    @extend %input-label-text;
    margin-bottom: 8px;
  }
  &__input {
    @extend %input;
    background-color: $N13;
    width: 100%;
  }
  &__equally {
    margin: 0 8px 18px;
    @media screen and (min-width:$screen-tablet) {
      margin-bottom: 12px;
    }
  }
  &__label {
    &--type {
      grid-area: label-type;
    }
    &--amount {
      grid-area: label-amount;
    }
    &--deposit {
      grid-area: label-deposit;
    }
  }
  &__step-image {
    &--type {
      grid-area: image-type;
    }
    &--amount {
      grid-area: image-amount;
    }
    &--deposit {
      grid-area: image-deposit;
    }
  }
  &__line {
    @extend %status-bar-line-new;
    &--type {
      grid-area: line-type;
    }
    &--amount {
      grid-area: line-amount;
    }
    &--deposit {
      grid-area: line-deposit;
    }
  }
  &__radio {
    @extend %radio-button-label;
    flex: 0 0 45%;
  }
  &__radio-input {
    @extend %radio-button-input;
    &:checked + .#{$invest-form}__radio-button {
      background-color: $N14;
      color: $B3;
      border-color: $B3;
    }
  }
  &__radio-button {
    @extend %radio-button;
    @media screen and (min-width: $screen-tablet) {
      background-color: transparent;
      border: 1px solid $N7;
      border-radius: 2px;
      color: $N7;
    }
  }
  &__qr-wrapper {
    width: 216px;
    height: 216px;
    flex-shrink: 0;
    overflow: hidden;
    margin-bottom: 32px;
    @media screen and (min-width: $screen-tablet) {
      width: 140px;
      height: 140px;
      margin-bottom: 16px;
    }
  }
  &__qr {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
  &__qr-button {
    @include flex-row(flex-start, center);
    width: 216px;
    @media screen and (min-width: $screen-tablet) {
      width: 100%;
    }
    &:active .#{$invest-form} {
      &__qr-text {
        color: $N4;
      }
    }
  }
  &__qr-text {
    @include text($H500, 500, $N0);
    white-space: nowrap;
    overflow: hidden;
    flex: 0 0 calc(100% - 24px - 28px);
    transition: color ease-in-out 0.2s;
    @media screen and (min-width: $screen-tablet) {
      flex: 0 0 auto;
      margin-right: 8px;
    }
  }
  &__qr-etc {
    @include text($H500, 500, $N0);
    flex: 0 0 14px;
    padding-right: 14px;
    @media screen and (min-width: $screen-tablet) {
      display: none;
    }
  }
  &__icon {
    flex: 0 0 24px;
    height: 24px;
    fill: $B4;
    pointer-events: none;
  }
  &__button-wrapper {
    @media screen and (min-width: $screen-tablet) {
      display: flex;
      justify-content: flex-end;
    }
  }
}
</style>
