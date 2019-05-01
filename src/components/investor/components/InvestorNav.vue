<template>
  <nav class='investor-nav'>
    <ul class='investor-nav__list'>
      <router-link
        :to='{ name: "investor-dashboard" }'
        :class='{"investor-nav__link--active": $route.name === "investor-dashboard"}'
        tag='li'
        class='investor-nav__link'>
        <icon-analytics class='investor-nav__icon'/>
        <span class='investor-nav__text'>Dashboard</span>
      </router-link>
      <router-link
        :to='{ name: "investor-history" }'
        :class='{"investor-nav__link--active": $route.name === "investor-history"}'
        tag='li'
        class='investor-nav__link'>
        <icon-exchanges class='investor-nav__icon'/>
        <span class='investor-nav__text'>History</span>
      </router-link>
      <router-link
        :to='{ name: "investor-referrals" }'
        :class='{"investor-nav__link--active": $route.name === "investor-referrals"}'
        tag='li'
        class='investor-nav__link'>
        <icon-exchanges class='investor-nav__icon'/>
        <span class='investor-nav__text'>Referrals</span>
      </router-link>
    </ul>
  </nav>
</template>
<script>
import IconAnalytics from '@/components/common/icons/IconAnalytics.vue';
import IconExchanges from '@/components/common/icons/IconExchanges.vue';

export default {
  name: 'InvestorNav',
  components: {
    IconAnalytics,
    IconExchanges,
  },
};
</script>
<style lang="scss">
$investor-nav: investor-nav;
.#{$investor-nav} {
  align-self: flex-end;
  &__list {
    list-style: none;
    @include flex-row(center, center);
  }
  &__link {
    @include flex-row(flex-start, flex-end);
    cursor: pointer;
    margin-right: 24px;
    padding: 0 11px 24px 8px;
    border-bottom: 2px solid transparent;
    transition: border-color ease-in-out 0.2s;
    &--active {
      border-color: $N0;
      .#{$investor-nav}__text {
        color: $N0;
      }
    }
  }
  &__icon {
    fill: $B4;
    width: 16px;
    height: 16px;
    margin-right: 8px;
  }
  &__text {
    @include text($H500, 500, $N0);
    transition: color ease-in-out 0.2s;
  }
}
</style>
