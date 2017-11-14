import Vue from 'vue';
import Router from 'vue-router';
import Login from '@/views/Login';
// import { requireAuth } from '../../utils/auth';
import TripHome from '@/views/TripHome';
import TripDetail from '@/views/TripDetail';
import TripList from '@/views/TripList';

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
      path: '/trips',
      component: TripHome,
      children: [
        { path: '', name: 'TripList', component: TripList },
        { path: ':id', name: 'TripDetail', component: TripDetail },
      ],
    },
  ],
});
