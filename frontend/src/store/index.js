import Vue from 'vue';
import Vuex from 'vuex';
import { getCards, createCard, updateCard } from '../../utils/api';

Vue.use(Vuex);

/* eslint-disable */
export function createStore() {
    return new Vuex.Store({
      state: {
        user: {},
        tripEvents: [],
        focusedEvent: {}
      },
      actions: {
        FETCH_TRIP_EVENTS: (state, tripId) => {
          getCards(tripId).then((cards) => {
            state.commit('SET_TRIP_EVENTS', cards);
          });
        },

        // FETCH_USER: ({ commit, state }, { id }) => {
        //   return state.users[id]
        //     ? Promise.resolve(state.users[id])
        //     : fetchUser(id).then(user => commit('SET_USER', { id, user }))
        // }
      },
      mutations: {
        SET_TRIP_EVENTS: (state, cards) => {
          state.tripEvents = cards;
        },
        UPDATE_ORDER: (state, tripEvents) => {
          state.tripEvents = tripEvents;
        },
        ADD_EVENT: (state, id) => {

        }
      },
      getters: {
        // getTripEvents: (state) => {
        //   return state.tripEvents;
        // }
        tripEventsCount: state => {
          return state.tripEvents.length
        }
      }
    });
};
