<template>
<div class="profile-investor">
  <header class="profile-investor__header">
    <subtle-icon class="profile-investor__router-link"></subtle-icon>
    <div class="profile-investor__row">
      <div class="profile-investor__ava-wrapper">
        <img src="" alt="" class="profile-investor__image">
      </div>
      <div class="profile-investor__col">
        <div class="profile-investor__row">
          <p class="profile-investor__name"></p>
          <span class="profile-investor__status"></span>
        </div>
        <div class="profile-investor__row">
          <p class="profile-investor__state"></p>
          <p class="profile-investor__user-id"></p>
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
            <icon-pencil class='icon-button-right'/>
          </subtle-icon>
          <input
            type="file"
            ref='image'
            name="image"
            class='profile-investor__button-photo-input'
            id="change-image"
            accept="image/*"
            @change='getImage'>
        </label>
        <label class="profile-investor__label">
          <p class="profile-investor__label-text">First Name</p>
          <input type="text" class="profile-investor__input">
        </label>
        <label class="profile-investor__label">
          <p class="profile-investor__label-text">Last Name</p>
          <input type="text" class="profile-investor__input">
        </label>
        <div class="profile-investor__label">
          <p class="profile-investor__label-text"></p>
          <div class="profile-investor__radio-row">
            <label class="profile-investor__radio">
              <input
                type="radio"
                name='methods'
                class="profile-investor__radio-input"
                value='Bitcoin'
                v-model='newData.gender'>
              <div class="profile-investor__radio-button profile-investor__radio-button--left">Bitcoin</div>
            </label>
            <label class="profile-investor__radio">
              <input
                type="radio"
                name='methods'
                class="profile-investor__radio-input"
                value='Ethereum'
                v-model='newData.gender'>
              <div
                class="profile-investor__radio-button profile-investor__radio-button--right"
                >Ethereum
              </div>
            </label>
          </div>
        </div>
      </div>
      <div class="profile-investor__row tablet-flex ">
        <button></button><button></button>
      </div>
    </section>
    <section class="profile-investor__section"></section>
    <section class="profile-investor__section"></section>
  </main>
</div>
</template>
<script>
import IconPencil from '@/components/common/icons/IconPencil.vue';
import SubtleIcon from '@/components/common/buttons/SubtleIcon.vue';

export default {
  name: 'InvestorProfile',
  components: {
    IconPencil,
    SubtleIcon
  },
  data() {
    return {
      newData: {
        image: '',
        gender: '',
      },
    };
  },
  methods: {
    getImage() {
      this.newData.image = document.$refs.image.files[0];
    },
  },
};
</script>
<style lang="scss">
.investor-profile {
  &__caption {
    @include text($H700, 500, $N0);
    margin-bottom: 20px;
  }
  &__row {
    @include flex-row(flex-start, center);
  }
  &__label {
    display: block;
  }
  &__label-text {
    @extend %input-label-text;
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
  }
  &__radio {
    @extend %radio-button-label;
    flex: 0 0 45%;
    @media screen and (min-width:$screen-tablet) {
      flex: 0 1 auto;
      min-width: 94px;
    }
    &:first-child {
      @media screen and (min-width:$screen-tablet) {
        border-right: 1px solid $N8;
        margin-right: 0;
      }
    }
  }
  &__radio-input {
    @extend %radio-button-input;
    &:checked + .method-popup__radio-button {
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
</style>
