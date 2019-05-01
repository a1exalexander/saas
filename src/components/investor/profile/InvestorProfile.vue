<template>
<div class="profile-investor" @click='closeDrop'>
  <message-success-absolute
    @click.native='message.success = false'
    v-if='message.success'
    >{{ textMessage.success }}
  </message-success-absolute>
  <message-info-absolute
    @click.native='message.info = false'
    v-if='message.info'
    >{{ textMessage.info }}
  </message-info-absolute>
  <message-error-absolute
    @click.native='message.error = false'
    v-if='message.error'
    >{{ textMessage.error }}
  </message-error-absolute>
  <header class="profile-investor__header">
    <a
      @click.prevent='cancel'
      class="profile-investor__router-link-wrapper">
      <subtle-icon class="profile-investor__router-link">
        <div class="profile-investor__icon-wrapper icon-button-left icon-large">
          <icon-long-arrow-left class="profile-investor__icon"/>
        </div>
        <span>Back to Dashboard</span>
      </subtle-icon>
    </a>
    <div class="profile-investor__head">
      <div class="profile-investor__ava-wrapper">
        <img
          src=""
          alt="ava"
          class="profile-investor__ava"
          v-if='newData.ava'>
        <icon-ava
          class="default-ava"
          v-else/>
        <label class="profile-investor__change-photo-button">
          <icon-pencil class='profile-investor__change-photo-icon'/>
          <input
            type="file"
            ref='ava'
            name="image"
            class='profile-investor__button-photo-input'
            id="change-image"
            accept="image/*"
            @change='getImage'>
        </label>
      </div>
      <div class="profile-investor__col">
        <div class="profile-investor__row profile-investor__row--name-margin">
          <p class="profile-investor__name">{{ fullName }}</p>
          <span class="profile-investor__status">{{ profile.role }}</span>
        </div>
        <div class="profile-investor__row">
          <p class="profile-investor__state">User ID: </p>
          <p class="profile-investor__user-id">{{ profile.id }}</p>
        </div>
      </div>
    </div>
  </header>
  <main class="profile-investor__main">
    <section class="profile-investor__section">
      <h3 class="profile-investor__caption">General</h3>
      <div class="profile-investor__form">
        <label for='change-image' class="profile-investor__button-photo">
          <subtle-icon
            class="profile-investor__button-photo-field"
            >Change photo
            <icon-pencil class='icon-button-right icon-small'/>
          </subtle-icon>
          <input
            type="file"
            ref='ava'
            name="image"
            class='profile-investor__button-photo-input'
            id="change-image"
            accept="image/*"
            @change='getImage'>
        </label>
        <label class="profile-investor__label">
          <p class="profile-investor__label-text">First Name</p>
          <input
            type="text"
            class="profile-investor__input"
            v-model='newData.name_first'>
          <p
            class="input-text-error animated dur04 bounceIn"
            v-show='myErrors.name'>{{ myErrors.name }}
        </p>
        </label>
        <label class="profile-investor__label">
          <p class="profile-investor__label-text">Last Name</p>
          <input
            type="text"
            class="profile-investor__input"
            v-model='newData.name_last'>
        </label>
        <div class="profile-investor__label">
          <p class="profile-investor__label-text">Gender</p>
          <div class="profile-investor__radio-row">
            <label class="profile-investor__radio">
              <input
                type="radio"
                name='methods'
                class="profile-investor__radio-input"
                value='male'
                v-model='newData.gender'>
              <div
                class="profile-investor__radio-button profile-investor__radio-button--left"
                >Male
              </div>
            </label>
            <label class="profile-investor__radio">
              <input
                type="radio"
                name='methods'
                class="profile-investor__radio-input"
                value='female'
                v-model='newData.gender'>
              <div
                class="profile-investor__radio-button profile-investor__radio-button--right"
                >Female
              </div>
            </label>
          </div>
        </div>
      </div>
      <transition
        name="custom-classes-transition"
        enter-active-class="animated dur03 fadeIn"
        leave-active-class="animated dur03 fadeOut"
        mode="out-in">
      <div
        class="profile-investor__row
        profile-investor__row--padding-top
        tablet-flex"
        v-if='comparedGeneralData'>
        <button-primary
          class='profile-investor__button
            profile-investor__button--margin'
          :class='{"button-loading": loading.general}'
          @click.prevent.native='saveGeneral'
          :disabled='!comparedGeneralData'
          >Save changes
        </button-primary>
        <button-secondary
          class='profile-investor__button'
          @click.prevent.native='cancelGeneral'
          >Cancel
        </button-secondary>
      </div>
      </transition>
    </section>
    <section class="profile-investor__section">
      <h3 class="profile-investor__caption">Address</h3>
      <div class="profile-investor__row-col">
        <div class="profile-investor__label">
          <p class="profile-investor__label-text">Country</p>
          <drop-menu-country
            ref='dropMenu'
            :get-country='newData.country'
            @select="selectCountry"
            class='profile-investor__drop-menu'/>
        </div>
        <label class="profile-investor__label">
          <p class="profile-investor__label-text">City</p>
          <input
            type="text"
            class="profile-investor__input"
            v-model.trim='newData.city'>
        </label>
        <label class="profile-investor__label">
          <p class="profile-investor__label-text">Street</p>
          <input
            type="text"
            class="profile-investor__input"
            v-model.trim='newData.street'>
        </label>
      </div>
      <div class="profile-investor__row profile-investor__row--wrap">
        <label class="profile-investor__label profile-investor__label--house">
          <p class="profile-investor__label-text">House</p>
          <input
            type="text"
            class="profile-investor__input"
            v-model.trim='newData.house_number'>
        </label>
        <label class="profile-investor__label profile-investor__label--apt">
          <p class="profile-investor__label-text">Apt, Suit, etc</p>
          <input
            type="text"
            class="profile-investor__input"
            v-model.trim='newData.extra_address'>
        </label>
        <label class="profile-investor__label profile-investor__label--postal">
          <p class="profile-investor__label-text">Postal code</p>
          <input
            type="text"
            class="profile-investor__input"
            maxlength="5"
            v-model.trim='newData.zip'>
        </label>
      </div>
      <transition
        name="custom-classes-transition"
        enter-active-class="animated dur03 fadeIn"
        leave-active-class="animated dur03 fadeOut"
        mode="out-in">
      <div class="profile-investor__row
        profile-investor__row--padding-top
        tablet-flex"
        v-if='comparedAddressData'>
        <button-primary
          class='profile-investor__button
            profile-investor__button--margin'
          :class='{"button-loading": loading.address}'
          @click.prevent.native='saveAddress'
          :disabled='!comparedAddressData'
          >Save changes
        </button-primary>
        <button-secondary
          class='profile-investor__button'
          @click.native='cancelAddress'
          >Cancel
        </button-secondary>
      </div>
      </transition>
    </section>
    <section class="profile-investor__section">
      <p class="profile-investor__caption">Password</p>
      <p
        class="profile-investor__text profile-investor__text--margin"
        >Last change: {{ lastChangePassword }}
      </p>
      <button-secondary
        class='profile-investor__button'
        @click.native='changePasswordPopup = true'
        >Change password
      </button-secondary>
    </section>
    <section class="profile-investor__section">
      <button-secondary
        class='profile-investor__button profile-investor__button--delete'
        @click.native='deleteAccount'
        :class='{"button-loading": loading.delete}'
        >Delete account
      </button-secondary>
      <p
        class="profile-investor__text profile-investor__text--delete"
        >If you delete your account, your data will be gone forever.
        If your balance isn't empty, you must send request for a payout.
      </p>
      <button-primary
        class='profile-investor__button
          profile-investor__button--margin
          mobile-flex'
        :class='{"button-loading": loading.all}'
        @click.prevent.native='save'
        :disabled='!comparedData'
        >Save changes
      </button-primary>
      <button-transparent
        class='profile-investor__button
          profile-investor__button--margin
          mobile-flex'
        @click.prevent.native='cancel'
        >Cancel
      </button-transparent>
    </section>
  </main>
  <transition
    name="custom-classes-transition"
    enter-active-class="animated dur03 fadeIn"
    leave-active-class="animated dur03 fadeOut"
    mode="out-in">
  <password-form
    @error='passwordError'
    @success='passwordSuccess'
    @cancel='changePasswordPopup = false'
    v-if='changePasswordPopup'
    key='form'/>
  </transition>
</div>
</template>
<script>
import IconPencil from '@/components/common/icons/IconPencil.vue';
import IconLongArrowLeft from '@/components/common/icons/IconLongArrowLeft.vue';
import ButtonPrimary from '@/components/common/buttons/ButtonPrimary.vue';
import ButtonSecondary from '@/components/common/buttons/ButtonSecondary.vue';
import ButtonTransparent from '@/components/common/buttons/ButtonTransparent.vue';
import SubtleIcon from '@/components/common/buttons/SubtleIcon.vue';
import IconAva from '@/components/common/icons/IconAva.vue';
import Validation from '@/js/validation';
import DropMenuCountry from '@/components/investor/profile/components/DropMenuCountry.vue';
import MessageSuccessAbsolute from '@/components/common/messages/MessageSuccessAbsolute.vue';
import MessageErrorAbsolute from '@/components/common/messages/MessageErrorAbsolute.vue';
import MessageInfoAbsolute from '@/components/common/messages/MessageInfoAbsolute.vue';
import PasswordForm from '@/components/investor/profile/PasswordForm.vue';
import { mapGetters, mapActions, mapState, mapMutations } from 'vuex';
import { setTimeout } from 'timers';

export default {
  name: 'InvestorProfile',
  components: {
    IconPencil,
    SubtleIcon,
    IconAva,
    IconLongArrowLeft,
    DropMenuCountry,
    ButtonPrimary,
    ButtonSecondary,
    ButtonTransparent,
    MessageSuccessAbsolute,
    MessageErrorAbsolute,
    PasswordForm,
    MessageInfoAbsolute,
  },
  data() {
    return {
      newData: {
        name_first: '',
        name_last: '',
        gender: '',
        country: '',
        city: '',
        street: '',
        house_number: '',
        extra_address: '',
        zip: '',
        ava: '',
        id: '',
      },
      errorsText: {
        name: [
          this.$t('auth.errors.name.numbers'),
          this.$t('auth.errors.name.enter'),
        ],
      },
      myErrors: {
        name: '',
      },
      changePasswordPopup: false,
      loading: {
        all: false,
        general: false,
        address: false,
        delete: false,
      },
      textMessage: {
        success: '',
        error: '',
        info: '',
      },
      message: {
        success: false,
        error: false,
        info: false,
      },
    };
  },
  methods: {
    ...mapActions({
      getProfile: 'investorProfile/getProfile',
      updateProfile: 'investorProfile/updateProfile',
      getProfileAsync: 'investorProfile/getProfileAsync',
      deleteProfile: 'investorProfile/deleteProfile',
    }),
    passwordError() {
      this.changePasswordPopup = false;
      this.textMessage.error = 'Your password hasn\'t been changed';
      this.showMessage('error');
    },
    passwordSuccess() {
      this.textMessage.success = 'Your password has been changed';
      this.changePasswordPopup = false;
      this.showMessage('success');
    },
    getImage() {
      this.newData.ava = this.$refs.ava.files[0];
    },
    changePassword() {
      this.changePasswordPopup = true;
    },
    selectCountry(value) {
      this.newData.country = value;
    },
    deleteAccount() {
      this.loading.delete = true;
      this.textMessage.info = 'Your account has been deleted';
      this.deleteProfile()
        .then((resp) => {
          console.log(resp);
          this.loading.delete = false;
          this.showMessage('info');
          setTimeout(() => {
            this.AUTH_LOGOUT()
              .then(() => this.$router.push('/auth/investor'))
          })
        })
        .catch((error) => {
          this.loading.delete = false;
          console.log(error);
        })
    },
    closeDrop() {
      if (this.$refs.dropMenu) {
        this.$refs.dropMenu.close();
      }
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
    sendData(type, formData) {
      this.loading[type] = true;
      this.updateProfile(formData)
        .then((resp) => {
          this.loading[type] = false;
          this.textMessage.success = 'Your changes have been saved';
          this.showMessage('success');
          console.log(resp);
        })
        .catch((error) => {
          this.loading[type] = false;
          console.log(error);
          this.textMessage.error = 'An error occurred while saving';
          this.showMessage('error');
        });
    },
    save() {
      this.sendData('all', this.newData);
    },
    saveGeneral() {
      const formData = {
        name_first: this.newData.name_first,
        name_last: this.newData.name_last,
        gender: this.newData.gender,
      };
      this.sendData('general', formData);
    },
    saveAddress() {
      const formData = {
        country: this.newData.country,
        city: this.newData.city,
        street: this.newData.street,
        house_number: this.newData.house_number,
        extra_address: this.newData.extra_address,
        zip: this.newData.zip,
      };
      this.sendData('address', formData);
    },
    cancel() {
      this.$router.push('/investor');
    },
    cancelGeneral() {
      const formData = ['name_first', 'name_last', 'gender'];
      Object.keys(formData).forEach((key) => {
        this.newData[key] = this.profile[key];
      });
    },
    cancelAddress() {
      this.$refs.dropMenu.forceSelect(this.profile.country);
      const formData = ['country', 'city', 'street', 'house_number', 'extra_address', 'zip'];
      formData.forEach((key) => {
        this.newData[key] = this.profile[key];
      });
    },
    getData() {
      Object.keys(this.newData).forEach((key) => {
        this.newData[key] = this.profile[key];
      });
    },
    nameError() {
      const [error1, error2] = this.errorsText.name;
      const { name_first: name } = this.newData;
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
  },
  computed: {
    ...mapState('investorProfile', [
      'profile',
    ]),
    ...mapGetters('investorProfile', [
      'getProfileToEdit',
      'lastChangePassword',
    ]),
    nameStatus() {
      return Validation.name(this.newData.name_first);
    },
    fullName() {
      return `${this.profile.name_first} ${this.profile.name_last?this.profile.name_last:''}`;
    },
    comparedGeneralData() {
      let flag = false;
      const newData = {
        name_first: this.newData.name_first,
        name_last: this.newData.name_last,
        gender: this.newData.gender,
      };
      const oldData = this.profile;
      Object.entries(newData).forEach((newItem) => {
        Object.entries(oldData).forEach((oldItem) => {
          if (newItem[0] === oldItem[0] && newItem[1] !== oldItem[1]) {
            flag = true;
          }
        });
      });
      return flag && this.nameStatus;
    },
    comparedAddressData() {
      let flag = false;
      const newData = {
        country: this.newData.country,
        city: this.newData.city,
        street: this.newData.street,
        house_number: this.newData.house_number,
        extra_address: this.newData.extra_address,
        zip: this.newData.zip,
      };
      const oldData = this.profile;
      Object.entries(newData).forEach((newItem) => {
        Object.entries(oldData).forEach((oldItem) => {
          if (newItem[0] === oldItem[0] && newItem[1] !== oldItem[1]) {
            flag = true;
          }
        });
      });
      return flag && this.nameStatus;
    },
    comparedData() {
      let flag = false;
      const { newData } = this;
      const oldData = this.profile;
      Object.entries(newData).forEach((newItem) => {
        Object.entries(oldData).forEach((oldItem) => {
          if (newItem[0] === oldItem[0] && newItem[1] !== oldItem[1]) {
            flag = true;
          }
        });
      });
      return flag && this.nameStatus;
    },
  },
  created() {
    this.getProfileAsync()
      .then((resp) => {
        console.log(resp);
        this.getData();
      })
      .catch(error => console.log(error));
  },
  watch: {
    nameStatus(value) {
      if (value) this.myErrors.name = '';
    },
  },
};
</script>
<style lang="scss">
$investor-profile: profile-investor;
.#{$investor-profile} {
  @media screen and (min-width: $screen-tablet) {
    padding: 0 28px;
  }
  @media screen and (min-width: $screen-desktop) {
    padding: 0 16%;
  }
  &__icon-wrapper {
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background-color: $B2;
    transition: background-color ease-in-out 0.2s;
    @include flex-row(center, center);
    svg {
      fill: $B12;
    }
  }
  &__router-link-wrapper {
    @include flex-row(flex-start, center);
    padding: 20px 28px;
    @media screen and (min-width: $screen-tablet) {
      display: inline-block;
      padding: 32px 0 0 0;
    }
  }
  &__router-link {
    @media screen and (min-width: $screen-tablet) {
      &:hover {
        .#{$investor-profile}__icon-wrapper {
          background-color: $B1;
          svg {
            fill: $B12;
          }
        }
      }
    }
    &:active {
      .#{$investor-profile}__icon-wrapper {
        background-color: $B5;
        svg {
          fill: $B12;
        }
      }
    }
    &:focus {
      .#{$investor-profile}__icon-wrapper {
        svg {
          fill: $B12;
        }
      }
    }
  }
  &__row {
    @include flex-row(flex-start, center);
    &--name-margin {
      margin-bottom: 10px;
      @media screen and (min-width: $screen-iphone-plus) {
        margin-bottom: 12px;
      }
    }
    &--wrap {
      flex-wrap: wrap;
      @media screen and (min-width: $screen-iphone-6) {
        flex-wrap: nowrap;
      }
    }
    &--padding-top {
      padding-top: 24px;
    }
  }
  &__form {
    @media screen and (min-width: $screen-tablet) {
      display: flex;
      align-items: flex-end;
      justify-content: space-between;
    }
  }
  &__row-col {
    @media screen and (min-width: $screen-tablet) {
      display: flex;
      justify-content: space-between;
      align-items: flex-end;
      margin-bottom: 18px;
    }
  }
  &__header {
    background-color: $B12;
    @media screen and (min-width: $screen-tablet) {
      background-color: $N13;
    }
  }
  &__main {
    padding: 8px 28px;
    @media screen and (min-width: $screen-tablet) {
      padding: 0 0 40px 0;
    }
  }
  &__section {
    padding: 24px 0;
    border-bottom: 1px solid $N9;
    &:last-of-type {
      border: none;
    }
    @media screen and (min-width: $screen-desktop) {
      background-color: $N12;
      border: 1px solid $N10;
      box-shadow: 0 8px 10px 0 rgba(10,11,12,0.16);
      border-radius: 2px;
      margin-bottom: 20px;
      padding: 32px 28px;
      &:last-of-type {
        background-color: transparent;
        border: none;
        padding: 12px 0;
        display: flex;
        align-items: flex-start;
      }
    }
  }
  &__head {
    @include flex-row(flex-start, center);
    padding: 20px 28px;
    @media screen and (min-width: $screen-tablet) {
      padding: 32px 0;
    }
  }
  &__ava-wrapper {
    position: relative;
    @extend %image-wrapper;
    width: 45px;
    height: 45px;
    margin-right: 12px;
    overflow: visible;
    @media screen and (min-width: $screen-iphone-6) {
      width: 60px;
      height: 60px;
    }
    @media screen and (min-width: $screen-iphone-plus) {
      margin-right: 20px;
    }
    @media screen and (min-width: $screen-tablet) {
      margin-right: 32px;
    }
  }
  &__ava {
    @extend %image;
    display: none;
  }
  &__default-ava {
    width: 100%;
    height: 100%;
    flex-shrink: 0;
    fill: $N0;
  }
  &__change-photo-button {
    display: none;
    @media screen and (min-width: $screen-tablet) {
      position: absolute;
      bottom: 0;
      right: 0;
      width: 20px;
      height: 20px;
      cursor: pointer;
      border: 2px solid $N13;
      @include flex-row(center, center);
      background-color: $B4;
      border-radius: 50%;
    }
  }
  &__change-photo-icon {
    width: 9px;
    height: 9px;
    fill: $N0;
  }
  &__name {
    @include text($H600, 500, $N0);
    margin-right: 16px;
    @media screen and (min-width: $screen-iphone-6) {
      font-size: $H700;
    }
    @media screen and (min-width: $screen-iphone-plus) {
      font-size: $H800;
    }
  }
  &__state {
    @include text($H200, 500, $N6);
    margin-right: 4px;
  }
  &__user-id {
    @include text($H400, 400, $N0);
  }
  &__status {
    text-transform: capitalize;
    background-color: $N9;
    border-radius: 3px;
    padding: 2px 6px 4px;
    @include flex-row(center, center);
    @include text($H100, 400, $N0);
    letter-spacing: 1px;
    @media screen and (min-width: $screen-iphone-plus) {
      font-size: $H200;
    }
  }
  &__caption {
    @include text($H700, 500, $N0);
    margin-bottom: 24px;
    @media screen and (min-width: $screen-tablet) {
      margin-bottom: 16px;
      font-size: $H600;
    }
  }
  &__label {
    display: block;
    margin-bottom: 18px;
    @media screen and (min-width: $screen-tablet) {
      flex: 0 1 33%;
      margin: 0 32px 0 0;
      &:last-child {
        margin: 0;
      }
    }
    &--house {
      flex: 0 0 45%;
      margin-right: 10%;
      @media screen and (min-width: $screen-iphone-6) {
        flex-basis: 80px;
        margin-right: 20px;
      }
      @media screen and (min-width: $screen-tablet) {
        flex-basis: 120px;
        margin-right: 32px;
      }
    }
    &--apt {
      flex: 0 0 45%;
      @media screen and (min-width: $screen-iphone-6) {
        flex-basis: 80px;
        margin-right: 20px;
      }
      @media screen and (min-width: $screen-tablet) {
        flex-basis: 120px;
        margin-right: 32px;
      }
    }
    &--postal {
      flex: 0 0 45%;
      @media screen and (min-width: $screen-iphone-6) {
        flex: 1 1 auto;
      }
      @media screen and (min-width: $screen-tablet) {
        flex: 0 0 90px;
      }
    }
  }
  &__drop-menu {
    background-color: $N12;
    @media screen and (min-width: $screen-tablet) {
      background-color: $N13;
    }
  }
  &__label-text {
    @extend %input-label-text;
    white-space: nowrap;
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
  &__input {
    @extend %input;
    width: 100%;
    background-color: $N13;
    @media screen and (min-width: $screen-tablet) {
      color: $N2;
    }
  }
  &__radio-row {
    @include flex-row(stretch, center);
  }
  &__radio {
    @extend %radio-button-label;
    flex: 0 0 50%;
  }
  &__radio-input {
    @extend %radio-button-input;
    &:checked + .#{$investor-profile}__radio-button {
      @extend %radio-button-checked-default;
    }
  }
  &__radio-button {
    @extend %radio-button-default;
    &--left {
      border-radius: 2px 0 0 2px;
    }
    &--right {
      border-radius: 0 2px 2px 0;
    }
  }
  &__text {
    @include text($H400, 500, $N6);
    line-height: 1.3;
    @media screen and (min-width: $screen-tablet) {
      font-size: $H200;
    }
    &--margin {
      margin-bottom: 24px;
      @media screen and (min-width: $screen-tablet) {
        margin-bottom: 16px;
      }
    }
    &--delete {
      margin-bottom: 24px;
      @media screen and (min-width: $screen-tablet) {
        margin: 0;
        width: 40%;
      }
    }
  }
  &__button {
    width: 100%;
    @media screen and (min-width: $screen-tablet) {
      width: auto;
    }
    &--margin {
      margin-bottom: 24px;
      @media screen and (min-width: $screen-tablet) {
        margin: 0 24px 0 0;
      }
    }
    &--delete {
      margin-bottom: 24px;
      @media screen and (min-width: $screen-tablet) {
        margin: 0 26px 0 0;
      }
    }
  }
}
</style>
