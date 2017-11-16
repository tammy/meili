// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import App from './App';
import io from 'socket.io-client';
import router from './router';
import Vue from 'vue';
import VueSocketio from 'vue-socket.io';
import Vuex from 'vuex';
import { isLoggedIn } from '../utils/auth';
import { createStore } from './store';

const socket = io('http://192.168.0.107:3333');

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
    store.commit('setLocalEdit', true);
    const newOldEvents = tripEvents.map(x => Object.assign({}, x));
    store.commit('updateOldEvents', newOldEvents);
    return;
  }
  const watchedProps = ['trip', 'title', 'description', 'location',
  'coordinateLat', 'coordinateLon', 'startTime', 'duration', 'order',
  'creator'];
  const oldEvents = store.state.trip.oldEvents;
  const length = Math.max(tripEvents.length, oldEvents.length);
  const min = Math.min(tripEvents.length, oldEvents.length);
  var changedCards = [];

  for (var i = 0; i < length; i += 1) {
    if (i >= min) {
      changedCards.push(tripEvents[i]);
    } else {
      for (var pIdx = 0; pIdx < watchedProps.length; pIdx += 1) {
        const prop = watchedProps[pIdx];
        if(tripEvents[i][prop] != oldEvents[i][prop]) {
          changedCards.push(tripEvents[i]);
          break;
        }
      }
    }
  }

  for (var i = 0; i < changedCards.length; i += 1) {
    const data = {tripID: store.state.trip.id, card: changedCards[i]};
    socket.emit('updateCard', data);
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
