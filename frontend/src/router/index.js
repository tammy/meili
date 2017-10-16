import Vue from 'vue';
import Router from 'vue-router';
import CardDetailView from '@/components/cardDetailView';
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
      // TODO: Should link to an itinerary edit page, not directly to the timeline component
      component: Trip,
    },
  ],
});
