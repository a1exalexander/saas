<template>
<div class="fund-step" @click.self='closeDropMenus'>
  <message-error-absolute
    v-if='message.error'
    @close='message.error = false'
    >{{ messageText }}
  </message-error-absolute>
  <div
    class="fund-step__image-wrapper
              fund-step__image-wrapper--name
              fund-step__image-wrapper--active
              is-flex"
    @click='closeDropMenus'>
    <span class="fund-step__step-number" v-if='!nameStatus'>1</span>
    <icon-check class="fund-step__image" v-else/>
  </div>
  <label
    for="fund-step-name"
    class="fund-step__label is-block fund-step__label--name"
    @click='closeDropMenus'>{{ $t('auth.labels.fund') }}
  </label>
  <div
    class="fund-step__line fund-step__line--name animated dur05 fadeIn"
    :class='{"fund-step__line--checked": nameStatus}'
    @click='closeDropMenus'></div>
  <div
    class="fund-step__input-wrapper only-mobile-block"
    @click='closeDropMenus'>
    <input
      type="text"
      id='fund-step-name'
      @blur='nameError'
      v-model.trim='name'
      class="fund-step__input fund-step__input--name"
      :class='{"input-error": myErrors.name}'>
    <p
      class="input-text-error animated dur04 bounceIn"
      v-show='myErrors.name'>{{ myErrors.name }}
    </p>
  </div>
  <div
    class="fund-step__image-wrapper
          fund-step__image-wrapper--country
          animated dur05 fadeIn
          is-flex"
    :class='{"fund-step__image-wrapper--active": nameStatus}'
    @click='closeDropMenus'>
    <span class="fund-step__step-number" v-if='!countryStatus'>2</span>
    <icon-check class="fund-step__image" v-else/>
  </div>
  <label
    for="fund-step-country"
    class="fund-step__label fund-step__label--country animated dur05 fadeIn"
    :class='{"is-block": nameStatus}'
    @click='closeDropMenus'>{{ $t('auth.labels.country') }}
  </label>
  <drop-menu-country
    class='fund-step__drop-menu fund-step__drop-menu--country animated dur05 fadeIn'
    v-if='nameStatus'/>
  <button-primary-icon
    class='fund-step__button animated dur05 fadeIn'
    :class='{"button-loading": loading}'
    v-if='countryStatus'
    :disabled='!countryStatus'
    @click.stop.prevent.native='nextStep'>{{ $t('auth.buttons.continue') }}
    <icon-long-arrow-right class='icon-button-right icon-small'/>
  </button-primary-icon>
</div>
</template>
<script>
import ButtonPrimaryIcon from '@/components/common/buttons/ButtonPrimaryIcon.vue';
import IconCheck from '@/components/common/icons/IconCheck.vue';
import IconLongArrowRight from '@/components/common/icons/IconLongArrowRight.vue';
import DropMenuCountry from '@/components/auth/signup/fund/DropMenuCountry.vue';
import MessageErrorAbsolute from '@/components/common/messages/MessageErrorAbsolute.vue';
import { mapState, mapMutations, mapActions } from 'vuex';

export default {
  name: 'FundStep',
  components: {
    ButtonPrimaryIcon,
    IconCheck,
    DropMenuCountry,
    IconLongArrowRight,
    MessageErrorAbsolute,
  },
  data() {
    return {
      myErrors: {
        name: '',
      },
      loading: false,
      message: {
        error: false,
      },
      messageText: '',
    };
  },
  computed: {
    ...mapState('signup', {
      getName: state => state.fund.business_name,
      getCountry: state => state.fund.country,
      token: state => state.token,
    }),
    name: {
      get() {
        return this.getName;
      },
      set(value) {
        this.setFund(['business_name', value]);
        this.setPassword(['fund_name', value]);
      },
    },
    country: {
      get() {
        return this.getCountry;
      },
      set(value) {
        this.setFund(['country', value]);
      },
    },
    nameStatus() {
      return !!this.getName;
    },
    countryStatus() {
      return !!this.getName && !!this.getCountry;
    },
  },
  methods: {
    ...mapMutations('signup', [
      'setFund',
      'setPassword',
      'setStepStatus',
      'closeDropMenus',
      'closeDropMenu',
      'setRouterStatus',
    ]),
    ...mapActions('signup', [
      'stepTwo',
    ]),
    nextStep() {
      this.loading = true;
      this.closeDropMenus();
      this.stepTwo()
        .then((resp) => {
          this.setRouterStatus('password');
          this.setStepStatus('fund');
          this.loading = false;
          console.log(resp);
        })
        .catch((error) => {
          this.loading = false;
          let message = 'Try Again Later. Something happened.';
          if (error.data && error.data.msg) {
            message = error.data.msg;
          } else if (error.msg) {
            message = error.msg;
          }
          this.$store.dispatch('messages/showErrorMessage', message);
        });
    },
    showMessage(type) {
      if (this.message[type]) {
        this.message[type] = false;
        setTimeout(() => {
          this.message[type] = true;
          setTimeout(() => {
            this.message[type] = false;
          }, 4000);
        }, 15);
      } else {
        this.message[type] = true;
        setTimeout(() => {
          this.message[type] = false;
        }, 4000);
      }
    },
    nameError() {
      this.myErrors.name = '';
      setTimeout(() => {
        if (!this.getName) {
          this.myErrors.name = 'Please enter a Fund\'s name';
        } else {
          this.myErrors.name = '';
        }
      }, 15);
    },
    selectCountry(item) {
      this.setFund(['country', item]);
    },
    toggleCountryDrop() {
      this.showCountryDrop = !this.showCountryDrop;
    },
    closeAll() {
      this.showCountryDrop = false;
    },
  },
  watch: {
    nameStatus(value) {
      if (value) this.myErrors.name = '';
    },
  },
};
</script>
<style lang="scss">
.fund-step {
  width: 100%;
  display: grid;
  grid-template-columns: 24px auto;
  grid-template-rows: repeat(5, auto);
  grid-gap: 16px;
  justify-content: stretch;
  justify-items: start;
  align-items: center;
  grid-template-areas:
    'image-name label-name'
    'line-name input-name'
    'image-country label-country'
    'line-country input-country'
    '. button';
  @media screen and (min-width: $screen-tablet) {
    width: 300px;
  }
  &__image-wrapper {
    @extend %status-bar-image-wrapper;
    @media screen and (min-width: $screen-tablet) {
      display: none;
    }
    &--active {
      background-color: $B4;
    }
    &--name {
      grid-area: image-name;
    }
    &--country {
      grid-area: image-country;
    }
  }
  &__image {
    @extend %status-bar-image;
  }
  &__step-number {
    @extend %status-bar-number;
  }
  &__line {
    @extend %status-bar-line;
    justify-self: center;
    align-self: start;
    &--checked {
      background-color: $B4;
    }
    &--name {
      grid-area: line-name;
    }
    &--country {
      grid-area: line-country;
    }
  }
  &__label {
    font-size: $H500;
    font-weight: 500;
    @media screen and (min-width: $screen-tablet) {
      display: none;
    }
    &--name {
      grid-area: label-name;
    }
    &--country {
      grid-area: label-country;
    }
  }
  &__input {
    @extend %input;
    width: 100%;
  }
  &__input-wrapper {
    width: 100%;
    grid-area: input-name;
    display: none;
    @media screen and (min-width: $screen-tablet) {
      display: block;
      width: 100%;
    }
  }
  &__button {
    margin-top: 16px;
    grid-area: button;
  }
  &__drop-menu {
    @extend %drop-menu;
    width: 100%;
    &--country {
      grid-area: input-country;
      z-index: 2;
    }
  }
}
</style>
