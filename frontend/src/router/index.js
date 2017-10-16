import Vue from 'vue';
import Router from 'vue-router';
import CardDetailView from '@/components/cardDetailView';
import Callback from '@/components/callback';
// import { requireAuth } from '../../utils/auth';
import Trip from '@/components/trip';

Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      component: CardDetailView,
    },
    {
      path: '/callback',
      component: Callback,
    },
    {
      path: '/trip',
      // TODO: Should link to an itinerary edit page, not directly to the timeline component
      component: Trip,
    },
  ],
});
