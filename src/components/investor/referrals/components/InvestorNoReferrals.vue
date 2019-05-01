<template>
  <div class="noreferrals">
    <div class="noreferrals__logo">
      <icon-investor class='noreferrals__main-icon'/>
      <p class="noreferrals__text">You have not referrals yet</p>
    </div>
    <button-primary-icon
    @click.native='invite'
    class="noreferrals__button"
    >
      <icon-add-person class="icon-button-left"/>
      <span>Invite referrals</span>
    </button-primary-icon>
  </div>
</template>
<script>
import IconInvestor from '@/components/common/icons/IconInvestor.vue';
import IconAddPerson from '@/components/common/icons/IconAddPerson.vue';

export default {
  name: 'InvestorNoReferrals',
  components: {
    IconInvestor,
    IconAddPerson,
  },
  methods: {
    invite() {
      this.$emit('invite');
    },
  },
};
</script>
<style lang="scss">
.noreferrals {
  @include flex-col(space-between, center);
  width: 100%;
  flex: 1 1;
  align-self: center;
  padding-bottom: 32px;
  padding-top: 60px;
  @media screen and (min-width: $screen-tablet) {
    padding-top: 85px;
    width: auto;
    justify-content: flex-start;
  }
  &__logo {
    @include flex-col(flex-start, center);
  }
  &__main-icon {
    fill: $N8;
    width: 64px;
    height: 64px;
    margin-bottom: 15px;
  }
  &__text {
    margin-bottom: 25px;
    @include text($H800, 500);
  }

  &__button {
    width: 100%;
    @media screen and (min-width: $screen-tablet) {
      width: auto;
    }
  }
}
</style>


