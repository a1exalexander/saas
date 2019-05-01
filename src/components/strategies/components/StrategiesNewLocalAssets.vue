<template>
  <div class="strategies-local-popup" @click.self='close'>
    <div class="popup-layer"></div>
    <div class="strategies-local-popup__card">
      <close-button
        class="strategies-local-popup__close"
        @click.native='close'/>
      <header class="strategies-local-popup__header">
        <h2 class="strategies-local-popup__title">
          Add newlocal Asset
        </h2>
      </header>
      <div class="strategies-local-popup__body">
        <step-item
          label='Symbol'
          :stepNumber='1'
          :readyFirst='true'
          :readySecond='step1'
          >
          <input
            type="text"
            class="strategies-local-popup__input"
            v-model='symbol'>
        </step-item>
        <step-item
          label='Price in USD'
          :stepNumber='2'
          :readyFirst='step1'
          :readySecond='step2'
          >
          <input
            type="text"
            class="strategies-local-popup__input"
            v-model.trim.number='price'>
        </step-item>
        <step-item
          label='Balance'
          :stepNumber='3'
          :readyFirst='step2'
          :readySecond='step3'
          >
          <input
            type="text"
            class="strategies-local-popup__input"
            v-model.trim.number='balance'>
        </step-item>
        <step-item
          label='Description'
          :stepNumber='4'
          :readyFirst='step3'
          :readySecond='step4'
          :line='false'
          >
          <input
            type="text"
            class="strategies-local-popup__input"
            v-model='description'>
        </step-item>
      </div>
      <div class="strategies-local-popup__button-wrapper">
        <button-secondary
          @click.native='close'
          label='Cancel'/>
        <button-primary
          :disabled='!step4'
          @click.native='done'
          :loading='loading'
          label='Add Asset'/>
        <button-transparent
          @click.native='close'
          label='Cancel'/>
      </div>
    </div>
  </div>
</template>
<script>
import CloseButton from '@/components/common/buttons/CloseButton.vue';
import StepItem from '@/components/common/step/StepItem.vue';
import validation from '@/js/validation';
import { mapState, mapActions } from 'vuex';

export default {
  name: 'StrategiesNewLocalAssets',
  components: {
    CloseButton,
    StepItem,
  },
  data() {
    return {
      symbol: '',
      price: '',
      balance: '',
      description: '',
      loading: false,
    };
  },
  methods: {
    done() {
      this.loading = true;
      setTimeout(() => this.loading = false, 1500);
    },
    close() {
      this.$emit('close');
    },
  },
  computed: {
    step1() {
      return !!this.symbol;
    },
    step2() {
      return !!(this.step1 && this.price);
    },
    step3() {
      return !!(this.step2 && this.balance);
    },
    step4() {
      return !!(this.step3 && this.description);
    },
  },
  watch: {
    price(value) {
      if (!Number.isNaN(value)) {
        this.price = Number(value);
      } else {
        this.price = '';
      }
    },
    balance(value) {
      if (!Number.isNaN(value)) {
        this.balance = Number(value);
      } else {
        this.balance = '';
      }
    }
  }
};
</script>
<style lang="scss">
$strategies-local-popup: strategies-local-popup;
.#{$strategies-local-popup} {
  @extend %popup;
  &__card {
    @extend %popup-card;
  }
  &__title {
    @extend %popup-title;
  }
  &__header {
    @extend %popup-header;
  }
  &__close {
    @extend %popup-close-button;
  }
  &__body {
    margin-bottom: 16px;
  }
  &__input {
    @extend %input;
    width: 100%;
  }
  &__button-wrapper {
    @extend %popup-button-wrapper;
  }
}
</style>
