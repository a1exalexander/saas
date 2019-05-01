<template>
<div class="transactions-setting" @click='closePopups'>
  <transition
    name="custom-classes-transition"
    enter-active-class="animated dur02 fadeIn"
    leave-active-class="animated dur02 fadeOut"
    mode="out-in">
  <add-method-popup
    class="transactions-setting__add-method-popup"
    v-if='addPopup'
    @close='addPopup = false'/>
  </transition>
  <div class="transactions-setting__header">
    <h2 class="transactions-setting__title">Billing Methods</h2>
    <div
      class="transactions-setting__info-wrapper"
      @mouseleave="popover = false">
      <icon-info
        class='transactions-setting__icon transactions-setting__icon--hover'
        @mouseenter.native="popover = true"/>
      <icon-info
        class='transactions-setting__icon transactions-setting__icon--click'
        @click.native="popover = true"/>
      <transition
        name="custom-classes-transition"
        enter-active-class="animated dur02 fadeIn"
        leave-active-class="animated dur02 fadeOut"
        mode="out-in">
      <div class="transactions-setting__popover-wrapper" v-show='popover'>
        <div
          class="transactions-setting__popover">
          <span class="transactions-setting__popover-text">
            You can add information about transaction methods,
            and set them for payouts or payments recieving.
            The added details will be used automatically.
            You can add information about your Cryptocurrency Wallet.
          </span>
        </div>
      </div>
      </transition>
    </div>
  </div>
  <div class="transactions-setting__row transactions-setting__row--group">
    <transition-group name="list-complete" tag="div">
      <method-card
        class='transactions-setting__card list-complete-item'
        v-for='method in methods'
        ref='method'
        :key='method.id'
        :method='method'/>
        <a
          href="#"
          class="transactions-setting__button"
          @click='addPopup = true'
          :class='{"transactions-setting__button--none": isMethods}'
          key='button'>
          <icon-plus class='transactions-setting__button-icon'/>
          <p class="transactions-setting__button-text">Add your cryptocurrency address</p>
        </a>
    </transition-group>
  </div>
</div>
</template>
<script>
import IconPlus from '@/components/common/icons/IconPlus.vue';
import IconInfo from '@/components/common/icons/IconInfo.vue';
import MethodCard from '@/components/transactions/components/MethodCard.vue';
import AddMethodPopup from '@/components/transactions/components/AddMethodPopup.vue';
import { mapState, mapGetters, mapActions } from 'vuex';

export default {
  name: 'TransactionsSettings',
  components: {
    IconPlus,
    IconInfo,
    MethodCard,
    AddMethodPopup,
  },
  data() {
    return {
      addPopup: false,
      popover: false,
    };
  },
  methods: {
    ...mapActions('billing', [
      'getMethods',
      'getCurrencies',
    ]),
    closePopups() {
      if (this.$refs.method && this.$refs.method.length) {
        this.$refs.method.forEach(item => item.close());
      }
    },
  },
  computed: {
    ...mapState('billing', [
      'methods',
    ]),
    ...mapGetters('billing', [
      'isMethods',
    ]),
  },
  created() {
    this.getCurrencies()
      .then(() => this.getMethods())
  },
};
</script>
<style lang="scss">
.transactions-setting {
  padding: 24px 28px;
  @media screen and (min-width: $screen-tablet) {
    padding: 32px 40px;
  }
  &__header {
    @include flex-row(flex-start, center);
    margin-bottom: 24px;
  }
  &__info-wrapper {
    position: relative;
  }
  &__popover-wrapper {
    position: fixed;
    right: 16px;
    left: 16px;
    z-index: 2;
    @media screen and (min-width: $screen-desktop) {
      position: absolute;
      top: 90%;
    }
  }
  &__popover {
    @extend %tooltip;
    width: 90vw;
    @media screen and (min-width: $screen-desktop) {
      width: 356px;
    }
  }
  &__popover-text {
    @extend %tooltip-text;
    color: $N0;
  }
  &__icon {
    height: 20px;
    width: 20px;
    fill: $B3;
    &--click {
      @media screen and (min-width: $screen-desktop) {
        display: none;
      }
    }
    &--hover {
      display: none;
      @media screen and (min-width: $screen-desktop) {
        display: block;
        cursor: pointer;
      }
    }
  }
  &__title {
    font-size: $H700;
    font-weight: 500;
    margin-right: 8px;
  }
  &__row {
    position: relative;
    &--group > div {
      @media screen and (min-width: $screen-tablet) {
        display: flex;
        flex-flow: row wrap;
        justify-content: flex-start;
        align-items: flex-start;
        width: 100%;
      }
    }
  }
  &__button {
    @include flex-row(center, center);
    width: 100%;
    border: 1px dashed $B2;
    padding: 24px;
    min-height: 92px;
    border-radius: 2px;
    transition: border-color ease-in-out 0.2s;
    @media screen and (min-width: $screen-tablet) {
      padding: 0;
      width: auto;
      min-height: auto;
      border: none;
      &:hover {
        .transactions-setting {
          &__button-icon {
            fill: $B1;
          }
          &__button-text {
            color: $B1;
          }
        }
      }
    }
    &:active {
      border-color: $B3;
      .transactions-setting {
        &__button-icon {
          fill: $B3;
        }
        &__button-text {
          color: $B3;
        }
      }
      }
    &--none {
      border-color: $N77;
      .transactions-setting {
        &__button-icon {
          fill: $N7;
        }
        &__button-text {
          color: $N7;
        }
      }
      @media screen and (min-width: $screen-tablet) {
        border: 1px dashed $B2;
        height: 92px;
        padding: 28px;
        .transactions-setting {
          &__button-icon {
            fill: $B2;
          }
          &__button-text {
            color: $B2;
          }
        }
      }
    }
  }
  &__button-icon {
    height: 15px;
    width: 15px;
    fill: $B2;
    margin-right: 12px;
    transition: fill ease-in-out 0.2s;
  }
  &__button-text {
    @include text($H400, 400, $B2);
    transition: color ease-in-out 0.2s;
    white-space: nowrap;
  }
  &__card {
    margin-bottom: 20px;
    @media screen and (min-width: $screen-tablet) {
      margin-right: 24px;
      flex: 0 0 364px;
      height: 92px;
      right: auto;
      left: auto;
    }
  }
}
</style>
