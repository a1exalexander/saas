<template>
<div class="exchanges-remove-popup">
  <div class="exchanges-remove-popup__card">
    <close-button
      class="exchanges-remove-popup__close-button"
      @click.native='cancel'/>
    <div class="exchanges-remove-popup__inner" v-if='api.status'>
      <p class="exchanges-remove-popup__heading"
        >You still have open orders on  {{ api.name }}
      </p>
      <p class="exchanges-remove-popup__text"
        >If you remove access to the exchange {{ api.name }},
        you will lose access to information about your open orders
        and itwould be remove from you analytics
      </p>
    </div>
    <div class="exchanges-remove-popup__inner" v-else>
      <p class="exchanges-remove-popup__heading"
        >Are you sure that you want remove a {{ api.name }} info from Fund's profile?
      </p>
      <p class="exchanges-remove-popup__text"
        >If you remove access to the exchange {{ api.name }},
        you will lose access to information about hold tokens,
        deposits and withdrawals, and trades history on this exchange
      </p>
    </div>
    <div class="exchanges-remove-popup__buttons-wrapper">
      <button-transparent
        class="exchanges-remove-popup__button exchanges-remove-popup__button--cancel-mobile"
        @click.native='cancel'>Cancel
      </button-transparent>
      <subtle
        class="exchanges-remove-popup__button exchanges-remove-popup__button--remove-mobile"
        @click.native='remove'>Remove
      </subtle>
      <button-secondary
        class="exchanges-remove-popup__button exchanges-remove-popup__button--cancel-desktop"
        @click.native='cancel'>Cancel
      </button-secondary>
      <button-primary
        class="exchanges-remove-popup__button exchanges-remove-popup__button--remove-desktop"
        :class='{"button-loading": loading}'
        @click.native.once='remove'>Remove
      </button-primary>
    </div>
  </div>
</div>
</template>
<script>
import ButtonTransparent from '@/components/common/buttons/ButtonTransparent.vue';
import ButtonPrimary from '@/components/common/buttons/ButtonPrimary.vue';
import ButtonSecondary from '@/components/common/buttons/ButtonSecondary.vue';
import CloseButton from '@/components/common/buttons/CloseButton.vue';
import Subtle from '@/components/common/buttons/Subtle.vue';
import { mapActions } from 'vuex';

export default {
  name: 'ExchangesApiRemovePopup',
  props: {
    api: {
      type: Object,
    },
  },
  data() {
    return {
      loading: false,
    };
  },
  components: {
    ButtonTransparent,
    Subtle,
    CloseButton,
    ButtonPrimary,
    ButtonSecondary,
  },
  methods: {
    ...mapActions('exchanges', [
      'deleteExchange',
    ]),
    remove() {
      this.loading = true;
      const data = {
        id: this.api.id,
      };
      this.deleteExchange(data)
        .then((resp) => {
          console.log(resp);
          this.loading = false;
          this.cancel();
        })
        .catch((error) => {
          console.log(error);
          this.loading = false;
          this.cancel();
        })
    },
    cancel() {
      this.$emit('cancel');
    },
  },
};
</script>
<style lang="scss">
.exchanges-remove-popup {
  position: fixed;
  z-index: 11;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  min-height: 100vh;
  background-color: rgba(10,11,12,0.80);
  padding: 100px 28px 0;
  @media screen and (min-width: $screen-tablet) {
    padding: 24px;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
  }
  &__card {
    background-color: $N13;
    border: 1px solid $N11;
    box-shadow: 0 20px 28px 0 rgba(0,0,0,0.32);
    padding: 42px 24px 24px;
    position: relative;
    @media screen and (min-width: $screen-tablet) {
      padding: 24px 40px 32px;
      flex: 0 1 37%;
      min-width: 532px;
    }
  }
  &__close-button {
    position: absolute;
    right: 14px;
    top: 14px;
    svg {
      width: 14px;
      height: 14px;
    }
  }
  &__heading {
    font-size: $H700;
    font-weight: 500;
    margin-bottom: 12px;
    padding-right: 26px;
    @media screen and (min-width: $screen-tablet) {
      padding-right: 44px;
      margin-bottom: 14px;
    }
  }
  &__text {
    font-size: $H500;
    font-weight: 500;
    color: $N6;
  }
  &__inner {
    margin-bottom: 12px;
    @media screen and (min-width: $screen-tablet) {
      margin-bottom: 24px;
    }
  }
  &__buttons-wrapper {
    @include flex-row(flex-end, center);
  }
  &__button {
    &--cancel-mobile {
      margin-right: 32px;
      @media screen and (min-width: $screen-tablet) {
        display: none;
      }
    }
    &--cancel-desktop {
      display: none;
      @media screen and (min-width: $screen-tablet) {
        display: flex;
        margin-right: 24px;
      }
    }
    &--remove-mobile {
      @media screen and (min-width: $screen-tablet) {
        display: none;
      }
    }
    &--remove-desktop {
      display: none;
      @media screen and (min-width: $screen-tablet) {
        display: flex;
      }
    }
  }
}
</style>
