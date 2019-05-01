<template>
  <button @click="onClick" class='button-transparent' :disabled='disabled'>
    <slot/>
    <span v-if='label'>{{ label }}</span>
  </button>
</template>
<script>
export default {
  name: 'ButtonTransparent',
  props: {
    disabled: {
      type: Boolean,
      default: false,
    },
    label: {
      type: String,
      default: '',
    },
  },
  methods:{
    onClick(){ this.$emit('click'); },
  },
};
</script>
<style lang="scss">
.button-transparent {
  background-color: transparent;
  @include flex-row(center, center);
  color: $N6;
  font-size: $H500;
  font-weight: 400;
  border-radius: 2px;
  padding: 16px 20px;
  line-height: 1;
  transition-property: color, background-color, min-height, font-size;
  transition-duration: 0.2s;
  transition-timing-function: ease-in-out;
  transition-duration: 0.2s;
  transition-timing-function: ease-in-out;
  position: relative;
  @media screen and (min-width: $screen-tablet) {
    padding: 10px 20px;
    font-size: $H200;
  }
  &:hover {
    @media screen and (min-width: $screen-desktop) {
      background-color: $N5;
      color: $N9;
    }
  }
  &:active {
    background-color: $N0;
  }
  &:disabled {
    color: $N8;
  }
}
</style>
