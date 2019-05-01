<template>
<div class="popover-navigation popover-revert">
  <div class="popover-revert__inner">
    <a @click.prevent='openProfile' href="#" class="popover-revert__button popover-navigation__button">
      <p class="popover-revert__text">Profile settings</p>
    </a>
    <!-- <div class="popover-revert__link-wrapper">
      <a href="#" class="popover-revert__link">Subscription Plan Settings</a>
      <a href="#" class="popover-revert__link">Help Center</a>
      <a href="#" class="popover-revert__link">Status Page</a>
    </div> -->
    <a @click.prevent='logout' href="#" class="popover-revert__button popover-navigation__button">
      <p class="popover-revert__text">Log out</p>
    </a>
  </div>
  <survey-director v-if='surveyD'/>
</div>
</template>
<script>
import { mapActions, mapState, mapMutations } from 'vuex';
import SurveyDirector from '@/components/common/SurveyDirector.vue';

export default {
  name: 'PopoverNavigation',
  components: {
    SurveyDirector,
  },
  data() {
    return {
      surveyD: false,
    };
  },
  methods: {
    ...mapActions('login', [
      'AUTH_LOGOUT',
    ]),
    ...mapMutations('profile', [
      'deleteSurvey',
    ]),
    logout() {
      if (this.isSurveyDirector) {
        this.surveyD = true;
        this.deleteSurvey();
      } else {
        this.AUTH_LOGOUT()
          .then(() => {
            this.$router.push('/auth');
          });
      }
    },
    openProfile() {
      this.$router.push('/director/profile');
      this.$emit('closeNav');
    },
    servey() {
      const serveyScript = document.createElement('script');
      document.head.appendChild((function(t,e,s,o){var n,c,l;t.SMCX=t.SMCX||[],e.getElementById(o)||(n=e.getElementsByTagName(s),c=n[n.length-1],l=e.createElement(s),l.type="text/javascript",l.async=!0,l.id=o,l.src=["https:"===location.protocol?"https://":"http://","widget.surveymonkey.com/collect/website/js/tRaiETqnLgj758hTBazgd9zhxDYWWbN63UXLcq6XZ_2BAVBLmGweBSu3AsrDTknee2.js"].join(""),c.parentNode.insertBefore(l,c))})(window,document,"script","smcx-sdk"));
    },
  },
  computed: {
    ...mapState({
      isSurveyDirector: state => state.profile.survey,
    }),
  },
};
</script>
<style lang="scss">
.popover-navigation {
 padding-bottom: 24px;
 &__button {
   &:first-child {
     padding-bottom: 8px;
   }
   &:last-child {
     padding-top: 8px;
   }
 }
}
</style>
