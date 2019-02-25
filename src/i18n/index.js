import Vue from 'vue';
/* eslint-disable */
/*
const userLang =
  localStorage.saasLang ||
  navigator.userLanguage.slice(0, 2) ||
	navigator.language.slice(0, 2);

const lang = Vue.i18n.locales().find(item => {
	return item === userLang;
});

lang ? Vue.i18n.set(lang) : Vue.i18n.set('en');
*/

Vue.i18n.add('en', require('./en.json'));
Vue.i18n.set('en');
Vue.i18n.fallback('en');
