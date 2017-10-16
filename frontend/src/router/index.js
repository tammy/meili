import Vue from 'vue';
import Router from 'vue-router';
import Login from '@/components/login';
// import { requireAuth } from '../../utils/auth';
import Trip from '@/components/trip';

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
