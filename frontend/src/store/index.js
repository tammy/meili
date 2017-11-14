import Vue from 'vue';
import Vuex from 'vuex';
// import mutations from './mutations';
// import actions from './actions';
import getters from './getters';

Vue.use(Vuex);

/* eslint-disable */
export function createStore() {
    return new Vuex.Store({
      state: {
        user: {},
        tripEvents: [],
        count: 0
      },
      // actions,
      // mutations,
      getters
    });
};
