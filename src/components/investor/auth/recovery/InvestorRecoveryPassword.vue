<template>
<div class="recovery-password" @keypress.enter="send">
  <subtle-icon @click.prevent class='recovery-password__email'>
    <icon-mail
      class='icon-button-left recovery-password__button-image'/>
    {{ email }}
  </subtle-icon>
  <div class="recovery-password__form">
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
        :class='{"input-error": myErrors.password}'
        @blur='errorPassword("password")'
        v-model.trim="password">
      <p
        class="input-text-error animated dur04 bounceIn"
        v-show='myErrors.password'
        v-html="myErrors.password">
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
          autocomplete="off"
          @blur="errorPassword('passwordConfirm')"
          class="recovery-password__input"
          v-model='passwordConfirm'>
      </div>
    </label>
    <!-- <label class="recovery-password__checkbox checkbox">
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
    </label> -->
    <div class="recovery-password__buttons-wrapper">
      <button-secondary
        @click.prevent.native='cancel'
        class="recovery-password__button">{{ $t('auth.buttons.cancel') }}</button-secondary>
      <button-primary
        @click.prevent.native='send'
        :class='{"button-loading": loading}'
        :disabled='!allReady'>{{ $t('auth.buttons.send') }}</button-primary>
    </div>
  </div>
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
    token: {
      type: String,
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
      errorText: [
        this.$t('auth.errors.password.enter'),
        this.$t('auth.errors.password.full'),
      ],
      myErrors: {
        password: '',
        passwordConfirm: '',
      },
      showPasswordStatus: false,
      recaptchaToken: 'token',
      loading: '',
    };
  },
  methods: {
    ...mapMutations('investorLogin', [
      'toggleRecaptcha',
      'toggleResetMessage',
    ]),
    onVerify(response) {
      this.recaptchaToken = response;
    },
    onExpired() {
      this.recaptchaToken = '';
    },
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
    errorPassword(type) {
      const password = this[type];
      const [errorEnter, errorFull] = this.errorText;
      this.myErrors[type] = '';
      setTimeout(() => {
        if (!password) {
          this.myErrors[type] = errorEnter;
        } else if (!Validation.password(password)) {
          this.myErrors[type] = errorFull;
        } else {
          this.myErrors[type] = '';
        }
      }, 15);
    },
    cancel() {
      this.$router.push('/auth/investor');
    },
    send() {
      if (this.allReady) {
        this.loading = true;
        const data = {
          currentpassword: this.password,
          newpassword: this.passwordConfirm,
          auth_token: this.token,
        };
       this.$router.push({ path: '/auth/investor', query: { message: 'reset' } });
      }
    },
  },
  computed: {
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
      return Validation.password(this.passwordConfirm);
    },
    allReady() {
      return this.passwordReady && this.passwordConfirmReady && this.recaptchaToken;
    },
  },
  watch: {
    passwordReady(value) {
      if (value) this.myErrors.password = '';
    },
    passwordConfirm(value) {
      if (value) this.myErrors.passwordConfirm = '';
    },
  },
};
</script>
<style lang="scss">
@import '~@/scss/components/recovery-password';
</style>
