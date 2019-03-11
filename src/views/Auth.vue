<template>
<transition
  name="custom-classes-transition"
  enter-active-class="animated dur03 fadeIn"
  leave-active-class="animated dur03 fadeOut"
  mode="out-in"
>
  <router-view class="auth-box"/>
</transition>
</template>
<script>

export default {
  name: 'Auth',
};
</script>
<style lang="scss">
.auth-box {
  flex: 1 1;
}
</style>
