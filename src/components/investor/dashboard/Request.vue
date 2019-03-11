<template>
  <div class="step-card__wrapper request-payout" @click.self='close'>
    <div class="step-card request-payout__card">
      <close-button
        class="step-card__close-button"
        @click.native='close'/>
      <h2 class="step-card__title">
        Invest in
        <br class='step-card__wrap'>
        {{ `Initial Index Fund` }}
      </h2>
      <div class="step-card__form request-payout__form">
        <step-image
          class='step-card__step-image
            step-card__step-image--type
            status-bar-active'
          :success='readyStep1'>1
        </step-image>
        <p class="step-card__label step-card__label--type">Choose cryptocurrency</p>
        <div
          class="step-card__line
            request-payout__line
            request-payout__line--type"
          :class='{"status-bar-active": readyStep1}'>
        </div>
        <div class="step-card__row request-payout__input-box request-payout__input-box--type">
          <label class="request-payout__radio">
            <input
              type="radio"
              name='type'
              class="request-payout__radio-input"
              value='Bitcoin'
              v-model='type'>
            <div
              class="request-payout__radio-button"
              >Bitcoin
            </div>
          </label>
          <label class="request-payout__radio">
            <input
              type="radio"
              name='type'
              class="request-payout__radio-input"
              value='Ethereum'
              v-model='type'>
            <div
              class="request-payout__radio-button"
              >Ethereum
            </div>
          </label>
        </div>
        <p
          class="step-card__label request-payout__label request-payout__label--amount"
          >Write amount
        </p>
        <step-image
          class='step-card__step-image
                request-payout__step-image
                request-payout__step-image--amount
                animated dur04 fadeIn'
          :class='{"status-bar-active": readyStep1,
                  "status-bar-success": readyStep2}'
          :success='readyStep2'>2
        </step-image>
        <div
          class="step-card__line
                request-payout__line
                request-payout__line--amount
                animated dur04 fadeIn"
          v-show='readyStep1'
          :class='{"status-bar-active": readyStep2}'>
        </div>
        <div
          class="request-payout__input-box request-payout__input-box--amount"
          v-show='type'>
          <div class="step-card__col">
            <div class="request-payout__tumbler">
              <button
                class="request-payout__tumbler-button"
                @click.prevent='onCustom'
                :class='{"request-payout__tumbler-button--active": tumbler.custom}'>Custom
              </button>
              <button
                class="request-payout__tumbler-button"
                @click.prevent='onMax'
                :class='{"request-payout__tumbler-button--active": tumbler.max}'>Max
              </button>
              <button
                class="request-payout__tumbler-button"
                @click.prevent='onProfit'
                :class='{"request-payout__tumbler-button--active": tumbler.profit}'>Profit
              </button>
            </div>
            <div class="step-card__row step-card__row--end">
              <label class="request-payout__input-label">
                <p class="request-payout__label-text">Amount USD</p>
                <input
                  type="text"
                  @focus='onCustom'
                  class="request-payout__input"
                  v-model.number.trim='amountUSD'>
              </label>
              <span class="request-payout__equally">=</span>
              <label class="request-payout__input-label">
                <p class="request-payout__label-text">Amount BTC</p>
                <input
                  type="text"
                  @focus='onCustom'
                  class="request-payout__input"
                  v-model.number.trim='amountBTC'>
              </label>
            </div>  
          </div>
        </div>
        <p
          class="step-card__label
                request-payout__label
                request-payout__label--deposit
                animated dur04 fadeIn">Deposit on
        </p>
        <step-image
          class='step-card__step-image
                request-payout__step-image
                request-payout__step-image--deposit
                animated dur04 fadeIn'
          :success='readyAll'
          :class='{"status-bar-active": readyStep2}'>3
        </step-image>
        <div
          class="step-card__col
            request-payout__input-box
            request-payout__input-box--deposit"
          v-show='readyStep2'>
          <input type="text" class="request-payout__input" v-model='address'>
          <p
            class="request-payout__warning"
            >Warning: Text wallet address only of selected payout currency
          </p>
        </div>
      </div>
      <div
        class="request-payout__button-wrapper"
        v-show='readyAll'>
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

export default {
  name: 'Request',
  components: {
    ButtonPrimary,
    CloseButton,
    StepImage,
  },
  data() {
    return {
      type: '',
      amountBTC: '',
      amountUSD: '',
      deposit: '',
      address: '',
      tumbler: {
        custom: true,
        max: false,
        profit: false,
      },
    };
  },
  methods: {
    close() {
      this.$emit('close');
    },
    onCustom() {
      Object.keys(this.tumbler).forEach((key) => {
        this.tumbler[key] = key === 'custom';
      })
    },
    onMax() {
      Object.keys(this.tumbler).forEach((key) => {
        this.tumbler[key] = key === 'max';
      })
    },
    onProfit() {
      Object.keys(this.tumbler).forEach((key) => {
        this.tumbler[key] = key === 'profit';
      })
    },
  },
  computed: {
    amountReady() {
      return !!parseFloat(this.amountBTC) && !!parseFloat(this.amountUSD);
    },
    readyStep1() {
      return !!this.type;
    },
    readyStep2() {
      return this.readyStep1 && this.amountReady;
    },
    readyAddress() {
      return this.address.length > 25 && this.address.length < 36;
    },
    readyAll() {
      return this.readyStep2 && this.readyAddress;
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
$request-payout: request-payout;
.#{$request-payout} {
  &__form {
    grid-template-areas:
    'image-type label-type'
    'line-type input-type'
    'image-amount label-amount'
    'line-amount input-amount'
    'image-deposit label-deposit'
    '. input-deposit';
    margin-bottom: 32px;
  }
  &__input-box {
    width: 100%;
    &--type {
      @include flex-row(space-between, center);
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
  &__tumbler {
    @include flex-row(flex-start, center);
    padding: 0 2px;
    border-radius: 3px;
    background-color: $N10;
    padding-bottom: 1px;
    margin-bottom: 20px;
  }
  &__tumbler-button {
    padding: 6px 10px;
    @include text($H300, 500, $N8);
    transition: color ease-in-out 0.2s;
    &--active {
      color: $N0;
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
    &:checked + .#{$request-payout}__radio-button {
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
  }
  &__qr {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
  &__qr-button {
    @include flex-row(flex-start, center);
    width: 216px;
  }
  &__qr-text {
    @include text($H500, 500, $N0);
    white-space: nowrap;
    overflow-y: hidden;
    flex: 0 0 calc(100% - 24px - 28px);
  }
  &__qr-etc {
    @include text($H500, 500, $N0);
    flex: 0 0 14px;
    padding-right: 14px;
  }
  &__icon {
    flex: 0 0 24px;
    height: 24px;
    fill: $B4;
    pointer-events: none;
  }
  &__warning {
    padding-top: 10px;
    @include text($H200, 500, $Y1);
    line-height: 1.3;
  }
  &__button-wrapper {
    @media screen and (min-width: $screen-tablet) {
      display: flex;
      justify-content: flex-end;
    }
  }
}
</style>
