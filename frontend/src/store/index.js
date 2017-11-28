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
          markers: [],
          collaborators: [],
          oldEvents: [],
        },
        tripsList: [],
        // lastEditLocal is used keep track when we should push changes to server.
        // Avoids infinite loops.
        lastEditLocal: true,
        onlineUsers: {}, // map of user IDs to their details
        focusedEvent: {}, // Didn't know which one to keep so keeping both for now
        threads: [],
        messages: {},
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
        getMessages: (state) => (threadID) => {
          // TODO: get threads based on eventID
          if (state.messages[threadID]) {
            return state.messages[threadID].sort((a, b) => {
              return a.order > b.order ? 1 : -1;
            })
          };
          return [];
        },
      },
      mutations: {    // run synchronously
        addMessageToThread: (state, [message, thread]) => {
          var newMessage = {id: uuidv4(), threadId: thread.id, owner: localStorage.id_token, content: message, new: true};
          if (state.messages[thread.id] === undefined) {
            state.messages[thread.id] = [];
          }
          state.messages[thread.id].push(newMessage);
        },
        addNewThreadToEvent: (state, [threadTopic, threadContent, eventID]) => {
          var newThread = {id: uuidv4(), cardId: eventID, content: threadContent, topic: threadTopic, new: true};
          state.threads.push(newThread);
        },
        setMessages: (state, messages) => {
          state.messages = messages;
        },
        addMessageForThread: (state, [messages, threadID]) => {
          Vue.set(state.messages, threadID, messages);
          console.log(state.messages);
          console.log();
        },
        setThreads: (state, threads) => {
          state.threads = threads;
        },
        /* User */
        setUser: (state, user) => {
          state.user = user;
        },
        setCollaborators: (state, users) => {
          state.trip.collaborators = users;
        },
        updateCollaborators: (state, user) => {
          state.trip.collaborators.push(user);
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
        setTripsList: (state, tripsList) => {
          state.tripsList = tripsList;
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
          if (index !== -1) {
            state.trip.events.splice(event, 1);
          }
        },
        addMarker: (state, marker) => {
          state.trip.markers.push(marker);
        },
        removeMarker: (state, marker) => {
          const index = state.trip.markers.indexOf(marker);
          if (index !== -1) {
            state.trip.markers.splice(marker, 1);
          }
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
          state.trip.events = state.trip.events.sort((a, b) => {
            return a.order > b.order ? 1 : -1;
          });
        },
        resolveThread: (state, thread) => {
          const index = state.threads.indexOf(thread);
          state.threads.splice(index, 1);
        },
      },
      actions: {      // run async
        getThreads: (store, eventID) => {
          api.getThreads(eventID).then(threads => {
            store.commit('setMessages', {});
            threads.forEach(thread => {
              api.getMessages(thread.id).then(messages => {
                return store.commit('addMessageForThread', [messages, thread.id]);
              });
            });
            return store.commit('setThreads', threads);
          });
        },
        /* User */
        getUser: (store, userId) => {
          api.getUser(userId).then((user) => {
            return store.commit('setUser', user);
          });
        },
        /* Trips */
        getTripsList: (store) => {
          api.getTripList().then((tripsList) => {
            return store.commit('setTripsList', tripsList);
          });
        },
        createTrip: (store, newTrip) => {
          return new Promise((resolve, reject) => {
            api.createTrip(store.state.user.id, newTrip).then((trip) => {
              store.dispatch('getTripsList');
              resolve(trip);
            }, error => {
              reject(error);
            });
          })
        },
        /* Trip Events */
        removeEvent: (store, event) => {
          store.commit('removeEvent', event);
        },
        setFocusedEvent: (store, event) => {
          store.commit('setFocusedEvent', event);
        },
        addCollaborator: (store, email) => {
          api.addCollaborator(store.state.trip.id, email).then((status) => {
            if (status && status == 200) {
              store.dispatch('getCollaborators');
              return true;
            }
            return false;
          });
        },
        getCollaborators: (store) => {
          api.getCollaborators(store.state.trip.id).then((users) => {
            store.commit('setCollaborators', users);
          });
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
            console.log('udpating cards');
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
        },
        socket_addMessage: (store, cardId) => {
            console.log('updating threads');
            store.dispatch('getThreads', cardId);
        }
      },
    });
};
