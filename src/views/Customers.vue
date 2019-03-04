<template>
  <div class="customers">
    <transition
      name="custom-classes-transition"
      enter-active-class="animated dur06 fadeIn"
      leave-active-class="animated dur04 fadeOut"
      mode="out-in">
    <add-investor-popup
      @cancel='closeAddCustomerPopup'
      v-if='addCustomerPopup'/>
    </transition>
    <header class="customers__header">
      <div class="customers__header-inner">
        <div class="customers__title-wrapper">
          <h1 class="customers__title">Customers</h1>
          <label class="customers__search-label" v-if='isInvestors'>
            <icon-search class="customers__search-icon"/>
            <input type="text" class="customers__search-input">
          </label>
        </div>
        <button-primary-icon @click.native='addCustomer' v-if='isInvestors'>
          <icon-plus class='icon-button-left icon-large'/>
          <span>Add an investor</span>
        </button-primary-icon>
      </div>
      <nav class="customers__nav">
        <ul class="customers__nav-list">
          <li class="customers__nav-item">
            <router-link
              to='/customers'
              class="customers__nav-link"
              :class='{"inline-nav-link-active": routeName === "Leads"}'>Leads
            </router-link>
          </li>
          <li class="customers__nav-item">
            <router-link
              to='/customers'
              class="customers__nav-link"
              :class='{"inline-nav-link-active": routeName === "Contacts"}'>Contacts
            </router-link>
          </li>
          <li class="customers__nav-item">
            <router-link
              to='/customers/investors'
              class="customers__nav-link"
              :class='{"inline-nav-link-active": routeName === "Investors"}'>Investors
            </router-link>
          </li>
        </ul>
      </nav>
    </header>
    <main class="customers__main">
      <router-view/>
    </main>
  </div>
</template>
<script>
import ButtonPrimaryIcon from '@/components/common/buttons/ButtonPrimaryIcon.vue';
import IconPlus from '@/components/common/icons/IconPlus.vue';
import AddInvestorPopup from '@/components/customers/AddInvestorPopup.vue';
import IconSearch from '@/components/common/icons/IconSearch.vue';
import { mapGetters } from 'vuex';

export default {
  name: 'Customers',
  components: {
    IconSearch,
    ButtonPrimaryIcon,
    IconPlus,
    AddInvestorPopup,
  },
  data() {
    return {
      addCustomerPopup: false,
    };
  },
  computed: {
    ...mapGetters('investors', [
      'isInvestors',
    ]),
    routeName() {
      return this.$route.name;
    },
  },
  methods: {
    addCustomer() {
      this.addCustomerPopup = true;
    },
    closeAddCustomerPopup() {
      this.addCustomerPopup = false;
    },
  },
};
</script>
<style lang="scss">
.customers {
  background-color: $N13;
  padding: 56px 0;
  height: 100vh;
  @include flex-col(stretch, stretch);
  @media screen and (min-width: $screen-tablet) {
    padding: 0;
    flex: 1 1;
  }
  &__header {
    background-color: $B12;
    padding: 32px 28px 0;
    @media screen and (min-width: $screen-tablet) {
      padding: 27px 40px 0;
    }
  }
  &__nav-list {
    @extend %inline-nav-list;
  }
  &__nav-item {
    @extend %inline-nav-item;
  }
  &__nav-link {
    @extend %inline-nav-link;
    &--active {
      border-color: $N2;
      color: $N2;
    }
  }
  &__main {
    flex: 1 1;
    overflow: auto;
    @media screen and (min-width: $screen-tablet) {
      overflow: hidden;
      display: flex;
      flex-flow: column nowrap;
      justify-content: stretch;
    }
  }
  &__header-inner {
    display: none;
    @media screen and (min-width: $screen-tablet) {
      display: flex;
      margin-bottom: 40px;
      justify-content: space-between;
    }
  }
  &__title {
    font-size: $H900;
    font-weight: 600;
    margin-right: 50px;
  }
  &__title-wrapper {
    @include flex-row(flex-start, center);
  }
  &__search-label {
    @extend %search-label;
  }
  &__search-icon {
    @extend %search-icon;
  }
  &__search-input {
    @extend %search-input;
  }
}
</style>
