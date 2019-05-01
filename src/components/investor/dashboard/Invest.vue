<template>
  <div id='invest-form' class="step-card__wrapper invest-form__wrapper" @click.self='close'>
    <message-success-absolute
      class='auth__message'
      v-if='message.success'
      @click.native='message.success = false'>
      {{ messageText }}
    </message-success-absolute>
    <message-error-absolute
      class='auth__message'
      v-if='message.error'
      @click.native='message.error = false'>
      {{ messageText }}
    </message-error-absolute>
    <div class="step-card invest-form__card">
      <close-button
        class="step-card__close-button"
        @click.native='close'/>
      <h2 class="step-card__title">
        Invest in
        <br class='step-card__wrap'>
        {{ business_name }}
      </h2>
      <div class="step-card__form invest-form">
        <step-image
          class='step-card__step-image
            step-card__step-image--type
            status-bar-active'
          :success='!!currency'>1
        </step-image>
        <p class="step-card__label step-card__label--type">Choose cryptocurrency</p>
        <div
          class="step-card__line step-card__line--type"
          :class='{"status-bar-active": !!currency}'>
        </div>
        <div class="step-card__row
          step-card__row--end
          invest-form__input-box
          invest-form__input-box--type">
          <label
            class="invest-form__radio"
            v-for='(item, index) in currencies'
            :key='index'>
            <input
              type="radio"
              name='currency'
              class="invest-form__radio-input"
              :value='item.short'
              v-model='currency'>
            <div
              class="invest-form__radio-button"
              >{{ item.name }}
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
          :class='{"status-bar-active": currency,
                  "status-bar-success": currency && amountReady}'
          :success='amountReady'>2
        </step-image>
        <div
          class="step-card__line
                invest-form__line
                invest-form__line--amount
                animated dur04 fadeIn"
          v-show='!!currency'
          :class='{"status-bar-active": currency && amountReady}'>
        </div>
        <div
          class="step-card__row
            step-card__row--end
            invest-form__input-box
            invest-form__input-box--amount"
          v-show='currency'>
          <label class="invest-form__input-label">
            <p class="invest-form__label-text">Amount USD</p>
            <input
              type="text"
              @input="calcAmount"
              class="invest-form__input"
              v-model.number.trim='amountUSD'>
          </label>
          <span class="invest-form__equally">=</span>
          <label class="invest-form__input-label">
            <p class="invest-form__label-text">Amount BTC</p>
            <input
              type="text"
              class="invest-form__input"
              @input="calcUSD"
              v-model.number.trim='amount'>
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
          :class='{"status-bar-active": currency && amountReady}'>3
        </step-image>
        <div
          class="step-card__col
            invest-form__input-box
            invest-form__input-box--deposit"
          v-show='currency && amountReady'>
          <div
            class="invest-form__qr-wrapper"
            v-clipboard:copy="qrCode"
            v-clipboard:success="onCopy"
            v-clipboard:error="onError">
            <qr-code class='invest-form__qr' :text="qrCode"></qr-code>
          </div>
          <a
            href="#"
            class="invest-form__qr-button"
            @click.prevent
            v-clipboard:copy="qrCode"
            v-clipboard:success="onCopy"
            v-clipboard:error="onError">
            <p class="invest-form__qr-text">{{ qrCode }}</p>
            <span class="invest-form__qr-etc">...</span>
            <icon-copy class='invest-form__icon'/>
          </a>
        </div>
      </div>
      <div
        class="invest-form__button-wrapper"
        v-show='currency && amountReady'>
        <button-primary
          @click.native='close'
          class="step-card__button"
          >I'm done
        </button-primary>
      </div>
    </div>
  </div>
</template>
<script>
import VueQRCodeComponent from 'vue-qrcode-component'
import ButtonPrimary from '@/components/common/buttons/ButtonPrimary.vue';
import StepImage from '@/components/common/StepImage.vue';
import CloseButton from '@/components/common/buttons/CloseButton.vue';
import IconCopy from '@/components/common/icons/IconCopy.vue';
import MessageSuccessAbsolute from '@/components/common/messages/MessageSuccessAbsolute.vue';
import MessageErrorAbsolute from '@/components/common/messages/MessageErrorAbsolute.vue';
import { mapState, mapActions } from 'vuex';

export default {
  name: 'Invest',
  components: {
    ButtonPrimary,
    CloseButton,
    StepImage,
    IconCopy,
    MessageSuccessAbsolute,
    MessageErrorAbsolute,
    'qr-code': VueQRCodeComponent,
  },
  data() {
    return {
      currency: '',
      amount: '',
      amountUSD: '',
      message: {
        success: false,
        error: false,
      },
      messageText: '',
    };
  },
  methods: {
    ...mapActions('request', [
      'getCurrencies',
      'getCost',
      'getAddresses',
    ]),
    close() {
      this.$emit('close');
    },
    closeMessage() {
      this.message.success = false;
      this.message.error = false;
    },
    onCopy() {
      this.messageText = 'Address copied to clipboard';
      if (this.message.success) {
        this.message.success = false;
        setTimeout(() => {
          this.message.success = true;
        }, 15);
      } else {
        this.message.success = true;
      }
      setTimeout(() => {
        this.message.success = false;
      }, 3000);
    },
    onError() {
      this.messageText = 'Address not copied to clipboard';
      if (this.message.error) {
        this.message.error = false;
        setTimeout(() => {
          this.message.error = true;
        }, 15);
      } else {
        this.message.error = true;
      }
      setTimeout(() => {
        this.message.error = false;
      }, 3000);
    },
    calcAmount() {
      this.amount = Number((this.amountUSD / this.cost[this.currency]).toFixed(8));
    },
    calcUSD() {
      this.amountUSD = Number((this.cost[this.currency] * this.amount).toFixed(2));
    },
  },
  computed: {
    ...mapState({
      business_name: state => state.investorProfile.profile.business_name,
      currencies: state => state.request.currencies,
      cost: state => state.request.cost,
      addresses: state => state.request.addresses,
    }),
    qrCode() {
      if (this.currency) {
        return  this.addresses[this.currency];
      }
      return '';
    },
    amountReady() {
      return !!parseFloat(this.amount) && !!parseFloat(this.amountUSD);
    },
  },
  watch: {
    amount(value) {
      if (!value) {
        this.amountUSD = '';
        this.amount = '';
      }
    },
    amountUSD(value) {
      if (!value) {
        this.amountUSD = '';
        this.amount = '';
      }
    },
  },
  created() {
    this.getCurrencies();
    this.getCost();
    this.getAddresses();
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
    padding: 4px;
    background-color: $N0;
    @media screen and (min-width: $screen-tablet) {
      width: 140px;
      height: 140px;
      margin-bottom: 16px;
      cursor: pointer;
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
      width: 300px;
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
    overflow-y: hidden;
    overflow-x: auto;
    flex: 0 1 calc(100% - 24px - 28px);
    transition: color ease-in-out 0.2s;
    @media screen and (min-width: $screen-tablet) {
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
