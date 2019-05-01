<template>
<div class='exchanges'>
  <transition
    name="custom-classes-transition"
    enter-active-class="animated dur03 fadeIn"
    leave-active-class="animated dur03 fadeOut"
    mode="out-in">
  <exchanges-add-api-popup
    @close='addApiPopup.visible = false;'
    :api-name='addApiPopup.apiName'
    v-if='addApiPopup.visible'
    key='start'/>
  <exchanges-add-new-api-popup
    @close='addNewApiPopup = false;'
    v-if='addNewApiPopup'
    key='new'/>
  </transition>
  <header class="exchanges__header">
    <h1 class="exchanges__title">Exchanges</h1>
    <button-primary-icon
      @click.native='addNewApiPopup = true'
      v-if='isApi'>
      <icon-plus class="icon-small icon-button-left"/>
      <span>Add new exchange</span>
    </button-primary-icon>
  </header>
  <div class='exchanges__start-container' v-if='!isApi'>
    <div class="exchanges__subheader">
      <p class="exchanges__heading">Add Exchanges API Key</p>
      <p class="exchanges__description"
        >Add your exchanges for track info about holding funds,
        deposits and withdrawals, and trades history
      </p>
    </div>
    <div class="exchanges__api-box exchanges__api-box--start">
      <exchanges-api-label
        :style='{ animationDuration: `0.${index + 3}s`  }'
        class='exchanges__api-label
          exchanges__api-label--margin
          animated fadeIn'
        v-for='(item, index) in api'
        :key='index'
        :api-name='item.name'
        @click.native='addApi(item.name)'/>
    </div>
  </div>
  <div class='exchanges__container' v-else>
    <div class="exchanges__subheader exchanges__subheader--row">
      <p class="exchanges__heading">Exchanges list</p>
      <subtle-icon
        class='exchanges__add-button'
        @click.native='addNewApiPopup = true'>
        <icon-plus class='icon-large icon-button-left'/>
        <span>Add new exchange</span>
      </subtle-icon>
    </div>
    <ul class="exchanges__nav-list">
      <li class="exchanges__nav-item">
        <p class="exchanges__nav-text">Exchanges</p>
      </li>
      <li class="exchanges__nav-item">
        <p class="exchanges__nav-text">API Key</p>
      </li>
      <li class="exchanges__nav-item exchanges__nav-item--secret">
        <p class="exchanges__nav-text">Secret Key</p>
      </li>
      <li class="exchanges__nav-item">
        <p class="exchanges__nav-text">Status</p>
      </li>
      <li class="exchanges__nav-item exchanges__nav-item--right">
        <p class="exchanges__nav-text">Balance</p>
      </li>
    </ul>
    <div class="exchanges__api-box">
      <transition-group name="list-complete" tag="div">
      <exchanges-api
        class='exchanges__api-label list-complete-item'
        v-for='item in myApi'
        :key='`n${item.id}`'
        :api='item'
        :balance="77.4878783"/>
      </transition-group>
    </div>
  </div>
</div>
</template>
<script>
import ExchangesApiLabel from '@/components/exchanges/components/ExchangesApiLabel.vue';
import ExchangesAddApiPopup from '@/components/exchanges/ExchangesAddApiPopup.vue';
import ExchangesAddNewApiPopup from '@/components/exchanges/ExchangesAddNewApiPopup.vue';
import ExchangesApi from '@/components/exchanges/components/ExchangesApi.vue';
import IconPlus from '@/components/common/icons/IconPlus.vue';
import SubtleIcon from '@/components/common/buttons/SubtleIcon.vue';
import ButtonPrimaryIcon from '@/components/common/buttons/ButtonPrimaryIcon.vue';
import { mapState, mapActions, mapGetters } from 'vuex';

export default {
  name: 'Exchanges',
  components: {
    ExchangesApiLabel,
    ExchangesAddApiPopup,
    ExchangesApi,
    IconPlus,
    SubtleIcon,
    ExchangesAddNewApiPopup,
    ButtonPrimaryIcon,
  },
  data() {
    return {
      addApiPopup: {
        visible: false,
        apiName: '',
      },
      addNewApiPopup: false,
    };
  },
  computed: {
    ...mapState('exchanges', [
      'api',
      'myApi',
    ]),
    ...mapState('trading', [
      'allBalances',
    ]),
    ...mapGetters('exchanges', [
      'isApi',
    ]),
  },
  methods: {
    ...mapActions('exchanges', [
      'downloadApi',
    ]),
    addApi(name) {
      this.addApiPopup.apiName = name;
      this.addApiPopup.visible = true;
    },
  },
  created() {
    this.downloadApi();
  },
};
</script>
<style lang="scss">
.exchanges {
  flex: 1 1;
  padding: 24px 0 88px 0;
  @include flex-col(stretch, stretch);
  @media screen and (min-width: $screen-tablet) {
    height: 100vh;
    padding: 27px 0;
    background-color: $N12;
  }
  &__header {
    display: none;
    @media screen and (min-width: $screen-tablet) {
      display: flex;
      padding: 0 40px;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 20px;
      position: sticky;
      top: 24px;
      z-index: 3;
    }
  }
  &__heading {
    font-size: $H600;
    font-weight: 500;
    margin-bottom: 8px;
    @media screen and (min-width: $screen-tablet) {
      font-size: $H800;
      margin-bottom: 12px;
    }
  }
  &__title {
    font-size: $H900;
    font-weight: 600;
  }
  &__subheader {
    padding: 0 28px;
    margin-bottom: 24px;
    top: 80px;
    position: sticky;
    z-index: 3;
    background-color: $N13;
    @media screen and (min-width: $screen-tablet) {
      padding: 0 40px;
      background-color: $N12;
      margin-bottom: 32px;
    }
    &--row {
      @include flex-row(space-between, center);
      margin-bottom: 12px;
      @media screen and (min-width: $screen-tablet) {
        display: none;
      }
    }
  }
  &__description {
    color: $N6;
    letter-spacing: 0.48px;
    line-height: 1.4;
  }
  &__container {
    flex: 1 1;
    @include flex-col(stretch, stretch);
  }
  &__api-box {
    position: relative;
    flex: 1 1;
    overflow-y: auto;
    @media screen and (min-width: $screen-tablet) {
      padding: 0 40px;
    }
    &--start {
      padding: 0 28px;
      @media screen and (min-width: $screen-tablet) {
        padding: 0 40px;
        display: flex;
        flex-flow: row wrap;
      }
    }
  }
  &__api-label {
    &--margin {
      margin-bottom: 16px;
      @media screen and (min-width: $screen-tablet) {
        margin: 0 40px 40px 0;
      }
    }
  }
  &__nav-list {
    display: none;
    @media screen and (min-width: $screen-tablet) {
      display: grid;
      grid-template-columns: 1.4fr 2.8fr repeat(3, 1fr);
      grid-column-gap: 12px;
      justify-content: space-between;
      list-style: none;
      border-bottom: 1px solid $N9;
      padding: 0 40px 12px;
      position: sticky;
      top: 58px;
      z-index: 3;
    }
    @media screen and (min-width: $screen-desktop) {
      grid-template-columns: 1.5fr 2fr 1.2fr repeat(3, 1fr);
    }
  }
  &__nav-text {
    font-size: $H300;
    font-weight: 500;
    color: $N7;
  }
  &__nav-item {
    &--right {
      justify-self: end;
    }
    &--secret {
      display: none;
      @media screen and (min-width: $screen-desktop) {
        display: flex;
      }
    }
  }
  &__add-button {
    margin-bottom: 4px;
  }
}
</style>
