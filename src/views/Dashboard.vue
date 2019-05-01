<template>
<main class="dashboard">
  <message-success-absolute
    v-if='isMessage.success'
    @click.native='isNessage.success = false'>
    {{ message }}
  </message-success-absolute>
  <message-error-absolute
    v-if='isMessage.error'
    @click.native='isMessage.error = false'>
    {{ message }}
  </message-error-absolute>
  <message-info-absolute
    v-if='isMessage.info'
    @click.native='isMessage.info = false'>
    {{ message }}
  </message-info-absolute>
  <header class="dashboard__header tablet-flex">
    <h1 class='dashboard__title'>Dashboard</h1>
  </header> 
  <div class="dashboard__wrapper">
    <all-funds class="dashboard__section"/>
    <clients class="dashboard__section"/>
  </div>
  </main>
</template>
<script>
import MessageSuccessAbsolute from '@/components/common/messages/MessageSuccessAbsolute.vue';
import MessageErrorAbsolute from '@/components/common/messages/MessageErrorAbsolute.vue';
import MessageInfoAbsolute from '@/components/common/messages/MessageInfoAbsolute.vue';
import AllFunds from '@/components/dashboard/AllFunds.vue';
import Clients from '@/components/dashboard/Clients.vue';
import messageMixin from '@/mixins/message';
import { mapGetters } from 'vuex';

export default {
  name: 'Dashboard',
  mixins: [messageMixin],
  components: {
    AllFunds,
    Clients,
    MessageSuccessAbsolute,
    MessageErrorAbsolute,
    MessageInfoAbsolute,
  },
  data() {
    return {
      funds: {
        invested: 234,
        all: 23453,
      },
      clients: 2344,
    };
  },
};
</script>
<style lang="scss">
@import '~@/scss/components/card';
.dashboard {
  flex: 1 1;
  padding: 0 0 88px 0;
  @include flex-col(flex-start, stretch);
  @media screen and (min-width: $screen-tablet) {
    padding: 27px 40px;
    height: 100vh;
  }
  &__header {
    @include flex-row(flex-start, stretch);
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
    @media screen and (min-width: $screen-tablet) {
      margin-bottom: 32px;
    }
  }
  &__section {
    border-bottom: 1px solid $N10;
    padding: 24px 0;
    @extend %card-desktop;
    @media screen and (min-width: $screen-tablet) {
      padding: 24px;
      margin-bottom: 24px;
      &:last-child {
        margin: 0;
      }
    }
  }
  &__title {
    @include text($H900, 600);
  }
}
</style>
