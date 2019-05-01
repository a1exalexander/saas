<template>
<section class="personal-info-step">
<p
  class="personal-info-step__heading personal-info-step__heading--desktop"
  >{{ $t('auth.titles.personal') }}
</p>
<div class="personal-info-step__mobile-head">
  <p class="personal-info-step__heading">{{ $t('auth.titles.signup') }}</p>
  <router-link
    to='/auth'
    class="personal-info-step__link"
    >{{ $t('auth.links.login') }}
  </router-link>
</div>
<div class="personal-info-step__form">
  <div
    class="personal-info-step__status-box
          personal-info-step__status-box--name"
    :class='{"personal-info-check": nameStatus}'>
    <div
      class="personal-info-step__image-wrapper
            personal-info-step__image-wrapper--active">
    <span class="personal-info-step__step-number">1</span>
    <icon-check class="personal-info-step__image animated dur05 fadeIn"/>
    </div>
    <div
      class="personal-info-step__line animated dur05 fadeIn">
    </div>
  </div>
  <label class="personal-info-step__label personal-info-step__label--name">
    <p
      class="personal-info-step__input-name"
      >{{ $t('auth.labels.full name') }}
    </p>
    <input
      type="text"
      class="personal-info-step__input is-flex"
      :class='{"input-error": myErrors.name}'
      @blur='nameError'
      v-model.trim="name">
    <p
      class="input-text-error animated dur04 bounceIn"
      v-show='myErrors.name'>{{ myErrors.name }}
    </p>
  </label>
  <div
    class="personal-info-step__status-box
          personal-info-step__status-box--email"
    :class='{"personal-info-check": nameStatus && emailStatus}'>
    <div
      class="personal-info-step__image-wrapper"
      :class='{"personal-info-step__image-wrapper--active": nameStatus}'>
      <span class="personal-info-step__step-number">2</span>
      <icon-check class="personal-info-step__image"/>
    </div>
    <div
      class="personal-info-step__line animated dur05 fadeIn"
      v-if='nameStatus'>
    </div>
  </div>
  <label class="personal-info-step__label personal-info-step__label--email">
    <p class="personal-info-step__input-name">{{ $t('auth.labels.email') }}</p>
    <input
      type="email"
      class="personal-info-step__input"
      :class='{"input-error": myErrors.email, "only-mobile-flex": nameStatus}'
      @blur='emailError'
      v-model.trim='email'>
    <p
      class="input-text-error animated dur04 bounceIn"
      :class='{"only-mobile-none": !nameStatus && myErrors.email}'
      v-show='myErrors.email'>{{ myErrors.email }}</p>
  </label>
  <div
    class="personal-info-step__status-box
          personal-info-step__status-box--phone"
    :class='{"personal-info-check": nameStatus && emailStatus && getGender}'>
    <div
      class="personal-info-step__image-wrapper"
      :class='{"personal-info-step__image-wrapper--active":
              nameStatus && emailStatus && getGender}'>
      <span class="personal-info-step__step-number">3</span>
      <icon-check class="personal-info-step__image"/>
    </div>
    <!-- <div
      class="personal-info-step__line animated dur05 fadeIn"
      v-if='nameStatus && emailStatus && getGender'>
    </div> -->
  </div>
  <div class="personal-info-step__label personal-info-step__label--phone">
    <p class="personal-info-step__input-name">{{ $t('auth.labels.phone') }}
      <span class="personal-info-step__input-optional">{{ $t('auth.labels.optional') }}</span>
    </p>
    <vue-tel-input
      placeholder=''
      @onInput='onValidPhone'
      class='personal-info-step__input only-mobile-none'
      :class='{"input-error": myErrors.phone,
              "only-mobile-flex": nameStatus && emailStatus && getGender}'
      v-model="phone"
      :preferredCountries="['gb', 'ua', 'ru', 'de', 'fr', 'pl', 'it', 'es']">
    </vue-tel-input>
    <p
      class="input-text-error animated dur04 bounceIn"
      :class='{"only-mobile-none": !nameStatus && !emailStatus && !getGender && myErrors.phone}'
      v-show='myErrors.phone'>{{ myErrors.phone }}
    </p>
  </div>
  <!-- <div
    class="personal-info-step__status-box
          personal-info-step__status-box--age"
    :class='{"personal-info-check": nameStatus && emailStatus && getGender}'>
    <div
    class="personal-info-step__image-wrapper">
    <span class="personal-info-step__step-number">4</span>
    <icon-check class="personal-info-step__image"/>
    </div>
    <div
      class="personal-info-step__line animated dur05 fadeIn"
      v-if='nameStatus && emailStatus && getGender'>
    </div>
  </div> -->
  <!-- <label class="personal-info-step__label personal-info-step__label--age">
    <p class="personal-info-step__input-name">{{ $t('auth.labels.age') }}
      <span class="personal-info-step__input-optional">{{ $t('auth.labels.optional') }}</span>
    </p>
    <input
      type="text"
      class="personal-info-step__input personal-info-step__input--age"
      :class='{"input-error": myErrors.age,
              "only-mobile-flex": nameStatus && emailStatus && getGender}'
      maxlength='3'
      @blur='ageError'
      v-model.trim.number='age'>
    <p
      class="input-text-error animated dur04 bounceIn"
      :class='{"only-mobile-none": !nameStatus && !emailStatus && !getGender && myErrors.age}'
      v-show='myErrors.age'>{{ myErrors.age }}
    </p>
  </label> -->
  <!-- <div
    class="personal-info-step__status-box
          personal-info-step__status-box--gender"
    :class='{"personal-info-check": nameStatus && emailStatus && getGender}'>
    <div
      class="personal-info-step__image-wrapper"
      :class='{"personal-info-step__image-wrapper--active": nameStatus && emailStatus }'>
      <span class="personal-info-step__step-number">3</span>
      <icon-check class="personal-info-step__image"/>
    </div>
    <div
      class="personal-info-step__line animated dur05 fadeIn"
      v-if='nameStatus && emailStatus'>
    </div>
  </div> -->
  <!-- <div class="personal-info-step__radio-container">
    <p class="personal-info-step__input-name">{{ $t('auth.labels.gender') }}</p>
    <div
      class="personal-info-step__radio-wrapper"
      :class='{"only-mobile-flex": nameStatus && emailStatus}'>
      <label class="personal-info-step__radio">
        <input
          type="radio"
          name='gender'
          class="personal-info-step__radio-input"
          value='male'
          v-model='gender'>
        <div class="personal-info-step__radio-button
                    personal-info-step__radio-button--left">{{ $t('auth.buttons.male') }}</div>
      </label>
      <label class="personal-info-step__radio">
        <input
          type="radio"
          name='gender'
          class="personal-info-step__radio-input"
          value='female'
          v-model='gender'>
        <div class="personal-info-step__radio-button
                    personal-info-step__radio-button--right">{{ $t('auth.buttons.female') }}</div>
      </label>
    </div>
  </div> -->
  <div class="personal-info-step__button-wrapper">
    <button-primary-icon
      :disabled='showContinue'
      :class='{"button-loading": loading}'
      @click.prevent.native='nextStep'>{{ $t('auth.buttons.continue') }}
      <icon-long-arrow-right class='icon-button-right'/>
    </button-primary-icon>
    <div class="personal-info-step__button-inner">
      <p class="personal-info-step__button-description">{{ $t('auth.links.login') }}
      </p>
      <router-link to='/auth'>
        <button-secondary>{{ $t('auth.buttons.login') }}</button-secondary>
      </router-link>
    </div>
  </div>
</div>
</section>
</template>
<script>
import ButtonPrimaryIcon from '@/components/common/buttons/ButtonPrimaryIcon.vue';
import ButtonSecondary from '@/components/common/buttons/ButtonSecondary.vue';
import IconLongArrowRight from '@/components/common/icons/IconLongArrowRight.vue';
import IconCheck from '@/components/common/icons/IconCheck.vue';
import Validation from '@/js/validation';
import 'vue-tel-input/dist/vue-tel-input.css';
import { mapState, mapMutations, mapActions } from 'vuex';

export default {
  name: 'PersonalInfoStep',
  components: {
    ButtonPrimaryIcon,
    ButtonSecondary,
    IconLongArrowRight,
    IconCheck,
  },
  data() {
    return {
      errorsText: {
        name: [
          this.$t('auth.errors.name.numbers'),
          this.$t('auth.errors.name.enter'),
        ],
        email: [
          this.$t('auth.errors.email.valid'),
          this.$t('auth.errors.email.enter'),
        ],
        phone: [
          this.$t('auth.errors.phone.letters'),
          this.$t('auth.errors.phone.count'),
          this.$t('auth.errors.phone.correct'),
        ],
        age: [
          this.$t('auth.errors.age.letters'),
          this.$t('auth.errors.age.correct'),
        ],
      },
      myErrors: {
        name: '',
        email: '',
        phone: '',
        age: '',
      },
      loading: false,
      telValid: false,
    };
  },
  methods: {
    ...mapMutations('signup', [
      'setPersonalInfo',
    ]),
    ...mapActions('signup', [
      'stepOne',
    ]),
    onValidPhone({ number, isValid, country }) {
      if (!isValid && !number.length) {
        this.telValid = false;
        this.myErrors.phone = '';
      } else if (!isValid) {
        this.telValid = false;
      } else {
        this.telValid = true;
        this.myErrors.phone = '';
      }
     },
    nameError() {
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
    emailError() {
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
    phoneError() {
      const error1 = this.errorsText.phone[0];
      const error2 = this.errorsText.phone[1];
      const error3 = this.errorsText.phone[2];
      this.myErrors.phone = '';
      setTimeout(() => {
        if (this.getPhone && !Validation.onlyPhone(this.getPhone)) {
          this.myErrors.phone = error1;
        } else if (this.getPhone && Validation.phoneCount(this.getPhone)) {
          this.myErrors.phone = error2;
        } else if (this.getPhone && !Validation.phone(this.getPhone)) {
          this.myErrors.phone = error3;
        } else {
          this.myErrors.phone = '';
        }
      }, 15);
    },
    ageError() {
      const error1 = this.errorsText.age[0];
      const error2 = this.errorsText.age[1];
      this.myErrors.age = '';
      setTimeout(() => {
        if (this.getAge && !Validation.onlyDigit(this.getAge)) {
          this.myErrors.age = error1;
        } else if ((this.getAge || this.getAge === 0)
          && (Number(this.getAge) < 16 || Number(this.getAge) > 160)) {
          this.myErrors.age = error2;
        } else {
          this.myErrors.age = '';
        }
      }, 15);
    },
    nextStep() {
      if (!this.telValid && this.phone) {
        this.myErrors.phone = this.errorsText.phone[2];
      } else {
        this.loading = true;
        this.stepOne()
          .then(() => {
            this.loading = false;
          });
      }
    },
  },
  computed: {
    ...mapState('signup', {
      getName: state => state.personalInfo.name_first,
      getEmail: state => state.personalInfo.email,
      getPhone: state => state.personalInfo.phone,
      getAge: state => state.personalInfo.age,
      getGender: state => state.personalInfo.gender,
    }),
    nameStatus() {
      return Validation.name(this.getName);
    },
    emailStatus() {
      return Validation.email(this.getEmail);
    },
    phoneStatus() {
      return Validation.phone(this.getPhone);
    },
    ageStatus() {
      return Validation.age(this.getAge);
    },
    showContinue() {
      return !(this.nameStatus && this.emailStatus && this.getGender);
    },
    name: {
      get() {
        return this.getName;
      },
      set(value) {
        this.setPersonalInfo(['name_first', value]);
      },
    },
    email: {
      get() {
        return this.getEmail;
      },
      set(value) {
        this.setPersonalInfo(['email', value]);
      },
    },
    phone: {
      get() {
        return this.getPhone;
      },
      set(value) {
        this.setPersonalInfo(['phone', value]);
      },
    },
    age: {
      get() {
        return this.getAge;
      },
      set(value) {
        this.setPersonalInfo(['age', value]);
      },
    },
    gender: {
      get() {
        return this.getGender;
      },
      set(value) {
        this.setPersonalInfo(['gender', value]);
      },
    },
  },
  watch: {
    nameStatus(value) {
      if (value) this.myErrors.name = '';
    },
    emailStatus(value) {
      if (value) this.myErrors.email = '';
    },
    phoneStatus(value) {
      if (value) this.myErrors.phone = '';
    },
    ageStatus(value) {
      if (value) this.myErrors.age = '';
    },
  },
};
</script>
<style lang="scss">
.personal-info-step {
  &__heading {
    font-size: $H800;
    &--desktop {
      display: none;
    }
    @media screen and (min-width: $screen-tablet) {
      &--desktop {
        display: inline-block;
      }
      font-size: $H500;
      margin-bottom: 20px;
    }
  }
  &__mobile-head {
    @include flex-row(space-between, baseline);
    margin-bottom: 24px;
    @media screen and (min-width: $screen-tablet) {
      display: none;
    }
  }
  &__link {
    @extend %link;
  }
  &__form {
    display: grid;
    grid-template-columns: 24px auto;
    grid-template-rows: repeat(6, auto);
    grid-gap: 16px;
    grid-template-areas:
      'bar-name name'
      'bar-email email'
      'bar-gender gender'
      'bar-phone phone'
      'bar-age age'
      'buttons buttons';
    @media screen and (min-width: $screen-tablet) {
      grid-template-columns: repeat(2, auto);
      grid-template-rows: repeat(5, auto);
      grid-column-gap: 24px;
      grid-template-areas:
        'name .'
        'email .'
        'phone age'
        'gender gender'
        'buttons buttons';
      justify-content: start;
    }
    @media screen and (min-width: $screen-tablet-large) {
      grid-template-columns: repeat(2, auto);
      grid-template-rows: repeat(4, auto);
      grid-column-gap: 24px;
      grid-template-areas:
        'name email'
        'phone age'
        'gender gender'
        'buttons buttons';
      justify-content: start;
    }
  }
  &__status-box {
    @include flex-col(flex-start, center);
    &--name {
      grid-area: bar-name;
    }
    &--email {
      grid-area: bar-email;
    }
    &--phone {
      grid-area: bar-phone;
    }
    &--age {
      grid-area: bar-age;
    }
    &--gender {
      grid-area: bar-gender;
    }
    @media screen and (min-width: $screen-tablet) {
      display: none;
    }
  }
  &__image-wrapper {
    @extend %status-bar-image-wrapper;
    margin-bottom: 10px;
    &--active {
      background-color: $B4;
    }
  }
  &__line {
    @extend %status-bar-line;
  }
  &__step-number {
    @extend %status-bar-number;
  }
  &__image {
    @extend %status-bar-image;
    display: none;
  }
  &__label {
    &--name {
      grid-area: name;
    }
    &--email {
      grid-area: email;
    }
    &--phone {
      grid-area: phone;
    }
    &--age {
      grid-area: age;
    }
  }
  &__input.vue-tel-input {
    border: 1px solid $N9;
    &:focus-within {
      box-shadow: none;
      border: 1px solid $B5;
    }
    .dropdown {
      height: 42px;
      background-color: $N13;
      border: none;
      @media screen and (min-width: $screen-tablet) {
        height: 34px;
      }
      &:hover {
        background-color: $N13;
      }
      &:focus {
        background-color: $N13;
        border: none;
      }
    }
    .dropdown.open {
      background-color: $N13;
      border: none;
      &:focus {
        background-color: $N13;
        border: none;
      }
    }
    .open {
      &:hover {
        background-color: $N13;
      }
      &:focus {
        background-color: $N13;
        border: none;
      }
    }
    .highlighted {
      background-color: $N10;
    }
    .dropdown-item {
      font-weight: 600;
      color: $N6;
      font-size: $H200;
      @media screen and (min-width: $screen-tablet) {
        &:hover {
          background-color: $N10;
          color: $N0;
          & * {
            color: $N0;
          }
        }
      }
    }
    div, ul {
      z-index: 5;
    }
    ul {
      background-color: $N11;
      box-shadow: 0 8px 10px 0 rgba(10,11,12,0.56);
      border-radius: 2px;
      border: none;
      top: 115%;
      @media screen and (max-width: $screen-tablet) {
        width: 90vw;
        left: -44px;
      }
    }
    padding: 0;
    input[type=tel] {
      background-color: $N13;
      font-size: $H550;
      font-weight: 400;
      color: $N2;
      height: 42px;
      @media screen and (min-width: $screen-tablet) {
        font-size: $H300;
        height: 34px;
      }
    }
  }
  &__input {
    @extend %input;
    width: 100%;
    display: none;
    @media screen and (min-width: $screen-tablet) {
      min-width: 247px;
      display: flex;
    }
    &--age {
      min-width: 70px;
      width: 70px;
      @media screen and (min-width: $screen-tablet) {
        min-width: 90px;
        width: 90px;
      }
    }
  }
  &__input-optional {
    margin-left: 3px;
    color: $N6;
    font-size: $H100;
    padding: 1px 5px;
    border-radius: 2px;
    background-color: $N11;
  }
  &__input-name {
    font-size: $H500;
    font-weight: 500;
    line-height: 24px;
    margin-bottom: 9px;
    @media screen and (min-width: $screen-tablet) {
      line-height: 1.1;
      font-size: $H200;
      font-weight: 400;
    }
  }
  &__button-wrapper {
    grid-area: buttons;
    @include flex-row(space-between, center);
    padding-top: 16px;
    @media screen and (min-width:$screen-tablet) {
      padding-top: 0;
    }
  }
  &__button-inner {
    display: none;
    @media screen and (min-width:$screen-tablet) {
      padding-right: 40px;
      display: flex;
      justify-content: flex-start;
      align-items: center;
    }
  }
  &__button-description {
    font-size: $H100;
    margin-right: 16px;
  }
  &__radio-container {
    grid-area: gender;
    @media screen and (min-width:$screen-tablet) {
      margin-bottom: 16px;
    }
  }
  &__radio-wrapper {
    @include flex-row(flex-start, flex-start);
    display: none;
    @media screen and (min-width:$screen-tablet) {
      display: flex;
    }
  }
  &__radio {
    @extend %radio-button-label;
    &:first-child {
      margin-right: 16px;
      @media screen and (min-width:$screen-tablet) {
        border-right: 1px solid $N8;
        margin-right: 0;
      }
    }
  }
  &__radio-input {
    @extend %radio-button-input;
    &:checked + .personal-info-step__radio-button {
      @extend %radio-button-checked;
    }
  }
  &__radio-button {
    @extend %radio-button;
    @media screen and (min-width: $screen-tablet) {
      &--left {
        border-radius: 2px 0 0 2px;
      }
      &--right {
        border-radius: 0 2px 2px 0;
      }
    }
  }
}
@media screen and (max-width: $screen-tablet) {
  .personal-info-check {
    .personal-info-step {
      &__image-wrapper {
        background-color: $B4;
      }
      &__line {
        background-color: $B4;
      }
      &__step-number {
        display: none;
      }
      &__image {
        display: block;
      }
    }
  }
}

</style>
