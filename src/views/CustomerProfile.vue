<template>
<div class='customer-profile' @click.self='closeInlineMenu'>
  <transition
    name="custom-classes-transition"
    enter-active-class="animated dur06 fadeIn"
    leave-active-class="animated dur04 fadeOut"
    mode="out-in">
  <remove-popup @cancel='showRemovePopup = false' v-if='showRemovePopup'/>
  </transition>
  <header class="customer-profile__header" @click.self='closeInlineMenu'>
    <button-back
      @click.native='backToList'
      class="customer-profile__button-back"
      >Back to investors list
    </button-back>
    <div class="customer-profile__card" @click='closeInlineMenu'>
      <div class="customer-profile__image-wrapper">
        <img src="@/assets/images/ava.jpg" alt="" class="customer-profile__image">
      </div>
      <div class="customer-profile__item customer-profile__item--name">
        <h2
          class="customer-profile__text customer-profile__text--name"
          >{{ client.name_first }}</h2>
        <div class="customer-profile__status">
          <p
            class="customer-profile__status-name"
            >{{ client.status?'Online':'Offline' }}
          </p>
          <span
            class="customer-profile__status-dot"
            :class='{"status-offline": !client.status}'>
          </span>
        </div>
      </div>
      <div class="customer-profile__item customer-profile__item--id">
        <p
          class="customer-profile__text customer-profile__text--label"
          >ID</p>
        <p class="customer-profile__text">{{ client.id }}</p>
      </div>
      <div class="customer-profile__item customer-profile__item--balance">
        <p class="customer-profile__text customer-profile__text--label">Total balance</p>
        <p class="customer-profile__text">$ {{ client.balance }}</p>
      </div>
      <a
        href='#'
        class='customer-profile__button'
        @click.prevent.stop='inlineMenu = !inlineMenu'>
        <icon-dots class='customer-profile__icon-dots'/>
        <transition
          name="custom-classes-transition"
          enter-active-class="animated dur06 fadeIn"
          leave-active-class="animated dur04 fadeOut"
          mode="out-in">
        <div class="customer-profile__inline-menu" v-if='inlineMenu'>
          <a href="#" class="customer-profile__inline-menu-link">Change photo</a>
          <a
            href="#"
            @click='openRemovePopup'
            class="customer-profile__inline-menu-link">Remove
          </a>
        </div>
        </transition>
      </a>
    </div>
    <div class="customer-profile__card-tablet">
      <div class="customer-profile__image-wrapper" @click='closeInlineMenu'>
        <img
          :src="client.ava"
          alt=""
          class="customer-profile__image"
          v-if='client.ava'>
        <icon-ava
          class="default-ava"
          v-else/>
          <div
            class="customer-profile__check-wrapper"
            :class='{"customer-profile__check-wrapper--verify": client.email_verified}'>
          <icon-check2
            class='customer-profile__check-icon'
            v-if='client.email_verified'/>
          <icon-question
            class='customer-profile__icon-question'
            v-else/>
          </div>
      </div>
      <div class="customer-profile__inner-row">
        <div
          class="customer-profile__item customer-profile__item--name"
          @click='closeInlineMenu'>
          <h2
            class="customer-profile__text customer-profile__text--name"
            >{{ client.name_first }} {{ client.name_last }}</h2>
          <div class="customer-profile__status">
            <p
              class="customer-profile__status-name"
              >{{ client.online?'Online':'Offline' }}
            </p>
            <span
              class="customer-profile__status-dot"
              :class='{"status-offline": !client.status}'>
            </span>
          </div>
        </div>
        <a
          href='#'
          class='customer-profile__button'
          @mouseover.prevent='inlineMenu = true'>
          <icon-dots class='customer-profile__icon-dots'/>
          <transition
            name="custom-classes-transition"
            enter-active-class="animated dur06 fadeIn"
            leave-active-class="animated dur04 fadeOut"
            mode="out-in">
            <div
              class="customer-profile__inline-menu-wrapper"
              @mouseleave="inlineMenu = false">
              <div class="customer-profile__inline-menu" v-if='inlineMenu'>
                <a href="#" class="customer-profile__inline-menu-link">Change photo</a>
                <a
                  href="#"
                  @click.prevent='openRemovePopup'
                  class="customer-profile__inline-menu-link">Remove
                </a>
              </div>
            </div>
          </transition>
        </a>
        <div class="customer-profile__item customer-profile__item--id" @click='closeInlineMenu'>
          <p
            class="customer-profile__text customer-profile__text--label"
            >ID</p>
          <p class="customer-profile__text">{{ client.id }}</p>
        </div>
        <div class="customer-profile__item customer-profile__item--phone" @click='closeInlineMenu'>
          <p class="customer-profile__text customer-profile__text--label">Phone</p>
          <p class="customer-profile__text">{{ client.phone }}</p>
        </div>
        <div class="customer-profile__item customer-profile__item--email" @click='closeInlineMenu'>
          <p class="customer-profile__text customer-profile__text--label">Email</p>
          <p class="customer-profile__text">{{ client.email }}</p>
        </div>
        <!-- <div
          class="customer-profile__item customer-profile__item--manager"
          @click='closeInlineMenu'>
          <p class="customer-profile__text customer-profile__text--label">Relationship manager</p>
          <div class="customer-profile__row">
            <div class="customer-profile__image-wrapper customer-profile__image-wrapper--small">
              <img src="@/assets/images/ava.jpg" alt="" class="customer-profile__image">
            </div>
            <p class="customer-profile__text">{{ getInvestorById.manager }}</p>
          </div>
        </div> -->
      </div>
    </div>
    <nav class="customer-profile__nav" @click='closeInlineMenu'>
      <ul class="customer-profile__nav-list">
        <li class="customer-profile__nav-item">
          <router-link
            to=''
            class="customer-profile__nav-link"
            :class='{"inline-nav-link-active": routeName === "introduction"}'
            >Introduction
          </router-link>
        </li>
        <li class="customer-profile__nav-item">
          <router-link
            to=''
            class="customer-profile__nav-link"
            :class='{"inline-nav-link-active": routeName === "customer-history"}'
            >Deals history
          </router-link>
        </li>
        <li class="customer-profile__nav-item">
          <router-link
            to=''
            class="customer-profile__nav-link"
            :class='{"inline-nav-link-active": routeName === "customer-logs"}'
            >Logs
          </router-link>
        </li>
        <li class="customer-profile__nav-item">
          <router-link
            to=''
            class="customer-profile__nav-link"
            :class='{"inline-nav-link-active": routeName === "customer-referrals"}'
            >Referrals
          </router-link>
        </li>
      </ul>
    </nav>
  </header>
  <router-view class='customer-profile__main' @click='closeInlineMenu'/>
</div>
</template>
<script>
import IconDots from '@/components/common/icons/IconDots.vue';
import RemovePopup from '@/components/customers/RemovePopup.vue';
import IconCheck2 from '@/components/common/icons/IconCheck2.vue';
import ButtonBack from '@/components/common/buttons/ButtonBack.vue';
import IconAva from '@/components/common/icons/IconAva.vue';
import IconQuestion from '@/components/common/icons/IconQuestion.vue';
import { mapGetters, mapActions, mapMutations, mapState } from 'vuex';

export default {
  name: 'CustomerProfile',
  components: {
    RemovePopup,
    IconDots,
    ButtonBack,
    IconCheck2,
    IconAva,
    IconQuestion,
  },
  data() {
    return {
      showRemovePopup: false,
      inlineMenu: false,
    };
  },
  computed: {
    ...mapState('investors', [
      'client',
    ]),
    id() {
      return this.$route.params.id;
    },
    routeName() {
      return this.$route.name;
    },
  },
  methods: {
    ...mapActions('investors', [
      'getClientById',
    ]),
    ...mapMutations('investors', [
      'removeInvestor',
    ]),
    closeInlineMenu() {
      if (this.inlineMenu) {
        this.inlineMenu = false;
      }
    },
    backToList() {
      this.$router.push('/director/clients');
    },
    openRemovePopup() {
      this.showRemovePopup = true;
    },
    redirectRoute(path) {
      this.$router.push(path);
    },
  },
  beforeRouteUpdate (to, from, next) {
    this.getClientById(to.params.id)
      .then((resp) => next())
  },
};
</script>
<style lang="scss">
.customer-profile {
  @media screen and (min-width: $screen-tablet) {
    flex: 1 1;
    height: 100vh;
    overflow-y: hidden;
    display: flex;
    flex-direction: column;
  }
  &__header {
    padding: 72px 28px 0;
    background-color: $B12;
    @media screen and (min-width: $screen-tablet) {
      padding: 32px 40px 0;
    }
  }
  &__main {
    @media screen and (min-width: $screen-tablet) {
      overflow-y: auto;
      flex: 1 1;
    }
  }
  &__image-wrapper {
    width: 60px;
    height: 60px;
    flex-shrink: 0;
    flex-grow: 0;
    border-radius: 50%;
    grid-area: photo;
    position: relative;
    @media screen and (min-width: $screen-tablet) {
      margin-right: 20px;
    }
    &--small {
      width: 20px;
      height: 20px;
      margin-right: 8px;
      order: -1;
    }
  }
  &__image {
    width: 100%;
    height: 100%;
    border-radius: 50%;
    object-fit: cover;
  }
  &__check-wrapper {
    width: 20px;
    height: 20px;
    border-radius: 50%;
    border: 3px solid $B12;
    background-color: $N10;
    @include flex-row(center, center);
    position: absolute;
    z-index: 10000;
    bottom: 0;
    right: 0;
    &--verify {
      background-color: $B4;
    }
  }
  &__icon-question {
    width: 8px;
    height: 8px;
    fill: $N5;
  }
  &__check-icon {
    width: 12px;
    height: 12px;
    fill: $N0;
  }
  &__card {
    display: grid;
    grid-template-columns: 60px repeat(2, auto);
    grid-auto-rows: auto;
    grid-column-gap: 20px;
    grid-row-gap: 6px;
    grid-template-areas:
    'photo name button'
    'photo id .'
    'photo balance .';
    margin-bottom: 20px;
    @media screen and (min-width: $screen-tablet) {
      display: none;
    }
  }
  &__card-tablet {
    display: none;
    @media screen and (min-width: $screen-tablet) {
      display: flex;
      flex-flow: row nowrap;
      align-items: center;
      margin-bottom: 24px;
    }
  }
  &__inner-row {
    @include flex-row(flex-start, flex-start);
  }
  &__item {
    @include flex-row(flex-start, center);
    @media screen and (min-width: $screen-tablet) {
      margin-right: 32px;
      flex-direction: column;
      align-items: flex-start;
    }
    &--name {
      grid-area: name;
    }
    &--id {
      grid-area: id;
    }
    &--balance {
      grid-area: balance;
    }
    &--email {
      display: none;
    }
    &--phone {
      display: none;
    }
    &--manager {
      display: none;
    }
    @media screen and (min-width: $screen-tablet) {
      &--name {
        order: 2;
        margin-right: 12px;
      }
      &--id {
        order: 4;
      }
      &--balance {
        display: none
      }
      &--manager {
        order: 7;
        display: flex;
      }
    }
    @media screen and (min-width: $screen-desktop) {
      &--email {
        order: 6;
        display: flex;
      }
      &--phone {
        order: 5;
        display: flex;
      }
    }
  }
  &__row {
    @include flex-row(flex-start, center);
  }
  &__button {
    grid-area: button;
    color: $B3;
    @include flex-row(center, center);
    position: relative;
    @media screen and (min-width: $screen-tablet) {
      order: 3;
      margin-right: 32px;
    }
  }
  &__text {
    font-size: $H400;
    color: $N4;
    white-space: nowrap;
    &--name {
      font-size: $H800;
      font-weight: 500;
      color: $N0;
      @media screen and (min-width: $screen-tablet) {
        margin-bottom: 4px;
      }
    }
    &--label {
      font-size: $H300;
      font-weight: 500;
      color: $N7;
      margin-right: 4px;
      @media screen and (min-width: $screen-tablet) {
        margin-right: 0;
        margin-bottom: 8px;
      }
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
  }
  &__inline-menu-wrapper {
    position: absolute;
    top: 0;
    right: -4px;
    z-index: 2;
    padding: 28px 6px 6px;
    background-color: transparent;
  }
  &__inline-menu {
    @extend %inline-menu;
    padding: 20px 24px;
  }
  &__inline-menu-link {
    @extend %inline-menu-link;
    margin-bottom: 20px;
    &:last-child {
      margin: 0;
    }
  }
  &__icon-dots {
    width: 24px;
    height: 24px;
    fill: $B3;
  }
  &__status {
    display: none;
    @media screen and (min-width: $screen-tablet) {
      display: flex;
      flex-flow: row nowrap;
      align-items: center;
    }
  }
  &__status-name {
    font-size: $H300;
    margin-right: 8px;
    line-height: 1;
    color: $N6;
  }
  &__status-dot {
    @extend %status-dot;
    margin-top: 4px;
  }
  &__button-back {
    display: none;
    @media screen and (min-width: $screen-tablet) {
      display: flex;
      margin-bottom: 32px;
    }
  }
}
</style>
