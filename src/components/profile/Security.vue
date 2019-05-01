<template>
<main class="security">
  <message-success-absolute
    @click.native='message.success = false'
    v-if='message.success'
    >Your password has been changed
  </message-success-absolute>
  <message-error-absolute
    @click.native='message.error = false'
    v-if='message.error'
    >Your password hasn't been changed
  </message-error-absolute>
<div class="security__section security__section--password">
  <div class="security__heading">
    <p class="security__title">Password</p>
    <p
      class="security__text security__text--no-margin"
      >Last change: {{ lastChangePassword }}
    </p>
  </div>
  <div class="security__change-field">
    <transition
      name="custom-classes-transition"
      enter-active-class="animated dur06 fadeIn"
      leave-active-class="animated dur04 fadeOut"
      mode="out-in">
    <button-secondary
      v-if='visible.button'
      @click.native='toggleWindow("changeForm")'
      key='button'>Change password
    </button-secondary>
    <password-form
      class="security__password-form"
      @cancel='toggleWindow("button")'
      @success='passwordSuccess'
      @error='passwordError'
      @code='toggleWindow("code")'
      v-else-if='visible.changeForm' key='form'/>
    <change-password-code
      :verifycode='1234'
      v-else
      @cancel='toggleWindow("button")'
      key='code'/>
    </transition>
  </div>
  <close-button
    class="security__close-button"
    @click.native='cancel'/>
  <div class="security__popups">
    <transition
      name="custom-classes-transition"
      enter-active-class="animated dur03 fadeIn"
      leave-active-class="animated dur03 fadeOut"
      mode="out-in">
    <password-form
      @success='passwordSuccess'
      @error='passwordError'
      @code='togglePopup("code")'
      v-if='popup.changeForm'
      key='form'/>
    <change-password-code :verifycode='1234' v-else @cancel='cancel' key='code'/>
    </transition>
  </div>
</div>
</main>
</template>
<script>
import ButtonSecondary from '@/components/common/buttons/ButtonSecondary.vue';
import CloseButton from '@/components/common/buttons/CloseButton.vue';
import ChangePasswordCode from '@/components/profile/components/ChangePasswordCode.vue';
import PasswordForm from '@/components/profile/components/PasswordForm.vue';
import MessageSuccessAbsolute from '@/components/common/messages/MessageSuccessAbsolute.vue';
import MessageErrorAbsolute from '@/components/common/messages/MessageErrorAbsolute.vue';
import { mapState, mapGetters } from 'vuex';

export default {
  name: 'Security',
  components: {
    ButtonSecondary,
    CloseButton,
    ChangePasswordCode,
    PasswordForm,
    MessageErrorAbsolute,
    MessageSuccessAbsolute,
  },
  data() {
    return {
      popup: {
        changeForm: true,
        code: false,
      },
      visible: {
        button: true,
        changeForm: false,
        code: false,
      },
      message: {
        success: false,
        error: false,
      },
    };
  },
  methods: {
    toggleWindow(type) {
      this.visible[type] = true;
      Object.keys(this.visible).forEach((key) => {
        this.visible[key] = key === type;
      });
    },
    togglePopup(type) {
      this.popup[type] = true;
      Object.keys(this.popup).forEach((key) => {
        this.popup[key] = key === type;
      });
    },
    passwordError() {
      this.toggleWindow("button");
      this.showMessage('error');
    },
    passwordSuccess() {
      this.toggleWindow("button");
      this.showMessage('success');
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
    cancel() {
      this.$emit('cancel');
    },
  },
  computed: {
    ...mapGetters('profile', [
      'lastChangePassword',
    ]),
  },
};
</script>
<style lang="scss">
.security {
  position: absolute;
  z-index: 100;
  background-color: $N13;
  top: 0;
  left: 0;
  right: 0;
  min-height: 100vh;
  padding: 28px 28px 220px;
  @media screen and (min-width: $screen-tablet) {
    position: static;
    padding: 0 40px;
    background-color: $N12;
    min-height: auto;
  }
  &__popups {
    @media screen and (min-width: $screen-tablet) {
      display: none;
    }
  }
  &__change-field {
    display: none;
    @media screen and (min-width: $screen-tablet) {
      display: block;
    }
  }
  &__heading {
    @media screen and (min-width: $screen-tablet) {
      margin-bottom: 20px;
    }
    @media screen and (min-width: $screen-desktop) {
      margin-right: 58px;
      align-self: flex-start;
      margin-bottom: 0;
    }
  }
  &__section {
    position: relative;
    @media screen and (min-width: $screen-tablet) {
      position: static;
      padding: 32px 0;
    }
    &--password {
      @media screen and (min-width: $screen-tablet) {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
      }
      @media screen and (min-width: $screen-desktop) {
        flex-direction: row;
        align-items: flex-end;
      }
    }
  }
  &__title {
    font-size: $H700;
    font-weight: 500;
    margin-bottom: 24px;
    @media screen and (min-width: $screen-tablet) {
      margin-bottom: 16px;
    }
  }
  &__text {
    font-size: $H400;
    color: $N6;
    font-weight: 500;
    margin-bottom: 18px;
    &--no-margin {
      margin: 0;
    }
  }
  &__close-button {
    position: absolute;
    right: -4px;
    top: -4px;
    @media screen and (min-width: $screen-tablet) {
      display: none;
    }
  }
  &__button-image {
    width: 18px;
    height: 18px;
  }
  &__label-wrapper {
    @include flex-row(space-between, flex-end);
    margin-bottom: 16px;
  }
  &__label-text {
    @extend %input-label-text;
    margin: 0;
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
    &--last {
      margin-bottom: 32px;
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
    @include flex-row(stretch, center);
  }
  &__button {
    &--cancel {
      flex: 0 0 90px;
      margin-right: 20px;
    }
    &--send {
      flex: 1 1;
    }
    &--change {
      align-self: flex-end;
    }
  }
}
</style>
