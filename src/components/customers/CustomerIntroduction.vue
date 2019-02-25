<template>
  <main class="customer-introduction">
    <div class="customer-introduction__card customer-introduction__card--info">
      <h2 class="customer-introduction__title">Personal info</h2>
      <label class="customer-introduction__label">
        <p class="customer-introduction__label-text">Full name</p>
        <input
          type="text"
          class="customer-introduction__input"
          :class='{"input-error": myErrors.name}'
          v-model.trim='newData.name'
          @blur='errorName(newData.name)'>
        <p
          class="input-text-error animated dur04 bounceIn"
          v-html='myErrors.name'
          v-show='myErrors.name'>
        </p>
      </label>
      <div class="customer-introduction__label-wrapper">
        <label class="customer-introduction__label customer-introduction__label--age">
          <p class="customer-introduction__label-text">Age</p>
          <input
            type="text"
            class="customer-introduction__input"
            :class='{"input-error": myErrors.age}'
            v-model.trim.number='newData.age'
            @blur='errorAge(newData.age)'>
          <p
            class="input-text-error animated dur04 bounceIn"
            v-html='myErrors.age'
            v-show='myErrors.age'>
          </p>
        </label>
        <label class="customer-introduction__label customer-introduction__label--city">
          <p class="customer-introduction__label-text">Living city</p>
          <input type="text" class="customer-introduction__input">
        </label>
      </div>
      <label class="customer-introduction__label">
        <p class="customer-introduction__label-text">Company</p>
        <input type="text" class="customer-introduction__input">
      </label>
      <label class="customer-introduction__label">
        <p class="customer-introduction__label-text">Working sphere</p>
        <input type="text" class="customer-introduction__input">
      </label>
      <label class="customer-introduction__label">
        <p class="customer-introduction__label-text">Current position</p>
        <input type="text" class="customer-introduction__input">
      </label>
    </div>
    <div class="customer-introduction__card customer-introduction__card--contacts">
      <h2 class="customer-introduction__title">Contacts</h2>
      <label class="customer-introduction__label">
        <p class="customer-introduction__label-text">Phone</p>
        <input
          type="text"
          class="customer-introduction__input"
          :class='{"input-error": myErrors.phone}'
          v-model.trim="newData.phone"
          @blur='errorPhone(newData.phone)'>
        <p
          class="input-text-error animated dur04 bounceIn"
          v-html='myErrors.phone'
          v-show='myErrors.phone'>
        </p>
      </label>
      <label class="customer-introduction__label">
        <p class="customer-introduction__label-text">Email</p>
        <input
          type="text"
          class="customer-introduction__input"
          :class='{"input-error": myErrors.email}'
          v-model.trim='newData.email'
          @blur='errorEmail(newData.email)'>
        <p
          class="input-text-error animated dur04 bounceIn"
          v-show='myErrors.email'
          v-html="myErrors.email">
        </p>
      </label>
    </div>
    <div class="customer-introduction__card customer-introduction__card--metadata">
      <h2 class="customer-introduction__title customer-introduction__title--meta">Metadata</h2>
      <div class="customer-introduction__meta-item customer-introduction__meta-item--seen">
        <p class="customer-introduction__meta-label">Last seen</p>
        <p type="text" class="customer-introduction__meta-text">26/11/19   11:09:32</p>
      </div>
      <div class="customer-introduction__meta-item customer-introduction__meta-item--date">
        <p class="customer-introduction__meta-label">Registration date</p>
        <p type="text" class="customer-introduction__meta-text">26/11/19</p>
      </div>
      <div class="customer-introduction__meta-item customer-introduction__meta-item--status">
        <p class="customer-introduction__meta-label">Client status</p>
        <div class="customer-introduction__drop">drop</div>
      </div>
    </div>
    <div class="customer-introduction__buttons-wrapper">
      <button-primary
        class='customer-introduction__button customer-introduction__button--save'
        :disabled='!allReady'
        @click.native='save'
        :class='{"button-loading": loading}'
        >Save
      </button-primary>
      <button-transparent
        class='customer-introduction__button customer-introduction__button--cancel-transparent'
        @click.native='cancel'>Cancel
      </button-transparent>
    </div>
  </main>
</template>
<script>
import ButtonPrimary from '@/components/common/buttons/ButtonPrimary.vue';
import ButtonTransparent from '@/components/common/buttons/ButtonTransparent.vue';
import InputError from '@/js/inputError';
import validation from '@/js/validation';
import format from '@/js/format';

export default {
  name: 'CustomerIntroduction',
  components: {
    ButtonPrimary,
    ButtonTransparent,
  },
  data() {
    return {
      loading: false,
      newData: {
        name: '',
        email: '',
        age: '',
        phone: '',
      },
      errorsText: {
        name: [
          this.$t('auth.errors.name.numbers'),
          this.$t('auth.errors.name.enter'),
        ],
        email: [
          this.$t('auth.errors.email.enter'),
          this.$t('auth.errors.email.at'),
          this.$t('auth.errors.email.domain'),
          this.$t('auth.errors.email.valid'),
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
        phone: '',
      },
      formError: {},
    };
  },
  methods: {
    errorEmail(email) {
      this.myErrors.email = '';
      setTimeout(() => {
        this.myErrors.email = this.formError.errorEmail(email);
      }, 15); 
    },
    errorName(name) {
      this.myErrors.name = '';
      setTimeout(() => {
        this.myErrors.name = this.formError.errorName(name);
      }, 15); 
      console.log(this.formError)
    },
    errorAge(age) {
      this.myErrors.age = '';
      setTimeout(() => {
        this.myErrors.age = this.formError.errorAge(age);
      }, 15); 
    },
    errorPhone(phone) {
      this.myErrors.phone = '';
      setTimeout(() => {
        this.myErrors.phone = this.formError.errorPhone(phone);
      }, 15); 
    },
  },
  computed: {
    readyName() {
      return validation.name(this.newData.name);
    },
    readyEmail() {
      return validation.email(this.newData.email);
    },
    readyPhone() {
      const phone = this.newData.phone;
      if (validation.phone(phone)) {
        this.newData.phone = format.phone(phone);
      } else {
        this.newData.phone = phone;
      }
      return validation.phone(phone);
    },
    readyAge() {
      return validation.age(this.newData.age);
    },
    allReady() {
      const ready = Object.values(this.newData).every(value => !!value);
      return this.readyName && this.readyEmail && this.readyPhone && this.readyAge && ready;
    },
  },
  watch: {

  },
  beforeMount() {
    this.formError = new InputError(this.errorsText);
  },
};
</script>
<style lang="scss">
.customer-introduction {
  padding: 32px 28px;
  &__title {
    font-size: $H600;
    font-weight: 500;
    margin-bottom: 16px;
    &--meta {
      grid-template: title;
    }
  }
  &__label-wrapper {
    @include flex-row(space-between, flex-start);
    margin-bottom: 16px;
  }
  &__label {
    @include flex-col(flex-start, stretch);
    margin-bottom: 16px;
    &:last-child {
      margin: 0;
    }
    &--age {
      flex: 0 0 80px;
      margin: 0 20px 0 0;
    }
    &--city {
      flex: 1 1;
      margin: 0;
    }
  }
  &__label-text {
    @extend %input-label-text;
  }
  &__input {
    @extend %input;
    width: 100%;
  }
  &__card {
    border-bottom: 1px solid $N10;
    margin-bottom: 24px;
    padding-bottom: 24px;
    &--metadata {
      border: none;
      margin-bottom: 32px;
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      grid-auto-rows: auto;
      grid-template-areas:
      'title title'
      'seen status'
      'date .';
      grid-column-gap: 24px;
      grid-row-gap: 14px;
    }
  }
  &__meta-item {
    &--seen {
      grid-area: seen;
    }
    &--status {
      grid-area: status;
    }
    &--date {
      grid-area: date;
    }
  }
  &__meta-label {
    font-size: $H300;
    font-weight: 500;
    color: $N7;
    margin-bottom: 7px;
  }
  &__meta-text {
    font-size: $H400;
  }
  &__button {
    width: 100%;
    &--save {
      margin-bottom: 20px;
    }
  }
}
</style>
