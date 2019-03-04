<template>
<main class="auth__wrapper">
  <message-success
    class='auth__message'
    v-if='emailConfirmMessage'
    @click.native='toggleEmailConfirmedMessage(false)'>
    Your email address has been confirmed!
  </message-success>
  <icon-logo class='auth__logo'/>
  <section class="auth animated dur09 fadeIn">
    <div class="auth__mobile-header">
      <icon-logo class="auth__mobile-logo"/>
      <close-button
        class="auth__close-button"
        @click.native='close'/>
    </div>
    <div class="auth__reset-message" v-if='resetMessage'>
      <p class="auth__title auth__title--message">{{ $t('auth.messages.success') }}</p>
      <p class="auth__text">
        <span class="auth__image-wrapper">
          <icon-check2 class='auth__message-image'/>
        </span>
        {{ $t('auth.messages.reset') }}
      </p>
    </div>
    <div class="auth__title-wrapper">
      <p class="auth__title">{{ $t('auth.titles.login') }}</p>
      <router-link to='/auth/signup' class="only-mobile-block">
        <subtle>{{ $t('auth.links.signup') }}</subtle>
      </router-link>
    </div>
    <form class="auth__form">
      <label class="auth__label-wrapper">
        <span class="auth__label-text">
          {{ $t('auth.labels.email') }}</span>
        <input
          type="email"
          class="auth__input"
          @blur='errorEmail'
          :class='{"input-error": myErrors.email}'
          v-model.trim="form.email">
        <p
          class="input-text-error animated dur04 bounceIn"
          v-show='myErrors.email'
          v-html="myErrors.email">
        </p>
      </label>
      <div class="auth__label-inner">
        <label
          for='password'
          class="auth__label-text">{{ $t('auth.labels.password') }}
        </label>
        <subtle-icon
          @click.prevent.native='showPassword'
          class="animated dur04 fadeIn">
          <icon-view
            class='icon-button-left-desktop auth__button-image'
            v-if='!showPasswordStatus'/>
          <icon-eye-off
            class='icon-button-left-desktop auth__button-image'
            v-else/>
          {{ showPasswordStatus? $t('auth.buttons.hide'): $t('auth.buttons.show') }}
        </subtle-icon>
      </div>
      <div class="auth__input-wrapper">
        <input
        id='login-password'
        type="password"
        class="auth__input auth__input--password"
        :class='{"input-error": myErrors.password}'
        @blur='errorPassword'
        v-model.trim="form.password"
        autocomplete="off">
        <p
          class="input-text-error animated dur04 bounceIn"
          v-show='myErrors.password'
          v-html="myErrors.password">
        </p>
      </div>
      <vue-recaptcha
        class="login-recaptcha"
        @click.stop
        ref="recaptcha"
        theme='dark'
        sitekey="6Lej1pQUAAAAAEe8hfLDbMGh31AHHA8Hi9FDf-lJ"
        @verify="onVerify"
        @expired="onExpired"
        v-if='!recaptcha'>
      </vue-recaptcha>
      <label class="auth__checkbox checkbox">
        <input
          type="checkbox"
          class="checkbox__input"
          v-model="keepMe">
        <div class="checkbox__inner">
          <div class="checkbox__cell">
            <icon-check class='checkbox__image'/>
          </div>
          <p class="checkbox__text">{{ $t('auth.labels.keepme') }}</p>
        </div>
      </label>
      <div class="auth__button-wrapper">
        <router-link to='/auth/recovery'>
          <subtle>{{ $t('auth.links.password') }}</subtle>
        </router-link>
        <button-primary
          @click.prevent.native='login'
          :disabled='!loginDisabled'
          :class='{"button-loading": authStatus === "loading"}'
          >{{ $t('auth.buttons.login') }}
        </button-primary>
      </div>
    </form>
  </section>
  <footer class="auth__footer">
    <p class="auth__footer-text">{{ $t('auth.links.signup') }}</p>
    <router-link to='/auth/signup'>
      <button-secondary>{{ $t('auth.buttons.signup') }}</button-secondary>
    </router-link>
  </footer>
</main>
</template>
<script>
import ButtonPrimary from '@/components/common/buttons/ButtonPrimary.vue';
import ButtonSecondary from '@/components/common/buttons/ButtonSecondary.vue';
import Subtle from '@/components/common/buttons/Subtle.vue';
import SubtleIcon from '@/components/common/buttons/SubtleIcon.vue';
import IconView from '@/components/common/icons/IconView.vue';
import IconCheck from '@/components/common/icons/IconCheck.vue';
import IconCheck2 from '@/components/common/icons/IconCheck2.vue';
import IconLogo from '@/components/common/icons/IconLogo.vue';
import Validation from '@/js/validation';
import IconEyeOff from '@/components/common/icons/IconEyeOff.vue';
import CloseButton from '@/components/common/buttons/CloseButton.vue';
import MessageSuccess from '@/components/common/messages/MessageSuccess.vue';
import VueRecaptcha from 'vue-recaptcha';
import { siteKey } from '@/js/api';
import { mapMutations, mapState, mapActions } from 'vuex';

export default {
  name: 'Login',
  components: {
    ButtonPrimary,
    Subtle,
    SubtleIcon,
    IconView,
    IconCheck,
    IconLogo,
    ButtonSecondary,
    IconEyeOff,
    MessageSuccess,
    CloseButton,
    IconCheck2,
    VueRecaptcha,
  },
  data() {
    return {
      form: {
        password: '',
        email: '',
      },
      recaptchaToken: '',
      showPasswordStatus: false,
      myErrors: {
        password: '',
        email: '',
      },
      errorsText: {
        password: this.$t('auth.errors.password.right'),
        email: [
          this.$t('auth.errors.email.enter'),
          this.$t('auth.errors.email.find'),
          this.$t('auth.errors.email.valid'),
        ],
      },
    };
  },
  methods: {
    ...mapMutations({
      toggleKeepingUser: 'login/toggleKeepingUser',
      toggleEmailConfirmedMessage: 'signup/toggleEmailConfirmedMessage',
      toggleResetMessage: 'login/toggleResetMessage',
    }),
    ...mapActions('login', [
      'AUTH_REQUEST',
    ]),
    onVerify(response) {
      this.recaptchaToken = response;
    },
    onExpired() {
      this.recaptchaToken = '';
    },
    close() {
      this.$router.push('/auth');
    },
    login() {
      this.$router.push('/profile');
    },
    showPassword() {
      const element = document.getElementById('login-password');
      if (element.type === 'password') {
        element.type = 'text';
        this.showPasswordStatus = true;
      } else {
        element.type = 'password';
        this.showPasswordStatus = false;
      }
    },
    errorPassword() {
      const error = this.errorsText.password;
      this.myErrors.password = '';
      setTimeout(() => {
        if (!this.checkPassword) {
          this.myErrors.password = error;
        } else {
          this.myErrors.password = '';
        }
      }, 15);
    },
    errorEmail() {
      const error1 = this.errorsText.email[0];
      const error3 = this.errorsText.email[2];
      this.myErrors.email = '';
      setTimeout(() => {
        if (!this.form.email) {
          this.myErrors.email = error1;
        } else if (!this.checkEmail) {
          this.myErrors.email = error3;
        } else if (this.checkEmail) {
          this.myErrors.email = '';
        }
      }, 15);
    },
  },
  computed: {
    ...mapState({
      keepUser: state => state.login.keepUser,
      emailConfirmMessage: state => state.signup.emailConfirmMessage,
      resetMessage: state => state.login.resetMessage,
      authStatus: state => state.login.authStatus,
      recaptcha: state => state.login.recaptcha,
    }),
    keepMe: {
      get() {
        return this.keepUser;
      },
      set() {
        this.toggleKeepingUser();
      },
    },
    checkPassword() {
      return Validation.password(this.form.password);
    },
    checkEmail() {
      return Validation.email(this.form.email);
    },
    loginDisabled() {
      if (this.recaptcha) {
        return this.checkPassword && this.checkEmail;
      }
      return this.checkPassword && this.checkEmail && this.recaptchaToken;
    },
  },
  watch: {
    checkEmail(value) {
      if (value) this.myErrors.email = '';
    },
    checkPassword(value) {
      if (value) this.myErrors.password = '';
    },
  },
  beforeDestroy() {
    this.toggleEmailConfirmedMessage(false);
    this.toggleResetMessage(false);
  },
};
</script>
<style lang="scss">
.login-recaptcha {
  margin-bottom: 32px;
}
</style>
