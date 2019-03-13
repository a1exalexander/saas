<template>
<main class="account-recovery__wrapper">
  <icon-logo class='account-recovery__logo'/>
  <article class="account-recovery">
    <button
      class='account-recovery__button-back'
      v-if='step.confirm'
      @click='back'>
      <subtle-icon>
        <icon-long-arrow-left
          class='icon-button-left account-recovery__button-image'/>
        {{ $t('auth.buttons.back') }}
      </subtle-icon>
    </button>
    <div
      class="account-recovery__mobile-header"
      v-if='!step.confirm'>
      <icon-logo class="account-recovery__mobile-logo"/>
      <close-button
        class="account-recovery__close-button"
        @click.native='toLogin'/>
    </div>
    <p
      class="account-recovery__title"
      >{{ step.password? $t('auth.titles.reset'): $t('auth.titles.recovery') }}</p>
    <transition
      name="custom-classes-transition"
      enter-active-class="animated dur06 fadeIn"
      leave-active-class="animated dur04 fadeOut"
      mode="out-in">
    <account-recovery-start
      class='account-recovery__field'
      @emailEntered='emailEntered'
      v-if='step.email'/>
    <account-recovery-send-email
      class='account-recovery__field'
      :email='data.hiddenEmail'
      @sendEmail='sendEmail'
      v-else-if="step.enteredEmail"/>
    <account-recovery-confirm
      class='account-recovery__field'
      :email='data.hiddenEmail'
      @confirmCode='confirmCode'
      v-else-if="step.confirm"/>
    <account-recovery-password
      class='account-recovery__field'
      :email='data.email'
      :token='data.token'
      v-else/>
    </transition>
  </article>
</main>
</template>
<script>
import CloseButton from '@/components/common/buttons/CloseButton.vue';
import IconLogo from '@/components/common/icons/IconLogo.vue';
import AccountRecoveryStart from '@/components/auth/recovery/AccountRecoveryStart.vue';
import AccountRecoverySendEmail from '@/components/auth/recovery/AccountRecoverySendEmail.vue';
import AccountRecoveryConfirm from '@/components/auth/recovery/AccountRecoveryConfirm.vue';
import AccountRecoveryPassword from '@/components/auth/recovery/AccountRecoveryPassword.vue';
import IconLongArrowLeft from '@/components/common/icons/IconLongArrowLeft.vue';
import SubtleIcon from '@/components/common/buttons/SubtleIcon.vue';

export default {
  name: 'AccountRecovery',
  components: {
    IconLogo,
    CloseButton,
    AccountRecoveryStart,
    AccountRecoverySendEmail,
    AccountRecoveryConfirm,
    AccountRecoveryPassword,
    IconLongArrowLeft,
    SubtleIcon,
  },
  data() {
    return {
      step: {
        email: true,
        enteredEmail: false,
        confirm: false,
        password: false,
      },
      data: {
        email: '',
        hiddenEmail: '',
        token: '',
      },
    };
  },
  methods: {
    toLogin() {
      this.$router.push('/auth');
    },
    nextStep(type) {
      Object.keys(this.step).forEach((key) => {
        if (type === key) {
          this.step[key] = true;
        } else {
          this.step[key] = false;
        }
      });
    },
    emailEntered(email) {
      this.data.email = email;
      this.data.hiddenEmail = this.hideEmail(email);
      this.nextStep('enteredEmail');
    },
    sendEmail() {
      this.nextStep('confirm');
    },
    confirmCode(token) {
      this.data.token = token;
      this.nextStep('password');
    },
    back() {
      this.email = '';
      this.nextStep('email');
    },
    hideEmail(value) {
      const symbol = '&#8226';
      const email = value.split('');
      const at = email.indexOf('@');
      const dot = email.lastIndexOf('.');
      const length1 = email.slice(0, at).length;
      const length2 = email.slice(at + 1, dot).length;
      const length3 = email.slice(dot).length;
      const part1 = email.slice(0, at).map((item, index) => {
        if (length1 < 3) {
          return symbol;
        // eslint-disable-next-line
        } else if (index < 2) {
          return item;
        }
        return symbol;
      }).join('');
      const part2 = email.slice(at + 1, dot).map((item, index) => {
        if (length2 < 4) {
          return symbol;
        // eslint-disable-next-line
        } else if (index === length2 - 1 || index === length2 - 2) {
          return item;
        }
        return symbol;
      }).join('');
      const part3 = new Array(length3).join(symbol);
      return `${part1}@${part2}.${part3}`;
    },
  },
};
</script>
<style lang="scss">
.account-recovery {
  @extend %auth-card;
  &__wrapper {
    @extend %auth-card-wrapper;
  }
  &__logo {
    @extend %auth-logo;
  }
  &__mobile-header {
    @extend %auth-mobile-header;
  }
  &__mobile-logo {
    @extend %auth-mobile-logo;
  }
  &__title {
    @extend %auth-title;
  }
  &__close-button {
    @extend %auth-close-button;
  }
  &__button-image {
    width: 18px;
    height: 18px;
  }
  &__button-back {
    margin-bottom: 32px;
    @media screen and (min-width: $screen-tablet) {
      display: none;
    }
  }
  &__field {
    transition-property: height, max-height, flex;
    transition-duration: 0.2s;
    transition-timing-function: ease-in-out;
  }
}
</style>
