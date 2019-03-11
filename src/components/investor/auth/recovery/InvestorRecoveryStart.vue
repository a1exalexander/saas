<template>
<form class="account-recovery-start">
  <p class="account-recovery-start__subtitle"
    >{{ $t('auth.text.restore') }}
  </p>
  <label class="account-recovery-start__label-wrapper">
    <span class="account-recovery-start__label-text"
      >{{ $t('auth.labels.email') }}</span>
    <input
      type="email"
      class="account-recovery-start__input"
      @blur='errorEmail'
      :class='{"input-error": error}'
      v-model.trim="email">
    <p
      class="input-text-error animated dur04 bounceIn"
      v-show='error'
      v-html="error">
    </p>
  </label>
  <div class="account-recovery-start__button-wrapper">
    <router-link to='/auth/investor'>
      <subtle-icon>
        <icon-long-arrow-left
          class='icon-button-left account-recovery-start__button-image'/>
        {{ $t('auth.links.back login') }}
      </subtle-icon>
    </router-link>
    <button-primary
      :disabled='!emailReady'
      @click.prevent.native="emailEntered">{{ $t('auth.buttons.continue') }}
    </button-primary>
  </div>
</form>
</template>
<script>
import ButtonPrimary from '@/components/common/buttons/ButtonPrimary.vue';
import SubtleIcon from '@/components/common/buttons/SubtleIcon.vue';
import IconLongArrowLeft from '@/components/common/icons/IconLongArrowLeft.vue';
import Validation from '@/js/validation';

export default {
  name: 'AccountRecoveryStart',
  components: {
    ButtonPrimary,
    SubtleIcon,
    IconLongArrowLeft,
  },
  data() {
    return {
      email: '',
      error: '',
      errorText: [
        'Please enter an email address',
        'An email address must contain a single @',
        'The domain portion of the email address is invalid (the portion after the @:)',
        'Please enter a valid email address',
      ],
    };
  },
  methods: {
    toLogin() {
      this.$router.push('/auth');
    },
    emailEntered() {
      this.$emit('emailEntered', this.email);
    },
    errorEmail() {
      const [error1, error2, error3, error4] = this.errorText;
      let errorText = '';
      this.error = errorText;
      setTimeout(() => {
        if (!this.email) {
          errorText = error1;
        } else if (!Validation.emailAt(this.email)) {
          errorText = error2;
        } else if (!Validation.emailDomain(this.email)) {
          errorText = error3;
        } else if (!Validation.email(this.email)) {
          errorText = error4;
        } else {
          errorText = '';
        }
        this.error = errorText;
      }, 15);
    },
  },
  computed: {
    emailDomainReady() {
      return Validation.emailDomain(this.email);
    },
    emailAtReady() {
      return Validation.emailAt(this.email);
    },
    emailReady() {
      return Validation.email(this.email);
    },
  },
  watch: {
    emailReady(value) {
      if (value) this.error = '';
    },
  },
};
</script>
<style lang="scss">
.account-recovery-start {
  &__subtitle {
    @extend %auth-subtitle;
  }
  &__label-wrapper {
    @include flex-col(flex-start, flex-start);
    margin-bottom: 32px;
  }
  &__label-text {
    @extend %auth-label-text;
  }
  &__input {
    @extend %input;
    width: 100%;
  }
  &__button-wrapper {
    @include flex-row(space-between, center);
  }
  &__button-image {
    @extend %button-image;
  }
}
</style>
