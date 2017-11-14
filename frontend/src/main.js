// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import Vuex from 'vuex';
import App from './app';
import router from './router';
import { isLoggedIn } from '../utils/auth';
import { createStore } from './store';

Vue.config.productionTip = false;
Vue.use(Vuex);

router.beforeEach((to, from, next) => {
  const authed = isLoggedIn();
  const authRequired = !(to.path === '/');
  if (authRequired && !authed) {
    next('/');
  } else {
    next();
  }
});

/* eslint-disable no-new */
/* eslint-disable no-unused-vars */
const store = createStore();
const app = new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App },
});
