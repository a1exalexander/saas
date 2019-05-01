<template>
  <div class="add-alert-popup" @click.self='close'>
    <div class="add-alert-popup__card" @click='drop = null'>
      <close-button
        class="add-alert-popup__close"
        @click.native='close'/>
      <header class="add-alert-popup__header">
        <h2 class="add-alert-popup__title">Add alert</h2>
      </header>
      <div class="add-alert-popup__body">

        <div class="add-alert-popup__item">
          <label class="add-alert-popup__label">Exchange</label>
          <input readonly="" type="text" class="add-alert-popup__input" :value="currentExchange"/>
        </div>

        <div class="add-alert-popup__item">
          <label class="add-alert-popup__label">Pair</label>
          <input readonly="" type="text" class="add-alert-popup__input" :value="currentPair"/>
        </div>

        <div class="add-alert-popup__item">
          <label class="add-alert-popup__label">Price</label>
          <input type="text" class="add-alert-popup__input" value="" :placeholder="( +((bestBuyPrice + bestBuyPrice)/2).toFixed(8) )" 
            v-on:input="newAlert.price = $event.target.value"/>
        </div>

      </div>
      <div class="buttons-wrapper">
        <button-secondary
          class="buttons-wrapper__button buttons-wrapper__button--cancel-desktop"
          @click.native='close'
          >Cancel
        </button-secondary>
        <button-primary
          class="buttons-wrapper__button buttons-wrapper__button--save"
          :class='{"button-loading": loading}'
          @click.native='add'
          >Add Asset
        </button-primary>
        <button-transparent
          class="buttons-wrapper__button buttons-wrapper__button--cancel"
          @click.native='close'
          >Cancel
        </button-transparent>
      </div>
    </div>
  </div>
</template>
<script>
import ButtonPrimary from '@/components/common/buttons/ButtonPrimary.vue';
import ButtonSecondary from '@/components/common/buttons/ButtonSecondary.vue';
import ButtonTransparent from '@/components/common/buttons/ButtonTransparent.vue';
import CloseButton from '@/components/common/buttons/CloseButton.vue';
import { mapState, mapActions, mapGetters } from 'vuex';
import 'velocity-animate';

export default {
  name: 'AssetsPopup',
  components: {
    CloseButton,
    ButtonPrimary,
    ButtonSecondary,
    ButtonTransparent,
  },
  data() {
    return {
      drop: null,
      loading: false,
      newAlert: {
        price: 0,
      }
    };
  },

  computed: {
    ...mapState('trading', [
      'currentExchange',
      'currentPair',
      'bestBuyPrice',
      'bestSellPrice',
    ]),

  },
  methods: {
    ...mapActions({
      showSuccess: 'messages/showSuccessMessage',
      showError: 'messages/showErrorMessage',
      showInfo: 'messages/showInfoMessage',
    }),

    ...mapActions('trading', [
      'priceAlertsAdd',
    ]),

    add() {

      this.priceAlertsAdd({
        price: this.newAlert.price,
        pair: this.currentPair,
      });

      // this.showSuccess();
    },
    cancel() {
      this.drop = null;
    },
    close() {
      this.$emit('close');
    },
  },
}
</script>
<style lang="scss">
@import '~@/scss/components/popup';
@import '~@/scss/components/buttons-response';
.add-alert-popup {
  @extend %popup;
  &__card {
    @extend %popup-card;
    @media screen and (min-width: $screen-tablet) {
      flex: 0 0 25%;
      min-width: 460px;
      max-height: 90vh;
    }
  }
  &__header {
    @extend %popup-header;
  }
  &__title {
    @extend %popup-title;
  }
  &__item {
    @include flex-row(space-between, center);
    margin-bottom: 16px;
    &:last-child {
      margin: 0;
    }
  }
  &__body {
    margin-bottom: 32px;
  }
  &__close {
    @extend %popup-close-button;
  }
  &__input {
    @extend %input;
    flex: 0 1 calc(100% - 160px);
  }
}
</style>
