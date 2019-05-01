<template>
<section class="password-step">
   <message-error-absolute
    class='auth__message'
    v-if='message.error'
    @click.native='message.error = false'>
    {{ messageText }}
  </message-error-absolute>
  <p class="password-step__title">{{ $t('auth.titles.password') }}</p>
  <form class="password-step__form">
    <div class="password-step__label-wrapper">
      <label
        for="signup-pasword"
        class="password-step__label">{{ $t('auth.labels.create password') }}
      </label>
      <subtle-icon
        @click.prevent.native='showPassword'
        class="animated dur04 fadeIn">
        <icon-view
          class='icon-button-left-desktop password-step__button-image'
          v-if='!showPasswordStatus'/>
        <icon-eye-off
          class='icon-button-left-desktop password-step__button-image'
          v-else/>
        {{ showPasswordStatus?$t('auth.buttons.hide'):$t('auth.buttons.show') }}
      </subtle-icon>
    </div>
    <div class="password-step__input-wrapper">
      <input
        id='signup-pasword'
        type="password"
        autocomplete="off"
        class="password-step__input"
        :class='{"input-error": myErrors.password}'
        @blur='errorPassword'
        v-model.trim="password">
      <p
        class="input-text-error animated dur04 bounceIn"
        v-show='myErrors.password'
        v-html="myErrors.password">
      </p>
    </div>
    <ul class="password-step__conditions password-conditions">
      <li
        class="password-conditions__item"
        :class='{"password-step-ready": lowerCase,
                "password-step-unready": anyReady && !lowerCase}'>
        <div class="password-conditions__image-wrapper">
          <div class="password-conditions__list-dot"></div>
          <icon-check2 class='password-conditions__list-check'/>
        </div>
        <p class="password-conditions__text">{{ $t('auth.errors.password.lowercase') }}</p>
      </li>
      <li
        class="password-conditions__item"
        :class='{"password-step-ready": specialChars,
                "password-step-unready": anyReady && !specialChars}'>
        <div class="password-conditions__image-wrapper">
          <div class="password-conditions__list-dot"></div>
          <icon-check2 class='password-conditions__list-check'/>
        </div>
        <p class="password-conditions__text">{{ $t('auth.errors.password.special') }}</p>
      </li>
      <li
        class="password-conditions__item"
        :class='{"password-step-ready": upperCase,
                "password-step-unready": anyReady && !upperCase}'>
        <div class="password-conditions__image-wrapper">
          <div class="password-conditions__list-dot"></div>
          <icon-check2 class='password-conditions__list-check'/>
        </div>
        <p class="password-conditions__text">{{ $t('auth.errors.password.uppercase') }}</p>
      </li>
      <li
        class="password-conditions__item"
        :class='{"password-step-ready": eightChars,
                "password-step-unready": anyReady && !eightChars}'>
        <div class="password-conditions__image-wrapper">
          <div class="password-conditions__list-dot"></div>
          <icon-check2 class='password-conditions__list-check'/>
        </div>
        <p class="password-conditions__text">{{ $t('auth.errors.password.minimum') }}</p>
      </li>
      <li
        class="password-conditions__item"
        :class='{"password-step-ready": oneNumber,
                "password-step-unready": anyReady && !oneNumber}'>
        <div class="password-conditions__image-wrapper">
          <div class="password-conditions__list-dot"></div>
          <icon-check2 class='password-conditions__list-check'/>
        </div>
        <p class="password-conditions__text">{{ $t('auth.errors.password.number') }}</p>
      </li>
    </ul>
    <label class="password-step__checkbox checkbox">
      <input
        type="checkbox"
        class="checkbox__input"
        v-model='agree'>
      <div class="checkbox__inner">
        <div class="checkbox__cell">
          <icon-check class='checkbox__image'/>
        </div>
        <p class="checkbox__text">{{ $t('auth.labels.terms') }}
          <a
            href="#"
            class="password-step__link"
            @click.stop.prevent
            >{{ $t('auth.links.terms') }}
          </a>
        </p>
      </div>
    </label>
    <button-primary-icon
      class='fund-step__button animated dur05 fadeIn'
      :class='{"button-loading": loading}'
      @click.prevent.native='nextStep'
      :disabled='!passwordReady'>{{ $t('auth.buttons.continue') }}
      <icon-long-arrow-right class='icon-button-right icon-small'/>
    </button-primary-icon>
  </form>
</section>
</template>
<script>
import SubtleIcon from '@/components/common/buttons/SubtleIcon.vue';
import IconView from '@/components/common/icons/IconView.vue';
import IconCheck2 from '@/components/common/icons/IconCheck2.vue';
import IconCheck from '@/components/common/icons/IconCheck.vue';
import IconLongArrowRight from '@/components/common/icons/IconLongArrowRight.vue';
import ButtonPrimaryIcon from '@/components/common/buttons/ButtonPrimaryIcon.vue';
import MessageErrorAbsolute from '@/components/common/messages/MessageErrorAbsolute.vue';
import Validation from '@/js/validation';
import IconEyeOff from '@/components/common/icons/IconEyeOff.vue';
import {
  mapGetters,
  mapState,
  mapMutations,
  mapActions,
} from 'vuex';

export default {
  name: 'PasswordStep',
  components: {
    SubtleIcon,
    IconView,
    IconCheck,
    IconCheck2,
    ButtonPrimaryIcon,
    IconLongArrowRight,
    IconEyeOff,
    MessageErrorAbsolute,
  },
  data() {
    return {
      errorsText: {
        password: [
          this.$t('auth.errors.password.enter'),
        ],
      },
      messageText: '',
      myErrors: {
        password: '',
      },
      message: {
        error: false,
      },
      showPasswordStatus: false,
      recaptchaToken: 'true',
      loading: false,
    };
  },
  methods: {
    ...mapMutations('signup', [
      'setPassword',
      'togglePasswordAgree',
      'setStepStatus',
      'setRouterStatus',
    ]),
    ...mapActions('signup', [
      'stepThree',
    ]),
    onVerify(response) {
      this.recaptchaToken = response;
    },
    onExpired() {
      this.recaptchaToken = '';
    },
    nextStep() {
      this.loading = true;
      this.stepThree()
        .then((resp) => {
          this.setRouterStatus('email');
          this.setStepStatus('password');
          this.loading = false;
          console.log(resp);
        })
        .catch((error) => {
          this.loading = false;
          if (error.data.code === 417) {
            this.setRouterStatus('email');
            this.setStepStatus('password');
          } else if (error.data.msg) {
            this.messageText = error.data.msg;
            this.showMessage('error');
          }
          console.log(error);
        });
    },
    showMessage(type) {
      if (this.message[type]) {
        this.message[type] = false;
        setTimeout(() => {
          this.message[type] = true;
          setTimeout(() => {
            this.message[type] = false;
          }, 4000);
        }, 15);
      } else {
        this.message[type] = true;
        setTimeout(() => {
          this.message[type] = false;
        }, 4000);
      }
    },
    showPassword() {
      const element = document.getElementById('signup-pasword');
      if (element.type === 'password') {
        element.type = 'text';
        this.showPasswordStatus = true;
      } else {
        element.type = 'password';
        this.showPasswordStatus = false;
      }
    },
    errorPassword() {
      const [error] = this.errorsText.password;
      this.myErrors.password = '';
      setTimeout(() => {
        if (!this.getPassword) {
          this.myErrors.password = error;
        } else {
          this.myErrors.password = '';
        }
      }, 15);
    },
  },
  computed: {
    ...mapState('signup', {
      getPassword: state => state.password.value,
      getAgree: state => state.password.agree,
    }),
    ...mapGetters('signup', [
      'getPasswordStatus',
    ]),
    password: {
      get() {
        return this.getPassword;
      },
      set(value) {
        this.setPassword(['value', value]);
      },
    },
    agree: {
      get() {
        return this.getAgree;
      },
      set() {
        this.togglePasswordAgree();
      },
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
    passwordReady() {
      return Validation.password(this.password)
        && this.getAgree
        && this.recaptchaToken;
    },
    anyReady() {
      return this.lowerCase
        || this.upperCase
        || this.specialChars
        || this.oneNumber
        || this.eightChars;
    },
  },
  watch: {
    getPassword(value) {
      if (value) this.myErrors.password = '';
    },
  },
};
</script>
<style lang="scss">
.password-step {
  &__title {
    font-size: $H500;
    font-weight: 500;
    line-height: 1.4;
    margin-bottom: 20px;
  }
  &__form {
    @media screen and (min-width: $screen-tablet) {
      min-width: 306px;
      width: 23%;
    }
  }
  &__label-wrapper {
    @include flex-row(space-between, flex-end);
    margin-bottom: 9px;
    @media screen and (min-width: $screen-tablet) {
      min-width: 306px;
    }
  }
  &__label {
    font-size: $H500;
    @media screen and (min-width: $screen-tablet) {
     font-size: $H200;
    }
  }
  &__input-wrapper {
    margin-bottom: 18px;
    width: 100%;
  }
  &__input {
    @extend %input;
    width: 100%;
    @media screen and (min-width: $screen-tablet) {
      min-width: 306px;
    }
  }
  &__conditions {
    margin-bottom: 32px;
  }
  &__button-image {
    width: 16px;
    height: 16px;
  }
  &__checkbox {
    margin-bottom: 32px;
  }
  &__link {
    @extend %link;
  }
  &__recaptcha {
    margin-bottom: 18px;
  }
}
.password-step-ready {
  .password-step {
    &__list-dot {
      display: none;
    }
    &__list-check {
      display: block;
    }
    &__conditions-text {
      color: $N0;
    }
  }
}
.password-step-unready {
  @media screen and (max-width: $screen-tablet) {
    .password-step {
      &__list-dot {
        background-color: $Y1;
      }
      &__conditions-text {
        color: $Y1;
      }
    }
  }
}
</style>
