<template>
  <div id="app" @click='closeAllPopups'>
    <transition
      name="custom-classes-transition"
      enter-active-class="animated dur02 fadeIn"
      leave-active-class="animated dur02 fadeOut"
      appear
      mode="out-in">
    <router-view/>
    </transition>
  </div>
</template>
<script>
import { mapMutations } from 'vuex';

export default {
  name: 'App',
  methods: {
    ...mapMutations({
      billing: 'billing/closeAllMenu',
    }),
    closeAllPopups() {
      this.billing();
    },
  },
};
</script>
