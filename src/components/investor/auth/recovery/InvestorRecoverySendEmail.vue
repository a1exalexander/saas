<template>
<div class="account-recovery-step" @keyup.enter="sendEmail">
  <p
    class="account-recovery-step__subtitle"
    v-html="`${$t('auth.text.send code')} ${hidden}`"></p>
  <button-primary
    tabindex="1"
    @click.native='sendEmail'
    :class='{"button-loading": loading}'
    class='account-recovery-step__button'
    @keyup.enter="sendEmail"
    >{{ $t('auth.buttons.send') }}
  </button-primary>
</div>
</template>
<script>
import ButtonPrimary from '@/components/common/buttons/ButtonPrimary.vue';
import { setTimeout } from 'timers';

export default {
  name: 'AccountRecoverySendEmail',
  props: {
    hidden: {
      type: String,
    },
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
      const data = {email: this.email};
      setTimeout(() => {
        this.loading = false;
        this.$emit('sendEmail');
      }, 1500);
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
