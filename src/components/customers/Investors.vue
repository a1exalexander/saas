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
  <div class="investors__field investors__field--no-yet" v-if='!isInvestors'>
    <icon-investor class='investors__main-icon'/>
    <p class="investors__caption">No investors yet</p>
    <p class="investors__text investors__text--center"
      >Investors will appear here after making investments in your fund.
      You can also invite an investor
    </p>
    <button-primary-icon @click.native='addInvestor'>
      <icon-plus class='icon-button-left icon-large'/>
      <span>Add an investor</span>
    </button-primary-icon>
  </div>
  <div class="investors__field" v-else>
    <div class="investors__header">
      <h2 class="investors__title">Investors</h2>
      <subtle-icon
        class='investors__add-button'
        @click.native='addInvestor'>
        <icon-plus class='icon-button-left icon-large'/>
        <span>Add an investor</span>
      </subtle-icon>
    </div>
    <transition-group name="list-complete" tag="div">
    <investor
      v-for='investor in investors'
      :key='investor.id'
      :investor='investor'
      class="list-complete-item"/>
    </transition-group>
  </div>
</main>
</template>
<script>
import IconInvestor from '@/components/common/icons/IconInvestor.vue';
import IconPlus from '@/components/common/icons/IconPlus.vue';
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
  &__field {
    &--no-yet {
      @include flex-col(flex-start, center);
      padding: 80px 36px 32px;
    }
  }
  &__main-icon {
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
  &__title {
    font-size: $H700;
    font-weight: 500;
  }
}
</style>
