<template>
<nav class='nav' @click='closePopover'>
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
          <p class="nav__title">{{ profile.business_name }}</p>
        </div>
      </section>
      <ul @click='hideNavDelay' class="nav__list">
        <router-link
          :to='{ name: "investor-dashboard" }'
          tag='li'
          class="nav__item"
          :class='{"nav__item--active": $route.name === "investor-dashboard" }'>
          <icon-analytics class='nav__item-icon'/>
          <p class="nav__item-text">Dashboard</p>
        </router-link>
        <router-link
          :to='{ name: "investor-history" }'
          tag='li'
          class="nav__item"
          :class='{"nav__item--active": $route.name === "investor-history" }'>
          <icon-exchanges class='nav__item-icon'/>
          <p class="nav__item-text">History</p>
        </router-link>
        <router-link
          :to='{ name: "investor-referrals" }'
          tag='li'
          class="nav__item"
          :class='{"nav__item--active": $route.name === "investor-referrals" }'>
          <icon-exchanges class='nav__item-icon'/>
          <p class="nav__item-text">Referrals</p>
        </router-link>
      </ul>
    </div>
    <div class="nav__inner">
      <div class="nav__balance">
        <span class="nav__balance-label">Balance:</span>
        <span class="nav__balance-value">1900000$</span>
      </div>
      <section class="nav__profile">
        <div class="nav__profile-card">
          <div class="nav__ava-wrapper">
            <img
              class="nav__ava"
              :src="profile.ava"
              alt="avatar"
              v-if='profile.ava'>
            <icon-ava
              class="default-ava"
              v-else/>
          </div>
          <p class="nav__profile-name"
            >{{ fullName }}
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
import IconAnalytics from '@/components/common/icons/IconAnalytics.vue';
import IconExchanges from '@/components/common/icons/IconExchanges.vue';
import IconInvestor from '@/components/common/icons/IconInvestor.vue';
import IconAva from '@/components/common/icons/IconAva.vue';
import PopoverNavigation from '@/components/investor/components/PopoverNavigation.vue';
import IconFundPlatform from '@/components/common/icons/IconFundPlatform.vue';
import { mapGetters, mapActions } from 'vuex';
import '@/scss/components/nav.scss';

export default {
  name: 'NavigationMobile',
  components: {
    CloseButton,
    IconInvestor,
    PopoverNavigation,
    IconAva,
    IconFundPlatform,
    IconAnalytics,
    IconExchanges,
  },
  data() {
    return {
      visible: false,
      popover: false,
    };
  },
  methods: {
    ...mapActions({
      AUTH_LOGOUT: 'investorLogin/AUTH_LOGOUT',
    }),
    logout() {
      this.AUTH_LOGOUT()
        .then(() => {
          this.$router.push({ name: 'investor-login' })
        });
    },
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
    ...mapGetters({
      profile: 'investorProfile/profile',
    }),
    fullName() {
      return `${this.profile.name_first} ${this.profile.name_last}`;
    },
  },
  mounted() {
    this.visible = true;
  },
};
</script>
