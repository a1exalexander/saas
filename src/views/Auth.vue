<template>
<transition
  name="custom-classes-transition"
  enter-active-class="animated dur06 fadeIn"
  leave-active-class="animated dur03 fadeOut"
  mode="out-in"
>
  <router-view/>
</transition>
</template>
<script>

export default {
  name: 'Auth',
};
</script>
<style lang="scss">

</style>
