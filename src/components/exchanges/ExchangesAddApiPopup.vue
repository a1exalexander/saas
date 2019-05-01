<template>
<div class="exchanges-add-api">
  <div class="exchanges-add-api__card">
    <close-button
      class="exchanges-add-api__close-button"
      @click.native='close'/>
    <div class="exchanges-add-api__header">
      <div class="exchanges-add-api__icon-wrapper">
        <img class="exchanges-add-api__icon" :src='apiImage' alt="image">
      </div>
      <p class="exchanges-add-api__heading">
        Add {{ apiName }} API Key
      </p>
    </div>
    <label class="exchanges-add-api__label">
      <p class="exchanges-add-api__label-text">API Key</p>
      <input
        type="text"
        class="exchanges-add-api__input"
        v-model='apiKey'>
    </label>
    <label class="exchanges-add-api__label">
      <p class="exchanges-add-api__label-text">Secret Key</p>
      <input
        type="text"
        class="exchanges-add-api__input"
        v-model='secretKey'>
    </label>
    <div class="exchanges-add-api__button-wrapper">
      <button-secondary
        class="exchanges-add-api__button exchanges-add-api__button--cancel-desktop"
        @click.native='close'
        >Cancel
      </button-secondary>
      <button-primary
        class="exchanges-add-api__button exchanges-add-api__button--save"
        :disabled='!apiReady'
        :class='{"button-loading": loading}'
        @click.native='save'
        >Save
      </button-primary>
      <button-transparent
        class="exchanges-add-api__button exchanges-add-api__button--cancel"
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
import { mapGetters, mapActions } from 'vuex';

export default {
  name: 'ExchangesAddApi',
  props: {
    apiName: {
      type: String,
    },
  },
  components: {
    ButtonTransparent,
    ButtonPrimary,
    ButtonSecondary,
    CloseButton,
  },
  data() {
    return {
      apiKey: '',
      secretKey: '',
      loading: false,
    };
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
    apiReady() {
      return this.apiKey && this.secretKey;
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
    save() {
      this.loading = true;
      const data = {
        id: Math.floor(Math.random() * (10000 - 1)) + 1,
        name: this.apiName.toLowerCase(),
        type: this.apiName.toLowerCase(),
        api_key: this.apiKey,
        sec_key: this.secretKey,
        status: true,
        balance: Math.random() * (10000 - 1) + 1,
        balance_ardor: Math.random() * (10000 - 1) + 1,
        balance_btc: Math.random() * (10000 - 1) + 1,
        api_extra: '',
      };
      this.addExchange(data)
        .then(() => {
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
@import '~@/scss/components/popup';
.exchanges-add-api {
  @extend %popup;
  &__card {
    @extend %popup-card;
  }
  &__icon-wrapper {
    width: 30px;
    height: 30px;
    border-radius: 50%;
    overflow: hidden;
    margin-right: 16px;
    @media screen and (min-width: $screen-tablet) {
      width: 36px;
      height: 36px;
    }
  }
  &__icon {
    width: 100%;
    height: 100%;
  }
  &__close-button {
    align-self: flex-end;
    padding: 6px;
    position: relative;
    right: -6px;
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
    @extend %popup-header;
  }
  &__heading {
    @extend %popup-title;
  }
  &__label {
    @include flex-col(stretch, stretch);
    margin-bottom: 18px;
    @media screen and (min-width: $screen-tablet) {
      margin-bottom: 20px;
      &:last-of-type {
        margin-bottom: 32px;
      }
    }
  }
  &__label-text {
    @extend %input-label-text;
  }
  &__input {
    @extend %input;
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
        margin: 0 24px 0 0;
      }
    }
    &--cancel {
      @media screen and (min-width: $screen-tablet) {
        display: none;
      }
    }
  }
}
</style>
