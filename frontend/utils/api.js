import axios from 'axios';
// import { getAccessToken } from './auth';

const BASE_URL = 'http://localhost:3333';
const VERSION = 'v1';
const API_URL = `${BASE_URL}/api/${VERSION}`;

/**
 * Messages
 */
 export function getMessages(threadID) {
  const url = `${API_URL}/messages/${threadID}`;
  return axios.get(url).then(response => response.data);
 }

/**
 * Threads
 */
 export function getThreads(eventID) {
  const url = `${API_URL}/threads/${eventID}`;
  return axios.get(url).then(response => response.data);
 }

/**
 * User
 */
export function getUser(userId) {
  // TODO : doesn't have to use userId, since I think auth is actually on this layer
  // and the frontend doesn't have access to it
}

export function addCollaborator(tripId, email) {
  const url = `${API_URL}/users/${tripId}/${email}`;
  return axios.put(url).then(response => response.status);
  // TODO: doesn't need to use userId, could be email or some other method
}

export function getCollaborators(tripId) {
  const url = `${API_URL}/users/${tripId}`;
  return axios.get(url).then(response => response.data);
}

/**
 * Trip
 */

export function getTripList() {
  const url = `${API_URL}/trips`;
  return axios.get(url).then(response => response.data);
}

export function createTrip(userId, newTrip) {
  const url = `${API_URL}/trips`;
  const data = JSON.stringify({
    // owner: userId,
    owner: localStorage.id_token || '',
    name: newTrip.name || '',
    description: newTrip.description || '',
  });

  return axios.post(url, data).then(response => response.data);
}

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
