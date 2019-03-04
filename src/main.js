import Vue from 'vue';
import vueNumeralFilterInstaller from 'vue-numeral-filter';
import http from 'axios';
import App from './App.vue';
import router from './router';
import store from './store';

import '@/i18n';

const token = localStorage.getItem('user-token');

if (token) {
  http.defaults.headers.common['Authorization'] = token;
}

Vue.use(vueNumeralFilterInstaller);
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
