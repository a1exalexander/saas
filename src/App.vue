<template>
  <div id="app">

    <flag-message-error v-if='isMessage.error'/>
    <flag-message-info v-if='isMessage.info'/>
    <flag-message-success v-if='isMessage.success'/>

    <transition
      name="custom-classes-transition"
      enter-active-class="animated dur02 fadeIn"
      leave-active-class="animated dur02 fadeOut"
      appear
      mode="out-in"
    >
      <router-view/>
    </transition>
  </div>
</template>
<script>
import { mapMutations, mapState } from 'vuex';

export default {
  name: 'App',
  computed: {
    ...mapState({
      isMessage: state => state.messages.isMessage
    })
  },
};
</script>

<style>
</style>
