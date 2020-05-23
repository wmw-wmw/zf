import 'babel-polyfill';
import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import './plugins/vant.js';
import './api/http.js';
// mock数据
import './mock';

import 'assets/js/rem.js';
import 'assets/scss/index.scss';
import 'vant/lib/index.css';

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
