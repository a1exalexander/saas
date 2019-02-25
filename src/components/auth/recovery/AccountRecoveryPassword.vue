<template>
<div class="recovery-password">
  <subtle-icon @click.prevent class='recovery-password__email'>
    <icon-mail
      class='icon-button-left recovery-password__button-image'/>
    {{ email }}
  </subtle-icon>
  <form class="recovery-password__form">
    <div class="recovery-password__label-wrapper">
      <label
        for="account-recovery-pasword"
        class="recovery-password__label-text
          recovery-password__label-text--no-margin">{{ $t('auth.labels.new password') }}
      </label>
      <subtle-icon
        @click.prevent.native='showPassword'
        class="animated dur04 fadeIn">
        <icon-view
          class='icon-button-left-desktop recovery-password__button-image'
          v-if='!showPasswordStatus'/>
        <icon-eye-off
          class='icon-button-left-desktop recovery-password__button-image'
          v-else/>
        {{ showPasswordStatus?$t('auth.buttons.hide'):$t('auth.buttons.show') }}
      </subtle-icon>
    </div>
    <div class="recovery-password__input-wrapper">
      <input
        id='account-recovery-pasword'
        type="password"
        autocomplete="off"
        class="recovery-password__input"
        :class='{"input-error": error}'
        @blur='errorPassword'
        v-model.trim="password">
      <p
        class="input-text-error animated dur04 bounceIn"
        v-show='error'
        v-html="error">
      </p>
    </div>
    <ul class="recovery-password__conditions password-conditions">
      <password-error
        :rule='lowerCase'
        :any='anyReady'
        :text='$t("auth.errors.password.lowercase")'/>
      <password-error
        :rule='specialChars'
        :any='anyReady'
        :text="$t('auth.errors.password.special')"/>
      <password-error
        :rule='upperCase'
        :any='anyReady'
        :text='$t("auth.errors.password.uppercase")'/>
      <password-error
        :rule='eightChars'
        :any='anyReady'
        :text="$t('auth.errors.password.minimum')"/>
      <password-error
        :rule='oneNumber'
        :any='anyReady'
        :text="$t('auth.errors.password.number')"/>
    </ul>
    <label
      class='recovery-password__label'
      for="recovery-account-password-confirm">
      <p class='recovery-password__label-text'>{{ $t('auth.labels.confirm') }}</p>
      <div class="recovery-password__input-wrapper
        recovery-password__input-wrapper--confirm">
        <icon-check
          class='recovery-password__icon animated dur08 bounceIn'
          v-show='passwordConfirmReady'/>
        <input
          id='recovery-account-password-confirm'
          type="password"
          class="recovery-password__input"
          v-model='passwordConfirm'>
      </div>
    </label>
    <label class="recovery-password__checkbox checkbox">
      <input
        type="checkbox"
        class="checkbox__input"
        v-model='recaptcha'>
      <div class="checkbox__inner">
        <div class="checkbox__cell">
          <icon-check class='checkbox__image'/>
        </div>
        <p class="checkbox__text">{{ $t('auth.labels.dont ask') }}
        </p>
      </div>
    </label>
    <div class="recovery-password__buttons-wrapper">
      <button-secondary
        @click.prevent.native='cancel'
        class="recovery-password__button">{{ $t('auth.buttons.cancel') }}</button-secondary>
      <button-primary
        @click.prevent.native='reset'
        :disabled='!allReady'>{{ $t('auth.buttons.send') }}</button-primary>
    </div>
  </form>
</div>
</template>
<script>
import ButtonSecondary from '@/components/common/buttons/ButtonSecondary.vue';
import ButtonPrimary from '@/components/common/buttons/ButtonPrimary.vue';
import IconMail from '@/components/common/icons/IconMail.vue';
import SubtleIcon from '@/components/common/buttons/SubtleIcon.vue';
import IconEyeOff from '@/components/common/icons/IconEyeOff.vue';
import IconView from '@/components/common/icons/IconView.vue';
import IconCheck from '@/components/common/icons/IconCheck.vue';
import PasswordError from '@/components/common/PasswordError.vue';
import Validation from '@/js/validation';
import { mapState, mapMutations } from 'vuex';

export default {
  name: 'AccountRecoveryPassword',
  props: {
    email: {
      type: String,
      default: '',
    },
  },
  components: {
    IconMail,
    SubtleIcon,
    IconEyeOff,
    IconView,
    IconCheck,
    ButtonSecondary,
    ButtonPrimary,
    PasswordError,
  },
  data() {
    return {
      password: '',
      passwordConfirm: '',
      errorText: this.$t('auth.errors.password.enter'),
      error: '',
      showPasswordStatus: false,
    };
  },
  methods: {
    ...mapMutations('login', [
      'toggleRecaptcha',
      'toggleResetMessage',
    ]),
    showPassword() {
      const element = document.getElementById('account-recovery-pasword');
      if (element.type === 'password') {
        element.type = 'text';
        this.showPasswordStatus = true;
      } else {
        element.type = 'password';
        this.showPasswordStatus = false;
      }
    },
    errorPassword() {
      this.error = '';
      setTimeout(() => {
        if (!this.password) {
          this.error = this.errorText;
        } else {
          this.error = '';
        }
      }, 15);
    },
    cancel() {
      this.$router.push('/auth');
    },
    reset() {
      this.toggleResetMessage(true);
      this.$router.push('/auth');
    },
  },
  computed: {
    ...mapState('login', {
      getRecaptcha: state => state.offRecaptcha,
    }),
    recaptcha: {
      get() {
        return this.getRecaptcha;
      },
      set(value) {
        this.toggleRecaptcha(value);
      },
    },
    passwordReady() {
      return Validation.password(this.password);
    },
    lowerCase() {
      return Validation.lowerCase(this.password);
    },
    upperCase() {
      return Validation.upperCase(this.password);
    },
    specialChars() {
      return Validation.specialChars(this.password);
    },
    oneNumber() {
      return Validation.oneNumber(this.password);
    },
    eightChars() {
      return Validation.eightChars(this.password);
    },
    anyReady() {
      return this.lowerCase
        || this.upperCase
        || this.specialChars
        || this.oneNumber
        || this.eightChars;
    },
    passwordConfirmReady() {
      return this.password && this.password === this.passwordConfirm;
    },
    allReady() {
      return this.passwordReady && this.passwordConfirmReady;
    },
  },
  watch: {
    password(value) {
      if (value) this.error = '';
    },
  },
};
</script>
<style lang="scss">
.recovery-password {
  &__button-image {
    width: 18px;
    height: 18px;
  }
  &__email {
    pointer-events: none;
    margin-bottom: 20px;
  }
  &__label-wrapper {
    @include flex-row(space-between, flex-end);
    margin-bottom: 8px;
  }
  &__label-text {
    @extend %auth-label-text;
    &--no-margin {
      margin: 0;
    }
  }
  &__label {
    display: block;
    margin-bottom: 24px;
  }
  &__input {
    @extend %input;
    width: 100%;
  }
  &__input-wrapper {
    margin-bottom: 16px;
    position: relative;
    &--confirm {
      margin: 0;
    }
  }
  &__icon {
    @extend %input-icon;
    fill: $G1;
  }
  &__conditions {
    margin-bottom: 24px;
  }
  &__checkbox {
    margin-bottom: 32px;
  }
  &__buttons-wrapper {
    @include flex-row(flex-end, center);
  }
  &__button {
    margin-right: 24px;
  }
}
</style>
