<template>
<div class="drop-menu__wrapper">
  <div class="drop-menu-mobile">
    <icon-triangle
    class="drop-menu-mobile__drop-arrow"/>
    <select
      class="drop-menu-mobile__select"
      v-model="mobileOperations">
      <option
        v-for="(item, index) in operations"
        class='drop-menu-mobile__option'
        :key="index">{{ item }}
      </option>
    </select>
  </div>
  <div
    class="drop-menu"
    @click.stop.prevent='toggleDropMenu("operations")'>
    <p class="drop-menu__placeholder">{{ getOperation }}</p>
    <icon-triangle
      class="drop-menu__drop-arrow"
      :class="{'image-rotate': showDropMenu}"/>
    <transition
      name="custom-classes-transition"
      enter-active-class="animated dur03 pullDownLight"
      leave-active-class="animated dur02 pullDownLight revers">
    <div class="drop-menu__list" v-if="showDropMenu">
      <p
        class="drop-menu__item"
        v-for="(item, index) in operations"
        :key="index"
        @click="select(item)">{{ item }}</p>
    </div>
    </transition>
  </div>
</div>
</template>
<script>
import IconTriangle from '@/components/common/icons/IconTriangle.vue';
import { mapMutations, mapState } from 'vuex';

export default {
  name: 'DropMenuOperations',
  components: {
    IconTriangle,
  },
  data() {
    return {
      operations: [
        'Mutual fund',
        'Hedge fund',
        'Money market fund',
      ],
    };
  },
  methods: {
    ...mapMutations('signup', [
      'setFund',
      'toggleDropMenu',
    ]),
    select(item) {
      this.setFund(['operation', item]);
    },
  },
  computed: {
    ...mapState('signup', {
      getOperation: state => state.fund.operation,
      showDropMenu: state => state.dropMenu.operations,
    }),
    mobileOperations: {
      get() {
        return this.getOperation;
      },
      set(element) {
        this.setFund(['operation', element]);
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
  @media screen and (min-width: $screen-desktop) {
    display: flex;
    width: 100%;
  }
  &__wrapper {
    padding: 0;
  }
  &__drop-arrow {
    @extend %drop-menu-arrow;
  }
  &__list {
    @extend %drop-menu-list;
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
