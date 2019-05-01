<template>
<main class="auth__wrapper">
  <message-success-absolute
    class='auth__message'
    v-if='message.confirm'
    @click.native='message.confirm = false'
    key='confirm'>
    {{ messageConfirmText }}
  </message-success-absolute>
   <message-info-absolute
    class='auth__message'
    v-if='message.info'
    @click.native='message.info = false'
    key='info'>
    {{ messageInfoText }}
  </message-info-absolute>
  <message-error-absolute
    class='auth__message'
    v-if='message.error'
    @click.native='message.error = false'>
    {{ messageErrorText }}
  </message-error-absolute>
  <icon-logo class='auth__logo'/>
  <section class="auth animated dur09 fadeIn">
    <div class="auth__mobile-header">
      <icon-logo class="auth__mobile-logo"/>
      <close-button
        class="auth__close-button"
        @click.native='close'/>
    </div>
    <div class="auth__reset-message" v-if='message.reset'>
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
      <router-link to='/auth/investor/signup' class="only-mobile-block">
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
        v-model.trim="form.password">
        <p
          class="input-text-error animated dur04 bounceIn"
          v-show='myErrors.password'
          v-html="myErrors.password">
        </p>
      </div>
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
        <router-link to='/auth/investor/recovery'>
          <subtle>{{ $t('auth.links.password') }}</subtle>
        </router-link>
        <button-primary
          @click.prevent.native='login'
          :disabled='!loginDisabled'
          >{{ $t('auth.buttons.login') }}
        </button-primary>
      </div>
    </form>
  </section>
  <footer class="auth__footer">
    <p class="auth__footer-text">{{ $t('auth.links.signup') }}</p>
    <router-link to='/auth/investor/signup'>
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
import MessageSuccessAbsolute from '@/components/common/messages/MessageSuccessAbsolute.vue';
import MessageInfoAbsolute from '@/components/common/messages/MessageInfoAbsolute.vue';
import MessageErrorAbsolute from '@/components/common/messages/MessageErrorAbsolute.vue';
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
    CloseButton,
    IconCheck2,
    MessageSuccessAbsolute,
    MessageInfoAbsolute,
    MessageErrorAbsolute,
  },
  data() {
    return {
      form: {
        password: '',
        email: '',
      },
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
      message: {
        info: false,
        confirm: false,
        reset: false,
        error: false,
      },
      messageErrorText: '',
      messageConfirmText: '',
      messageInfoText: '',
    };
  },
  methods: {
    ...mapMutations({
      toggleKeepingUser: 'investorLogin/toggleKeepingUser',
      setSurvey: 'investorProfile/setSurvey',
    }),
    ...mapActions({
      AUTH_REQUEST: 'investorLogin/AUTH_REQUEST',
      getProfile: 'investorProfile/getProfile',
      getProfileAsync: 'investorProfile/getProfileAsync',
      getFund: 'investorProfile/getFund',
    }),
    close() {
      this.$router.push('/investor');
    },
    login() {
      this.AUTH_REQUEST(this.form).then((response) => {
        console.log(response);
        this.getProfileAsync()
          .then(() => {
            this.$router.push('/investor');
          })
          .catch((error) => {
            this.messageErrorText = 'Error';
            this.showMessage('error');
            console.log(error);
          })
      }).catch((error) => {
        this.messageErrorText = 'Sorry, that password isn\'t right. We can help you recover your password';
        this.showMessage('error');
        console.log(error);
      });
      if (this.$dev) this.$router.push('/investor');
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
      keepUser: state => state.investorLogin.keepUser,
      subdomain: state => state.subdomain,
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
      return this.checkPassword && this.checkEmail;
    },
  },
  watch: {
    checkPassword(value) {
      if (value) this.myErrors.password = '';
    },
    checkEmail(value) {
      if (value) this.myErrors.email = '';
    },
  },
  created() {
    if (this.$route.query.message) {
      const { message } = this.$route.query;
      if (message === 'verify') {
        this.messageInfoText = 'Registration completed. Please verify your email address!';
        this.message.info = true;
        this.setSurvey();
      } else if (message === 'confirm') {
        this.messageConfirmText = 'Your email address has been confirmed!';
        this.message.confirm = true;
      } else if (message === 'reset') {
        this.message.reset = true;
      } else if (message === 'reset-error') {
        this.messageErrorText = 'Your password has not been changed. Please try again to restore.';
        this.message.error = true;
      } else if (message === 'alias-error') {
        this.messageErrorText = 'You aren\'t registered in this fund.';
        this.message.error = true;
      } else if (message === 'email-send') {
        this.messageInfoText = 'Activation email has been sent to Email address';
        this.message.info = true;
        this.setSurvey();
      }
      this.$router.replace('/auth/investor');
    }
    if (this.$route.query.code) {
      this.messageConfirmText = 'Your email address has been confirmed!';
      this.message.confirm = true;
      this.setSurvey();
      this.$router.replace('/auth/investor');
    }
  },
  beforeRouteUpdate(to, from, next) {
    if (to.query.message) {
      const { message } = to.query;
      if (message === 'alias-error') {
        this.messageErrorText = 'You aren\'t registered in this fund.';
        this.message.error = true;
        next({ path: '/auth/investor', replace: true });
      } else {
        next();
      }
    } else {
      next();
    }
  },
};
</script>
