<template>
<section class='account-recovery-confirm'>
  <form class="account-recovery-confirm__form">
    <p
      class="account-recovery-confirm__subtitle"
      v-html="`${$t('auth.text.sent code')} ${email}`"></p>
    <div class="account-recovery-confirm__button-wrapper">
      <label class="account-recovery-confirm__label-wrapper">
        <p class="account-recovery-confirm__label-text">{{ $t('auth.labels.code') }}</p>
        <input
          type="password"
          class="account-recovery-confirm__input"
          v-model.trim='code'>
      </label>
      <button-primary
        @click.prevent.native='confirmCode'
        :class='{"button-loading": loading}'
        :disabled='!code'
        class='account-recovery-confirm__button'>{{ $t('auth.buttons.send') }}
      </button-primary>
    </div>
  </form>
</section>
</template>
<script>
import ButtonPrimary from '@/components/common/buttons/ButtonPrimary.vue';
import { directorAuth } from '@/api/api';
import http from 'axios';

export default {
  name: 'AccountRecoveryConfirm',
  props: {
    email: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      code: '',
      loading: '',
    };
  },
  components: {
    ButtonPrimary,
  },
  methods: {
    confirmCode() {
      this.loading = true;
      http.get(directorAuth.recoveryVerify, this.code)
        .then((response) => {
          console.log(response);
          this.loading = false;
          this.$emit('confirmCode', response.data.user_token);
        }).catch((error) => {
          this.loading = false;
          console.log(error);
          // TODO: change to error
          this.$emit('confirmCode');
        });
    },
  },
};
</script>
<style lang="scss">
.account-recovery-confirm {
  &__form {
    padding-top: 12px;
    @media screen and (min-width: $screen-tablet) {
      padding-top: 0;
    }
  }
  &__button-image {
    width: 18px;
    height: 18px;
  }
  &__button-back {
    margin-bottom: 32px;
  }
  &__subtitle {
    @extend %auth-subtitle;
    margin-bottom: 48px;
    line-height: 1.8;
    padding-right: 60px;
    @media screen and (min-width: $screen-tablet) {
      padding-right: 0;
      margin-bottom: 24px;
    }
  }
  &__button-wrapper {
    @include flex-row(space-between, flex-end);
  }
  &__label-wrapper {
    margin-right: 24px;
    flex-grow: 1;
  }
  &__label-text {
    @extend %auth-label-text;
  }
  &__input {
    @extend %input;
    width: 100%;
  }
  &__button {
    min-height: 48px;
    padding: 10px 30px;
    @media screen and (min-width: $screen-tablet) {
      min-height: 36px;
    }
  }
}
</style>
