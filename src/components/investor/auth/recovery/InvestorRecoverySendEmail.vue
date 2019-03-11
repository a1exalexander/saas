<template>
<form class="account-recovery-step">
  <p
    class="account-recovery-step__subtitle"
    v-html="`${$t('auth.text.send code')} ${email}`"></p>
  <button-primary
    @click.prevent.native='sendEmail'
    class='account-recovery-step__button'>{{ $t('auth.buttons.send') }}
  </button-primary>
</form>
</template>
<script>
import ButtonPrimary from '@/components/common/buttons/ButtonPrimary.vue';

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
  methods: {
    sendEmail() {
      this.$emit('sendEmail');
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
