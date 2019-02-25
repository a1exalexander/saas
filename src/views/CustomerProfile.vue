<template>
<div class='customer-profile'>
  <header class="customer-profile__header">
    <div class="customer-profile__card">
      <div class="customer-profile__image-wrapper">
        <img src="@/assets/images/ava.jpg" alt="" class="customer-profile__image">
      </div>
      <div class="customer-profile__item customer-profile__item--name">
        <h2 class="customer-profile__text customer-profile__text--name">Anton Brownstein</h2>
      </div>
      <div class="customer-profile__item customer-profile__item--id">
        <p class="customer-profile__text customer-profile__text--label">ID</p>
        <p class="customer-profile__text">
          12335562332
        </p>
      </div>
      <div class="customer-profile__item customer-profile__item--balance">
        <p class="customer-profile__text customer-profile__text--label">Total balance</p>
        <p class="customer-profile__text">
          $ 120,000
        </p>
      </div>
      <button
        class='customer-profile__button'
        v-html='"\&\#8226\&\#8226\&\#8226"'>
      </button>
    </div>
    <nav class="customer-profile__nav">
      <ul class="customer-profile__nav-list">
        <li class="customer-profile__nav-item">
          <router-link
            :to='{ name: "customer-introduction", params: { id: 1 } }'
            class="customer-profile__nav-link"
            :class='{"inline-nav-link-active": routeName === "customer-introduction"}'
            >Introduction
          </router-link>
        </li>
        <li class="customer-profile__nav-item">
          <router-link
            :to='{ name: "customer-introduction", params: { id: 1 } }'
            class="customer-profile__nav-link"
            :class='{"inline-nav-link-active": routeName === "customer-history"}'
            >Deals history
          </router-link>
        </li>
        <li class="customer-profile__nav-item">
          <router-link
            :to='{ name: "customer-introduction", params: { id: 1 } }'
            class="customer-profile__nav-link"
            :class='{"inline-nav-link-active": routeName === "customer-logs"}'
            >Logs
          </router-link>
        </li>
        <li class="customer-profile__nav-item">
          <router-link
            :to='{ name: "customer-introduction", params: { id: 1 } }'
            class="customer-profile__nav-link"
            :class='{"inline-nav-link-active": routeName === "customer-referrals"}'
            >Referrals
          </router-link>
        </li>
      </ul>
    </nav>
  </header>
  <router-view class='customer-profile__main'/>
</div>
</template>
<script>
export default {
  name: 'CustomerProfile',
  computed: {
    routeName() {
      return this.$route.name;
    },
  },
};
</script>
<style lang="scss">
.customer-profile {
  &__header {
    padding: 72px 28px 0;
    background-color: $B12;
  }
  &__image-wrapper {
    width: 60px;
    height: 60px;
    border-radius: 50%;
    overflow: hidden;
    grid-area: photo;
  }
  &__image {
    width: 100%;
    height: 100%;
  }
  &__card {
    display: grid;
    grid-template-columns: repeat(3, auto);
    grid-auto-rows: auto;
    grid-column-gap: 20px;
    grid-row-gap: 6px;
    grid-template-areas:
    'photo name button'
    'photo id .'
    'photo balance .';
    margin-bottom: 20px;
  }
  &__item {
    @include flex-row(flex-start, center);
    &--name {
      grid-area: name;
    }
    &--id {
      grid-area: id;
    }
    &--balance {
      grid-area: balance;
    }
  }
  &__button {
    grid-area: button;
    color: $B3;
  }
  &__text {
    font-size: $H400;
    color: $N4;
    &--name {
      font-size: $H800;
      font-weight: 500;
      color: $N0;
    }
    &--label {
      font-size: $H300;
      font-weight: 500;
      color: $N7;
    }
  }
  &__nav-list {
    @extend %inline-nav-list;
  }
  &__nav-item {
    @extend %inline-nav-item;
  }
  &__nav-link {
    @extend %inline-nav-link

  }
}
</style>
