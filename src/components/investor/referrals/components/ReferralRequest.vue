<template>
  <div class="step-card__wrapper request-payout" @click.self='close'>
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
    <div class="step-card request-payout__card">
      <close-button
        class="step-card__close-button"
        @click.native='close'/>
      <h2 class="step-card__title">
        Request bonuses
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
          <label
            class="request-payout__radio"
            v-for='(item, index) in currencies'
            :key='index'>
            <input
              type="radio"
              name='currency'
              class="request-payout__radio-input"
              :value='item.short'
              v-model='currency'>
            <div
              class="request-payout__radio-button"
              >{{ item.name }}
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
          v-show='currency'>
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
                  @input="calcAmount"
                  v-model.number.trim='amountUSD'>
              </label>
              <span class="request-payout__equally">=</span>
              <label class="request-payout__input-label">
                <p class="request-payout__label-text">Amount {{ amountName }}</p>
                <input
                  type="text"
                  @focus='onCustom'
                  class="request-payout__input"
                  @input="calcUSD"
                  v-model.number.trim='amount'>
              </label>
            </div>
            <p
              class="request-payout__warning"
              >Minimum transaction is equivalent or higher $10
            </p>
          </div>
        </div>
        <p
          class="step-card__label
                request-payout__label
                request-payout__label--deposit
                animated dur04 fadeIn">Withdraw on
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
          :class='{"button-loading":loading}'
          @click.native='done'
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
import MessageSuccessAbsolute from '@/components/common/messages/MessageSuccessAbsolute.vue';
import MessageErrorAbsolute from '@/components/common/messages/MessageErrorAbsolute.vue';
import { mapState, mapActions } from 'vuex';

export default {
  name: 'ReferralRequest',
  components: {
    ButtonPrimary,
    CloseButton,
    StepImage,
    MessageSuccessAbsolute,
    MessageErrorAbsolute,
  },
  data() {
    return {
      currency: '',
      amount: '',
      amountUSD: '',
      deposit: '',
      address: '',
      tumbler: {
        custom: true,
        max: false,
        profit: false,
      },
      loading: false,
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
      'payoutRequest',
    ]),
    done() {
      this.loading = true;
      const data = {
        amount: this.amount,
        currency: this.currency,
        address: this.address,
      };
      this.payoutRequest(data)
        .then(() => {
          this.loading = false;
          this.messageText = `Success`;
          this.showMessage('success');
          setTimeout(() => {
            this.close();
          }, 3000); 
        })
        .catch(error => {
          this.loading = false;
          if (error.data.code === 417) {
            this.messageText = `You don't have enough money`;
          } else {
            this.messageText = error.data.msg;
          }
          this.showMessage('error');
        }) 
    },
    close() {
      this.$emit('close');
    },
    showMessage(type) {
      if (this.message[type]) {
        this.message[type] = false;
        setTimeout(() => {
          this.message[type] = true;
          setTimeout(() => {
            this.message[type] = false;
          }, 3000);
        }, 15);
      } else {
        this.message[type] = true;
          setTimeout(() => {
            this.message[type] = false;
          }, 3000);
      }
    },
    onCustom() {
      Object.keys(this.tumbler).forEach((key) => {
        this.tumbler[key] = key === 'custom';
      });
    },
    onMax() {
      Object.keys(this.tumbler).forEach((key) => {
        this.tumbler[key] = key === 'max';
      });
    },
    onProfit() {
      Object.keys(this.tumbler).forEach((key) => {
        this.tumbler[key] = key === 'profit';
      });
    },
    calcAmount() {
      this.amount = Number((this.amountUSD / this.cost[this.currency]).toFixed(8));
    },
    calcUSD() {
      this.amountUSD = Number((this.cost[this.currency] * this.amount).toFixed(2));
    },
  },
  computed: {
    ...mapState('request', [
      'currencies',
      'cost',
    ]),
    amountName() {
      if (this.currency && !!this.currencies.length) {
        const { short } = this.currencies.find(item => item.short === this.currency);
        return short;
      }
      return '';
    },
    amountReady() {
      return !!parseFloat(this.amount) && !!parseFloat(this.amountUSD);
    },
    readyStep1() {
      return !!this.currency;
    },
    readyStep2() {
      return this.readyStep1 && this.amountReady;
    },
    readyAddress() {
      return this.address.length > 25 && this.address.length < 36;
    },
    readyAll() {
      return this.readyStep2 && this.readyAddress && this.amountUSD >= 10;
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
  },
};
</script>
<style lang="scss">
@import '~@/scss/components/step-card';
@import '~@/scss/components/request-popup';
</style>
