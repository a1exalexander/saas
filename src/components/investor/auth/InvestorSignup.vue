<template>
<main class="auth__wrapper">
  <message-error-absolute
    v-if='isMessage.error'
    @click.native='isMessage.error = false'>
    {{ message }}
  </message-error-absolute>
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
          v-model.trim="form.name">
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
          v-model.trim="form.email">
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
        v-model.trim="form.password">
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
          :class='{"button-loading": loading}'
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
import MessageErrorAbsolute from '@/components/common/messages/MessageErrorAbsolute.vue';
import messageMixin from '@/mixins/message';

export default {
  name: 'Signup',
  mixins: [messageMixin],
  components: {
    ButtonPrimary,
    SubtleIcon,
    IconView,
    IconCheck,
    IconLogo,
    IconEyeOff,
    CloseButton,
    PasswordError,
    MessageErrorAbsolute,
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
      loading: false,
      form: {
        code: '',
        name: '',
        email: '',
        password: '',
      },
      agree: '',
    };
  },
  methods: {
    signup() {
      this.loading = true;
      const type = process.env.VUE_APP_SECRET;
      this.$router.push('/auth/investor/?message=verify');
    },
    close() {
      this.$router.push('/auth/investor');
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
        if (this.form.name && Validation.digit(this.form.name)) {
          this.myErrors.name = error1;
        } else if (!this.form.name) {
          this.myErrors.name = error2;
        } else if (!Validation.name(this.form.name)) {
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
        if (this.form.email && !Validation.email(this.form.email)) {
          this.myErrors.email = error1;
        } else if (!this.form.email) {
          this.myErrors.email = error2;
        } else if (Validation.email(this.form.email)) {
          this.myErrors.email = '';
        }
      }, 15);
    },
    errorPassword() {
      const error = this.errorsText.password;
      this.myErrors.password = '';
      setTimeout(() => {
        if (!this.readyPassword) {
          this.myErrors.password = error;
        } else {
          this.myErrors.password = '';
        }
      }, 15);
    },
  },
  computed: {
    readyName() {
      return Validation.name(this.form.name);
    },
    readyEmail() {
      return Validation.email(this.form.email);
    },
    lowerCase() {
      return Validation.lowerCase(this.form.password);
    },
    upperCase() {
      return Validation.upperCase(this.form.password);
    },
    specialChars() {
      return Validation.specialChars(this.form.password);
    },
    oneNumber() {
      return Validation.oneNumber(this.form.password);
    },
    eightChars() {
      return Validation.eightChars(this.form.password);
    },
    readyPassword() {
      return Validation.password(this.form.password);
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
      if (value) this.myErrors.password = '';
    },
    checkEmail(value) {
      if (value) this.myErrors.email = '';
    },
  },
  created() {
    if (this.$route.query.invite) {
      this.form.code = this.$route.query.invite;
      this.$router.replace('/auth/investor/signup');
    }
  },
};
</script>
<style lang="scss">
@import '~@/scss/components/auth-card';
</style>
