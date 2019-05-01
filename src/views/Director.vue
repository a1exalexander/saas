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
      class="director__view"/>
  </transition>
</div>

</template>
<script>
import NavigationMobile from '@/views/NavigationMobile.vue';
import NavigationDesktop from '@/views/NavigationDesktop.vue';
import MobileNavBar from '@/components/common/MobileNavBar.vue';
import { mapMutations, mapState } from 'vuex';

export default {
  name: 'Director',
  components: {
    NavigationMobile,
    NavigationDesktop,
    MobileNavBar,
  },
  data() {
    return {
      routeCount: 0,
      surveyD: false,
      navVisible: false,
      mobileNavVisible: true,
      surveyMessage: 'Please let us know how to become more useful',
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
  min-height: 100vh;
  @media screen and (min-width: $screen-tablet) {
    display: flex;
    justify-content: center;
    align-items: stretch;
  }
}
</style>
