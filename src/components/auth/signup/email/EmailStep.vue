<template>
<section class="email-step">
  <message-success-absolute
    v-if='resendMessageStatus'
    @close='closeResendMessage'
    >{{ $t('auth.messages.email resend') }}
  </message-success-absolute>
  <retype-email
    v-if='retypeEmail'
    @cancel='retypeEmail = false'
    @save='saveEmail'
    class='animated dur02 fadeIn'/>
  <p class="email-step__title">{{ $t('auth.titles.confirm') }}</p>
  <p class="email-step__text email-step__text--margin"
    >{{ $t('auth.messages.email send') }}
    <span
      class="email-step__text email-step__text--email"
      >{{ email }}
    </span>
  </p>
  <button-primary-icon
    class='email-step__button animated dur05 fadeIn'
    :class='{"button-loading": loading.next}'
    @click.native='start'>{{ $t('auth.buttons.start') }}
    <icon-long-arrow-right class='icon-button-right'/>
  </button-primary-icon>
  <p class="email-step__question">{{ $t('auth.text.not email') }}</p>
  <div class="email-step__inner-row">
    <div
      class="email-step__tooltip-wrapper"
      :class='{"email-step__tooltip-wrapper--show": tooltip}'>
      <subtle
        class="email-step__link email-step__link--resend"
        :class='{"button-loading-subtle": loading.resend}'
        :disabled='disabledResend'
        @click.native='resendEmail'>{{ $t('auth.buttons.resend') }}
      </subtle>
      <div class="email-step__tooltip">
        <p class="email-step__tooltip-text"
          >{{ $t('auth.messages.many emails') }}
          <a
            href='#'
            class="email-step__tooltip-text email-step__tooltip-text--link"
            @click='retypeEmail = true'>{{ $t('auth.links.try email') }}
          </a>
        </p>
      </div>
    </div>
    <span class="email-step__text email-step__text--center">{{ $t('auth.text.or') }}</span>
    <subtle
      @click.prevent.native='retypeEmail = true'
      class="email-step__link email-step__link--retype">{{ $t('auth.buttons.retype') }}
    </subtle>
  </div>
  <div class="email-step__inner-row email-step__inner-row--mobile">
    <button-secondary
      class='email-step__button-resend'
      :disabled='disabledResend'
      @click.native='resendEmail'>{{ $t('auth.buttons.resend') }}
    </button-secondary>
    <button-secondary
      @click.native='retypeEmail = !retypeEmail'>{{ $t('auth.buttons.retype') }}
    </button-secondary>
  </div>
</section>
</template>
<script>
import ButtonPrimaryIcon from '@/components/common/buttons/ButtonPrimaryIcon.vue';
import ButtonSecondary from '@/components/common/buttons/ButtonSecondary.vue';
import Subtle from '@/components/common/buttons/Subtle.vue';
import IconLongArrowRight from '@/components/common/icons/IconLongArrowRight.vue';
import RetypeEmail from '@/components/auth/signup/email/RetypeEmail.vue';
import MessageSuccessAbsolute from '@/components/common/messages/MessageSuccessAbsolute.vue';
import { mapState, mapMutations, mapActions } from 'vuex';

export default {
  name: 'EmailStep',
  components: {
    ButtonPrimaryIcon,
    IconLongArrowRight,
    Subtle,
    RetypeEmail,
    ButtonSecondary,
    MessageSuccessAbsolute,
  },
  data() {
    return {
      retypeEmail: false,
      resendMessageStatus: false,
      count: 0,
      tooltip: false,
      disabledResend: false,
      loading: {
        resend: false,
        next: false,
      },
    };
  },
  computed: {
    ...mapState('signup', {
      email: state => state.personalInfo.email,
      alias: state => state.password.fund_alias,
      password: state => state.password.value,
    }),
  },
  methods: {
    ...mapMutations('signup', [
      'toggleEmailConfirmedMessage',
      'cleanData',
    ]),
    ...mapActions({
      resendMyEmail: 'signup/resendEmail',
      AUTH_REQUEST: 'login/AUTH_REQUEST',
      getFundAsync: 'profile/getFundAsync',
    }),
    start() {
      this.$router.push('/director');
    },
    saveEmail() {
      this.retypeEmail = false;
      this.resendMessage();
    },
    resendEmail() {
      if (this.count < 3) {
        this.loading.resend = true;
        this.resendMessageStatus = false;
        this.resendMyEmail()
          .then((resp) => {
            this.resendMessageStatus = true;
            setTimeout(() => {
              this.resendMessageStatus = false;
            }, 3000);
            this.count += 1;
            this.loading.resend = false;
            console.log(resp);
          })
          .catch((error) => {
            this.loading.resend = false;
            console.log(error);
          });
      } else {
        this.disabledResend = true;
        this.tooltip = true;
      }
    },
    closeResendMessage() {
      this.resendMessageStatus = false;
    },
  },
  beforeDestroy() {
    this.cleanData();
  },
};
</script>
<style lang="scss">
.email-step {
  &__message {
    position: absolute;
    z-index: 10;
    top: 36px;
  }
  &__title {
    font-weight: 500;
    font-size: $H800;
    margin-bottom: 24px;
    @media screen and (min-width: $screen-tablet) {
      font-size: $H600;
    }
  }
  &__text {
    font-size: $H500;
    color: $N6;
    line-height: 1.5;
    @media screen and (min-width: $screen-tablet) {
      font-size: $H200;
      line-height: 1;
    }
    &--email {
      color: $N4;
    }
    &--margin {
      margin-bottom: 32px;
      @media screen and (min-width: $screen-tablet) {
        margin-bottom: 26px;
      }
    }
    &--center {
      margin: 0 8px;
    }
  }
  &__question {
    color: $N0;
    font-size: $H600;
    margin-bottom: 24px;
    @media screen and (min-width: $screen-tablet) {
      font-size: $H300;
      margin-bottom: 15px;
    }
  }
  &__button {
    margin-bottom: 90px;
    @media screen and (min-width: $screen-tablet) {
      margin-bottom: 40px;
    }
  }
  &__tooltip-wrapper {
    @media screen and (min-width: $screen-desktop) {
      padding-bottom: 18px;
    }
    &--show {
      @media screen and (min-width: $screen-desktop) {
        &:hover .email-step__tooltip {
          display: block;
        }
      }
    }
  }
  &__tooltip {
    @extend %tooltip;
    width: 230px;
    position: absolute;
    z-index: 2;
    top: 20px;
    left: 40px;
    display: none;
    &:hover {
      display: block;
    }
  }
  &__tooltip-text {
    @extend %tooltip-text;
    &--link {
      @extend %link;
      color: $B2;
      font-size: $H100;
    }
  }
  &__inner-row {
    display: none;
     &--mobile {
      display: flex;
    }
    @media screen and (min-width: $screen-tablet) {
      display: flex;
      align-items: flex-start;
      position: relative;
      &--mobile {
        display: none;
      }
    }
  }
  &__button-resend {
    margin-right: 16px;
  }
}
</style>
