<template>
<main class="profile-personal">
  <section class="profile-personal__section profile-personal__section--general">
    <p class="profile-personal__title">General</p>
    <label for='change-image' class="profile-personal__button-photo">
      <subtle-icon
        class="profile-personal__button-photo-field"
        >Change photo
        <icon-pencil class='icon-button-right profile-personal__button-image'/>
      </subtle-icon>
      <input
        type="file"
        name="image"
        class='profile-personal__button-photo-input'
        id="change-image"
        accept="image/*"
        @change='getUrl'>
    </label>
    <div class="profile-personal__input-wrapper profile-personal__input-wrapper--fullname">
      <label for="profile-first-name" class="profile-personal__label">Full name</label>
      <input
        id='profile-first-name'
        type="text"
        class="profile-personal__input"
        :class='{"input-error": myErrors.name}'
        @blur='nameError'
        v-model.trim='newData.name'>
        <p
          class="input-text-error animated dur04 bounceIn"
          v-show='myErrors.name'>{{ myErrors.name }}
        </p>
    </div>
    <label class="profile-personal__label profile-personal__label--gender" for="male">Gender</label>
    <div class="profile-personal__radio-wrapper">
      <label class="profile-personal__radio">
        <input
          type="radio"
          name='gender'
          id='male'
          class="profile-personal__radio-input"
          value='male'
          v-model='newData.gender'>
        <div class="profile-personal__radio-button
                    profile-personal__radio-button--left">{{ $t('auth.buttons.male') }}</div>
      </label>
      <label class="profile-personal__radio">
        <input
          type="radio"
          name='gender'
          class="profile-personal__radio-input"
          value='female'
          v-model='newData.gender'>
        <div class="profile-personal__radio-button
                    profile-personal__radio-button--right">{{ $t('auth.buttons.female') }}</div>
      </label>
    </div>
  </section>
  <section class="profile-personal__section profile-personal__section--address">
    <p class="profile-personal__title profile-personal__title--address">Address</p>
    <form @submit.prevent class="profile-personal__address-form">
      <div class="profile-personal__input-wrapper profile-personal__input-wrapper--city">
        <label for="profile-city" class="profile-personal__label">City</label>
        <input
          id='profile-city'
          type="text"
          class="profile-personal__input"
          v-model.trim='newData.city'>
      </div>
      <div class="profile-personal__input-wrapper profile-personal__input-wrapper--country">
        <label for="profile-country" class="profile-personal__label">Country</label>
        <drop-menu-country
          :country='newData.country'
          @setCountry='setCountry'/>
      </div>
      <div class="profile-personal__input-wrapper profile-personal__input-wrapper--street">
        <label for="profile-street" class="profile-personal__label">Street</label>
        <input
          id='profile-street'
          type="text"
          class="profile-personal__input"
          v-model.trim='newData.street'>
      </div>
      <div class="profile-personal__input-wrapper profile-personal__input-wrapper--post">
        <label for="profile-post" class="profile-personal__label">Postat code</label>
        <input
          id='profile-post'
          type="text"
          class="profile-personal__input"
          maxlength="5"
          v-model.trim='newData.postCode'>
      </div>
      <div class="profile-personal__input-wrapper profile-personal__input-wrapper--house">
        <label for="profile-house" class="profile-personal__label">House</label>
        <input
          id='profile-house'
          type="text"
          class="profile-personal__input"
          v-model.trim='newData.house'>
      </div>
      <div class="profile-personal__input-wrapper profile-personal__input-wrapper--apt">
        <label for="profile-apt" class="profile-personal__label">Apt, Suit, etc</label>
        <input
          id='profile-apt'
          type="text"
          class="profile-personal__input"
          v-model.trim='newData.apt'>
      </div>
    </form>
  </section>
  <section
    class="profile-personal__section profile-personal__section--password">
    <p class="profile-personal__title">Password</p>
    <p
      class="profile-personal__text profile-personal__text--password"
      >Last change: {{ lastChangePassword }}
    </p>
    <button-secondary
      class='profile-personal__button
        profile-personal__button--long'
      @click.prevent.native='changePassword'
      >Change password
    </button-secondary>
  </section>
  <section class="profile-personal__section profile-personal__section--delete">
    <div class="profile-personal__delete-section">
      <button-secondary
        class='profile-personal__button
          profile-personal__button--margin-bottom
          profile-personal__button--long'
        >Delete account
      </button-secondary>
      <p class="profile-personal__text profile-personal__text--delete"
        >If you delete your account, your data will be gone forever.
        If your balance isn't empty, you must send request for a payout.
      </p>
    </div>
    <div class="profile-personal__button-wrapper">
      <button-primary
        class='profile-personal__button
          profile-personal__button--save'
        :class='{"button-loading": loading.save}'
        :disabled='!comparedData'
        @click.native='save'>Save changes
      </button-primary>
      <button-secondary
        class='profile-personal__button profile-personal__button--cancel'
        >Cancel
      </button-secondary>
    </div>
  </section>
  <message-success-absolute
    @click.native='messageSuccess = false'
    v-if='messageSuccess'
    >Your changes have been saved
  </message-success-absolute>
</main>
</template>
<script>
import SubtleIcon from '@/components/common/buttons/SubtleIcon.vue';
import ButtonPrimary from '@/components/common/buttons/ButtonPrimary.vue';
import ButtonSecondary from '@/components/common/buttons/ButtonSecondary.vue';
import IconPencil from '@/components/common/icons/IconPencil.vue';
import MessageSuccessAbsolute from '@/components/common/messages/MessageSuccessAbsolute.vue';
import DropMenuCountry from '@/components/profile/components/DropMenuCountry.vue';
import Validation from '@/js/validation';
import { mapState, mapGetters, mapMutations } from 'vuex';

export default {
  name: 'PersonalInfo',
  components: {
    SubtleIcon,
    IconPencil,
    ButtonSecondary,
    ButtonPrimary,
    DropMenuCountry,
    MessageSuccessAbsolute,
  },
  data() {
    return {
      newData: {
        gender: '',
        name: '',
        city: '',
        country: '',
        street: '',
        postCode: '',
        house: '',
        apt: '',
      },
      image: '',
      errorsText: {
        name: [
          this.$t('auth.errors.name.numbers'),
          this.$t('auth.errors.name.enter'),
        ],
      },
      myErrors: {
        name: '',
      },
      loading: {
        save: false,
      },
      messageSuccess: false,
    };
  },
  computed: {
    ...mapState('profile', [
      'profile',
      'lastChangePassword',
    ]),
    ...mapGetters('profile', [
      'getProfileToEdit',
    ]),
    nameStatus() {
      return Validation.name(this.newData.name);
    },
    comparedData() {
      let negFlag = false;
      let posFlag = false;
      Object.entries(this.newData).forEach((newItem) => {
        Object.entries(this.getProfileToEdit).forEach((oldItem) => {
          if (newItem[0] === oldItem[0]) {
            if (newItem[1] !== oldItem[1]) {
              negFlag = true;
            } else if (newItem[1] === oldItem[1] && negFlag) {
              posFlag = true;
            }
          }
        });
      });
      return negFlag && posFlag && this.nameStatus;
    },
  },
  methods: {
    ...mapMutations('profile', [
      'updateProfile',
    ]),
    save() {
      this.loading.save = true;
      setTimeout(() => {
        this.loading.save = false;
        this.updateProfile(this.newData);
        this.messageSuccess = true;
        setTimeout(() => {
          this.messageSuccess = false;
        }, 6000);
      }, 1000);
    },
    getUrl() {
      const image = document.getElementById('change-image').files[0];
      this.image = image;
    },
    changePassword() {
      this.$emit('changePassword');
    },
    nameError() {
      const [error1, error2] = this.errorsText.name;
      const { name } = this.newData;
      this.myErrors.name = '';
      setTimeout(() => {
        if (name && Validation.digit(name)) {
          this.myErrors.name = error1;
        } else if (!name) {
          this.myErrors.name = error2;
        } else if (!Validation.name(name)) {
          this.myErrors.name = error2;
        } else {
          this.myErrors.name = '';
        }
      }, 15);
    },
    setCountry(item) {
      this.newData.country = item;
    },
    getData() {
      Object.keys(this.newData).forEach((key) => {
        this.newData[key] = this.getProfileToEdit[key];
      });
    },
  },
  beforeMount() {
    this.getData();
  },
  watch: {
    nameStatus(value) {
      if (value) this.myErrors.name = '';
    },
  },
};
</script>
<style lang="scss">
.profile-personal {
  padding: 32px 28px;
  @media screen and (min-width: $screen-tablet) {
    padding: 0 5%;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
  }
  @media screen and (min-width: $screen-desktop) {
    padding: 0 40px;
  }
  &__section {
    padding: 0 0 24px;
    @media screen and (min-width: $screen-tablet) {
      padding: 32px 0;
    }
    &--general {
      @media screen and (min-width: $screen-tablet) {
        display: grid;
        grid-template-columns: 260px;
        grid-auto-rows: auto;
        grid-template-areas:
        'title'
        'input'
        'label-gender'
        'checkbox';
        grid-row-gap: 8px;
        padding-bottom: 32px;
        border-bottom: 1px solid $N9;
      }
      @media screen and (min-width: $screen-desktop) {
        grid-template-columns: repeat(2, 260px);
        grid-template-rows: repeat(2, auto);
        grid-template-areas:
        'title .'
        'input checkbox';
        align-items: end;
        grid-row-gap: 24px;
        grid-column-gap: 32px;
      }
    }
    &--address {
      border-bottom: 1px solid $N9;
      @media screen and (min-width: $screen-tablet) {
        border-bottom: none;
      }
    }
    &--password {
      padding-top: 32px;
      border-bottom: 1px solid $N9;
      @media screen and (min-width: $screen-tablet) {
        display: none;
      }
    }
    &--delete {
      padding-top: 32px;
    }
  }
  &__delete-section {
    @media screen and (min-width: $screen-tablet) {
      display: none;
    }
  }
  &__title {
    font-size: $H700;
    font-weight: 500;
    margin-bottom: 20px;
    @media screen and (min-width: $screen-tablet) {
      grid-area: title;
    }
    @media screen and (min-width: $screen-desktop) {
      margin-bottom: 0;
    }
    &--address {
      @media screen and (min-width: $screen-desktop) {
        margin-bottom: 20px;
      }
    }
  }
  &__button-image {
    width: 18px;
    height: 18px;
  }
  &__button-photo {
    display: block;
    margin-bottom: 22px;
    position: relative;
    @media screen and (min-width: $screen-tablet) {
      display: none;
    }
  }
  &__button-photo-input {
    position: absolute;
    z-index: -1;
    visibility: hidden;
    opacity: -1;
  }
  &__label {
    @extend %input-label-text;
    &--gender {
      display: none;
      @media screen and (min-width: $screen-tablet) {
        display: block;
        grid-area: label-gender;
        margin: 0;
      }
      @media screen and (min-width: $screen-desktop) {
        display: none;
      }
    }
  }
  &__input {
    @extend %input;
    width: 100%;
  }
  &__input-wrapper {
    margin-bottom: 18px;
    @media screen and (min-width: $screen-tablet) {
      margin: 0;
    }
    &--fullname {
      @media screen and (min-width: $screen-tablet) {
        grid-area: input;
        margin-bottom: 8px;
      }
      @media screen and (min-width: $screen-desktop) {
        margin-bottom: 0;
      }
    }
    &--margin-last {
      margin-bottom: 22px;
    }
    &--city {
      grid-area: city;
    }
    &--country {
      grid-area: country;
    }
    &--street {
      grid-area: street;
    }
    &--code {
      grid-area: code;
    }
    &--house {
      grid-area: house;
    }
    &--apt {
      grid-area: apt;
    }
  }
  &__radio-wrapper {
    @include flex-row(stretch, center);
    @media screen and (min-width: $screen-tablet) {
      grid-area: checkbox;
    }
  }
  &__radio {
    flex: 1 0 50%;
    @extend %radio-button-label;
  }
  &__radio-input {
    @extend %radio-button-input;
    &:checked + .profile-personal__radio-button {
      @extend %radio-button-checked-default;
    }
  }
  &__radio-button {
    @extend %radio-button-default;
  }
  &__address-form {
    display: grid;
    grid-template-columns: auto 120px;
    grid-template-rows: repeat(4, auto);
    grid-column-gap: 20px;
    grid-template-areas:
    'city city'
    'country country'
    'street post'
    'house apt';
    @media screen and (min-width: $screen-tablet) {
      grid-template-columns: 220px 100px 100px;
      grid-auto-rows: auto;
      grid-template-areas:
      'country city city'
      'street house post'
      'apt . .';
      grid-column-gap: 24px;
      grid-row-gap: 16px;
    }
    @media screen and (min-width: $screen-desktop) {
      grid-template-columns: 88px 156px 88px 260px;
      grid-template-rows: repeat(2, auto);
      grid-template-areas:
      'post city city country'
      'street street house apt';
      grid-gap: 16px;
      align-items: end;
    }
  }
  &__text {
    color: $N6;
    font-size: $H400;
    font-weight: 500;
    &--password {
      margin-bottom: 24px;
    }
    &--delete {
      margin-bottom: 32px;
    }
  }
  &__button-wrapper {
    @include flex-col(flex-start, stretch);
    @media screen and (min-width: $screen-tablet) {
      flex-direction: row;
      align-items: center;
    }
  }
  &__button {
    padding: 16px 24px;
    width: 100%;
    &--margin-bottom {
      margin-bottom: 24px;
    }
    &--save {
      margin-bottom: 24px;
      @media screen and (min-width: $screen-tablet) {
        margin: 0 22px 0 0;
      }
    }
    @media screen and (min-width: $screen-tablet) {
      width: auto;
      flex: 1 1 auto;
      padding: 10px 20px;
    }
  }
}
</style>
