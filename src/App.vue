<template>
  <div class='app' id="app">
    <transition
      name="custom-classes-transition"
      enter-active-class="animated dur03 fadeIn"
      leave-active-class="animated dur03 fadeOut"
      mode="out-in">
    <navigation-mobile
      class='navigation-fixed'
      @hideNav='hideNav'
      v-if='navVisible'
      :visible='navVisible'/>
    </transition>
    <navigation-desktop v-if='desktopNav'/>
    <mobile-nav-bar @showNav='showNav' :class='{"opacity": !mobileBar}'/>
    <router-view @hideMobileNav='hideMobileNav' :class='{"fixed": navVisible}'/>
  </div>
</template>
<script>
import NavigationMobile from '@/views/NavigationMobile.vue';
import NavigationDesktop from '@/views/NavigationDesktop.vue';
import MobileNavBar from '@/components/common/MobileNavBar.vue';

export default {
  name: 'App',
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
  computed: {
    mobileBar() {
      const re = /(auth)/g;
      const route = this.$route.path;
      return !route.match(re) && !this.navVisible && this.mobileNavVisible;
    },
    desktopNav() {
      const re = /(auth)/g;
      const route = this.$route.path;
      return !route.match(re);
    },
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
.app {
  @media screen and (min-width: $screen-tablet) {
    display: flex;
    justify-content: center;
    align-items: stretch;
  }
}
</style>
