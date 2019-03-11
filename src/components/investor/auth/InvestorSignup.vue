<template>
<main class="auth__wrapper">
  <icon-logo class='auth__logo'/>
  <section class="auth animated dur09 fadeIn">
    <div class="auth__mobile-header">
      <icon-logo class="auth__mobile-logo"/>
      <close-button
        class="auth__close-button"
        @click.native='close'/>
    </div>
    <div class="auth__title-wrapper">
      <p class="auth__title">Sign Up</p>
    </div>
    <form class="auth__form">
      <label class="auth__label-wrapper">
        <span class="auth__label-text">Full Name</span>
        <input
          type="email"
          class="auth__input"
          @blur='errorName'
          :class='{"input-error": myErrors.name}'
          v-model.trim="name">
        <p
          class="input-text-error animated dur04 bounceIn"
          v-show='myErrors.name'
          v-html="myErrors.name">
        </p>
      </label>
      <label class="auth__label-wrapper">
        <span class="auth__label-text">
          {{ $t('auth.labels.email') }}</span>
        <input
          type="email"
          class="auth__input"
          @blur='errorEmail'
          :class='{"input-error": myErrors.email}'
          v-model.trim="email">
        <p
          class="input-text-error animated dur04 bounceIn"
          v-show='myErrors.email'
          v-html="myErrors.email">
        </p>
      </label>
      <div class="auth__label-inner">
        <label
          for='signup-password'
          class="auth__label-text login__label-text--password">
          {{ $t('auth.labels.password') }}
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
        id='signup-password'
        type="password"
        class="auth__input login__input--password"
        :class='{"input-error": myErrors.password}'
        @blur='errorPassword'
        v-model.trim="password">
        <p
          class="input-text-error animated dur04 bounceIn"
          v-show='myErrors.password'
          v-html="myErrors.password">
        </p>
      </div>
      <ul class="password-conditions auth__conditions">
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
      <label class="auth__checkbox checkbox">
        <input
          type="checkbox"
          class="checkbox__input"
          v-model="agree">
        <div class="checkbox__inner">
          <div class="checkbox__cell">
            <icon-check class='checkbox__image'/>
          </div>
          <p class="checkbox__text">{{ $t('auth.labels.terms') }}
          <a
            href="#"
            class="auth__link"
            @click.stop.prevent
            >{{ $t('auth.links.terms') }}
          </a>
        </p>
        </div>
      </label>
      <div class="auth__button-wrapper auth__button-wrapper--flex-end">
        <button-primary
          @click.prevent.native='signup'
          :disabled='!signupDisabled'
          :class='{"button-loading": loading.signup}'
          >{{ $t('auth.buttons.signup') }}
        </button-primary>
      </div>
    </form>
  </section>
</main>
</template>
<script>
import ButtonPrimary from '@/components/common/buttons/ButtonPrimary.vue';
import SubtleIcon from '@/components/common/buttons/SubtleIcon.vue';
import IconView from '@/components/common/icons/IconView.vue';
import IconCheck from '@/components/common/icons/IconCheck.vue';
import IconLogo from '@/components/common/icons/IconLogo.vue';
import Validation from '@/js/validation';
import IconEyeOff from '@/components/common/icons/IconEyeOff.vue';
import CloseButton from '@/components/common/buttons/CloseButton.vue';
import PasswordError from '@/components/common/PasswordError.vue';
import { mapMutations, mapState } from 'vuex';

export default {
  name: 'Login',
  components: {
    ButtonPrimary,
    SubtleIcon,
    IconView,
    IconCheck,
    IconLogo,
    IconEyeOff,
    CloseButton,
    PasswordError,
  },
  data() {
    return {
      showPasswordStatus: false,
      myErrors: {
        password: '',
        email: '',
        name: '',
      },
      errorsText: {
        password: this.$t('auth.errors.password.enter'),
        email: [
          this.$t('auth.errors.email.valid'),
          this.$t('auth.errors.email.enter'),
        ],
        name: [
          this.$t('auth.errors.name.numbers'),
          this.$t('auth.errors.name.enter'),
        ],
      },
      loading: {
        signup: false,
      },
    };
  },
  methods: {
    ...mapMutations('investorSignup', [
      'setPassword',
      'setName',
      'setEmail',
      'toggleAgree',
      'toggleEmailConfirmedMessage',
    ]),
    close() {
      this.$router.push('/investor-auth');
    },
    showPassword() {
      const element = document.getElementById('signup-password');
      if (element.type === 'password') {
        element.type = 'text';
        this.showPasswordStatus = true;
      } else {
        element.type = 'password';
        this.showPasswordStatus = false;
      }
    },
    errorName() {
      const [error1, error2] = this.errorsText.name;
      this.myErrors.name = '';
      setTimeout(() => {
        if (this.getName && Validation.digit(this.getName)) {
          this.myErrors.name = error1;
        } else if (!this.getName) {
          this.myErrors.name = error2;
        } else if (!Validation.name(this.getName)) {
          this.myErrors.name = error2;
        } else {
          this.myErrors.name = '';
        }
      }, 15);
    },
    errorEmail() {
      const error1 = this.errorsText.email[0];
      const error2 = this.errorsText.email[1];
      this.myErrors.email = '';
      setTimeout(() => {
        if (this.getEmail && !Validation.email(this.getEmail)) {
          this.myErrors.email = error1;
        } else if (!this.getEmail) {
          this.myErrors.email = error2;
        } else if (Validation.email(this.getEmail)) {
          this.myErrors.email = '';
        }
      }, 15);
    },
    errorPassword() {
      const error = this.errorsText.password;
      this.myErrors.password = '';
      setTimeout(() => {
        if (!this.getPassword) {
          this.myErrors.password = error;
        } else {
          this.myErrors.password = '';
        }
      }, 15);
    },
    signup() {
      this.loading.signup = true;
      this.toggleEmailConfirmedMessage(true);
      setTimeout(() => {
        this.$router.push('/investor-auth');
        this.loading.signup = false;
      }, 1000);
    },
  },
  computed: {
    ...mapState('investorSignup', {
      getName: state => state.name,
      getPassword: state => state.password,
      getEmail: state => state.email,
      getAgree: state => state.agree,
    }),
    agree: {
      get() {
        return this.getAgree;
      },
      set() {
        this.toggleAgree();
      },
    },
    password: {
      get() {
        return this.getPassword;
      },
      set(value) {
        this.setPassword(value);
      },
    },
    name: {
      get() {
        return this.getName;
      },
      set(value) {
        this.setName(value);
      },
    },
    email: {
      get() {
        return this.getEmail;
      },
      set(value) {
        this.setEmail(value);
      },
    },
    readyName() {
      return Validation.name(this.getName);
    },
    readyEmail() {
      return Validation.email(this.email);
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
    readyPassword() {
      return Validation.password(this.password);
    },
    anyReady() {
      return this.lowerCase
        || this.upperCase
        || this.specialChars
        || this.oneNumber
        || this.eightChars;
    },
    signupDisabled() {
      return this.readyName && this.readyEmail && this.readyPassword && this.agree;
    },
  },
  watch: {
    checkPassword(value) {
      if (value) this.myErros.password = '';
    },
    checkEmail(value) {
      if (value) this.myErros.email = '';
    },
  },
};
</script>
