<template>
  <div class="assets-popup" @click.self='close'>
    <div class="assets-popup__card" @click='drop = null'>
      <close-button
        class="assets-popup__close"
        @click.native='close'/>
      <header class="assets-popup__header">
        <h2 class="assets-popup__title">Add new local Assets</h2>
      </header>
      <ul class="assets-popup__list">
        <li class="assets-popup__item">
          <div class="assets-popup__row">
            <div class="assets-popup__item-inner">
              <!--[<img src="" alt="image" class="assets-popup__image">]-->
              <!--[<span class="assets-popup__name">ASSET</span>]-->
            </div>
            <!--[<div class="assets-popup__item-inner">
              <span class="assets-popup__value">TOTAL USDT</span>
            </div>]-->
          </div>
          <!-- <transition
            name="custom-classes-transition"
            enter-active-class="animated dur03 fadeIn"
            leave-active-class="animated dur02 fadeOut"
            mode="out-in"> -->
          <transition v-on:enter="enter" v-on:leave="leave">
            <div ref='drop' @click.stop.prevent class="assets-popup__drop">

              <ul class="assets-popup__drop-list">

                <li class="assets-popup__drop-item">
                  <span class="assets-popup__drop-name">Symbol</span>
                  <input v-model="assetModel.asset" required="true" class="assets-popup__drop-value"
                    placeholder="Asset symbol ETH ..." />
                </li>

                <li class="assets-popup__drop-item">
                  <span class="assets-popup__drop-name">Price in USD</span>
                  <input v-model="assetModel.priceInUsd" required="true" class="assets-popup__drop-value"
                    placeholder="1 Asset unit, price in USD " />
                </li>

                <li class="assets-popup__drop-item">
                  <span class="assets-popup__drop-name">Balance</span>
                  <input v-model="assetModel.amount" required="true" class="assets-popup__drop-value"
                    placeholder="Total of Asset" />
                </li>

                <li class="assets-popup__drop-item">
                  <span class="assets-popup__drop-name">Sescription</span>
                  <input v-model="assetModel.description" required="true" class="assets-popup__drop-value"
                    placeholder="Crypto address or any other info" />
                </li>

              </ul>

              <div class="buttons-wrapper">
                <button-secondary
                  class="buttons-wrapper__button buttons-wrapper__button--cancel-desktop"
                  @click.native='close'
                  >Cancel
                </button-secondary>
                <button-primary
                  class="buttons-wrapper__button buttons-wrapper__button--save"
                  :class='{"button-loading": loading}'
                  @click.native='addAsset'
                  >Add Asset
                </button-primary>
                <button-transparent
                  class="buttons-wrapper__button buttons-wrapper__button--cancel"
                  @click.native='close'
                  >Cancel
                </button-transparent>
              </div>
            </div>
          </transition>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
import ButtonPrimary from '@/components/common/buttons/ButtonPrimary.vue';
import ButtonSecondary from '@/components/common/buttons/ButtonSecondary.vue';
import ButtonTransparent from '@/components/common/buttons/ButtonTransparent.vue';
import CloseButton from '@/components/common/buttons/CloseButton.vue';
import Subtle from '@/components/common/buttons/Subtle.vue';
import { mapState, mapActions, mapGetters } from 'vuex';
import 'velocity-animate';

export default {
  name: 'AddAssetsPopup',
  components: {
    CloseButton,
    Subtle,
    ButtonPrimary,
    ButtonSecondary,
    ButtonTransparent,
  },
  data() {
    return {
      drop: null,
      loading: false,

      assetModel: {
        asset: '',
        amount: '',
        priceInBtc: '',
        priceInUsd: '',
        totalInUsd: '',
        totalInBtc: '',
        description: '',
      }

    };
  },

  computed: { },
  methods: {

    ...mapActions('portfolio', [
      'localAssetAdd',
    ]),

    getExchangeImage( exchange ) {
      try{
        return require(`@/assets/images/${ (''+exchange).toLowerCase().trim() }.png`);
      }catch(e){}
      return require('@/assets/images/local-asset-white.png');
    },

    addAsset() {
      // this.loading = true;
      // setTimeout(() => this.loading = false, 1500);
      this.localAssetAdd( this.assetModel );

    },
    cancel() {
      this.drop = null;
    },
    selectDrop(n) {
      if (this.drop === null) {
        this.drop = n;
      } else {
        const flag = n === this.drop;
        this.drop = null;
        if (!flag) {
          setTimeout(() => this.drop = n, 400);
        }
      }
    },
    close() {
      this.$emit('close');
    },
    enter(el, done) {
      Velocity(el, "slideDown", { duration: 200 })
    },
    leave(el, done) {
      Velocity(el, "slideUp", { duration: 200 })
    }
  },
}
</script>
<style lang="scss">
@import '~@/scss/components/popup';
@import '~@/scss/components/buttons-response';
.assets-popup {
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
  &__list {
    list-style: none;
  }
  &__item {
    margin-bottom: 16px;
    &:last-child {
      margin: 0;
    }
  }
  &__row {
    @include flex-row(space-between, center);
    width: 100%;
  }
  &__item-inner {
    @include flex-row(flex-start, center);
  }
  &__image {
    border-radius: 50%;
    margin-right: 16px;
    width: 36px;
    height: 36px;
  }
  &__name {
    @include text($H500, 400);
  }
  &__value {
    @include text($H400, 400);
  }
  &__close {
    @extend %popup-close-button;
  }
  &__edit-button {
    margin-left: 24px;
  }
  &__drop {
    padding: 16px 0 0;
  }
  &__drop-list {
    list-style: none;
    background-color: $N11;
    border-radius: 4px;
    padding: 16px 24px;
    margin-bottom: 16px;
  }
  &__drop-item {
    @include flex-row(space-between, center);
    margin-bottom: 12px;
    &:last-child {
      margin: 0;
    }
  }
  &__drop-name {
    @include text($H400, 500);
  }
  &__drop-value {
    @extend %input;
    flex: 0 1 calc(100% - 160px);
    min-width: 100px;
    background-color: $N13;
  }
}
</style>
