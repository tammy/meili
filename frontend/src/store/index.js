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
        trip: {   // TODO: do not hardcode this, get this from the API
          name: 'Graduation - Paris, France',
          id: '6347f1fc-64d1-4f8b-ac79-44d59d130b6d',
          events: [],
          collaborators: [],
          oldEvents: [],
        },
        // lastEditLocal is used keep track when we should push changes to server.
        // Avoids infinite loops.
        lastEditLocal: true,
        onlineUsers: {}, // map of user IDs to their details
        focusedEvent: {}
      },
      getters: {},    // currently useless
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
        /* Events */
        setFocusedEvent: (state, event) => {
          state.focusedEvent = event;
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
        }
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
        /* Events */
        saveEvent: (store, event) => {
          api.updateEvent(store.state.trip.id, event);
        },
        socket_connect: (store, data) => {
            console.log("Connected to server socket");
        },
        socket_tripData: (store, trip) => {
            store.commit('setTrip', trip);
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
            // store.commit('setLocalEdit', false);
            store.commit('updateCard', newCard);
        }
      },
    });
};
