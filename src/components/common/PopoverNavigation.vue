<template>
<div class="popover-navigation popover-revert">
  <div class="popover-revert__inner">
    <a href="#" class="popover-revert__button">
      <router-link to='/profile' class="popover-revert__text">Profile settings</router-link>
    </a>
    <div class="popover-revert__link-wrapper">
      <a href="#" class="popover-revert__link">Subscription Plan Settings</a>
      <a href="#" class="popover-revert__link">Help Center</a>
      <a href="#" class="popover-revert__link">Status Page</a>
    </div>
    <a @click='logout' href="#" class="popover-revert__button">
      <router-link to='/auth' class="popover-revert__text">Log out</router-link>
    </a>
  </div>
</div>
</template>
<script>
export default {
  name: 'PopoverNavigation',
  methods: {
    logout() {
      this.$router.push('/auth');
    },
  },
};
</script>
<style lang="scss">
.popover-navigation {
 padding-bottom: 24px;
}
</style>
