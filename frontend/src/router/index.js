import Vue from 'vue';
import Router from 'vue-router';
import Login from '@/views/Login';
// import { requireAuth } from '../../utils/auth';
import Trip from '@/views/Trip';

Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Login',
      component: Login,
    },
    {
      path: '/trip',
      component: Trip,
    },
  ],
});
