import Vue from 'vue';
import vueNumeralFilterInstaller from 'vue-numeral-filter';
// import http from 'axios';
import VueClipboard from 'vue-clipboard2';
import App from './App.vue';
import router from './router';
import store from './store';

import '@/i18n';

// const token = localStorage.getItem('user-token');
// if (token) {
//   // eslint-disable-next-line
//   http.defaults.headers.common['Authorization'] = token;
// }

Vue.use(VueClipboard);
Vue.use(vueNumeralFilterInstaller);
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
