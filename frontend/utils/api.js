import axios from 'axios';
// import { getAccessToken } from './auth';

const BASE_URL = 'http://localhost:3333';

/**
 * User
 */
export function getUser(userId) {
  // TODO : doesn't have to use userId, since I think auth is actually on this layer
  // and the frontend doesn't have access to it
}

export function addCollaborator(userId) {
  // TODO: doesn't need to use userId, could be email or some other method
}

/**
 * Trip
 */

export function getTripList(userId) { /* TODO */ }

export function getTrip(tripId) {
  // TODO: add more details of a trip
  const url = `${BASE_URL}/api/cards/${tripId}`;
  return axios.get(url).then(response => response.data);
}

export function createTrip(userId) { /* TODO */ }

export function updateTrip(trip) { /* TODO */ }

export function deleteTrip(tripId) { /* TODO */ }

 /**
 * Trip Events
 */

export function createEvent(tripId) {
  const url = `${BASE_URL}/api/cards/${tripId}`;
  return axios.post(url).then(response => response.data);
}

export function updateEvent(card) {
  const cardId = card.id;
  const url = `${BASE_URL}/api/cards/`;
  return axios.put(url, {'card': card}).then((response) => {
    response.data;
  });
}

export function deleteEvent(card) { /* TODO */ }
