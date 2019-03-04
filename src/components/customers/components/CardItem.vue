<template>
<label class="customer-card-item__label">
  <p class="customer-card-item__label-text">{{ labelName }}</p>
  <div class="customer-card-item__input-wrapper">
    <input
      type="text"
      class="customer-card-item__input"
      v-model.trim='newValue'
      ref='myInput'
      @blur="resetValue"/>
    <div
      class="customer-card-item__buttons-wrapper">
      <a
        href="#"
        @click.prevent='checkValue'
        @focus="resetFlag = true"
        class='customer-card-item__button customer-card-item__button--save'>
        <icon-check2 class='customer-card-item__icon customer-card-item__icon--check'/>
      </a>
      <a
        href="#"
        @click.prevent='reject'
        @focus="resetFlag = true"
        class='customer-card-item__button customer-card-item__button--reject'>
        <icon-close class='customer-card-item__icon customer-card-item__icon--reject'/>
      </a>
    </div>
  </div>
</label>
</template>
<script>
import IconClose from '@/components/common/icons/IconClose.vue';
import IconCheck2 from '@/components/common/icons/IconCheck2.vue';
import validation from '@/js/validation';
import format from '@/js/format';
import { mapMutations } from 'vuex';

export default {
  name: 'CardItem',
  props: {
    labelName: {
      type: String,
    },
    getValue: {
      type: [String, Number],
    },
    inputType: {
      type: String,
    },
  },
  components: {
    IconClose,
    IconCheck2,
  },
  data() {
    return {
      newValue: '',
      resetFlag: false,
    };
  },
  methods: {
    ...mapMutations('investors', [
      'setValue',
    ]),
    save(type, value) {
      this.setValue([type, value]);
      this.resetFlag = false;
    },
    checkValue() {
      const type = this.inputType;
      if (type === 'age') {
        this.checkAge(type);
      } else if (type === 'phone') {
        this.checkPhone(type);
      } else if (type === 'name') {
        this.checkName(type);
      } else if (type === 'email') {
        this.checkEmail(type);
      } else {
        this.save(type, this.newValue);
      }
    },
    checkName(type) {
      const value = this.newValue;
      if (validation.name(value)) {
        this.save(type, value);
      } else {
        this.newValue = this.getValue;
      }
    },
    checkEmail(type) {
      const value = this.newValue;
      if (validation.email(value)) {
        this.save(type, value);
      } else {
        this.newValue = this.getValue;
      }
    },
    checkPhone(type) {
      const value = this.newValue;
      if (validation.phone(value)) {
        this.save(type, value);
      } else {
        this.newValue = this.getValue;
      }
    },
    checkAge(type) {
      const value = Number(this.newValue);
      if (validation.age(value)) {
        this.save(type, value);
      } else {
        this.newValue = this.getValue;
      }
    },
    reject() {
      this.newValue = this.getValue;
      this.$refs.myInput.blur();
    },
    checkReset() {
      const timer = setInterval(() => {
        if ((this.newValue !== this.getValue && !this.resetFlag)
          || this.newValue === this.getValue) {
          this.newValue = this.getValue;
          clearInterval(timer);
          this.resetFlag = false;
        }
      }, 10);
    },
    resetValue() {
      setTimeout(() => {
        this.checkReset();
      }, 500);
    },
    updateValue() {
      const timer = setInterval(() => {
        if (this.getValue) {
          this.newValue = this.getValue;
          clearInterval(timer);
        }
      }, 10);
    },
  },
  mounted() {
    this.updateValue();
  },
  watch: {
    newValue(value) {
      const type = this.inputType;
      if (type === 'phone' && validation.phone(value)) {
        this.newValue = format.phone(value);
      }
    },
  },
};
</script>
<style lang="scss">
.customer-card-item {
  @include flex-col(flex-start, stretch);
  width: 100%;
  &__label-text {
    font-size: $H300;
    color: $N7;
    font-weight: 500;
    margin-bottom: 6px;
  }
  &__input-wrapper {
    position: relative;
  }
  &__input {
    @extend %input;
    border: 1px solid transparent;
    position: relative;
    left: -12px;
    min-height: 30px;
    width: 100%;
    @media screen and (min-width: $screen-tablet) {
      &:hover {
        border-color: transparent;
        cursor: pointer;
      }
    }
    &:focus {
      cursor: text;
      border-color: $B5;
    }
    &:focus + .customer-card-item__buttons-wrapper {
      visibility: visible;
      opacity: 1;
    }
  }
  &__buttons-wrapper {
    visibility: hidden;
    opacity: 0;
    position: absolute;
    left: -12px;
    top: 100%;
    width: 100%;
    pointer-events: none;
    @include flex-row(flex-end, center);
    transition-property: visibility, opacity;
    transition-duration: 0.2s;
    transition-timing-function: ease-in-out;
    &:active {
      visibility: visible;
      opacity: 1;
    }
  }
  &__button {
    width: 26px;
    height: 26px;
    pointer-events: all;
    @include flex-row(center, center);
    &--save {
      background-color: $B4;
    }
    &--reject {
      background-color: $N9;
    }
  }
  &__icon {
    width: 11px;
    height: 11px;
    fill: $N0;
    &--check {
      width: 18px;
      height: 18px;
    }
  }
}
</style>
