import Vue from 'vue';
import VS2 from 'vue-script2';
import vueNumeralFilterInstaller from 'vue-numeral-filter';
import VueClipboard from 'vue-clipboard2';
import App from './App.vue';
import router from './router';
import store from './store';
import VueTelInput from 'vue-tel-input';
import 'vue-loading-overlay/dist/vue-loading.css';
import DateRangePicker from "@gravitano/vue-date-range-picker";

// Styles
import '@/scss/animate.scss';
import '@/scss/main.scss';

// Messages
import VueFlashMessage from 'vue-flash-message';
import 'vue-flash-message/dist/vue-flash-message.min.css';
import FlagMessageError from '@/components/common/messages/FlagMessageError.vue';
import FlagMessageInfo from '@/components/common/messages/FlagMessageInfo.vue';
import FlagMessageSuccess from '@/components/common/messages/FlagMessageSuccess.vue';

// Buttons
import ButtonPrimaryIcon from '@/components/common/buttons/ButtonPrimaryIcon.vue';
import ButtonSecondary from '@/components/common/buttons/ButtonSecondary.vue';
import ButtonPrimary from '@/components/common/buttons/ButtonPrimary.vue';
import ButtonDashIcon from '@/components/common/buttons/ButtonDashIcon.vue';
import ButtonTransparent from '@/components/common/buttons/ButtonTransparent.vue';
import ButtonBack from '@/components/common/buttons/ButtonBack.vue';
import ButtonBackMobile from '@/components/common/buttons/ButtonBackMobile.vue';
import SubtleIcon from '@/components/common/buttons/SubtleIcon.vue';

// Form
import VueTextareaAutosize from 'vue-textarea-autosize';
import Checkbox from '@/components/common/form/Checkbox.vue';
import Radio from '@/components/common/form/Radio.vue';
import RadioButton from '@/components/common/form/RadioButton.vue';

import '@/i18n';

Vue.prototype.$dev = process.env.NODE_ENV === 'development';
Vue.prototype.$prod = process.env.NODE_ENV === 'production';

Vue.component('ButtonPrimaryIcon', ButtonPrimaryIcon);
Vue.component('SubtleIcon', SubtleIcon);
Vue.component('ButtonPrimary', ButtonPrimary);
Vue.component('ButtonTransparent', ButtonTransparent);
Vue.component('ButtonSecondary', ButtonSecondary);
Vue.component('ButtonBack', ButtonBack);
Vue.component('ButtonBackMobile', ButtonBackMobile);
Vue.component('ButtonDashIcon', ButtonDashIcon);

Vue.component('Checkbox', Checkbox);
Vue.component('Radio', Radio);
Vue.component('RadioButton', RadioButton);

Vue.component('FlagMessageError', FlagMessageError);
Vue.component('FlagMessageInfo', FlagMessageInfo);
Vue.component('FlagMessageSuccess', FlagMessageSuccess);

Vue.use(VueTextareaAutosize);
Vue.use(DateRangePicker);
Vue.use(VueTelInput);

Vue.use(VS2);
Vue.use(VueClipboard);
Vue.use(vueNumeralFilterInstaller);

Vue.use(VueFlashMessage, {
  messageOptions: {
    timeout: 3500, important: false, autoEmit: true, pauseOnInteract: true,
  },
});

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
