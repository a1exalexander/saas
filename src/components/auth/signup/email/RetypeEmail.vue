<template>
<main class="retype-email">
  <article class="retype-email__card animated delay-02 dur04 fadeIn">
    <router-link to='/auth'>
      <subtle-icon class='retype-email__link'>
        <icon-long-arrow-left class='retype-email__link-image icon-button-left'/>
        <p>{{ $t('auth.links.back login') }}</p>
      </subtle-icon>
    </router-link>
    <p class="retype-email__title">{{ $t('auth.titles.new email') }}</p>
    <p class="retype-email__text">{{ $t('auth.text.prev email') }}</p>
    <p class="retype-email__text retype-email__text--email"
      >{{ oldEmail }}
    </p>
    <form class="retype-email__form">
      <div class="retype-email__label-inner">
        <label
          for='retype-email-password'
          class="retype-email__text retype-email__text--label"
          >{{ $t('auth.labels.password') }}
        </label>
        <subtle-icon
          @click.prevent.native='showPassword'
          class="animated dur04 fadeIn">
          <icon-view
            class='icon-button-left-desktop retype-email__button-image'
            v-if='!showPasswordStatus'/>
          <icon-eye-off
            class='icon-button-left-desktop retype-email__button-image'
            v-else/>
          {{ showPasswordStatus?$t('auth.buttons.hide'):$t('auth.buttons.show') }}
        </subtle-icon>
      </div>
      <div class="retype-email__input-wrapper">
        <input
          id='retype-email-password'
          type="password"
          class="retype-email__input"
          :class='{"input-error": myErrors.password}'
          autocomplete="off"
          @blur='errorPassword'
          v-model="password">
        <p
          class="input-text-error animated dur04 bounceIn"
          v-show='myErrors.password'
          v-html="myErrors.password">
        </p>
      </div>
      <label
        for="retype-email-new"
        class="retype-email__text retype-email__text--label"
        >{{ $t('auth.labels.new email') }}
      </label>
      <div class="retype-email__input-wrapper">
        <input
          id='retype-email-new'
          type="text"
          class="retype-email__input"
          :class='{"input-error": myErrors.email.new}'
          v-model='email.new'
          @blur='emailNewError()'>
        <p
          class="input-text-error animated dur04 bounceIn"
          v-show='myErrors.email.new'
          v-html="errors.email.new">
        </p>
      </div>
      <label
        for="retype-email-confirm"
        class="retype-email__text retype-email__text--label"
        >{{ $t('auth.labels.confirm email') }}
      </label>
      <div class="retype-email__input-wrapper">
        <icon-check
          class='retype-email__icon animated dur08 bounceIn'
          v-show='emailConfirmReady'/>
        <input
          id='retype-email-confirm'
          type="text"
          class="retype-email__input"
          :class='{"input-error": myErrors.email.confirm}'
          v-model='email.confirm'
          @blur='emailConfirmError'>
        <p
          class="input-text-error animated dur04 bounceIn"
          v-show='myErrors.email.confirm'
          v-html="myErrors.email.confirm">
        </p>
      </div>
    </form>
    <div class="retype-email__buttons-wrapper">
      <button-secondary
        @click.native='cancel'
        class="retype-email__button">{{ $t('auth.buttons.cancel') }}</button-secondary>
      <button-primary
        @click.native='save'
        :disabled='!allReady'>{{ $t('auth.buttons.send') }}</button-primary>
    </div>
  </article>
</main>
</template>
<script>
import ButtonSecondary from '@/components/common/buttons/ButtonSecondary.vue';
import ButtonPrimary from '@/components/common/buttons/ButtonPrimary.vue';
import SubtleIcon from '@/components/common/buttons/SubtleIcon.vue';
import IconLongArrowLeft from '@/components/common/icons/IconLongArrowLeft.vue';
import IconEyeOff from '@/components/common/icons/IconEyeOff.vue';
import IconView from '@/components/common/icons/IconView.vue';
import IconCheck from '@/components/common/icons/IconCheck.vue';
import Validation from '@/js/validation';
import { mapState, mapMutations } from 'vuex';

export default {
  name: 'RetypeEmail',
  components: {
    ButtonSecondary,
    ButtonPrimary,
    SubtleIcon,
    IconLongArrowLeft,
    IconEyeOff,
    IconView,
    IconCheck,
  },
  data() {
    return {
      password: '',
      email: {
        new: '',
        confirm: '',
      },
      showPasswordStatus: false,
      errorsText: {
        password: [
          this.$t('auth.errors.password.enter'),
          this.$t('auth.errors.password.secure'),
          this.$t('auth.errors.password.full'),
        ],
        email: {
          new: [
            this.$t('auth.errors.email.enter'),
            this.$t('auth.errors.email.at'),
            this.$t('auth.errors.email.domain'),
            this.$t('auth.errors.email.valid'),
          ],
          confirm: [
            this.$t('errors.email.match'),
          ],
        },
      },
      myErrors: {
        email: {
          new: '',
          confirm: '',
        },
        password: '',
      },
    };
  },
  computed: {
    ...mapState('signup', {
      oldEmail: state => state.personalInfo.email,
    }),
    passwordReady() {
      return Validation.password(this.password);
    },
    emailDomainReady() {
      return Validation.emailDomain(this.email.new);
    },
    emailAtReady() {
      return Validation.emailAt(this.email.new);
    },
    emailNewReady() {
      return Validation.email(this.email.new);
    },
    emailConfirmReady() {
      return this.emailNewReady && this.email.new === this.email.confirm;
    },
    allReady() {
      return this.passwordReady && this.emailNewReady && this.emailConfirmReady;
    },
  },
  methods: {
    ...mapMutations('signup', [
      'setEmail',
    ]),
    cancel() {
      this.$emit('cancel');
    },
    save() {
      this.setEmail(this.email.new);
      this.$emit('save');
    },
    showPassword() {
      const element = document.getElementById('retype-email-password');
      if (element.type === 'password') {
        element.type = 'text';
        this.showPasswordStatus = true;
      } else {
        element.type = 'password';
        this.showPasswordStatus = false;
      }
    },
    emailNewError() {
      const email = this.email.new;
      const [error1, error2, error3, error4] = this.errorsText.email.new;
      let errorText = '';
      this.myErrors.email.new = errorText;
      setTimeout(() => {
        if (!email) {
          errorText = error1;
        } else if (!Validation.emailAt(email)) {
          errorText = error2;
        } else if (!Validation.emailDomain(email)) {
          errorText = error3;
        } else if (!Validation.email(email)) {
          errorText = error4;
        } else {
          errorText = '';
        }
        this.myErrors.email.new = errorText;
      }, 15);
    },
    emailConfirmError() {
      const [error] = this.errorsText.email.confirm;
      let errorText = '';
      this.myErrors.email.confirm = errorText;
      setTimeout(() => {
        if (this.email.confirm && this.email.new !== this.email.confirm) {
          errorText = error;
        } else {
          errorText = '';
        }
        this.myErrors.email.confirm = errorText;
      }, 15);
    },
    errorPassword() {
      // eslint-disable-next-line
      const [error1, error2, error3] = this.errorsText.password;
      let errorText = '';
      this.myErrors.password = errorText;
      setTimeout(() => {
        if (!this.password) {
          errorText = error1;
        } else if (!Validation.password(this.password)) {
          errorText = error3;
        } else {
          errorText = '';
        }
        this.myErrors.password = errorText;
      }, 15);
    },
  },
  watch: {
    emailNewReady(value) {
      if (value) this.myErrors.email.new = '';
    },
    emailConfirmReady(value) {
      if (value) this.myErrors.email.confirm = '';
    },
    passwordReady(value) {
      if (value) this.errors.password = '';
    },
  },
};
</script>
<style lang="scss">
.retype-email {
  z-index: 1000;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  min-height: 100vh;
  @include flex-row(stretch, stretch);
  @media screen and (min-width: $screen-tablet) {
    align-items: center;
    justify-content: center;
    background: rgba(10,11,12,0.80);
  }
  &__card {
    padding: 28px;
    position: relative;
    background-color: $N13;
    flex: 0 0 100%;
    @media screen and (min-width: $screen-tablet) {
      min-width: 400px;
      flex: 0 1 29%;
      padding: 32px 40px;
      border: 1px solid $N10;
      border-radius: 2px;
      box-shadow: 0 6px 16px 0 rgba(0,0,0,0.16);
    }
  }
  &__link {
    margin-bottom: 32px;
    @media screen and (min-width: $screen-tablet) {
      display: none;
    }
  }
  &__link-image {
    width: 20px !important;
    height: 20px !important;
  }
  &__title {
    font-size: $H800;
    font-weight: 600;
    margin-bottom: 24px;
  }
  &__label-inner {
    @include flex-row(space-between, baseline);
  }
  &__text {
    font-size: $H200;
    margin-bottom: 6px;
    &--label {
      @extend %auth-label-text;
    }
    &--email {
      font-size: $H400;
      font-weight: 500;
      margin-bottom: 16px;
      color: $B2;
      @media screen and (min-width: $screen-tablet) {
        color: $N0;
        margin-bottom: 26px;
      }
    }
  }
  &__form {
    @include flex-col(flex-start, stretch);
    margin-bottom: 16px;
    @media screen and (min-width: $screen-tablet) {
      margin-bottom: 0;
    }
  }
  &__input {
    @extend %input;
    width: 100%;
  }
  &__input-wrapper {
    margin-bottom: 16px;
    position: relative;
  }
  &__button-image {
    @extend %button-image;
  }
  &__icon {
    @extend %input-icon;
    fill: $G1;
  }
  &__buttons-wrapper {
    @include flex-row(flex-end, center);
  }
  &__button {
    margin-right: 24px;
  }
}
</style>
