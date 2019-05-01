<template>
<div class="drop-menu__wrapper">
  <div @click='drop = false' v-if='drop' class="drop-menu__layer"></div>
  <div class="drop-menu-mobile">
    <icon-triangle
    class="drop-menu-mobile__drop-arrow"/>
    <select
      class="drop-menu-mobile__select"
      v-model="exchange">
      <option
        v-for="(item, index) in exchangesList"
        class='drop-menu-mobile__option'
        :key="index">{{ item.name }}
      </option>
    </select>
  </div>
  <div
    class="drop-menu"
    @click.stop.prevent='drop = !drop'>
    <p class="drop-menu__placeholder">{{ selected }}</p>
    <icon-triangle
      class="drop-menu__drop-arrow"
      :class="{'image-rotate': drop}"/>
    <transition
      name="custom-classes-transition"
      enter-active-class="animated dur02 pullDownLight"
      leave-active-class="animated dur02 pullDownLight revers">
    <div class="drop-menu__list" v-if="drop">
      <p
        class="drop-menu__item"
        v-for="(item, index) in exchangesList"
        :key="index"
        @click="select(item.name)">{{ item.name }}</p>
    </div>
    </transition>
  </div>
</div>
</template>
<script>
import IconTriangle from '@/components/common/icons/IconTriangle.vue';
import { mapActions, mapState } from 'vuex';

export default {
  name: 'TradingTerminalDropList',
  components: {
    IconTriangle,
  },
  data() {
    return {
      exchanges: [],
      selected: '',
      drop: false,
    };
  },
  methods: {
    select(exchange) {
      this.selected = exchange;
      this.$emit('selectExchange', exchange);
    },
    firstSelect() {
      if (this.exchangesList.length) {
        this.select(this.exchangesList[0][name]);
      }
    }
  },
  computed: {
    ...mapState('exchanges', {
      exchangesList: state => state.myApi,
    }),
    exchange: {
      get() {
        return this.selected;
      },
      set(exchange) {
        this.select(exchange);
      },
    },
  },
};
</script>
<style lang="scss" scoped>
.drop-menu {
  @extend %input;
  @extend %drop-menu;
  display: none;
  min-width: 140px;
  padding-right: 28px;
  @media screen and (min-width: $screen-desktop) {
    display: flex;
    width: 100%;
  }
  &__wrapper {
    padding: 0;
    position: relative;
    z-index: 2;
  }
  &__layer {
    position: fixed;
    top: 0;
    right: 0;
    left: 0;
    bottom: 0;
    background-color: transparent;
  }
  &__drop-arrow {
    @extend %drop-menu-arrow;
  }
  &__list {
    @extend %drop-menu-list;
    text-align: left;
  }
  &__item {
    @extend %drop-menu-item;
  }
}
.drop-menu-mobile {
  position: relative;
  @include flex-row(space-between, center);
  width: 100%;
  @media screen and (min-width: $screen-desktop) {
    display: none;
  }
  &__select {
    @extend %input;
    @extend %drop-menu;
    width: 100%;
    @extend %no-default-select;
  }
  &__option {
    @extend %drop-menu-item;
    @extend %no-default-option;
  }
  &__drop-arrow {
    @extend %drop-menu-arrow;
  }
}
</style>
