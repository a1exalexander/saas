<template>
<section class="nav-mobile">
  <button
    class="nav-mobile__burger"
    @click='showNav'>
    <span class="nav-mobile__burger-item"></span>
    <span class="nav-mobile__burger-item"></span>
    <span class="nav-mobile__burger-item"></span>
  </button>
  <h1 class='nav-mobile__title'>{{ title }}</h1>
</section>
</template>
<script>
export default {
  name: 'MobileNavBar',
  methods: {
    showNav() {
      this.$emit('showNav');
    },
  },
  computed: {
    title() {
      return this.$route.name;
    },
  },
};
</script>
<style lang="scss">
.nav-mobile {
  position: fixed;
  top: 0;
  width: 100%;
  height: 56px;
  background-color: $B12;
  @include flex-row(flex-start, center);
  padding: 0 54px 0 28px;
  z-index: 10;
  border-bottom: 1px solid $N10;
  transition-property: visibility, opacity;
  transition-duration: 0.4s;
  transition-timing-function: ease-in-out;
  @media screen and (min-width: $screen-tablet) {
    display: none;
  }
  &__burger {
    position: relative;
    width: 26px;
    height: 26px;
    padding: 4px;
  }
  &__burger-item {
    left: 0;
    width: 22px;
    position: absolute;
    height: 3px;
    background-color: $N6;
    &:nth-of-type(1) {
      top: 4px;
    }
    &:nth-of-type(2) {
      top: 12px;
    }
    &:nth-of-type(3) {
      top: 20px;
    }
  }
  &__title {
    flex: 1 1;
    font-size: $H700;
    font-weight: 500;
    text-align: center;
  }
}
</style>
