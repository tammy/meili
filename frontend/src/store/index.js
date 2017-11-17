// TODO: This file has inconsistent indenting

import io from 'socket.io-client';
import Vue from 'vue';
import Vuex from 'vuex';
import * as api from '../../utils/api';
import { assignCardByValue } from '../../utils/models'
const uuidv4 = require('uuid/v4');

Vue.use(Vuex);

/* eslint-disable */
export function createStore() {
    return new Vuex.Store({
      state: {
        user: {},
        trip: {
          name: '',
          id: '',
          picture: '',
          events: [],
          collaborators: [],
          oldEvents: [],
        },
        // lastEditLocal is used keep track when we should push changes to server.
        // Avoids infinite loops.
        lastEditLocal: true,
        onlineUsers: {}, // map of user IDs to their details
        focusedEvent: {}, // Didn't know which one to keep so keeping both for now
        threads: [    // TODO: move this to the appropriate place
            { id: 'adbv', title: 'hello', content: 'world' },
            { id: 'ahhwef', title: 'bonjour', content: 'le monde' },
            { id: 'asgfasgh', title: 'nihao', content: 'shijie' },
        ],    
        focusedEventIndex: 0,
      },
      getters: {
        getFocusedEvent: (state) => {
          return state.trip.events[state.focusedEventIndex];
        },
        getThreads: (state) => (eventID) => {
          // TODO: get threads based on eventID
          return state.threads;
        },
      },
      mutations: {    // run synchronously
        /* User */
        setUser: (state, user) => {
          state.user = user;
        },
        addCollaborator: (state, user) => {
          state.trip.collaborators.unshift(user);
        },
        updateOnlineUsers: (state, users) => {
            state.onlineUsers = users;
        },
        updateOldEvents: (state, oldEvents) => {
            state.trip.oldEvents = oldEvents;
        },
        /* Trip */
        setTrip: (state, trip) => {
          Object.assign(state.trip, trip);
        },
        setTripName: (state, name) => {
          state.trip.name = name;
        },
        /* Events */
        setFocusedEvent: (state, event) => {
          const index = state.trip.events.indexOf(event);
          state.focusedEventIndex = index;
        },
        addEvent: (state) => {
          const newTripEvent = {'id': uuidv4(), 'trip': state.trip.id, 'new':true};
          state.trip.events.unshift(newTripEvent);
        },
        removeEvent: (state, event) => {
          const index = state.trip.events.indexOf(event);
          state.trip.events.splice(event, 1);
        },
        setLocalEdit: (state, localEdit) => {
          state.lastEditLocal = localEdit;
        },
        updateCard: (state, newCard) => {
          const currentCardsIdxes = state.trip.events.map(e => e.id);

          const idx = currentCardsIdxes.indexOf(newCard.id);
          if (idx >= 0) {
            // This line is to ensure that vuex updates the state, but it
            // assigns by reference
            Vue.set(state.trip.events, idx, newCard);
            // The following lines assigns by values and overrides the prev
            // assignment. The previous one was just to let Vuex know that
            // something changed.
            assignCardByValue(state.trip.events[idx], newCard);
            console.log(state.trip.events[idx]);
          } else {
            state.trip.events.unshift(newCard);
          }
        },
        resolveThread: (state, thread) => {
          const index = state.threads.indexOf(thread);
          state.threads.splice(index, 1);
        },
      },
      actions: {      // run async
        /* User */
        getUser: (store, userId) => {
          api.getUser(userId).then((user) => {
            return store.commit('setUser', user);
          });
        },
        getTripList: (store) => {
          api.getTripList(userId).then((tripsList) => {
            return tripsList;   // TODO: determine whether this should be state or local var
          });
        },
        saveTrip: (store) => {
          for ( let i = 0; i < store.state.trip.events.length; i += 1 ) {
            store.state.trip.events[i].order = i;     // TODO: remove this hack
          }
          api.updateTrip(store.state.trip);
        },
        removeEvent: (store, event) => {
          store.commit('removeEvent', event);
        },
        setFocusedEvent: (store, event) => {
          store.commit('setFocusedEvent', event);
        },
        /* Sockets */
        socket_connect: (store, data) => {
            console.log("Connected to server socket");
        },
        socket_tripData: (store, trip) => {
            store.commit('setTrip', trip);
        },
        socket_updateTripName: (store, name) => {
            store.commit('setLocalEdit', false);
            store.commit('setTripName', name);
        },
        socket_activeUsers: (store, data) => {
            store.commit('updateOnlineUsers', data['usersConnected']);
        },
        socket_newUser: (store, data) => {
            store.commit('updateOnlineUsers', data['usersConnected']);
        },
        socket_userDisconnected: (store, data) => {
            store.commit('updateOnlineUsers', data['usersConnected']);
        },
        socket_updateCard: (store, newCard) => {
            store.commit('setLocalEdit', false);
            store.commit('updateCard', newCard);
        },
        socket_addCard: (store, newCard) => {
            if (newCard.new) {
              newCard.new = false;
            }
            // Keeping this for now, as this is what i'm most unsure about.
            // Since we override for when we add cards i'm not going to mark
            // it as a remote change. Seems to be behaving okay but ill
            // keep an eye on it.
            // store.commit('setLocalEdit', false);
            store.commit('updateCard', newCard);
        }
      },
    });
};
