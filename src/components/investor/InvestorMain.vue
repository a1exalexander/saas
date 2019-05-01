<template>
  <div class='investor-main'>
    <investor-head/>
    <router-view class='investor-main__view'/>
  </div>
</template>
<script>
import InvestorHead from '@/components/investor/components/InvestorHead.vue';

export default {
  name: 'InvestorMain',
  components: {
    InvestorHead,
  },
};
</script>