<template>
<form class="account-recovery-step">
  <p
    class="account-recovery-step__subtitle"
    v-html="`${$t('auth.text.send code')} ${hidden}`"></p>
  <button-primary
    @click.prevent.native='sendEmail'
    :class='{"button-loading": loading}'
    class='account-recovery-step__button'>{{ $t('auth.buttons.send') }}
  </button-primary>
</form>
</template>
<script>
import ButtonPrimary from '@/components/common/buttons/ButtonPrimary.vue';

export default {
  name: 'AccountRecoverySendEmail',
  props: {
    hidden: {
      type: String,
    },
    email: {
      type: String,
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
      }, 1500 );
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
