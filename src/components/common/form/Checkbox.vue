<template>
<label class="checkbox-input">
  <input
    type="checkbox"
    class="checkbox-input__input"
    :value="val"
    v-model="checked"
    @change="onChange">
  <div class="checkbox-input__inner">
    <div class="checkbox-input__cell">
      <icon-check class='checkbox-input__image'/>
    </div>
  </div>
</label>
</template>
<script>
import IconCheck from '@/components/common/icons/IconCheck.vue';

export default {
  name: 'Checkbox',
  components: {
    IconCheck,
  },
  props: ['val', 'value'],
  computed: {
	  checked: {
      get() {
        return this.value;
      },
      set(val) {
        this.checkedProxy = val;
      }
    }
  },
  methods: {
    onChange(e) {
      this.$emit('input', this.checkedProxy)
    }
  },
}
</script>
<style lang="scss">
$checkbox-input: checkbox-input;
.#{$checkbox-input} {
  position: relative;
  @include flex-row(flex-start, center);
  z-index: 1;
  &__input {
    position: absolute;
    left: 2px;
    top: 6px;
    opacity: 0;
    z-index: -1;
    visibility: hidden;
    &:checked + .#{$checkbox-input}__inner {
      .#{$checkbox-input}__cell {
        background-color: $B4;
        border-color: $B4;
      }
      .#{$checkbox-input}__image {
        opacity: 1;
      }
    }
  }
  &__inner {
    @include flex-row(flex-start, center);
  }
  &__cell {
    width: 22px;
    height: 22px;
    @include flex-row(center, center);
    background-color: $N8;
    border: 1px solid $N9;
    border-radius: 4px;
    transition-property: background-color, border-color;
    transition-duration: 0.2s;
    transition-timing-function: ease-in-out;
    cursor: pointer;
    @media screen and (min-width: $screen-tablet) {
      width: 16px;
      height: 16px;
    }
  }
  &__image {
    margin-left: 1px;
    width: 14px;
    height: 14px;
    fill: $N0;
    opacity: 0;
    transition-property: fill, opacity;
    transition-duration: 0.2s;
    transition-timing-function: ease-in-out;
    @media screen and (min-width: $screen-tablet) {
      width: 9px;
      height: 9px;
    }
  }
}
</style>