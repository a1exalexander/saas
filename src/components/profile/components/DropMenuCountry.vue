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
    <p class="drop-menu__placeholder">{{ country }}</p>
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
        @click="setCountry(item)">{{ item }}</p>
    </div>
    </transition>
  </div>
</div>

</template>
<script>
import IconTriangle from '@/components/common/icons/IconTriangle.vue';
import countries from '@/js/countries';

export default {
  name: 'DropMenuCountry',
  props: {
    country: {
      type: String,
    },
  },
  components: {
    IconTriangle,
  },
  data() {
    return {
      rotateImage: false,
      showDropMenu: false,
    };
  },
  methods: {
    setCountry(item) {
      this.$emit('setCountry', item);
    },
    toggleDropMenu() {
      this.showDropMenu = !this.showDropMenu;
    },
  },
  computed: {
    countryList() {
      return countries;
    },
    mobileCountry: {
      get() {
        return this.country;
      },
      set(item) {
        this.setCountry(item);
      },
    },
  },
};
</script>
