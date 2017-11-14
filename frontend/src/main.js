// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import io from 'socket.io-client';
import Vue from 'vue';
import Vuex from 'vuex';
import VueSocketio from 'vue-socket.io';
import App from './app';
import router from './router';
import { isLoggedIn } from '../utils/auth';
import { createStore } from './store';

const socket = io('http://localhost:3333');

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
Vue.use(VueSocketio, socket, store);
const app = new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App },
});
