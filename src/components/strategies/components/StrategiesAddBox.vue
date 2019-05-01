<template>
  <div class="strategies-add-box">
    <label class="strategies-add-box__label">
      <span class="strategies-add-box__label-text">Name</span>
      <input type="text" v-model.trim='name' class="strategies-add-box__input">
    </label>
    <label class="strategies-add-box__label">
      <span class="strategies-add-box__label-text">Lock-up period</span>
      <div class="strategies-add-box__row">
        <div class="tumbler strategies-add-box__tumbler">
          <label
            class="tumbler__label"
            v-for="(item, index) in periods"
            :key='index'>
            <input
              type="radio"
              class="tumbler__input"
              name='period'
              :value='item.val'
              v-model='period'>
            <span class="tumbler__text">{{ item.label }}</span>
          </label>
        </div>
        <date-range-picker
          class='strategies-add-box__date'
          v-model="range"
          :options="options"
          :disabled='period !== "custom"'/>
      </div>
    </label>
    <label class="strategies-add-box__label">
      <span class="strategies-add-box__label-text">Select currency</span>
      <div class="strategies-add-box__row">
        <radio
          class='strategies-add-box__radio-button'
          :val='item.value'
          :label='item.name'
          v-model='currency'
          v-for='(item, index) in currencies'
          :key='index'/>
      </div>
    </label>
    <label class="strategies-add-box__label">
      <span class="strategies-add-box__label-text">Minimal amount for investment</span>
      <input type="text" v-model.trim='minimalAmount' class="strategies-add-box__input">
    </label>
    <label class="strategies-add-box__label">
      <span class="strategies-add-box__label-text">Description</span>
      <textarea-autosize
        ref="someName"
        v-model="description"
        :min-height="30"
        class="strategies-add-box__textarea"
      ></textarea-autosize>
    </label>
    <div class="strategies-add-box__row-end">
       <button-primary
        @click.native='create'
        :loading='loading'
        label='Create'
        :disabled='!allReady'/>
    </div>
  </div>
</template>
<script>
import validation from '@/js/validation';
import '@/scss/components/tumbler.scss';

export default {
  name: 'StrategiesAddBox',
  props: ['exchanges'],
  components: {
    
  },
  data() {
    return {
      name: '',
      periods: [
        { label: '1w', val: 'week' },
        { label: '1m', val: 'month' },
        { label: '1y', val: 'year' },
        { label: 'Custom', val: 'custom' },
      ],
      period: '',
      currency: '',
      minimalAmount: '',
      description: '',
      loading: false,
      currencies: [{name: 'Bitcoin', value: 'BTC'}, {name:'Ethereum' , value: 'ETH'}],
      options: {
        locale: {
          format: 'MMMM DD, YYYY'
        }
      },
    }
  },
  methods: {
    create() {
      this.loading = true;
      setTimeout(() => this.loading = false, 1500);
    },
  },
  computed: {
    allReady() {
      const newForm = {
        name: !!this.name,
        period: !!this.period,
        currency: !!this.currency,
        minimalAmount: !!this.minimalAmount,
        description: !!this.description,
        exchanges: !!this.exchanges.length,
      }
      return Object.values(newForm).every(e => e);
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
.strategies-add-box {
  margin-top: 20px;
  &__text {
    @include text($H100, 500);
    margin-bottom: 14px;
  }
  &__label {
    display: block;
    margin-bottom: 20px;
  }
  &__label-text {
    @extend %input-label-text;
  }
  &__input {
    @extend %input;
    width: 100%;
  }
  &__textarea {
    @extend %textarea;
    width: 100%;
    line-height: 1.5;
  }
  &__row {
    @include flex-row(flex-start, center);
  }
  &__row-end {
    @include flex-row(flex-end, center);
  }
  &__radio-button {
    margin-right: 20px;
  }
  &__tumbler {
    margin-right: 12px;
  }
  &__date {
    @extend %badge;
    position: relative;
    z-index: 5;
    border: none;
    outline: none;
    padding: 2px 6px 3px;
    margin: 0;
    min-width: 120px;
    flex: 0 1 50%;
    width: auto;
    cursor: pointer;
    text-align: center;
    &:disabled {
      color: $N8;
    }
  }
}
</style>
