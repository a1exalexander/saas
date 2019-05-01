<template>
<nav class='nav' @click='closePopover'>
  <transition
    name="custom-classes-transition"
    enter-active-class="animated dur02 fadeIn"
    leave-active-class="animated dur02 fadeOut"
    mode="out-in">
  <invite-popup v-if='invitePopup' @cancel='closeInvitePopup'/>
  </transition>
  <transition
    name="custom-classes-transition"
    enter-active-class="animated dur02 slideInLeft"
    leave-active-class="animated dur02 slideOutLeft"
    mode="out-in">
  <section class="nav__menu" v-if='visible'>
    <div class="nav__inner">
      <section class="nav__header">
        <div class="nav__header-inner">
          <div class="nav__logo-wrapper">
            <icon-fund-platform class="nav__logo"/>
          </div>
          <p class="nav__title">{{ getFund }}</p>
        </div>
      </section>
      <ul @click='hideNavDelay' class="nav__list">
        <router-link
          :to='{ name: "Dashboard" }'
          tag='li'
          class="nav__item"
          :class='{"nav__item--active": $route.name === "Dashboard" }'>
          <icon-analytics class='nav__item-icon'/>
          <p class="nav__item-text">Dashboard</p>
        </router-link>
        <router-link
          :to='{ name: "trading-dashboard" }'
          tag='li'
          class="nav__item"
          :class='{"nav__item--active": routeTrading }'>
          <icon-trading class='nav__item-icon'/>
          <p class="nav__item-text">Trading</p>
        </router-link>
        <router-link
          :to='{ name: "Investors" }'
          tag='li'
          class="nav__item"
          :class='{"nav__item--active": routeCustomers }'>
          <icon-investor class='nav__item-icon'/>
          <p class="nav__item-text">Clients</p>
        </router-link>
        <router-link
          :to='{ name: "Exchanges" }'
          tag='li'
          class="nav__item"
          :class='{"nav__item--active": routeExchanges }'>
          <icon-exchanges class='nav__item-icon'/>
          <p class="nav__item-text">Exchanges</p>
        </router-link>
        <router-link
          :to='{ name: "Strategies" }'
          tag='li'
          class="nav__item"
          :class='{"nav__item--active": $route.name === "strategies" }'>
          <icon-exchanges class='nav__item-icon'/>
          <p class="nav__item-text">Srategies</p>
        </router-link>
        <router-link
          :to='{ name: "payouts" }'
          tag='li'
          class="nav__item"
          :class='{"nav__item--active": routeTransactions }'>
          <icon-billing class='nav__item-icon'/>
          <p class="nav__item-text">Transactions</p>
        </router-link>
      </ul>
    </div>
    <div class="nav__inner">
      <invite-button
        @click.native='openInvitePopup'
        class='nav__invite-button'/>
      <section class="nav__profile">
        <div class="nav__profile-card">
          <div class="nav__ava-wrapper">
            <img
              class="nav__ava"
              :src="getAva"
              alt="avatar"
              v-if='getAva'>
            <icon-ava
              class="default-ava"
              v-else/>
          </div>
          <p class="nav__profile-name"
            >{{ `${getName} ${lastName}` }}
          </p>
        </div>
        <div
          class="nav__popover-wrapper">
          <a
            href='#'
            class='nav__profile-button'
            v-html='"\&\#8226\&\#8226\&\#8226"'
            @click.stop.prevent="popover = !popover">
          </a>
          <transition
            name="custom-classes-transition"
            enter-active-class="animated dur03 fadeIn"
            leave-active-class="animated dur02 fadeOut"
            mode="out-in">
          <popover-navigation
            class='nav__popover'
            @closeNav='hideNavDelay'
            @click.native.stop.prevent
            v-show="popover"/>
          </transition>
        </div>
      </section>
    </div>
  </section>
  </transition>
  <div
    class="nav__bg-inner animated dur06 fadeIn"
    @click='hideNav'
    v-if='visible'>
    <close-button
      class="nav__close-button"
      @click.native='hideNav'/>
  </div>
</nav>
</template>
<script>
import CloseButton from '@/components/common/buttons/CloseButton.vue';
import IconInvestor from '@/components/common/icons/IconInvestor.vue';
import IconTrading from '@/components/common/icons/IconTrading.vue';
import IconAnalytics from '@/components/common/icons/IconAnalytics.vue';
import IconBilling from '@/components/common/icons/IconBilling.vue';
import IconExchanges from '@/components/common/icons/IconExchanges.vue';
import IconFundPlatform from '@/components/common/icons/IconFundPlatform.vue';
import IconAva from '@/components/common/icons/IconAva.vue';
import PopoverNavigation from '@/components/common/PopoverNavigation.vue';
import InviteButton from '@/components/inviteInvestor/InviteButton.vue';
import InvitePopup from '@/components/inviteInvestor/InvitePopup.vue';
import { mapState, mapActions } from 'vuex';
import '@/scss/components/nav.scss';

export default {
  name: 'NavigationMobile',
  components: {
    CloseButton,
    IconInvestor,
    IconBilling,
    IconExchanges,
    InviteButton,
    InvitePopup,
    PopoverNavigation,
    IconAva,
    IconFundPlatform,
    IconAnalytics,
    IconTrading,
  },
  data() {
    return {
      profile: {
        // eslint-disable-next-line
        avatar: require('@/assets/images/ava.jpg'),
        // eslint-disable-next-line
        logo: require('@/assets/images/iin-logo.png'),
      },
      visible: false,
      popover: false,
      invitePopup: false,
    };
  },
  methods: {
    ...mapActions('profile', [
      'getProfile',
    ]),
    hideNav() {
      this.visible = false;
      this.$emit('hideNav');
    },
    closePopover() {
      this.popover = false;
    },
    hideNavDelay() {
      setTimeout(() => {
        this.hideNav();
      }, 100);
    },
    openInvitePopup() {
      this.invitePopup = true;
    },
    closeInvitePopup() {
      this.invitePopup = false;
    },
  },
  computed: {
    ...mapState('profile', {
      getName: state => state.profile.name_first,
      getLastName: state => state.profile.name_last,
      getAva: state => state.profile.ava,
      getlogo: state => state.profile.fundLogo,
      getFund: state => state.profile.business_name,
    }),
    lastName() {
      return this.getLastName?this.getLastName:'';
    },
    routeTrading() {
      const { path } = this.$route;
      const re = /(trading)/g;
      return re.test(path);
    },
    routeCustomers() {
      const { path } = this.$route;
      const re = /(clients)/g;
      return re.test(path);
    },
    routeExchanges() {
      const { path } = this.$route;
      const re = /(exchanges)/g;
      return re.test(path);
    },
    routeTransactions() {
      const { path } = this.$route;
      const re = /(transactions)/g;
      return re.test(path);
    },
  },
  created() {
    this.getProfile();
  },
  mounted() {
    this.visible = true;
  },
};
</script>
