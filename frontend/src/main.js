// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import App from './App';
import io from 'socket.io-client';
import router from './router';
import Vue from 'vue';
import VueSocketio from 'vue-socket.io';
import Vuex from 'vuex';
import { isLoggedIn } from '../utils/auth';
import { getChangedCards } from '../utils/models';
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

store.watch(state => state.trip.events, (tripEvents) => {
  console.log('watch');
  if (!store.state.lastEditLocal) {
    // A remote edit is coming in. Don't update others because this will cause
    // an infinite loop.
    store.commit('setLocalEdit', true);
  } else {
    const changedCards = getChangedCards(store.state.trip.oldEvents, tripEvents);

    changedCards.forEach(changedCard => {
      const data = {tripID: store.state.trip.id, card: changedCard};
      socket.emit('updateCard', data);
    });
  }

  // Update old events
  const newOldEvents = tripEvents.map(x => Object.assign({}, x));
  store.commit('updateOldEvents', newOldEvents);
}, { deep: true });

const app = new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App },
});
