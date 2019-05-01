<template>
<div class="drop-menu__wrapper">
  <div class="drop-menu-mobile">
    <icon-triangle
    class="drop-menu-mobile__drop-arrow"/>
    <select
      class="drop-menu-mobile__select"
      v-model="status">
      <option
        class='drop-menu-mobile__option'
        v-for="(item, index) in statuses"
        :key="index">{{ item }}
      </option>
    </select>
  </div>
  <div
    class="drop-menu"
    @click.stop.prevent='dropMenu = !dropMenu'>
    <p class="drop-menu__placeholder">{{ status }}</p>
    <icon-triangle
      class="drop-menu__drop-arrow"
      :class="{'image-rotate': dropMenu}"/>
    <transition
      name="custom-classes-transition"
      enter-active-class="animated dur03 pullDownLight"
      leave-active-class="animated dur02 pullDownLight revers">
    <div class="drop-menu__list" v-if="dropMenu">
      <p
        class="drop-menu__item"
        v-for="(item, index) in statuses"
        :key="index"
        @click="select(item)">{{ item }}</p>
    </div>
    </transition>
  </div>
</div>

</template>
<script>
import IconTriangle from '@/components/common/icons/IconTriangle.vue';
import { setInterval } from 'timers';
import { mapMutations } from 'vuex';

export default {
  name: 'DropMenuCountry',
  components: {
    IconTriangle,
  },
  data() {
    return {
      rotateImage: false,
      dropMenu: false,
      statuses: [
        'client',
        'investor',
        'lead',
        'contact',
      ],
    };
  },
  methods: {
    ...mapMutations('investors', [
      'setClientValue',
    ]),
    select(value) {
      this.setClientValue(['role', value]);
    },
  },
  computed: {
    status: {
      get() {
        return this.$store.state.investors.client.role;
      },
      set(value) {
        this.setClientValue(['role', value]);
      },
    },
  },
};
</script>
<style lang="scss" scoped>
.drop-menu {
  @extend %drop-menu;
  display: none;
  @media screen and (min-width: $screen-desktop) {
    display: flex;
    min-height: 24px;
    padding: 6px 8px;
    width: 100%;
    border-radius: 4px;
    background-color: $N10;
    border: none;
    font-size: $H100;
    font-weight: 600;
    color: $N0;
    &:hover {
      border: none;
    }
  }
  &__placeholder {
    padding-bottom: 2px;
  }
  &__wrapper {
    padding: 0;
    width: 90px;
  }
  &__drop-arrow {
    @extend %drop-menu-arrow;
  }
  &__list {
    @extend %drop-menu-list;
    z-index: 2;
  }
  &__item {
    @extend %drop-menu-item;
  }
}
.drop-menu-mobile {
  position: relative;
  @include flex-row(space-between, center);
  width: 90px;
  @media screen and (min-width: $screen-desktop) {
    display: none;
  }
  &__select {
    min-height: 24px;
    padding: 6px 8px;
    flex: 100%;
    border-radius: 4px;
    background-color: $N10;
    border: none;
    font-size: $H100;
    font-weight: 600;
    color: $N0;
    @extend %drop-menu;
    @extend %no-default-select;
  }
  &__option {
    @extend %drop-menu-item;
    font-size: $H100;
    @extend %no-default-option;
  }
  &__drop-arrow {
    @extend %drop-menu-arrow;
    z-index: 2;
    width: 9px;
    height: 9px;
    right: 8px;
  }
}
</style>
