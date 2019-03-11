<template>
<div class="investor">
<transition
  name="custom-classes-transition"
  enter-active-class="animated dur03 fadeIn"
  leave-active-class="animated dur03 fadeOut"
  mode="out-in"
>
  <router-view class="investor__view"/>
</transition>
</div>
</template>
<script>

export default {
  name: 'Investor',
};
</script>
<style lang="scss">
.investor {
  min-height: 100vh;
}
</style>
