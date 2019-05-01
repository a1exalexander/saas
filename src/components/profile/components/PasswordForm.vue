<template>
<form class="password-form">
  <div class="password-form__label-wrapper password-form__label-wrapper--current">
    <label
      for="password-form-current"
      class="password-form__label-text"
      >{{ $t('auth.labels.current password') }}
    </label>
    <subtle-icon
      @click.prevent.native='showPassword("current")'
      class="animated dur04 fadeIn">
      <icon-view
        class='icon-button-left-desktop password-form__button-image'
        v-if='!showPasswordStatus.current'/>
      <icon-eye-off
        class='icon-button-left-desktop password-form__button-image'
        v-else/>
      {{ showPasswordStatus.current?$t('auth.buttons.hide'):$t('auth.buttons.show') }}
    </subtle-icon>
  </div>
  <div class="password-form__input-wrapper password-form__input-wrapper--current">
    <input
      id='password-form-current'
      ref='password-form-current'
      type="password"
      autocomplete="off"
      class="password-form__input"
      :class='{"input-error": myErrors.current}'
      @blur='errorPassword("current")'
      v-model.trim="password.current">
    <p
      class="input-text-error animated dur04 bounceIn"
      v-show='myErrors.current'
      v-html="myErrors.current">
    </p>
  </div>
  <div class="password-form__label-wrapper password-form__label-wrapper--new">
    <label
      for="password-form-new"
      class="password-form__label-text"
      >{{ $t('auth.labels.new password') }}
    </label>
    <subtle-icon
      @click.prevent.native='showPassword("new")'
      class="animated dur04 fadeIn">
      <icon-view
        class='icon-button-left-desktop password-form__button-image'
        v-if='!showPasswordStatus.new'/>
      <icon-eye-off
        class='icon-button-left-desktop password-form__button-image'
        v-else/>
      {{ showPasswordStatus.new?$t('auth.buttons.hide'):$t('auth.buttons.show') }}
    </subtle-icon>
  </div>
  <div class="password-form__input-wrapper password-form__input-wrapper--new">
    <input
      id='password-form-new'
      ref='password-form-new'
      type="password"
      autocomplete="off"
      class="password-form__input"
      :class='{"input-error": myErrors.new}'
      @blur='errorPasswordLazy("new")'
      v-model.trim="password.new">
    <p
      class="input-text-error animated dur04 bounceIn"
      v-show='myErrors.new'
      v-html="myErrors.new">
    </p>
  </div>
  <div class="password-form__conditions-wrapper">
    <p class="password-form__text password-form__text--condition">Your password must have:</p>
    <ul class="password-conditions password-conditions--profile">
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
  </div>
  <div class="password-form__label-wrapper password-form__label-wrapper--confirm">
    <label
      for="password-form-current"
      class="password-form__label-text"
      >{{ $t('auth.labels.confirm new password') }}
    </label>
    <subtle-icon
      @click.prevent.native='showPassword("confirm")'
      class="animated dur04 fadeIn">
      <icon-view
        class='icon-button-left-desktop password-form__button-image'
        v-if='!showPasswordStatus.confirm'/>
      <icon-eye-off
        class='icon-button-left-desktop security__button-image'
        v-else/>
      {{ showPasswordStatus.confirm?$t('auth.buttons.hide'):$t('auth.buttons.show') }}
    </subtle-icon>
  </div>
  <div class="password-form__input-wrapper
    password-form__input-wrapper--confirm
    password-form__input-wrapper--last">
    <icon-check2
      class='password-form__icon-check animated dur08 bounceIn'
      v-show='passwordReadyConfirm'/>
    <input
      id='password-form-confirm'
      ref='password-form-confirm'
      type="password"
      autocomplete="off"
      class="password-form__input"
      :class='{"input-error": myErrors.confirm}'
      @blur='errorPassword("confirm")'
      v-model.trim="password.confirm">
    <p
      class="input-text-error animated dur04 bounceIn"
      v-show='myErrors.confirm'
      v-html="myErrors.confirm">
    </p>
  </div>
  <div class="password-form__buttons-wrapper">
    <button-secondary
      @click.prevent.native='cancel'
      class="password-form__button password-form__button--cancel"
      >{{ $t('auth.buttons.cancel') }}
    </button-secondary>
    <button-primary
      @click.prevent.native='change'
      :disabled='!allReady'
      :class='{"button-loading": loading.send}'
      class="password-form__button password-form__button--send"
      >Change password
    </button-primary>
  </div>
</form>
</template>
<script>
import ButtonSecondary from '@/components/common/buttons/ButtonSecondary.vue';
import ButtonPrimary from '@/components/common/buttons/ButtonPrimary.vue';
import SubtleIcon from '@/components/common/buttons/SubtleIcon.vue';
import IconEyeOff from '@/components/common/icons/IconEyeOff.vue';
import IconView from '@/components/common/icons/IconView.vue';
import PasswordError from '@/components/common/PasswordError.vue';
import Validation from '@/js/validation';
import IconCheck2 from '@/components/common/icons/IconCheck.vue';
import { mapState, mapGetters } from 'vuex';

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
  },
  data() {
    return {
      password: {
        current: '',
        new: '',
        confirm: '',
      },
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
      loading: {
        send: false,
      },
    };
  },
  methods: {
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
    change() {
      this.loading.send = true;
        const data = {
          currentpassword: this.password.current,
          newpassword: this.password.new,
        };
        Object.assign(data, this.token);
      setTimeout(() => {
        this.loading.send = false;
        this.$emit('success');
      }, 1500)
    },
    send() {
      this.loading.send = true;
      setTimeout(() => {
        this.loading.send = false;
        this.$emit('code');
      }, 1000);
    },
  },
  computed: {
    ...mapState('profile', [
      'lastChangePassword',
    ]),
    ...mapGetters({
      token: 'token',
    }),
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
.password-form {
  will-change: display, grid-template-areas, grid-template-columns, grid-template-rows;
  @media screen and (min-width: $screen-tablet) {
    display: grid;
    grid-template-columns: 280px auto;
    grid-template-rows: repeat(7, auto);
    grid-column-gap: 32px;
    grid-template-areas:
    'label-current conditions'
    'input-current conditions'
    'label-new conditions'
    'input-new conditions'
    'label-confirm conditions'
    'input-confirm conditions'
    'buttons conditions';
  }
  @media screen and (min-width: $screen-desktop-large) {
    grid-column-gap: 40px;
  }
  &__text {
    font-size: $H400;
    color: $N6;
    font-weight: 500;
    margin-bottom: 18px;
    &--condition {
      display: none;
      @media screen and (min-width: $screen-tablet) {
        display: inline-block;
        align-self: end;
        font-size: $H200;
        margin-bottom: 8px;
        padding-left: 6px;
      }
    }
  }
  &__button-image {
    width: 18px;
    height: 18px;
  }
  &__label-wrapper {
    @include flex-row(space-between, flex-end);
    margin-bottom: 16px;
    @media screen and (min-width: $screen-tablet) {
      &--current {
        grid-area: label-current;
      }
      &--new {
        grid-area: label-new;
      }
      &--confirm {
        grid-area: label-confirm;
      }
    }
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
    @media screen and (min-width: $screen-tablet) {
      &--current {
        grid-area: input-current;
      }
      &--new {
        grid-area: input-new;
      }
      &--confirm {
        grid-area: input-confirm;
      }
    }
  }
  &__conditions-wrapper {
    margin-bottom: 24px;
    @media screen and (min-width: $screen-tablet) {
      grid-area: conditions;
      align-self: start;
      margin-bottom: 0;
      padding-top: 85px;
    }
  }
  &__checkbox {
    margin-bottom: 32px;
  }
  &__buttons-wrapper {
    @include flex-row(stretch, center);
    @media screen and (min-width: $screen-tablet) {
      grid-area: buttons;
    }
  }
  &__button {
    &--cancel {
      flex: 0 0 90px;
      margin-right: 20px;
    }
    &--send {
      flex: 1 1;
    }
  }
  &__icon-check {
    @extend %input-icon;
    fill: $G1;
  }
}
</style>
