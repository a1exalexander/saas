<template>
<div class="drop-menu__wrapper">
  <div class="drop-menu-mobile">
    <icon-triangle
    class="drop-menu-mobile__drop-arrow"/>
    <select
      class="drop-menu-mobile__select"
      v-model="country">
      <option
        class='drop-menu-mobile__option'
        v-for="(item, index) in allCountries"
        :key="index">{{ item }}
      </option>
    </select>
  </div>
  <div
    class="drop-menu"
    @click.stop.self='open'>
    <input
      v-model='search'
      ref='country'
      type="text"
      class="drop-menu__placeholder"
      @input="open"
      @click.stop="open"
      @focus='open'
      @keyup.enter="searchSelect"/>
    <icon-triangle
      class="drop-menu__drop-arrow"
      @click.stop.native='showDropMenu = !showDropMenu'
      :class="{'image-rotate': showDropMenu}"/>
    <transition
      name="custom-classes-transition"
      enter-active-class="animated dur02 pullDownLight"
      leave-active-class="animated dur02 pullDownLight revers">
    <div class="drop-menu__list" v-if="showDropMenu">
      <p
        class="drop-menu__item"
        v-for="(item, index) in countries"
        :key="index"
        @click="select(item)">{{ item }}</p>
    </div>
    </transition>
  </div>
</div>

</template>
<script>
import IconTriangle from '@/components/common/icons/IconTriangle.vue';
import countryList from '@/js/countries';
import { mapState, mapMutations } from 'vuex';
import { setTimeout } from 'timers';

export default {
  name: 'DropMenuCountry',
  props: {
    getCountry: {
      type: String,
    },
  },
  components: {
    IconTriangle,
  },
  data() {
    return {
      rotateImage: false,
      search: '',
      allCountries: countryList,
      showDropMenu: false,
    };
  },
  methods: {
    ...mapMutations('signup', [
      'toggleDropMenu',
    ]),
    open() {
      this.showDropMenu = true;
    },
    close() {
      this.showDropMenu = false;
    },
    setCountry(value) {
      this.$emit('select', value);
    },
    searchSelect() {
      this.search = getCountry;;
    },
    select(item) {
      this.search = item;
      this.setCountry(item);
    },
    searchSelect() {
      const item = this.countries[0];
      this.search = item;
      this.setCountry(item);
      this.$refs.country.blur();
      this.close();
    },
    forceSelect(country) {
      this.search = country;
    },
  },
  computed: {
    countries() {
      const value = this.search;
      if (value) {
        return countryList.filter(item => item.toLowerCase().startsWith(value.toLowerCase()));
      }
      return countryList;
    },
    country: {
      get() {
        return this.getCountry;
      },
      set(value) {
        this.select(value);
      },
    },
    countryMatch() {
      const chars = this.search;
      if (chars) {
        return countryList.find(item => item.toLowerCase() === chars.toLowerCase());
      }
      return !!chars;
    },
  },
  mounted() {
    const timer = setInterval(() => {
      if (this.getCountry) {
        this.search = this.getCountry;
        clearInterval(timer);
      }
    }, 10);
  },
  beforeDestroy() {
    this.search = this.getCountry;
  },
  watch: {
    search(value) {
      const check = this.countryMatch;
      if (!value) {
        this.search = '';
        this.setCountry('');
      } else if (check) {
        this.search = check;
        this.setCountry(check);
        this.$refs.country.blur();
        this.close();
      }
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
  &__placeholder {
    min-height: 34px;
    @extend %clear-input;
    cursor: pointer;
    @include text($H550, 400, $N2);
    @media screen and (min-width: $screen-tablet) {
      font-size: $H300;
      &::placeholder {
        color: $N0;
      }
    }
  }
  &__wrapper {
    padding: 0;
  }
  &__drop-arrow {
    @extend %drop-menu-arrow;
    pointer-events: all;
  }
  &__list {
    @extend %drop-menu-list;
    z-index: 22;
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
    pointer-events: all;
  }
}
</style>
