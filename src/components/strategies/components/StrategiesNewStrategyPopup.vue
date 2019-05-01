<template>
  <div class="strategies-new-popup">
    <div class="popup-layer"></div>
    <div class="strategies-new-popup__card">
      <header class="strategies-new-popup__header">
        <button-back
          @click.native='close'
          class="strategies-new-popup__button-back"
          label='Back to Strategies'/>
        <h2 class="strategies-new-popup__title">
          Create New Strategy
        </h2>
      </header>
      <div class="strategies-new-popup__body">
        <step-item
          label='Strategy name'
          :stepNumber='1'
          :readyFirst='true'
          :readySecond='step1'
          >
          <input
            type="text"
            class="strategies-new-popup__input"
            v-model='name'>
        </step-item>
        <!-- TODO: Checkbox -->
        <step-item
          label='Choose exchange'
          :stepNumber='2'
          :readyFirst='step1'
          :readySecond='step2'
          >
          <exchange-checkbox
            :val='n + 1'
            :label='`Label ${n}`'
            v-model='exchanges'
            v-for='n in 6'
            :key='n'/>
          <subtle-icon
            @click.native='addExchange'
            label='Add new exchange'
            class='strategies-new-popup__add-button'>
            <icon-plus class='icon-button-left'/>
          </subtle-icon>
          <subtle-icon
            @click.native='addAsset'
            label='Add your local asset' 
            class='strategies-new-popup__add-button'>
            <icon-plus class='icon-button-left'/>
          </subtle-icon>
        </step-item>
        <!-- TODO: Radio -->
        <step-item
          label='Lock-up period'
          :stepNumber='3'
          :readyFirst='step2'
          :readySecond='step3'
          >
          <radio
            class='strategies-new-popup__radio'
            v-for='(item, index) in periods'
            :key='index'
            :val='item.val'
            :label='item.label'
            v-model='period'/>
          <date-range-picker
            class='strategies-new-popup__date'
            v-model="range"
            :options="options"
            v-if='period === "custom"'/>
        </step-item>
        <!-- TODO: Radio -->
        <step-item
          label='Select currency'
          :stepNumber='4'
          :readyFirst='step3'
          :readySecond='step4'
          :line='false'
          >
          <radio-button
            class='strategies-new-popup__radio-button'
            :val='item'
            :label='item'
            v-model='currency'
            v-for='(item, index) in currencies'
            :key='index'/>
        </step-item>
        <step-item
          label='Minimal amount for invesment'
          :stepNumber='5'
          :readyFirst='step4'
          :readySecond='step5'
          :line='false'
          >
          <input
            type="text"
            class="strategies-new-popup__input"
            v-model.trim='minimalAmount'>
        </step-item>
        <step-item
          label='Description'
          :stepNumber='6'
          :readyFirst='step5'
          :readySecond='step6'
          :line='false'
          >
          <textarea-autosize
            ref="someName"
            v-model="description"
            :min-height="30"
            class="strategies-new-popup__textarea"
          ></textarea-autosize>
        </step-item>
      </div>
      <div class="strategies-new-popup__button-wrapper">
        <button-secondary @click.native='close' label='Cancel'/>
        <button-primary
          @click.native='add'
          :disabled='!step6'
          label='Create Strategy'
          :loading='loading'/>
        <button-transparent @click.native='close' label='Cancel'/>
      </div>
    </div>
  </div>
</template>
<script>
import IconLongArrowLeft from '@/components/common/icons/IconLongArrowLeft.vue';
import StepItem from '@/components/common/step/StepItem.vue';
import validation from '@/js/validation';
import IconPlus from '@/components/common/icons/IconPlus.vue';
import Radio from '@/components/common/form/Radio.vue';
import RadioButton from '@/components/common/form/RadioButton.vue';
import ExchangeCheckbox from './ExchangeCheckbox.vue';
import { mapState, mapActions } from 'vuex';

export default {
  name: 'StrategiesNewStrategyPopup',
  components: {
    StepItem,
    IconLongArrowLeft,
    ExchangeCheckbox,
    IconPlus,
    Radio,
    RadioButton,
  },
  data() {
    return {
      name: '',
      exchanges: [],
      periods: [
        { label: 'Week', val: 'week' },
        { label: 'Month', val: 'month' },
        { label: 'Year', val: 'year' },
        { label: 'Custom', val: 'custom' },
      ],
      period: '',
      currency: '',
      minimalAmount: '',
      description: '',
      loading: false,
      currencies: ['BTC', 'ETH'],
      options: {
        locale: {
          format: 'MMMM DD, YYYY'
        }
      },
    };
  },
  methods: {
    add() {
      this.loading = true;
      setTimeout(() => this.loading = false, 1500);
    },
    addAsset() {
      this.$emit('addAsset');
    },
    addExchange() {
      this.$emit('addExchange');
    },
    close() {
      this.$emit('close');
    },
  },
  computed: {
    step1() {
      return !!this.name;
    },
    step2() {
      return !!(this.step1 && this.exchanges.length);
    },
    step3() {
      return !!(this.step2 && this.period);
    },
    step4() {
      return !!(this.step3 && this.currency);
    },
    step5() {
      return !!(this.step4 && this.minimalAmount > 0);
    },
    step6() {
      return !!(this.step5 && this.description);
    },
  },
  watch: {
    minimalAmount(value) {
      if (!Number.isNaN(value)) {
        this.minimalAmount = Number(value);
      } else {
        this.minimalAmount = '';
      }
    },
  }
};
</script>
<style lang="scss">
$strategies-new-popup: strategies-new-popup;
.#{$strategies-new-popup} {
  @extend %popup;
  &__card {
    @extend %popup-card;
  }
  &__title {
    @extend %popup-title;
  }
  &__header {
    @extend %popup-header;
    flex-direction: column;
    align-items: flex-start;
    padding-top: 0;
  }
  &__button-back {
    margin-bottom: 22px;
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
  &__textarea {
    @extend %textarea;
    width: 100%;
  }
  &__button-wrapper {
    @extend %popup-button-wrapper;
  }
  &__add-button {
    margin-bottom: 12px;
  }
  &__radio {
    margin-bottom: 16px;
  }
  &__radio-button {
    min-width: 96px;
    margin-right: 16px;
  }
  &__date {
    @extend %badge;
    position: relative;
    z-index: 5;
    border: none;
    outline: none;
    padding: 2px 10px;
    margin: 0;
    min-width: 220px;
    text-align: center;
  }
}
</style>
