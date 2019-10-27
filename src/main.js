// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import VModal from 'vue-js-modal';
import App from './App';
import router from './router/router';
import store from './store/store';


Vue.config.productionTip = false;
Vue.config.devtools = true;
Vue.use(VModal, { dialog: true });

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>',
});
