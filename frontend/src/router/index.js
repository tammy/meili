import Vue from 'vue';
import Router from 'vue-router';
import Cards from '@/components/cards';
import Callback from '@/components/callback';
// import { requireAuth } from '../../utils/auth';

Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Cards',
      component: Cards,
    },
    {
      path: '/callback',
      component: Callback,
    },
  ],
});
