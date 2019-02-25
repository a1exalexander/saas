<template>
  <section class="change-password-code">
    <p class="change-password-code__text"
      >Enter the verification 4-number code we just sent to your email
    </p>
    <label for="" class="change-password-code__label">
      <p class="change-password-code__label-text">Code</p>
      <input
        type="text"
        class="change-password-code__input"
        maxlength='4'
        v-model.number.trim='code'>
    </label>
    <div class="change-password-code__row">
      <button-secondary
      class='change-password-code__button change-password-code__button--cancel'
        @click.native='cancel'>Cancel
      </button-secondary>
      <button-primary
        @click.native='verify'
        class='change-password-code__button'
        :class='{"button-loading": loading.verify}'
        :disabled='disabledVerify'>Verify
      </button-primary>
    </div>
  </section>
</template>
<script>
import ButtonSecondary from '@/components/common/buttons/ButtonSecondary.vue';
import ButtonPrimary from '@/components/common/buttons/ButtonPrimary.vue';
import { mapMutations } from 'vuex';

export default {
  name: 'ChangePasswordCode',
  props: {
    verifycode: {
      type: Number,
      default: 1234,
    },
  },
  components: {
    ButtonSecondary,
    ButtonPrimary,
  },
  data() {
    return {
      code: '',
      loading: {
        verify: false,
      },
    };
  },
  methods: {
    ...mapMutations('profile', [
      'setLastChangePassword',
    ]),
    cancel() {
      this.$emit('cancel');
    },
    verify() {
      this.loading.verify = true;
      setTimeout(() => {
        this.loading = false;
        this.setLastChangePassword();
        this.cancel();
      }, 1000);
    },
  },
  computed: {
    disabledVerify() {
      console.log(this.code, this.verifycode);
      return !Object.is(this.code, this.verifycode);
    },
  },
};
</script>
<style lang="scss">
.change-password-code {
  @media screen and (min-width: $screen-tablet) {
    display: grid;
    grid-template-columns: 200px 220px;
    grid-auto-rows: auto;
    grid-template-areas:
    'code text'
    'buttons text';
    grid-column-gap: 32px;
    grid-row-gap: 20px;
    align-content: start;
  }
  &__text {
    font-size: $H500;
    margin-bottom: 24px;
    @media screen and (min-width: $screen-tablet) {
      margin: 0;
      padding-top: 22px;
      grid-area: text;
    }
  }
  &__label {
    display: block;
    margin-bottom: 32px;
    @media screen and (min-width: $screen-tablet) {
      margin: 0;
      grid-area: code;
    }
  }
  &__label-text {
    @extend %input-label-text;
  }
  &__input {
    width: 100%;
    @extend %input;
  }
  &__row {
    @include flex-row(stretch, center);
    @media screen and (min-width: $screen-tablet) {
      margin: 0;
      grid-area: buttons;
    }
  }
  &__button {
    flex: 1 1 50%;
    &--cancel {
      margin-right: 20px;
    }
  }
}
</style>
