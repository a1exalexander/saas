<template>
<form class="account-recovery-step">
  <p
    class="account-recovery-step__subtitle"
    v-html="`${$t('auth.text.send code')} ${email}`"></p>
  <button-primary
    @click.prevent.native='sendEmail'
    :class='{"button-loading": loading}'
    class='account-recovery-step__button'>{{ $t('auth.buttons.send') }}
  </button-primary>
</form>
</template>
<script>
import ButtonPrimary from '@/components/common/buttons/ButtonPrimary.vue';
import { directorAuth } from '@/api/api';
import http from 'axios';

export default {
  name: 'AccountRecoverySendEmail',
  props: {
    email: {
      type: String,
      default: '',
    },
  },
  components: {
    ButtonPrimary,
  },
  data() {
    return {
      loading: false,
    };
  },
  methods: {
    sendEmail() {
      this.loading = true;
      http.post(directorAuth.recovery, this.email)
        .then((response) => {
          console.log(response);
          this.loading = false;
          this.$emit('sendEmail');
        }).catch((error) => {
          this.loading = false;
          console.log(error);
          // TODO: change to error
          this.$emit('sendEmail');
        });
    },
  },
};
</script>
<style lang="scss">
.account-recovery-step {
  &__subtitle {
    @extend %auth-subtitle;
  }
  &__button {
    padding: 10px 30px;
  }
}
</style>
