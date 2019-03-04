<template>
  <div class="invite-popup">
    <div class="invite-popup__card">
      <close-button
        class="invite-popup__close-button"
         @click.native='cancel'/>
      <div class="invite-popup__head">
        <p class="invite-popup__title">Invite new investors to the fund</p>
        <div class="invite-popup__nav">
          <a
            href="#"
            @click='changeToEmail'
            class="invite-popup__nav-button invite-popup__nav-button--left"
            :class='{"invite-popup__nav-button--active": toggleType}'>
            <icon-mail class='invite-popup__nav-icon'/>
            <p class="invite-popup__nav-text">Email</p>
          </a>
          <a
            href="#"
            @click='changeToUrl'
            class="invite-popup__nav-button invite-popup__nav-button--right"
            :class='{"invite-popup__nav-button--active": !toggleType}'>
            <icon-link class='invite-popup__nav-icon'/>
            <p class="invite-popup__nav-text">URL</p>
          </a>
        </div>
      </div>
      <transition
        name="custom-classes-transition"
        enter-active-class="animated dur03 fadeIn"
        leave-active-class="animated dur03 fadeOut"
        mode="out-in">
      <div class="invite-popup__main" v-if='toggleType'>
        <div class="invite-popup__label">
          <p class="invite-popup__label-text">Send invitations by e-mail</p>
          <tags-input
            class='invite-popup__input-badges'
            v-model="selectedTags"
            :validate='validateEmail'
            :add-tags-on-comma='true'
            placeholder=''/>
        </div>
        <div class="invite-popup__buttons">
          <button-secondary
            class="invite-popup__button invite-popup__button--secondary"
            @click.native='cancel'>Cancel
          </button-secondary>
          <button-primary
            class="invite-popup__button invite-popup__button--primary"
            :disabled='disabledSend'>Send
          </button-primary>
          <button-transparent
            class="invite-popup__button invite-popup__button--transparent">Cancel
          </button-transparent>
        </div>
      </div>
      <div class="invite-popup__main" v-else>
        <div class="invite-popup__label">
          <p class="invite-popup__label-text">Copy this URL to invite</p>
          <input
            :value='url'
            class='invite-popup__input'
            :class='{"invite-popup__input--success": successCopy,
                    "invite-popup__input--error": errorCopy}'
            type="text"
            disabled>
        </div>
        <div class="invite-popup__buttons">
          <button-secondary
            class="invite-popup__button invite-popup__button--secondary"
            @click.native='cancel'>Cancel
          </button-secondary>
          <button-primary
            class="invite-popup__button invite-popup__button--primary"
            v-clipboard:copy="url"
            v-clipboard:success="onCopy"
            v-clipboard:error="onError">Copy
          </button-primary>
          <button-transparent
            class="invite-popup__button invite-popup__button--transparent"
            @click.native='cancel'>Cancel
          </button-transparent>
        </div>
      </div>
      </transition>
    </div>
  </div>
</template>
<script>
import VoerroTagsInput from '@voerro/vue-tagsinput';
import Validation from '@/js/validation';
import ButtonPrimary from '@/components/common/buttons/ButtonPrimary.vue';
import ButtonSecondary from '@/components/common/buttons/ButtonSecondary.vue';
import ButtonTransparent from '@/components/common/buttons/ButtonTransparent.vue';
import CloseButton from '@/components/common/buttons/CloseButton.vue';
import IconMail from '@/components/common/icons/IconMail.vue';
import IconLink from '@/components/common/icons/IconLink.vue';

export default {
  name: 'InvitePopup',
  components: {
    ButtonPrimary,
    ButtonSecondary,
    ButtonTransparent,
    'tags-input': VoerroTagsInput,
    CloseButton,
    IconMail,
    IconLink,
  },
  data() {
    return {
      selectedTags: [],
      toggleType: true,
      possible: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789',
      url: '',
      successCopy: false,
      errorCopy: false,
    };
  },
  methods: {
    cancel() {
      this.$emit('cancel');
    },
    onCopy() {
      this.successCopy = true;
      setTimeout(() => {
        this.successCopy = false;
      }, 3000);
    },
    onError() {
      this.errorCopy = true;
      setTimeout(() => {
        this.errorCopy = false;
      }, 3000);
    },
    validateEmail(text) {
      return Validation.email(text);
    },
    changeToUrl() {
      this.toggleType = false;
    },
    changeToEmail() {
      this.toggleType = true;
    },
    generateUrl() {
      const root = 'https://fund.com/';
      const sum = this.possible.length;
      const chars = this.possible.split('');
      let newUrl = '';
      let num = 0;
      while (num < 11) {
        const i = Math.floor(Math.random() * sum);
        newUrl += chars[i];
        num += 1;
      }
      this.url = `${root + newUrl}`;
    },
  },
  computed: {
    disabledSend() {
      return !this.selectedTags.length;
    },
  },
  beforeMount() {
    this.generateUrl();
  },
};
</script>
<style lang="scss">
.invite-popup {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  overflow-y: auto;
  z-index: 12;
  @include flex-row(stretch, stretch);
  @media screen and (min-width: $screen-tablet) {
    justify-content: center;
    align-items: center;
    background: rgba(10,11,12,0.80);
  }
  &__card {
    background-color: $N13;
    padding: 56px 28px 28px;
    flex: 1 1;
    position: relative;
    @include flex-col(stretch, stretch);
    @media screen and (min-width: $screen-tablet) {
      flex: 0 1 25%;
      min-width: 360px;
      padding: 0;
      border: 1px solid $N11;
      box-shadow: 0 20px 28px 0 rgba(0,0,0,0.32);
    }
  }
  &__head {
    margin-bottom: 32px;
    @media screen and (min-width: $screen-tablet) {
      padding: 32px 40px 0;
      border-bottom: 1px solid $N11;
      margin: 0;
    }
  }
  &__title {
    font-size: $H600;
    font-weight: 500;
    margin-bottom: 32px;
    @media screen and (min-width: $screen-tablet) {
      margin-bottom: 24px;
    }
  }
  &__close-button {
    position: absolute;
    top: 14px;
    right: 24px;
    @media screen and (min-width: $screen-tablet) {
      top: 12px;
      right: 16px;
      svg {
        width: 14px;
        height: 14px;
      }
    }
  }
  &__label {
    margin-bottom: 32px;
  }
  &__input {
    width: 100%;
    @extend %input;
    &:disabled {
      background-color: transparent;
    }
    &--error {
      border-color: $R1 !important;
    }
    &--success {
      border-color: $G2 !important;
    }
  }
  &__nav {
    @include flex-row(center, center);
  }
  &__main {
    @include flex-col(space-between, stretch);
    flex: 1 1;
    @media screen and (min-width: $screen-tablet) {
      background-color: $N15;
      padding: 24px 40px 32px;
      min-height: 190px;
    }
  }
  &__nav-button {
    flex: 0 0 50%;
    background-color: $N10;
    @include flex-row(center, center);
    padding: 10px 20px;
    min-height: 44px;
    cursor: pointer;
    transition: background-color ease-in-out 0.2s;
    &--left {
      border-radius: 2px 0px 0px 2px;
    }
    &--right {
      border-radius: 0 2px 2px 0;
    }
    &--active {
      background-color: $B4;
      .invite-popup {
        &__nav-text {
          color: $N0;
        }
      }
    }
    @media screen and (min-width: $screen-tablet) {
      flex: 0 1 auto;
      padding: 4px 0 10px;
      margin-right: 16px;
      border-bottom: 1px solid transparent;
      position: relative;
      bottom: -1px;
      background-color: transparent;
      min-height: auto;
      &--active {
        background-color: transparent;
        border-color: $N1;
        .invite-popup {
          &__nav-icon {
            fill: $B4;
          }
        }
      }
      &:last-child {
        margin: 0;
      }
    }
  }
   &__nav-icon {
    display: none;
    @media screen and (min-width: $screen-tablet) {
      display: block;
      fill: $B8;
      width: 14px;
      height: 14px;
      transition: fill ease-in-out 0.2s;
      margin-right: 8px;
    }
  }
  &__nav-text {
    font-size: $H500;
    color: $N8;
    transition: color ease-in-out 0.2s;
    @media screen and (min-width: $screen-tablet) {
      font-size: $H200;
      color: $N8;
    }
  }
  &__label-text {
    @extend %input-label-text;
  }
  &__buttons {
    @media screen and (min-width: $screen-tablet) {
      @include flex-row(flex-end, center);
    }
  }
  &__button {
    width: 100%;
    @media screen and (min-width: $screen-tablet) {
      width: auto;
    }
    &--primary {
      margin-bottom: 20px;
      @media screen and (min-width: $screen-tablet) {
        margin: 0;
      }
    }
    &--transparent {
      margin-bottom: 20px;
      @media screen and (min-width: $screen-tablet) {
        display: none;
      }
    }
    &--secondary {
      display: none;
      @media screen and (min-width: $screen-tablet) {
        display: flex;
        margin-right: 16px;
      }
    }
  }
}
</style>
