<template>
  <button @click="onClick" class='subtle'>
    <div class="subtle__border"></div>
    <slot/>
    <span v-if='label'>{{ label }}</span>
  </button>
</template>
<script>
export default {
  name: 'Subtle',
  props: {
    label: {
      type: String,
      default: '',
    },
  },
  methods:{
    onClick(){ this.$emit('click'); },
  }

};
</script>
<style lang="scss">
.subtle {
  background-color: transparent;
  @include flex-row(center, center);
  color: $B2;
  font-size: $H400;
  font-weight: 500;
  line-height: 1.1;
  transition: all ease-in-out 0.2s;
  border-radius: 2px;
  position: relative;
  @media screen and (min-width: $screen-tablet) {
    font-size: $H200;
    &:hover {
      color: $B1;
    }
  }
  &:focus {
    border-color: $B2;
  }
  &:focus &__border {
    visibility: visible;
    opacity: 1;
  }
  &:active {
    color: $B5;
  }
  &:active &__border {
    opacity: 0;
  }
  &:disabled {
    color: $N9;
  }
  &__border {
    position: absolute;
    background-color: transparent;
    border-radius: 2px;
    border: 1px solid $B2;
    left: -6px;
    right: -6px;
    top: -6px;
    bottom: -6px;
    visibility: hidden;
    opacity: 0;
  }
}
</style>
