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
        trip: {
          /* TODO: put all of the trip information in here: title, users, etc */
            users: [],
        },
        tripEvents: [],
        focusedEvent: {}
      },
      actions: {
        getTripEvents: (state, tripID) => {
          getCards(tripID).then((events) => {
            state.commit('setTripEvents', events);
          });
        },
        socket_newConnection: (state, data) => {
            state.commit('updateUsers', data['usersConnected']);
            var tok = localStorage.getItem('id_token');
            (new Vue()).$socket.emit('subTrip', {
                userID: tok,
                tripID: 'tripabc'
            });
        },
        socket_newUser: (state, data) => {
            state.commit('updateUsers', data['usersConnected']);
        },
        socket_userDisconnected: (state, data) => {
            state.commit('updateUsers', data['usersConnected']);
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
        updateUsers: (state, newUsers) => {
            state.trip.users = newUsers;
        },
      },
      getters: {
        eventAt: (state, index) => {      // TODO: WIP
          return state.tripEvents[index];
        }
      }
    });
};
