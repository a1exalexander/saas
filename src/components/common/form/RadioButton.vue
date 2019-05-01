<template>
<label class="radio-button-input">
  <input
    type="radio"
    class="radio-button-input__input"
    :value="val"
    v-model="checked"
    @change="onChange">
  <div class="radio-button-input__button">
    <span
      v-if='!!label'
      >{{ label }}
    </span>
  </div>
</label>
</template>
<script>
export default {
  name: 'RadioButton',
  props: ['val', 'value', 'label'],
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
      this.$emit('input', this.checkedProxy);
    }
  }
};
</script>
<style lang="scss">
$radio-button-input: radio-button-input;
.#{$radio-button-input} {
  @extend %radio-button-label;
  &__input {
    @extend %radio-button-input;
    &:checked + .#{$radio-button-input}__button {
      @extend %radio-button-checked ;
    }
  }
  &__button {
    @extend %radio-button;
  }
}
</style>