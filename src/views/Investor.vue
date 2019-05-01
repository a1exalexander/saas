<template>
<div class="investor-view">
  <transition
    name="custom-classes-transition"
    enter-active-class="animated dur02 fadeIn"
    leave-active-class="animated dur02 fadeOut"
    appear
    mode="out-in">
    <investor-mobile-nav
      class='navigation-fixed'
      @hideNav='hideNav'
      v-if='navVisible'
      :visible='navVisible'/>
  </transition>
  <investor-nav-bar @showNav='showNav'/>
  <investor-head/>
  <transition
    name="custom-classes-transition"
    enter-active-class="animated dur03 fadeIn"
    leave-active-class="animated dur03 fadeOut"
    mode="out-in"
  >
    <router-view class="investor-view__subview"/>
  </transition>
</div>
</template>
<script>
import InvestorHead from '@/components/investor/components/InvestorHead.vue';
import InvestorNavBar from '@/components/investor/components/InvestorNavBar.vue';
import InvestorMobileNav from '@/components/investor/components/InvestorMobileNav.vue';
import { mapMutations, mapState } from 'vuex';

export default {
  name: 'Investor',
  components: {
    InvestorHead,
    InvestorNavBar,
    InvestorMobileNav,
  },
  data() {
    return {
      routeCount: 0,
      navVisible: false,
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
@import '~@/scss/components/investor';
.investor-view {
  @extend %investor-screen;
  &__subview {
    @include flex-col(flex-start, flex-start);
    min-width: 100%;
    flex: 1 1;
    overflow-y: auto;
    overflow-x: hidden;
    
    @media screen and (min-width: $screen-tablet) {
      overflow-y: visible;
      justify-content: flex-start;
      padding: {
         left: 24px;
         right: 24px;
        }
    }
  }
}
</style>
