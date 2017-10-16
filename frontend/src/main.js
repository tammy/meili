// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './app';
import router from './router';
import { isLoggedIn } from '../utils/auth';

Vue.config.productionTip = false;

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
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App },
});
