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
        }
      },
      getters: {
        eventAt: (state, index) => {      // TODO: WIP
          return state.tripEvents[index];
        }
      }
    });
};
