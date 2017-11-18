// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import App from './App';
import io from 'socket.io-client';
import router from './router';
import Vue from 'vue';
import VueSocketio from 'vue-socket.io';
import Vuex from 'vuex';
import VModal from 'vue-js-modal'
import { isLoggedIn } from '../utils/auth';
import { getChangedCards, getNewCards } from '../utils/models';
import { createStore } from './store';

const socket = io('http://138.197.128.24:3333');

Vue.config.productionTip = false;
Vue.use(Vuex);
Vue.use(VModal);

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

store.watch(state => state.threads, (threads) => {
  if (!store.state.lastEditLocal) {         // Remote edit
    store.commit('setLocalEdit', true);
  } else {                                  // Local edit
    // Detect changes
    threads.forEach(thread => {
      if (thread.new) {
        thread.new = false;
        const data = {eventID: thread.cardId, thread: thread, tripID: store.state.trip.id};
        socket.emit('addThread', data);
      }
    });
  }
}, { deep: true });

store.watch(state => state.messages, (messages) => {
  if (!store.state.lastEditLocal) {         // Remote edit
    store.commit('setLocalEdit', true);
  } else {                                  // Local edit
    // Detect changes
    for (var threadId in messages) {
      const msgs = messages[threadId];
      msgs.forEach(msg => {
        if (msg.new) {
          msg.new = false;
          const data = {
            threadID: threadId, 
            message: msg, 
            tripID: store.state.trip.id
          };
          msg.authorId = localStorage.id_token;
          msg.authorName = localStorage.user_name;
          msg.authorPicture = localStorage.profile_thumbnail;
          socket.emit('addMessage', data);
        }
      });
      // do something with key
    }
    // socket.emit('addCard', data);
  }
}, { deep: true });

store.watch(state => state.trip.events, (tripEvents) => {
  console.log('watch tripEvent');
  if (!store.state.lastEditLocal) {         // Remote edit
    store.commit('setLocalEdit', true);
  } else {                                  // Local edit
    for ( let i = 0; i < store.state.trip.events.length; i += 1 ) {
      store.state.trip.events[i].order = i;     // TODO: remove this hack
    }
    const changedCards = getChangedCards(store.state.trip.oldEvents, tripEvents);
    const newCards = getNewCards(store.state.trip.oldEvents, tripEvents);

    changedCards.forEach(changedCard => {
      const data = {tripID: store.state.trip.id, card: changedCard};
      socket.emit('updateCard', data);
    });
    newCards.forEach(newCard => {
      const data = {tripID: store.state.trip.id, card: newCard};
      socket.emit('addCard', data);
    });
  }

  // Update old events
  const newOldEvents = tripEvents.map(x => Object.assign({}, x));
  store.commit('updateOldEvents', newOldEvents);
}, { deep: true });

store.watch(state => state.trip.name, (tripName) => {
  console.log('watch tripName');
  if (!store.state.lastEditLocal) {         // Remote edit
    store.commit('setLocalEdit', true);
  } else {                                  // Local edit
    socket.emit('updateTripName', store.state.trip);
  }
}, { deep: true });

const app = new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App },
});
