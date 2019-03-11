<template>
<div class="director">
  <transition
    name="custom-classes-transition"
    enter-active-class="animated dur02 fadeIn"
    leave-active-class="animated dur02 fadeOut"
    appear
    mode="out-in">
    <navigation-mobile
      class='navigation-fixed'
      @hideNav='hideNav'
      v-if='navVisible'
      :visible='navVisible'/>
  </transition>
  <navigation-desktop/>
  <mobile-nav-bar @showNav='showNav'/>
  <transition
    name="custom-classes-transition"
    enter-active-class="animated dur03 fadeIn"
    leave-active-class="animated dur03 fadeOut"
    mode="out-in"
    >
    <router-view
      @hideMobileNav='hideMobileNav'
      class="director__view"
      :class='{"fixed": navVisible}'/>
  </transition>
</div>

</template>
<script>
import NavigationMobile from '@/views/NavigationMobile.vue';
import NavigationDesktop from '@/views/NavigationDesktop.vue';
import MobileNavBar from '@/components/common/MobileNavBar.vue';

export default {
  name: 'Director',
  components: {
    NavigationMobile,
    NavigationDesktop,
    MobileNavBar,
  },
  data() {
    return {
      navVisible: false,
      mobileNavVisible: true,
    };
  },
  methods: {
    showNav() {
      this.navVisible = true;
    },
    hideNav() {
      this.navVisible = false;
    },
    hideMobileNav() {
      this.mobileNavVisible = false;
    },
  },
};
</script>
<style lang="scss">
.director {
  flex: 1 1;
  @media screen and (min-width: $screen-tablet) {
    display: flex;
    justify-content: center;
    align-items: stretch;
  }
}
</style>
