<template>
<section class='account-recovery-confirm' @keypress.enter="confirmCode">
  <div class="account-recovery-confirm__form">
    <p
      class="account-recovery-confirm__subtitle"
      v-html="`${$t('auth.text.sent code')} ${email}`"></p>
    <div class="account-recovery-confirm__button-wrapper">
      <label class="account-recovery-confirm__label-wrapper">
        <p class="account-recovery-confirm__label-text">{{ $t('auth.labels.code') }}</p>
        <input
          type="text"
          class="account-recovery-confirm__input"
          v-model='code'>
      </label>
      <button-primary
        @click.prevent.native='confirmCode'
        :class='{"button-loading": loading}'
        :disabled='!code'
        class='account-recovery-confirm__button'>{{ $t('auth.buttons.send') }}
      </button-primary>
    </div>
  </div>
</section>
</template>
<script>
import ButtonPrimary from '@/components/common/buttons/ButtonPrimary.vue';

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
      if (this.code) {
        this.loading = true;
        const data = {code: this.code};
        this.$emit('token', '2f0aea34-00a0-5695-85fe-e02c0a0cc8d6');
      }
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
