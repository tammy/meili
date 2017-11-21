import axios from 'axios';
// import { getAccessToken } from './auth';

const BASE_URL = 'http://localhost:3333';
const VERSION = 'v1';
const API_URL = `${BASE_URL}/api/${VERSION}`;

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

export function getTripList(userId) {
  const url = `${API_URL}/trips`;
  return axios.get(url).then(response => response.data);
}

export function createTrip(userId) { /* TODO */ }

// TODO: convert to websocket event
export function updateTrip(trip) { /* TODO */ }

export function deleteTrip(tripId) { /* TODO */ }

 /**
 * Trip Events
 * TODO: convert all to websocket event
 */

export function createEvent(tripId) {
  const url = `${API_URL}/cards/${tripId}`;
  return axios.post(url).then(response => response.data);
}

export function deleteEvent(card) { /* TODO */ }
