<template>
<main class='profile'>
<header class="profile__card" v-show='!visible.password'>
  <div class="profile__card-wrapper">
    <div class="profile__image-wrapper">
      <img :src="getAva" alt="avatar" class="profile__image">
    </div>
    <div class="profile__personal-info">
      <p class="profile__name">{{ getName }}</p>
      <div class="profile__status">
        <p
          class="profile__status-name"
          >{{ status?'Online':'Offline' }}
        </p>
        <span
          class="profile__status-dot"
          :class='{"status-offline": !status}'>
        </span>
      </div>
      <div class="profile__user-id">
        <p class="profile__user-id-label">User ID</p>
        <p class="profile__user-id-number">{{ userId }}</p>
      </div>
      <button class="profile__dots-button" v-html='"\&\#8226\&\#8226\&\#8226"'></button>
    </div>
  </div>
  <div class="profile__nav">
    <a
      href="#"
      @click.prevent='toggleWindow("personal")'
      class="profile__nav-link"
      :class='{"inline-nav-link-active": visible.personal}'
      >Personal info
    </a>
    <a
      href="#"
      @click.prevent='toggleWindow("security")'
      class="profile__nav-link"
      :class='{"inline-nav-link-active": visible.security}'
      >Security
    </a>
  </div>
</header>
<div class="profile__main">
<transition
  name="custom-classes-transition"
  enter-active-class="animated dur06 fadeIn"
  leave-active-class="animated dur06 fadeOut"
  mode="out-in">
<personal-info v-if='visible.personal' @changePassword='toggleWindow("password")' key='personal'/>
<security @cancel='toggleWindow("personal")' v-else key='password'/>
</transition>
</div>
</main>
</template>
<script>
import PersonalInfo from '@/components/profile/PersonalInfo.vue';
import Security from '@/components/profile/Security.vue';
import { mapState } from 'vuex';

export default {
  name: 'Profile',
  components: {
    PersonalInfo,
    Security,
  },
  data() {
    return {
      visible: {
        personal: true,
        security: false,
      },
    };
  },
  computed: {
    ...mapState('profile', {
      getName: state => state.profile.name,
      getAva: state => state.profile.ava,
      status: state => state.status,
      userId: state => state.profile.userId,
    }),
  },
  methods: {
    toggleWindow(type) {
      this.visible[type] = true;
      Object.keys(this.visible).forEach((key) => {
        this.visible[key] = key === type;
      });
      setTimeout(() => {
        window.scrollTo(0, 0);
      }, 600);
    },
  },
};
</script>
<style lang="scss">
.profile {
  padding: 56px 0;
  @media screen and (min-width: $screen-tablet) {
    flex: 1 1;
    padding: 0;
    display: flex;
    flex-direction: column;
    justify-content: stretch;
    align-items: stretch;
    height: 100vh;
    max-height: 100vh;
    min-height: 100vh;
    background-color: $N12;
    overflow: hidden;
  }
  &__card {
    padding: 0 28px;
    background-color: $B12;
    @media screen and (min-width: $screen-tablet) {
      border-bottom: 1px solid $N9;
      padding: 0 40px;
    }
  }
  &__card-wrapper {
    padding: 16px 0;
    @include flex-row(flex-start, center);
    @media screen and (min-width: $screen-tablet) {
      padding: 30px 0 22px 0;
    }
  }
  &__personal-info {
    @media screen and (min-width: $screen-tablet) {
      display: grid;
      grid-template-columns: repeat(3, auto);
      grid-template-rows: repeat(2, auto);
      grid-template-areas:
      'name dots id'
      'status . id';
      grid-column-gap: 44px;
    }
  }
  &__dots-button {
    display: none;
    @media screen and (min-width: $screen-tablet) {
      display: inline-block;
      color: $B3;
      grid-area: dots;
    }
  }
  &__nav {
    display: none;
    @media screen and (min-width: $screen-tablet) {
      display: flex;
    }
  }
  &__nav-link {
    font-size: $H300;
    color: $N8;
    margin-right: 29px;
    padding-bottom: 8px;
    font-weight: 500;
    border-bottom: 1px solid transparent;
    position: relative;
    bottom: -1px;
    transition-property: color, border-color;
    transition-duration: 0.2s;
    transition-timing-function: ease-in-out;
    &:hover {
      color: $N7;
    }
    &--active {
      color: $N0;
      border-color: $N0;
    }
  }
  &__main {
    @media screen and (min-width: $screen-tablet) {
      flex: 1 1 100%;
      overflow-y: auto;
      overflow-x: hidden;
      background-color: $N12;
    }
  }
  &__image-wrapper {
    width: 60px;
    height: 60px;
    margin-right: 20px;
    border-radius: 50%;
    overflow: hidden;
  }
  &__image {
    width: 100%;
    height: 100%;
  }
  &__name {
    font-size: $H800;
    font-weight: 500;
    line-height: 1;
    margin-bottom: 6px;
    @media screen and (min-width: $screen-tablet) {
      grid-area: name;
    }
  }
  &__status {
    @include flex-row(flex-start, center);
    margin-bottom: 4px;
    @media screen and (min-width: $screen-tablet) {
      margin: 0;
      grid-area: status;
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
  }
  &__user-id {
    @include flex-row(flex-start, baseline);
    @media screen and (min-width: $screen-tablet) {
      grid-area: id;
      display: flex;
      flex-direction: column;
    }
  }
  &__user-id-label {
    font-size: $H300;
    margin-right: 8px;
    line-height: 1;
    color: $N6;
    @media screen and (min-width: $screen-tablet) {
      margin: 0 0 4px 0;
      font-weight: 500;
    }
  }
  &__user-id-number {
    color: $N4;
    font-size: $H400;
    font-weight: 500;
  }
}
</style>
