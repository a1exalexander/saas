<template>
  <button
    class='button-dash-icon'
    :disabled='disabled'
    :class='{"button-loading": loading}'>
    <div class="button-dash-icon__border"></div>
    <slot/>
    <span v-if='label'>{{ label }}</span>
  </button>
</template>
<script>
export default {
  name: 'ButtonDashIcon',
  props: {
    disabled: {
      type: Boolean,
      default: false,
    },
    label: {
      type: String,
      default: '',
    },
    loading: {
      type: Boolean,
      default: false,
    },
  },
};
</script>
<style lang="scss">
.button-dash-icon {
  @extend %button-dash;
}
</style>
