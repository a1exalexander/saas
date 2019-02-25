<template>
<li
  class="password-error"
  :class='{"password-step-ready": rule,
          "password-step-unready": any && !rule}'>
  <div class="password-error__image-wrapper">
    <div class="password-error__list-dot"></div>
    <icon-check2 class='password-error__list-check'/>
  </div>
  <p class="password-error__text">{{ text }}</p>
</li>
</template>
<script>
import IconCheck2 from '@/components/common/icons/IconCheck2.vue';

export default {
  name: 'PasswordError',
  props: {
    rule: Boolean,
    any: Boolean,
    text: String,
  },
  components: {
    IconCheck2,
  },
};
</script>
