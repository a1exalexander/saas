<template>
<div class="transaction-box" @click='visible.search = false'>
  <div class="transaction-box__head">
    <div class="transaction-box__row transaction-box__row--margin transaction-box__row--space">
      <h2 class="transaction-box__title">Payouts</h2>
      <div class="transaction-box__search-mobile">
        <transition
          name="custom-classes-transition"
          enter-active-class="animated dur02 fadeIn"
          leave-active-class="animated dur02 fadeOut"
          appear
          mode="out-in"
        >
        <a
          href="#"
          class="transaction-box__search-label"
          v-if='!visible.search'
          @click.stop.prevent='visible.search = true'
          key='icon'>
          <icon-search class="transaction-box__search-icon transaction-box__search-icon--static"/>
        </a>
        <label
          @click.stop
          class="transaction-box__search-label"
          v-else key='input'>
          <icon-search class="transaction-box__search-icon"/>
          <input
            type="text"
            class="transaction-box__search-input"
            v-model='search'
            placeholder="Search...">
        </label>
        </transition>
      </div>
      <div class="transaction-box__search-tablet">
        <label
          @click.stop
          class="transaction-box__search-label">
          <icon-search class="transaction-box__search-icon"/>
          <input
            type="text"
            class="transaction-box__search-input"
            v-model='search'
            placeholder="Search...">
        </label>
      </div>
    </div>
    <ul class="transaction-box__thead">
      <li class="transaction-box__item">
        <p class="transaction-box__text">Investor</p>
        <icon-dropdown class='transaction-box__item-icon'/>
      </li>
      <li class="transaction-box__item transaction-box__item--end">
        <p class="transaction-box__text">Date</p>
        <icon-dropdown class='transaction-box__item-icon'/>
      </li>
      <li class="transaction-box__item">
        <p class="transaction-box__text">Currency</p>
        <icon-dropdown class='transaction-box__item-icon'/>
      </li>
      <li class="transaction-box__item">
        <p class="transaction-box__text">Payout address</p>
        <icon-dropdown class='transaction-box__item-icon'/>
      </li>
      <li class="transaction-box__item transaction-box__item--end">
        <p class="transaction-box__text">Amount</p>
        <icon-dropdown class='transaction-box__item-icon'/>
      </li>
      <li class="transaction-box__item">
        <p class="transaction-box__text">Status</p>
        <icon-dropdown class='transaction-box__item-icon'/>
      </li>
    </ul>
  </div>
  <div class="transaction-box__field">
    <transition-group name="list-complete" tag="div">
      <payout-card
        class='list-complete-item'
        v-for='(payout, index) in payouts'
        :key='`${index}${payout.id}`'
        :payout='payout'/>
    </transition-group>
  </div>
</div>
</template>
<script>
import IconSearch from '@/components/common/icons/IconSearch.vue';
import IconDropdown from '@/components/common/icons/IconDropdown.vue';
import PayoutCard from '@/components/transactions/components/PayoutCard.vue';
import { mapMutations, mapState, mapGetters, mapActions } from 'vuex';

export default {
  name: 'Payouts',
  components: {
    IconSearch,
    PayoutCard,
    IconDropdown,
  },
  data() {
    return {
      visible: {
        search: false,
      },
    };
  },
  methods: {
    ...mapMutations('transactions', {
      setSearch: 'setPayoutSearch',
      clearSearch: 'clearSearch',
    }),
    ...mapActions('transactions', [
      'getPayouts',
    ]),
  },
  computed: {
    ...mapState('transactions', {
      getSearch: state => state.searchPayouts,
    }),
    ...mapGetters('transactions', {
      payouts: 'getPayouts',
    }),
    search: {
      get() {
        return this.getSearch;
      },
      set(chars) {
        this.setSearch(chars);
      },
    },
  },
  beforeDestroy() {
    this.clearSearch();
  },
  created() {
    this.getPayouts()
      .then(resp => console.log(resp))
      .catch(error => console.log(error))
  },
};
</script>
<style lang="scss">
@import '~@/scss/components/transactions-box';
</style>
