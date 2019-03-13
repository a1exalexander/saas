<template>
<main class='investors'>
  <transition
    name="custom-classes-transition"
    enter-active-class="animated dur06 fadeIn"
    leave-active-class="animated dur04 fadeOut"
    mode="out-in">
  <add-investor-popup
    @cancel='closeAddInvestorPopup'
    v-if='addInvestorPopup'/>
  </transition>
  <div class="investors__head">
    <div class="investors__title-wrapper">
      <h2 class="investors__title">Investors</h2>
      <subtle-icon
        v-if='isInvestors'
        class="investors__export-button">
        <icon-base class='icon-button-left'/>
        <span>Export</span>
      </subtle-icon>
    </div>
    <ul class="investors__head-list">
      <li class="investors__head-item">Full name</li>
      <li class="investors__head-item">Email</li>
      <li
        class="investors__head-item investors__head-item--phone investors__head-item--end"
        >Phone
      </li>
      <li class="investors__head-item">Relationship manager</li>
      <li class="investors__head-item investors__head-item--end">Total balance</li>
      <li
        class="investors__head-item investors__head-item--tokens investors__head-item--end"
        >Tokens
      </li>
      <li class="investors__head-item">Requests</li>
    </ul>
  </div>
  <div class="investors__field investors__field--no-yet" v-if='!isInvestors'>
    <icon-investor class='investors__main-icon'/>
    <p class="investors__caption">No investors yet</p>
    <p class="investors__text investors__text--center"
      >Investors will appear here after making investments in your fund.
      You can also invite an investor
    </p>
    <!-- TODO: coming soon -->
    <!-- <button-primary-icon @click.native='addInvestor'>
      <icon-plus class='icon-button-left investors__icon-button'/>
      <span>Add an investor</span>
    </button-primary-icon> -->
  </div>
  <div class="investors__field" v-else>
    <div class="investors__subfield-mobile">
      <div class="investors__header">
        <h2 class="investors__title">Investors</h2>
        <subtle-icon
          class='investors__add-button'
          @click.native='addInvestor'>
          <icon-plus class='icon-button-left icon-large'/>
          <span>Add an investor</span>
        </subtle-icon>
      </div>
      <transition-group name="list-complete">
      <investor
        v-for='investor in investors'
        :key='investor.id'
        :investor='investor'
        class="list-complete-item"
        @click.native='openProfile(investor.id)'/>
      </transition-group>
    </div>
    <div class="investors__subfield-tablet">
      <transition-group name="list-complete">
      <investor
        v-for='investor in investors'
        :key='investor.id'
        :investor='investor'
        class="list-complete-item"/>
      </transition-group>
    </div>
  </div>
</main>
</template>
<script>
import IconInvestor from '@/components/common/icons/IconInvestor.vue';
import IconPlus from '@/components/common/icons/IconPlus.vue';
import IconBase from '@/components/common/icons/IconBase.vue';
import SubtleIcon from '@/components/common/buttons/SubtleIcon.vue';
import ButtonPrimaryIcon from '@/components/common/buttons/ButtonPrimaryIcon.vue';
import AddInvestorPopup from '@/components/customers/AddInvestorPopup.vue';
import Investor from '@/components/customers/components/Investor.vue';
import { mapGetters, mapState } from 'vuex';

export default {
  name: 'Investors',
  components: {
    IconInvestor,
    ButtonPrimaryIcon,
    IconPlus,
    AddInvestorPopup,
    SubtleIcon,
    Investor,
    IconBase,
  },
  data() {
    return {
      addInvestorPopup: false,
    };
  },
  methods: {
    addInvestor() {
      this.addInvestorPopup = true;
    },
    closeAddInvestorPopup() {
      this.addInvestorPopup = false;
    },
    openProfile(id) {
      this.$router.push({ path: `/director/customers/profile/${id}` });
    },
  },
  computed: {
    ...mapState('investors', [
      'investors',
    ]),
    ...mapGetters('investors', [
      'isInvestors',
    ]),
  },
};
</script>
<style lang="scss">
.investors {
  background-color: $N13;
  @media screen and (min-width: $screen-tablet) {
    flex: 1 1;
    display: flex;
    flex-direction: column;
  }
  &__field {
    &--no-yet {
      @include flex-col(flex-start, center);
      padding: 80px 36px 32px;
      @media screen and (min-width: $screen-tablet) {
        padding-top: 100px;
        flex: 1 1;
      }
    }
    @media screen and (min-width: $screen-tablet) {
      flex: 1 1;
      display: flex;
      flex-direction: column;
    }
  }
  &__main-icon {
    flex-shrink: 0;
    width: 64px;
    height: 64px;
    fill: $N8;
    margin-bottom: 12px;
  }
  &__caption {
    font-size: $H700;
    font-weight: 500;
    margin-bottom: 16px;
  }
  &__text {
    color: $N5;
    font-weight: 500;
    font-size: $H300;
    margin-bottom: 32px;
    &--center {
      text-align: center;
    }
  }
  &__header {
    @include flex-row(space-between, center);
    padding: 24px 28px 8px;
  }
  &__head {
    display: none;
    @media screen and (min-width: $screen-tablet) {
      display: block;
      padding: 32px 40px 6px;
      border-bottom: 1px solid $N11;
    }
  }
  &__head-list {
    list-style: none;
    display: grid;
    grid-template-columns: 3fr 2.5fr 2fr 2.2fr 1.4fr 1fr 2fr 0.5fr;
    justify-content: space-between;
    grid-column-gap: 10px;
  }
  &__head-item {
    font-size: $H300;
    font-weight: 500;
    color: $N7;
    &--end {
      justify-self: end;
    }
    &--phone {
      margin-right: 20px;
    }
    &--tokens {
      margin-right: 20px;
    }
  }
  &__title {
    font-size: $H700;
    font-weight: 500;
    @media screen and (min-width: $screen-tablet) {
      font-size: $H800;
      font-weight: 600;
    }
  }
  &__title-wrapper {
    @include flex-row(flex-start, baseline);
    margin-bottom: 22px;
  }
  &__subfield-mobile {
    @media screen and (min-width: $screen-tablet) {
      display: none;
    }
  }
  &__subfield-tablet {
    display: none;
    @media screen and (min-width: $screen-tablet) {
      display: block;
      flex: 1 1;
      overflow-y: auto;
    }
  }
  &__icon-button {
    width: 15px;
    height: 15px;
  }
  &__export-button {
    display: none;
    @media screen and (min-width: $screen-tablet) {
      margin-left: 16px;
      display: block;
      svg {
        width: 14px;
        height: 14px;
      }
    }
  }
}
</style>
