<template>
<form class="fund-step" @click.self='closeDropMenus'>
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
  <div
    class="fund-step__line fund-step__line--country animated dur05 fadeIn"
    :class='{"fund-step__line--checked": countryStatus}'
    v-if='nameStatus'
    @click='closeDropMenus'></div>
  <drop-menu-country
    class='fund-step__drop-menu fund-step__drop-menu--country animated dur05 fadeIn'
    v-if='nameStatus'/>
  <div
    class="fund-step__image-wrapper
          fund-step__image-wrapper--operation
          animated dur05 fadeIn"
    :class='{"fund-step__image-wrapper--active": countryStatus, "is-flex": nameStatus}'
    @click='closeDropMenus'>
    <span class="fund-step__step-number" v-if='!operationStatus'>3</span>
    <icon-check class="fund-step__image" v-else/>
  </div>
  <label
    for="fund-step-operation"
    class="fund-step__label fund-step__label--operation animated dur05 fadeIn"
    :class='{"is-block": countryStatus}'
    @click='closeDropMenus'>{{ $t('auth.labels.operations') }}
  </label>
  <drop-menu-operations
    class='fund-step__drop-menu fund-step__drop-menu--operation animated dur05 fadeIn'
    v-if='countryStatus'/>
  <button-primary-icon
    class='fund-step__button animated dur05 fadeIn'
    :class='{"button-loading": loading}'
    v-if='countryStatus'
    :disabled='!operationStatus'
    @click.stop.prevent.native='nextStep'>{{ $t('auth.buttons.continue') }}
    <icon-long-arrow-right class='icon-button-right'/>
  </button-primary-icon>
</form>
</template>
<script>
import ButtonPrimaryIcon from '@/components/common/buttons/ButtonPrimaryIcon.vue';
import IconCheck from '@/components/common/icons/IconCheck.vue';
import IconLongArrowRight from '@/components/common/icons/IconLongArrowRight.vue';
import DropMenuCountry from '@/components/auth/signup/fund/DropMenuCountry.vue';
import DropMenuOperations from '@/components/auth/signup/fund/DropMenuOperations.vue';
import { mapState, mapMutations, mapActions } from 'vuex';

export default {
  name: 'FundStep',
  components: {
    ButtonPrimaryIcon,
    IconCheck,
    DropMenuCountry,
    DropMenuOperations,
    IconLongArrowRight,
  },
  data() {
    return {
      myErrors: {
        name: '',
      },
      loading: false,
    };
  },
  computed: {
    ...mapState('signup', {
      getName: state => state.fund.business_name,
      getCountry: state => state.fund.country,
      getOperation: state => state.fund.business_type,
      token: state => state.token,
    }),
    name: {
      get() {
        return this.getName;
      },
      set(value) {
        this.setFund(['business_name', value]);
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
    operation: {
      get() {
        return this.getOperation;
      },
      set(value) {
        this.setFund(['business_type', value]);
      },
    },
    nameStatus() {
      return !!this.getName;
    },
    countryStatus() {
      return !!this.getName && !!this.getCountry;
    },
    operationStatus() {
      return !!this.getName && !!this.getCountry && !!this.getOperation;
    },
  },
  methods: {
    ...mapMutations('signup', [
      'setFund',
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
          console.log(error);
        });
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
      this.showOperationsDrop = false;
      this.showCountryDrop = !this.showCountryDrop;
    },
    toggleOperationsDrop() {
      this.showCountryDrop = false;
      this.showOperationsDrop = !this.showOperationsDrop;
    },
    closeAll() {
      this.showCountryDrop = false;
      this.showOperationsDrop = false;
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
  grid-template-rows: repeat(7, auto);
  grid-gap: 16px;
  justify-content: stretch;
  justify-items: start;
  align-items: center;
  grid-template-areas:
    'image-name label-name'
    'line-name input-name'
    'image-country label-country'
    'line-country input-country'
    'image-operation label-operation'
    'line-operation input-operation'
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
    &--operation {
      grid-area: image-operation;
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
    &--operation {
      grid-area: label-operation;
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
    &--operation {
      grid-area: input-operation;
      z-index: 1;
    }
  }
  &__drop-arrow {
    @extend %drop-menu-arrow;
  }
  &__drop-list {
    @extend %drop-menu-list;
    height: 200px;
  }
  &__drop-item {
    @extend %drop-menu-item;
  }
}
</style>
