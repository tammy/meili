import io from 'socket.io-client';
import Vue from 'vue';
import Vuex from 'vuex';
import { getCards, createCard, updateCard } from '../../utils/api';

Vue.use(Vuex);

/* eslint-disable */
export function createStore() {
    return new Vuex.Store({
      state: {
        user: {},
        users: [],
        trip: {
          /* TODO: put all of the trip information in here: title, users, etc */
        },
        tripEvents: [],
        focusedEvent: {}
      },
      actions: {
        getTripEvents: (state, tripId) => {
          getCards(tripId).then((events) => {
            state.commit('setTripEvents', events);
          });
        },
        socket_newConnection: (context, data) => {
            context.commit('UPDATE_USERS', data['users_here']);
            var tok = localStorage.getItem('id_token');
            (new Vue()).$socket.emit('sub_trip', {
                user_id: tok,
                trip_id: 'tripabc'
            });
        },
        socket_newUser: (context, data) => {
            context.commit('UPDATE_USERS', data['users_here']);
        },
        socket_userDisconnected: (context, data) => {
            context.commit('UPDATE_USERS', data['users_here']);
        }
      },
      mutations: {
        setTripEvents: (state, events) => {
          state.tripEvents = events;
        },
        setFocusedEvent: (state, event) => {    // TODO: WIP
          state.focusedEvent = event;
        },
        updateTrip: (state, tripEvents) => {    // TODO: WIP
          state.tripEvents = tripEvents;
        },
        addEvent: (state) => {    // TODO: WIP
        },
        UPDATE_USERS: (state, new_users) => {
            state.users = new_users;
        },
      },
      getters: {
        eventAt: (state, index) => {      // TODO: WIP
          return state.tripEvents[index];
        }
      }
    });
};
