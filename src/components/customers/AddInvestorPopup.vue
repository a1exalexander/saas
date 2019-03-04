<template>
  <div class="add-investor">
    <div class="add-investor__card">
      <close-button
        class="add-investor__close-button"
        @click.native='cancel'/>
      <header class="add-investor__header">
        <h2 class="add-investor__title">Add an investor</h2>
        <p class="add-investor__user-id">User ID {{ form.id }}</p>
      </header>
      <form class="add-investor__form" @submit.prevent>
        <label for="" class="add-investor__label">
          <p class="add-investor__label-text">Full name</p>
          <input
            type="text"
            class="add-investor__input"
            :class='{"input-error": myErrors.name}'
            @blur='errorName'
            v-model.trim='form.name'>
          <p
            class="input-text-error animated dur04 bounceIn"
            v-show='myErrors.name'
            v-html="myErrors.name">
          </p>
        </label>
        <label class="add-investor__label">
          <p class="add-investor__label-text">Email</p>
          <input
            type="text"
            class="add-investor__input"
            :class='{"input-error": myErrors.email}'
            @blur='errorEmail'
            v-model='form.email'>
          <p
            class="input-text-error animated dur04 bounceIn"
            v-show='myErrors.email'
            v-html="myErrors.email">
          </p>
        </label>
        <label class="add-investor__label">
          <p class="add-investor__label-text">Company name</p>
          <input
            type="text"
            class="add-investor__input"
            v-model='form.company'>
        </label>
        <label class="add-investor__label">
          <p class="add-investor__label-text">City</p>
          <input
            type="text"
            class="add-investor__input"
            v-model='form.city'>
        </label>
        <label class="add-investor__label">
          <p class="add-investor__label-text">Country</p>
          <drop-menu-country :getCountry='form.country' @select='selectCountry'/>
        </label>
        <div class="add-investor__buttons-wrapper">
          <button-secondary
            class='add-investor__button add-investor__button--cancel-secondary'
            @click.native='cancel'>Cancel
          </button-secondary>
          <button-primary
            class='add-investor__button add-investor__button--save'
            :disabled='!allReady'
            @click.native='save'
            :class='{"button-loading": loading}'
            >Save
          </button-primary>
          <button-transparent
            class='add-investor__button add-investor__button--cancel-transparent'
            @click.native='cancel'>Cancel
          </button-transparent>
        </div>
      </form>
    </div>
  </div>
</template>
<script>
import ButtonPrimary from '@/components/common/buttons/ButtonPrimary.vue';
import ButtonSecondary from '@/components/common/buttons/ButtonSecondary.vue';
import ButtonTransparent from '@/components/common/buttons/ButtonTransparent.vue';
import CloseButton from '@/components/common/buttons/CloseButton.vue';
import DropMenuCountry from '@/components/customers/components/DropMenuCountry.vue';
import Validation from '@/js/validation';
import { mapMutations } from 'vuex';

export default {
  name: 'AddInvestorPopup',
  components: {
    ButtonPrimary,
    ButtonSecondary,
    ButtonTransparent,
    CloseButton,
    DropMenuCountry,
  },
  data() {
    return {
      form: {
        id: '',
        name: '',
        email: '',
        company: '',
        city: '',
        country: '',
        balance: 0,
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
      },
      myErrors: {
        name: '',
        email: '',
      },
      loading: false,
    };
  },
  methods: {
    ...mapMutations('investors', [
      'addInvestor',
    ]),
    save() {
      this.loading = true;
      const data = this.form;
      setTimeout(() => {
        this.addInvestor(data);
        this.loading = false;
        this.cancel();
      }, 1000);
    },
    cancel() {
      this.$emit('cancel');
    },
    selectCountry(country) {
      this.form.country = country;
    },
    errorEmail() {
      const { email } = this.form;
      const [error1, error2, error3, error4] = this.errorsText.email;
      let errorText = '';
      this.myErrors.email = errorText;
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
        this.myErrors.email = errorText;
      }, 15);
    },
    errorName() {
      const { name } = this.form;
      const [error1, error2] = this.errorsText.name;
      let errorText = '';
      this.myErrors.name = errorText;
      setTimeout(() => {
        if (!name) {
          errorText = error2;
        } else if (name && !Validation.name(name)) {
          errorText = error1;
        } else {
          errorText = '';
        }
        this.myErrors.name = errorText;
      }, 15);
    },
    generateId() {
      this.form.id = Math.ceil(Math.random() * 99999998);
    },
    generateFakeBalance() {
      this.form.balance = Math.floor(Math.random() * 500000);
    },
  },
  computed: {
    readyName() {
      return Validation.name(this.form.name);
    },
    readyEmail() {
      return Validation.email(this.form.email);
    },
    allReady() {
      const ready = Object.values(this.form).every(value => !!value);
      return this.readyName && this.readyEmail && ready;
    },
  },
  watch: {
    readyName(value) {
      if (value) this.myErrors.name = '';
    },
    readyEmail(value) {
      if (value) this.myErrors.email = '';
    },
  },
  beforeMount() {
    this.generateId();
    this.generateFakeBalance();
  },
  beforeUpadete() {
    this.generateId();
    this.generateFakeBalance();
  },
};
</script>
<style lang="scss">
.add-investor {
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
  min-height: 100vh;
  z-index: 12;
  @include flex-col(stretch, stretch);
  @media screen and (min-width: $screen-tablet) {
    padding: 32px;
    background: rgba(10,11,12,0.80);
    position: fixed;
    bottom: 0;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    overflow-y: auto;
  }
  &__card {
    background-color: $N13;
    padding: 28px;
    position: relative;
    flex: 1 1;
    @media screen and (min-width: $screen-tablet) {
      flex: 0 1 34%;
      min-width: 440px;
      position: relative;
      padding: 32px 40px;
    }
  }
  &__title {
    font-size: $H800;
    font-weight: 600;
    margin-bottom: 8px;
  }
  &__user-id {
    font-size: $H300;
    color: $N88;
  }
  &__header {
    margin-bottom: 22px;
  }
  &__label {
    @include flex-col(flex-start, stretch);
    margin-bottom: 14px;
    &:last-of-type {
      margin-bottom: 32px;
    }
  }
  &__label-text {
    @extend %input-label-text;
  }
  &__input {
    @extend %input;
  }
  &__button {
    width: 100%;
    @media screen and (min-width: $screen-tablet) {
      width: auto;
    }
    &--save {
      margin-bottom: 20px;
      @media screen and (min-width: $screen-tablet) {
        margin: 0;
      }
    }
    &--cancel-transparent {
      @media screen and (min-width: $screen-tablet) {
        display: none;
      }
    }
    &--cancel-secondary {
      display: none;
      @media screen and (min-width: $screen-tablet) {
        display: flex;
        margin-right: 24px;
      }
    }
  }
  &__buttons-wrapper {
    @media screen and (min-width: $screen-tablet) {
      display: flex;
      justify-content: flex-end;
      align-items: center;
    }
  }
  &__close-button {
    position: absolute;
    right: 22px;
    top: 30px;
    @media screen and (min-width: $screen-tablet) {
      svg {
        width: 16px;
        height: 16px;
      }
    }
  }
}
</style>
