<template>
<div class="popover-navigation popover-revert">
  <div class="popover-revert__inner">
    <a @click.prevent='openProfile' href="#" class="popover-revert__button">
      <p class="popover-revert__text">Profile settings</p>
    </a>
    <div class="popover-revert__link-wrapper">
      <a href="#" class="popover-revert__link">Subscription Plan Settings</a>
      <a href="#" class="popover-revert__link">Help Center</a>
      <a href="#" class="popover-revert__link">Status Page</a>
    </div>
    <a @click.prevent='logout' href="#" class="popover-revert__button">
      <p class="popover-revert__text">Log out</p>
    </a>
  </div>
</div>
</template>
<script>
import { mapActions } from 'vuex';

export default {
  name: 'PopoverNavigation',
  methods: {
    ...mapActions('login', [
      'AUTH_LOGOUT',
    ]),
    logout() {
      this.AUTH_LOGOUT()
        .then(() => {
          this.$router.push('/auth');
        });
    },
    openProfile() {
      this.$router.push('/director/profile');
      this.$emit('closeNav');
    },
  },
};
</script>
<style lang="scss">
.popover-navigation {
 padding-bottom: 24px;
}
</style>
