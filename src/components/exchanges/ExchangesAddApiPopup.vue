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
        @click.native.once='save'
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
import { mapMutations, mapGetters } from 'vuex';

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
      if (this.apiName) {
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
    ...mapMutations('exchanges', [
      'addApi',
    ]),
    close() {
      this.$emit('close');
    },
    // TODO: change save func to http request
    save() {
      this.loading = true;
      const getBalance = Math.floor(Math.random() * 1000000);
      const api = {
        name: this.apiName,
        apiKey: this.apiKey,
        secretKey: this.secretKey,
        balance: getBalance,
        status: false,
      };
      setTimeout(() => {
        this.addApi(api);
        this.loading = false;
        this.close();
      }, 1000);
    },
  },
};
</script>
<style lang="scss">
.exchanges-add-api {
  position: fixed;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  min-height: 100vh;
  z-index: 11;
  @include flex-col(stretch, stretch);
  @media screen and (min-width: $screen-tablet) {
    flex-direction: row;
    justify-content: center;
    align-items: center;
    background: rgba(10,11,12,0.80);
  }
  &__card {
    background-color: $N13;
    flex: 1 1;
    @include flex-col(stretch, stretch);
    padding: 24px 28px 48px 24px;
    @media screen and (min-width: $screen-tablet) {
      flex: 0 1 27%;
      min-width: 400px;
      padding: 28px 40px 32px;
      border: 1px solid $N11;
      box-shadow: 0 20px 28px 0 rgba(0,0,0,0.32);
      position: relative;
    }
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
    padding-top: 18px;
    margin-bottom: 24px;
    @include flex-row(flex-start, center);
    @media screen and (min-width: $screen-tablet) {
      padding: 0;
      margin-bottom: 32px;
    }
  }
  &__heading {
    font-size: $H700;
    font-weight: 500;
    @media screen and (min-width: $screen-tablet) {
      font-size: $H800;
    }
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
