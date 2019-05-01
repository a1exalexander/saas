<template>
<div class="exchanges-add-new-api">
<div class="popup-layer"></div>
  <!--[<message-info-absolute
      v-if='isMessage.info'
      @click.native='isMessage.info = false'
      :key="message">
      {{ message }}
    </message-info-absolute>]-->

  <div class="exchanges-add-new-api__card">
    <close-button
      class="exchanges-add-new-api__close-button"
      @click.native='close'/>
    <h2 class="exchanges-add-new-api__heading">Add new exchange</h2>
    <div class="exchanges-add-new-api__form">
      <step-image
        class='exchanges-add-new-api__step-image
          exchanges-add-new-api__step-image--name
          status-bar-active'
        :success='!!name'>1
      </step-image>
      <p class="exchanges-add-new-api__label exchanges-add-new-api__label--name">Choose exchange</p>
      <div
        class="exchanges-add-new-api__line exchanges-add-new-api__line--name"
        :class='{"status-bar-active": name}'>
      </div>
      <div class="exchanges-add-new-api__check-container">
        <label
          class="new-api-checkbox exchanges-add-new-api__checkbox"
          v-for='(item, index) in api' :key='index'>
          <input
            type="radio"
            class="new-api-checkbox__input"
            name='api-name'
            :value='item.name'
            v-model='name'>
          <div class="new-api-checkbox__button">
            <div class="new-api-checkbox__inner">
              <div class="new-api-checkbox__image-wrapper">
                <img
                  class="new-api-checkbox__image"
                  :src="require(`@/assets/images/${item.image}`)"
                  alt="logo">
              </div>
              <p class="new-api-checkbox__text">{{ item.name }}</p>
            </div>
            <div class="new-api-checkbox__check">
              <div class="new-api-checkbox__dot"></div>
            </div>
          </div>
        </label>
      </div>
      <label
        for='apikey'
        class="exchanges-add-new-api__label exchanges-add-new-api__label--apikey">API Key
      </label>
      <step-image
        class='exchanges-add-new-api__step-image
              exchanges-add-new-api__step-image--apikey
              animated dur04 fadeIn'
        :class='{"status-bar-active": name,
                "status-bar-success": name && apiKey}'
        :success='!!apiKey'>2
      </step-image>
      <div
        class="exchanges-add-new-api__line
              exchanges-add-new-api__line--apikey
              animated dur04 fadeIn"
        v-show='name'
        :class='{"status-bar-active": name && apiKey}'>
      </div>
      <input
        type="text"
        class="exchanges-add-new-api__input
              exchanges-add-new-api__input--apikey
              animated dur04 fadeIn"
        v-show='name'
        v-model='apiKey'
        id='apikey'>
      <label
        for='secret'
        v-show='name && apiKey'
        class="exchanges-add-new-api__label
              exchanges-add-new-api__label--secret
              animated dur04 fadeIn">Secret Key
      </label>
      <step-image
        class='exchanges-add-new-api__step-image
              exchanges-add-new-api__step-image--secret
              animated dur04 fadeIn'
        v-show='name && apiKey'
        :class='{"status-bar-active": name && apiKey,
                "status-bar-success": name && apiKey && secretKey}'
        :success='!!secretKey'>3
      </step-image>
      <div
        class="exchanges-add-new-api__line
              exchanges-add-new-api__line--secret
              animated dur04 fadeIn"
        v-show='name && apiKey'
        :class='{"status-bar-active": name && apiKey && secretKey}'>
      </div>
      <input
        type="text"
        class="exchanges-add-new-api__input
              exchanges-add-new-api__input--secret
              animated dur04 fadeIn"
        v-show='name && apiKey'
        v-model='secretKey'
        id='secret'>
    </div>
    <div class="exchanges-add-new-api__button-wrapper">
      <button-secondary
        class="exchanges-add-new-api__button exchanges-add-new-api__button--cancel-desktop"
        @click.native='close'
        >Cancel
      </button-secondary>
      <button-primary
        class="exchanges-add-new-api__button exchanges-add-new-api__button--save"
        :disabled='!apiReady'
        :class='{"button-loading": loading}'
        @click.native.once='add'
        >Add
      </button-primary>
      <button-transparent
        class="exchanges-add-new-api__button exchanges-add-new-api__button--cancel"
        @click.native='close'
        >Cancel
      </button-transparent>
    </div>
  </div>
</div>
</template>
<script>
import ButtonPrimary from '@/components/common/buttons/ButtonPrimary.vue';
import ButtonSecondary from '@/components/common/buttons/ButtonSecondary.vue';
import ButtonTransparent from '@/components/common/buttons/ButtonTransparent.vue';
import CloseButton from '@/components/common/buttons/CloseButton.vue';
import StepImage from '@/components/common/StepImage.vue';
// import MessageInfoAbsolute from '@/components/common/messages/MessageInfoAbsolute.vue';
import { mapActions, mapGetters, mapState } from 'vuex';

export default {
  name: 'ExchangesAddNewApi',
  components: {
    ButtonTransparent,
    ButtonPrimary,
    ButtonSecondary,
    CloseButton,
    StepImage,
    // MessageInfoAbsolute,
  },
  data() {
    return {
      apiKey: '',
      secretKey: '',
      name: '',
      loading: false,
      // message:'',
      // isMessage:{ info: false },
    };
  },
  computed: {
    ...mapState('exchanges', [
      'api',
    ]),
    ...mapGetters('exchanges', [
      'getImages',
    ]),
    apiReady() {
      return this.name && this.apiKey && this.secretKey;
    },
  },
  methods: {
    ...mapActions('exchanges', [
      'addExchange',
    ]),
    close() {
      this.$emit('close');
    },
    // TODO: change save func to http request
    add() {
      this.loading = true;
      const data = {
        id: Math.floor(Math.random() * (10000 - 1)) + 1,
        name: this.name.toLowerCase(),
        type: this.name.toLowerCase(),
        api_key: this.apiKey,
        sec_key: this.secretKey,
        status: true,
        balance: Math.random() * (10000 - 1) + 1,
        balance_ardor: Math.random() * (10000 - 1) + 1,
        balance_btc: Math.random() * (10000 - 1) + 1,
        api_extra: '',
      };
      this.addExchange(data)
        .then((resp) => {
          console.log(resp);
          this.loading = false;
          this.close();
        })
        .catch((error) => {
          console.log(error);
          this.loading = false;
          this.close();
        })
    },
  },
};
</script>
<style lang="scss">
.exchanges-add-new-api {
  position: absolute;
  top: -56px;
  right: 0;
  left: 0;
  min-height: 100vh;
  z-index: 11;
  @include flex-col(stretch, stretch);
  @media screen and (min-width: $screen-tablet) {
    background: rgba(10,11,12,0.80);
    position: fixed;
    bottom: 0;
    flex-direction: row;
    justify-content: center;
    align-items: center;
  }
  &__card {
    background-color: $N13;
    flex: 1 1;
    @include flex-col(stretch, stretch);
    padding: 24px 28px 48px 24px;
    @media screen and (min-width: $screen-tablet) {
      flex: 0 1 32%;
      min-width: 464px;
      position: relative;
      padding: 32px 40px;
    }
  }
  &__icon-wrapper {
    width: 30px;
    height: 30px;
    border-radius: 50%;
    overflow: hidden;
    margin-right: 16px;
  }
  &__icon {
    width: 100%;
    height: 100%;
  }
  &__close-button {
    align-self: flex-end;
    svg {
      width: 16px;
      height: 16px;
    }
    @media screen and (min-width: $screen-tablet) {
      position: absolute;
      top: 18px;
      right: 18px;
    }
  }
  &__header {
    padding-top: 18px;
    margin-bottom: 24px;
    @include flex-row(flex-start, center);
  }
  &__heading {
    font-size: $H800;
    font-weight: 500;
    margin-bottom: 32px;
    @media screen and (min-width: $screen-tablet) {
      font-weight: 600;
    }
  }
  &__label {
    @extend %input-label-text;
    margin-bottom: 0;
    padding-bottom: 2px;
    @media screen and (min-width: $screen-tablet) {
      font-size: $H500;
    }
    &--name {
      grid-area: label-name;
    }
    &--apikey {
      grid-area: label-apikey;
    }
    &--secret {
      grid-area: label-secret;
    }
  }
  &__input {
    @extend %input;
    width: 100%;
    &--apikey {
      grid-area: input-apikey;
    }
    &--secret {
      grid-area: input-secret;
    }
  }
  &__button-wrapper {
    flex: 1 1;
    @include flex-col(flex-end, stretch);
    @media screen and (min-width: $screen-tablet) {
      flex-direction: row;
      align-items: center;
    }
  }
  &__button {
    &--save {
      margin-bottom: 20px;
      @media screen and (min-width: $screen-tablet) {
        margin: 0;
      }
    }
    &--cancel-desktop {
      display: none;
      @media screen and (min-width: $screen-tablet) {
        display: flex;
        margin-right: 24px;
      }
    }
    &--cancel {
      @media screen and (min-width: $screen-tablet) {
        display: none;
      }
    }
  }
  &__form {
    @extend %status-bar-grid;
    grid-template-areas:
    'image-name label-name'
    'line-name input-name'
    'image-apikey label-apikey'
    'line-apikey input-apikey'
    'image-secret label-secret'
    'line-secret input-secret';
    margin-bottom: 32px;
  }
  &__step-image {
    &--name {
      grid-area: image-name;
    }
    &--apikey {
      grid-area: image-apikey;
    }
    &--secret {
      grid-area: image-secret;
    }
  }
  &__line {
    @extend %status-bar-line-new;
    &--name {
      grid-area: line-name;
    }
    &--apikey {
      grid-area: line-apikey;
    }
    &--secret {
      grid-area: line-secret;
    }
  }
  &__check-container {
    grid-area: input-name;
    width: 100%;
    @media screen and (min-width: $screen-tablet) {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      grid-auto-rows: auto;
      grid-gap: 24px;
    }
  }
  &__checkbox {
    margin-bottom: 14px;
    width: 100%;
    @media screen and (min-width: $screen-tablet) {
      margin: 0;
    }
    &:last-child {
      margin-bottom: 0;
    }
  }
}
</style>
