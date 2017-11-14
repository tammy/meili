import io from 'socket.io-client';
import Vue from 'vue';
import Vuex from 'vuex';
import * as api from '../../utils/api';

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
        },
        onlineUsers: [],
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
        /* Trip */
        setTrip: (state, trip) => {
          state.trip.events = trip;   // TODO: set entire trip instead
          // state.trip = trip;
        },
        /* Events */
        setFocusedEvent: (state, event) => {
          state.focusedEvent = event;
        },
        addEvent: (state) => {
          const newTripEvent = api.createEvent(state.trip.id);
          state.trip.events.unshift(newTripEvent);
        },
        removeEvent: (state, event) => {
          const index = state.trip.events.indexOf(event);
          state.trip.events.splice(event, 1);
        },
      },
      actions: {      // run async
        /* User */
        getUser: (state, userId) => {
          api.getUser(userId).then((user) => {
            return state.commit('setUser', user);
          });
        },
        /* Trip */
        getTripList: (state) => {
          api.getTripList(userId).then((tripsList) => {
            return tripsList;   // TODO: determine whether this should be state or local var
          });
        },
        getTrip: (state, tripId) => {
          api.getTrip(tripId).then((trip) => {
            return state.commit('setTrip', trip);
          });
        },
        saveTrip: (state) => {
          for ( let i = 0; i < state.trip.events.length; i += 1 ) {
            state.trip.events[i].order = i;     // TODO: remove this hack
            
          }
          api.updateTrip(state.trip);
        },
        /* Events */
        saveEvent: (state, event) => {
          api.updateEvent(event);
        },
        socket_newConnection: (state, data) => {
            state.commit('updateOnlineUsers', data['usersConnected']);
            var tok = localStorage.getItem('id_token');
            (new Vue()).$socket.emit('subTrip', {
                userID: tok,
                tripID: 'tripabc'
            });
        },
        socket_newUser: (state, data) => {
            console.log(data);
            state.commit('updateOnlineUsers', data['usersConnected']);
        },
        socket_userDisconnected: (state, data) => {
            state.commit('updateOnlineUsers', data['usersConnected']);
        }
      },
    });
};
