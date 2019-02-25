<template>
<div class="drop-menu__wrapper">
  <div class="drop-menu-mobile">
    <icon-triangle
    class="drop-menu-mobile__drop-arrow"/>
    <select
      class="drop-menu-mobile__select"
      v-model="mobileCountry">
      <option
        class='drop-menu-mobile__option'
        v-for="(item, index) in countryList"
        :key="index">{{ item }}
      </option>
    </select>
  </div>
  <div
    class="drop-menu"
    @click.stop.prevent='toggleDropMenu("countries")'>
    <p class="drop-menu__placeholder">{{ getCountry }}</p>
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
        v-for="(item, index) in countryList"
        :key="index"
        @click="select(item)">{{ item }}</p>
    </div>
    </transition>
  </div>
</div>

</template>
<script>
import IconTriangle from '@/components/common/icons/IconTriangle.vue';
import countries from '@/js/countries';
import { mapState, mapMutations } from 'vuex';

export default {
  name: 'DropMenuCountry',
  components: {
    IconTriangle,
  },
  data() {
    return {
      rotateImage: false,
    };
  },
  methods: {
    ...mapMutations('signup', [
      'setFund',
      'toggleDropMenu',
    ]),
    select(item) {
      this.setFund(['country', item]);
    },
  },
  computed: {
    ...mapState('signup', {
      getCountry: state => state.fund.country,
      showDropMenu: state => state.dropMenu.countries,
    }),
    countryList() {
      return countries;
    },
    mobileCountry: {
      get() {
        return this.getCountry;
      },
      set(element) {
        this.setFund(['country', element]);
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
