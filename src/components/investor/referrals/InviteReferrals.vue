<template>
  <div class="invite-popup" @click.self='cancel'>
    <message-success-absolute
      class='invite-popup__message'
      v-if='message'
      @click.native='message = false'>
      <p
        v-for='(item, index) in mySuccess'
        :key='index'
        >{{ item }} Email has been sent!</p>
    </message-success-absolute>
    <message-error-absolute
      class='invite-popup__message'
      v-if='messageError'
      @click.native='messageError = false'>
      <p v-for='(item, index) in myErrors' :key='index'>{{ item }}</p>
    </message-error-absolute>
    <div class="invite-popup__card">
      <close-button
        class="invite-popup__close-button"
         @click.native='cancel'/>
      <div class="invite-popup__head">
        <p class="invite-popup__title">Invite referrals to the fund</p>
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
            v-model="emails"
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
            :disabled='disabledSend'
            :class='{"button-loading": loading}'
            @click.native='send'>Send
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
            v-clipboard:copy="url"
            v-clipboard:success="onCopy"
            v-clipboard:error="onError"
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
import MessageErrorAbsolute from '@/components/common/messages/MessageErrorAbsolute.vue';
import MessageSuccessAbsolute from '@/components/common/messages/MessageSuccessAbsolute.vue';
import { mapGetters, mapActions } from 'vuex';
import { setTimeout } from 'timers';
import '@/scss/components/invite-popup.scss';

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
    MessageSuccessAbsolute,
    MessageErrorAbsolute,
  },
  data() {
    return {
      emails: [],
      toggleType: true,
      successCopy: false,
      errorCopy: false,
      loading: false,
      message: false,
      messageError: false,
      myErrors: [],
      mySuccess: [],
    };
  },
  methods: {
    ...mapActions('profile', [
      'getFundSync',
    ]),
    sendData(data) {
      this.loading = true;
      setTimeout(() => {
        this.loading = false;
        this.$store.dispatch('messages/showSuccessMessage');
      }, 1500)
    },
    generateError(email, error) {
      const text = `${email}: ${error}`;
      this.myErrors.push(text);
    },
    generateSuccess(email) {
      this.mySuccess.push(email);
    },
    send() {
      this.myErrors = [];
      this.mySuccess = [];
      this.emails.forEach((item, index) => {
        const data = Object.assign({}, this.token, { email: item });
        this.sendData(data);
      });
    },
    showMessageError() {
      if (this.messageError) {
        this.messageError = false;
        setTimeout(() => {
          this.messageError = true;
          setTimeout(() => {
            this.messageError = false;
          }, 6000);
        }, 15);
      } else {
        this.messageError = true;
        setTimeout(() => {
          this.messageError = false;
        }, 6000);
      }
    },
    showMessageSuccess() {
      if (this.message) {
        this.message = false;
        setTimeout(() => {
          this.message = true;
          setTimeout(() => {
            this.message = false;
          }, 6000);
        }, 15);
      } else {
        this.message = true;
        setTimeout(() => {
          this.message = false;
        }, 6000);
      }
    },
    cancel() {
      this.$emit('close');
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
  },
  computed: {
    ...mapGetters({
      token: 'token',
      url: 'profile/getUrl',
    }),
    disabledSend() {
      return !this.emails.length;
    },
  },
};
</script>
<style lang="scss">
.invite-popup {
  &__title {
    text-align: center;
  }
}
</style>
