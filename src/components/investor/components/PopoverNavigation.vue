<template>
<div class="popover mobile-popover-nav">
  <div class="popover__inner popover__inner--pure mobile-popover-nav__inner">
    <a @click.prevent='openProfile' href="#" class="popover__item popover__item--icon">
      <icon-investor class="popover__icon"/>
      <p class="popover__text">Profile settings</p>
    </a>
    <!-- <div class="popover-revert__link-wrapper">s
      <a href="#" class="popover-revert__link">Subscription Plan Settings</a>
      <a href="#" class="popover-revert__link">Help Center</a>
      <a href="#" class="popover-revert__link">Status Page</a>
    </div> -->
    <a @click.prevent='logout' href="#" class="popover__item popover__item--icon">
      <icon-exit class="popover__icon"/>
      <p class="popover__text">Log out</p>
    </a>
  </div>
</div>
</template>
<script>
import IconInvestor from '@/components/common/icons/IconInvestor.vue';
import IconExit from '@/components/common/icons/IconExit.vue';
import { mapActions, mapState, mapMutations } from 'vuex';

export default {
  name: 'PopoverNavigation',
  components: {
    IconInvestor,
    IconExit,
  },
  methods: {
    ...mapActions('investorLogin', [
      'AUTH_LOGOUT',
    ]),
    ...mapMutations('profile', [
      'deleteSurvey',
    ]),
    logout() {
      this.AUTH_LOGOUT()
        .then(() => {
          this.$router.push({ name: 'investor-login' })
        });
    },
    openProfile() {
      this.$router.push('/investor/profile');
      this.$emit('closeNav');
    },
  },
  computed: {
    ...mapState({
      isSurveyDirector: state => state.profile.survey,
    }),
  },
};
</script>
<style lang="scss">
.mobile-popover-nav {
  padding-bottom: 32px;
  &__inner {
    width: 240px;
  }
}
</style>
