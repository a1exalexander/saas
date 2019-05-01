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
import '@/scss/components/nav-mobile.scss';

export default {
  name: 'MobileNavBar',
  methods: {
    showNav() {
      this.$emit('showNav');
    },
  },
  computed: {
    title() {
      let { name } = this.$route;
      if (name === 'investor-dashboard') {
        return 'Dashboard';
      } else if (name === 'investor-history') {
        return 'History';
      } else if (name === 'investor-referrals') {
        return 'Referral program';
      }
      return name;
    },
  },
};
</script>
