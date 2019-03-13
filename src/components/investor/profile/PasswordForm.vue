<template>
<div class="investor-password-form__wrapper" @click.self='cancel'>
  <div class="investor-password-form">
    <close-button
      class="investor-password-form__close-button"
      @click.native='cancel'/>
    <div class="investor-password-form__header">
      <p class="investor-password-form__title">Password</p>
      <p
        class="investor-password-form__text"
        >Last Change: {{ lastChangePassword }}
      </p>
    </div>
    <div class="investor-password-form__main" v-if='views.password'>
      <div class="investor-password-form__label-wrapper">
        <label
          for="password-form-current"
          class="investor-password-form__label-text"
          >{{ $t('auth.labels.current password') }}
        </label>
        <subtle-icon
          @click.prevent.native='showPassword("current")'
          class="animated dur04 fadeIn">
          <icon-view
            class='icon-button-left-desktop investor-password-form__button-image'
            v-if='!showPasswordStatus.current'/>
          <icon-eye-off
            class='icon-button-left-desktop investor-password-form__button-image'
            v-else/>
          {{ showPasswordStatus.current?$t('auth.buttons.hide'):$t('auth.buttons.show') }}
        </subtle-icon>
      </div>
      <div class="investor-password-form__input-wrapper">
        <input
          id='password-form-current'
          ref='password-form-current'
          type="password"
          autocomplete="off"
          class="investor-password-form__input"
          :class='{"input-error": myErrors.current}'
          @blur='errorPassword("current")'
          v-model.trim="password.current">
        <p
          class="input-text-error animated dur04 bounceIn"
          v-show='myErrors.current'
          v-html="myErrors.current">
        </p>
      </div>
      <div class="investor-password-form__label-wrapper">
        <label
          for="password-form-new"
          class="investor-password-form__label-text"
          >{{ $t('auth.labels.new password') }}
        </label>
        <subtle-icon
          @click.prevent.native='showPassword("new")'
          class="animated dur04 fadeIn">
          <icon-view
            class='icon-button-left-desktop investor-password-form__button-image'
            v-if='!showPasswordStatus.new'/>
          <icon-eye-off
            class='icon-button-left-desktop investor-password-form__button-image'
            v-else/>
          {{ showPasswordStatus.new?$t('auth.buttons.hide'):$t('auth.buttons.show') }}
        </subtle-icon>
      </div>
      <div class="investor-password-form__input-wrapper">
        <input
          id='password-form-new'
          ref='password-form-new'
          type="password"
          autocomplete="off"
          class="investor-password-form__input"
          :class='{"input-error": myErrors.new}'
          @blur='errorPasswordLazy("new")'
          v-model.trim="password.new">
        <p
          class="input-text-error animated dur04 bounceIn"
          v-show='myErrors.new'
          v-html="myErrors.new">
        </p>
      </div>
      <div class="investor-password-form__conditions-wrapper">
        <ul class="investor-password-form__conditions">
          <password-error
            class='investor-password-form__rule'
            :rule='lowerCase'
            :any='anyReady'
            :text='$t("auth.errors.password.lowercase")'/>
          <password-error
            class='investor-password-form__rule'
            :rule='specialChars'
            :any='anyReady'
            :text="$t('auth.errors.password.special')"/>
          <password-error
            class='investor-password-form__rule'
            :rule='upperCase'
            :any='anyReady'
            :text='$t("auth.errors.password.uppercase")'/>
          <password-error
            class='investor-password-form__rule'
            :rule='eightChars'
            :any='anyReady'
            :text="$t('auth.errors.password.minimum')"/>
          <password-error
            class='investor-password-form__rule'
            :rule='oneNumber'
            :any='anyReady'
            :text="$t('auth.errors.password.number')"/>
        </ul>
      </div>
      <div class="investor-password-form__label-wrapper">
        <label
          for="password-form-current"
          class="investor-password-form__label-text"
          >{{ $t('auth.labels.confirm new password') }}
        </label>
        <subtle-icon
          @click.prevent.native='showPassword("confirm")'
          class="animated dur04 fadeIn">
          <icon-view
            class='icon-button-left-desktop investor-password-form__button-image'
            v-if='!showPasswordStatus.confirm'/>
          <icon-eye-off
            class='icon-button-left-desktop security__button-image'
            v-else/>
          {{ showPasswordStatus.confirm?$t('auth.buttons.hide'):$t('auth.buttons.show') }}
        </subtle-icon>
      </div>
      <div class="investor-password-form__input-wrapper no-margin">
        <div
          class="investor-password-form__check-wrapper animated dur08 bounceIn"
          v-show='passwordReadyConfirm'>
          <icon-check2 class='investor-password-form__icon-check'/>
        </div>
        <input
          id='password-form-confirm'
          ref='password-form-confirm'
          type="password"
          autocomplete="off"
          class="investor-password-form__input"
          :class='{"input-error": myErrors.confirm,
                  "input-success": passwordReadyConfirm}'
          @blur='errorPassword("confirm")'
          v-model.trim="password.confirm">
        <p
          class="input-text-error animated dur04 bounceIn"
          v-show='myErrors.confirm'
          v-html="myErrors.confirm">
        </p>
      </div>
      <div class="investor-password-form__buttons-wrapper">
        <button-secondary
          @click.prevent.native='cancel'
          class="investor-password-form__button tablet-flex"
          >Cancel
        </button-secondary>
        <button-primary
          @click.prevent.native='send'
          :disabled='!allReady'
          :class='{"button-loading": loading}'
          class="investor-password-form__button"
          >Send verification code
        </button-primary>
        <button-transparent
          @click.prevent.native='cancel'
          class="investor-password-form__button mobile-flex"
          >Cancel
        </button-transparent>
      </div>
    </div>
    <div class="investor-password-form__main" v-else>
      <p class="investor-password-form__description"
        >Enter the verification 4-number code we just sent to your email
      </p>
      <div class="investor-password-form__row">
        <label class="investor-password-form__label
          investor-password-form__label--code">
          <p class="investor-password-form__label-text
            investor-password-form__label-text--margin"
            >Code
          </p>
          <input
            type="text"
            class="investor-password-form__input"
            maxlength='4'
            v-model.number.trim='code'>
        </label>
        <button-primary
          @click.native='verify'
          class='investor-password-form__button tablet-flex'
          :class='{"button-loading": loading}'
          :disabled='disabledVerify'>Verify
        </button-primary>
      </div>
      <div class="investor-password-form__buttons-wrapper mobile-flex">
        <button-secondary
        class='investor-password-form__button'
          @click.native='cancel'>Cancel
        </button-secondary>
        <button-primary
          @click.native='verify'
          class='investor-password-form__button'
          :class='{"button-loading": loading}'
          :disabled='disabledVerify'>Verify
        </button-primary>
        <button-transparent
          @click.native='cancel'
          class="investor-password-form__button"
          >Cancel
        </button-transparent>
      </div>
    </div>
  </div>
</div>
</template>
<script>
import ButtonSecondary from '@/components/common/buttons/ButtonSecondary.vue';
import ButtonPrimary from '@/components/common/buttons/ButtonPrimary.vue';
import ButtonTransparent from '@/components/common/buttons/ButtonTransparent.vue';
import SubtleIcon from '@/components/common/buttons/SubtleIcon.vue';
import IconEyeOff from '@/components/common/icons/IconEyeOff.vue';
import CloseButton from '@/components/common/buttons/CloseButton.vue';
import IconView from '@/components/common/icons/IconView.vue';
import PasswordError from '@/components/common/PasswordError.vue';
import Validation from '@/js/validation';
import IconCheck2 from '@/components/common/icons/IconCheck.vue';
import { mapState, mapMutations } from 'vuex';

export default {
  name: 'PasswordForm',
  components: {
    SubtleIcon,
    IconEyeOff,
    IconView,
    ButtonSecondary,
    ButtonPrimary,
    PasswordError,
    IconCheck2,
    CloseButton,
    ButtonTransparent,
  },
  data() {
    return {
      password: {
        current: '',
        new: '',
        confirm: '',
      },
      code: '',
      errorText: [
        this.$t('auth.errors.password.enter'),
        this.$t('auth.errors.password.match'),
        this.$t('auth.errors.password.full'),
      ],
      myErrors: {
        current: '',
        new: '',
        confirm: '',
      },
      showPasswordStatus: {
        current: false,
        new: false,
        confirm: false,
      },
      views: {
        password: true,
        code: false,
      },
      loading: false,
    };
  },
  methods: {
    ...mapMutations('investorProfile', [
      'setLastChangePassword',
    ]),
    verify() {
      this.loading = true;
      setTimeout(() => {
        this.loading = false;
        this.setLastChangePassword();
        this.cancel();
      }, 1000);
    },
    showPassword(name) {
      const element = this.$refs[`password-form-${name}`];
      if (element.type === 'password') {
        element.type = 'text';
        this.showPasswordStatus[name] = true;
      } else {
        element.type = 'password';
        this.showPasswordStatus[name] = false;
      }
    },
    errorPasswordLazy() {
      const [error] = this.errorText;
      this.myErrors.new = '';
      setTimeout(() => {
        if (!this.password.new) {
          this.myErrors.new = error;
        } else {
          this.myErrors.new = '';
        }
      }, 15);
    },
    errorPassword(type) {
      const password = this.password[type];
      const [errorEnter, enterMatch, errorFull] = this.errorText;
      this.myErrors[type] = '';
      setTimeout(() => {
        if (!password) {
          this.myErrors[type] = errorEnter;
        } else if (type === 'confirm' && password !== this.password.new) {
          this.myErrors[type] = enterMatch;
        } else if (!Validation.password(password)) {
          this.myErrors[type] = errorFull;
        } else {
          this.myErrors[type] = '';
        }
      }, 15);
    },
    cancel() {
      this.$emit('cancel');
    },
    send() {
      this.loading = true;
      setTimeout(() => {
        this.loading = false;
        this.views.password = false;
        this.views.code = true;
      }, 1000);
    },
  },
  computed: {
    ...mapState('investorProfile', [
      'lastChangePassword',
    ]),
    passwordReadyCurrent() {
      return Validation.password(this.password.current);
    },
    passwordReadyNew() {
      return Validation.password(this.password.new);
    },
    passwordReadyConfirm() {
      return this.password.new && this.password.new === this.password.confirm;
    },
    lowerCase() {
      return Validation.lowerCase(this.password.new);
    },
    upperCase() {
      return Validation.upperCase(this.password.new);
    },
    specialChars() {
      return Validation.specialChars(this.password.new);
    },
    oneNumber() {
      return Validation.oneNumber(this.password.new);
    },
    eightChars() {
      return Validation.eightChars(this.password.new);
    },
    anyReady() {
      return this.lowerCase
        || this.upperCase
        || this.specialChars
        || this.oneNumber
        || this.eightChars;
    },
    allReady() {
      return this.passwordReadyCurrent && this.passwordReadyNew && this.passwordReadyConfirm;
    },
    disabledVerify() {
      const code = String(this.code);
      return code.length !== 4;
    },
  },
  watch: {
    passwordReadyCurrent(value) {
      if (value) this.myErrors.current = '';
    },
    passwordReadyNew(value) {
      if (value) this.myErrors.new = '';
    },
    passwordReadyConfirm(value) {
      if (value) this.myErrors.confirm = '';
    },
  },
};
</script>
<style lang="scss">
$class: investor-password-form;
.#{$class} {
  padding: 32px 28px;
  position: relative;
  min-height: 100%;
  @include flex-col(stretch, stretch);
  @media screen and (min-width: $screen-tablet) {
    min-height: auto;
    max-height: 100%;
    overflow-y: auto;
    background-color: $N13;
    padding: 32px 40px;
    flex: 0 1 28%;
    min-width: 386px;
  }
  &__title {
    @include text($H700, 500, $N0);
    line-height: 1.2;
    margin-bottom: 8px;
    @media screen and (min-width: $screen-tablet) {
      font-size: $H800;
      font-weight: 600;
      margin-bottom: 10px;
    }
  }
  &__close-button {
    position: absolute;
    top: 24px;
    right: 24px;
  }
  &__header {
    margin-bottom: 24px;
  }
  &__row {
    @include flex-row(space-between, flex-end);
  }
  &__wrapper {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    height: 100vh;
    z-index: 10;
    overflow-y: auto;
    background-color: $N13;
    @media screen and (min-width: $screen-tablet) {
      background: rgba(10,11,12,0.80);
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 32px;
    }
  }
  &__text {
    font-size: $H400;
    color: $N6;
    font-weight: 500;
    @media screen and (min-width: $screen-tablet) {
      font-size: $H500;
    }
  }
  &__description {
    font-size: $H500;
    margin-bottom: 24px;
    line-height: 1.4;
    @media screen and (min-width: $screen-tablet) {
      font-size: $H200;
      margin-bottom: 18px;
    }
  }
  &__button-image {
    width: 18px;
    height: 18px;
  }
  &__label-wrapper {
    @include flex-row(space-between, flex-end);
    margin-bottom: 8px;
  }
  &__label-text {
    @extend %input-label-text;
    margin: 0;
    &--margin {
      margin-bottom: 8px;
    }
  }
  &__label {
    display: block;
    margin-bottom: 24px;
    &--code {
      @media screen and (min-width: $screen-tablet) {
        margin: 0 16px 0 0;
        flex: 1 1;
      }
    }
  }
  &__input {
    @extend %input;
    width: 100%;
  }
  &__input-wrapper {
    margin-bottom: 18px;
    position: relative;
  }
  &__main {
    flex: 1 1;
    @include flex-col(stretch, stretch);
  }
  &__conditions {
    @media screen and (min-width: $screen-tablet) {
      display: flex;
      flex-flow: row wrap;
      justify-content: space-between;
      align-items: flex-start;
    }
  }
  &__rule {
    margin-bottom: 6px;
    @media screen and (min-width: $screen-tablet) {
      margin-bottom: 6px;
      flex: 0 0 48%;
    }
  }
  &__conditions-wrapper {
    margin-bottom: 24px;
    @media screen and (min-width: $screen-tablet) {
      margin-bottom: 18px;
    }
  }
  &__buttons-wrapper {
    padding-top: 32px;
    flex: 1 1;
    @include flex-col(flex-end, center);
    @media screen and (min-width: $screen-tablet) {
      flex-direction: row;
      justify-content: flex-end;
    }
  }
  &__button {
    width: 100%;
    flex-shrink: 0;
    @media screen and (min-width: $screen-tablet) {
      width: auto;
      min-height: 36px;
    }
    &:first-child {
      margin-bottom: 20px;
      @media screen and (min-width: $screen-tablet) {
        margin: 0 16px 0 0;
      }
    }
  }
  &__check-wrapper {
    @extend %input-icon;
    border-radius: 50%;
    @include flex-row(center, center);
    background-color: $G1;
  }
  &__icon-check {
    width: 6px;
    height: 6px;
    fill: $N13;
  }
}
</style>
