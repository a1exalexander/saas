<template>
  <a href="#" class="invite-button">
    <icon-add-person class='invite-button__icon'/>
    <p class="invite-button__text">Invite new investors</p>
  </a>
</template>
<script>
import IconAddPerson from '@/components/common/icons/IconAddPerson.vue';

export default {
  name: 'InviteButton',
  components: {
    IconAddPerson,
  },
};
</script>
<style lang="scss">
.invite-button {
  padding: 16px;
  border: 1px solid $B66;
  @include flex-row(center, center);
  transition-property: border-color, background-color;
  transition-duration: 0.2s;
  transition-timing-function: ease-in-out;
  @media screen and (min-width: $screen-tablet) {
    padding: 9px;
  }
  @media screen and (min-width: $screen-desktop) {
    &:hover {
      border-color: $B4;
      .invite-button {
        &__icon {
          fill: $B1;
        }
        &__text {
          color: $B1;
        }
      }
    }
  }
  &:active {
    border-color: $B66;
    &__icon {
      fill: $B2;
    }
    &__text {
      color: $B2;
    }
  }
  &__icon {
    width: 18px;
    height: 18px;
    fill: $B2;
    margin-right: 6px;
    transition: fill ease-in-out 0.2s;
    @media screen and (min-width: $screen-tablet) {
      width: 14px;
      height: 14px;
    }
  }
  &__text {
    color: $B2;
    font-size: $H400;
    font-weight: 500;
    transition: color ease-in-out 0.2s;
    @media screen and (min-width: $screen-tablet) {
      font-size: $H100;
    }
  }
}
</style>
