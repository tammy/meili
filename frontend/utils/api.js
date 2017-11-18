import axios from 'axios';
// import { getAccessToken } from './auth';

const BASE_URL = 'http://138.197.128.24:3333';
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

export function updateUser(userInfo) {
  const url = `${API_URL}/users`;
  return axios.post(url, {user: userInfo}).then(response => response.status);
}

export function addCollaborator(tripId, email, readOnly) {
  const data = {
    readOnly: readOnly
  };
  const url = `${API_URL}/users/${tripId}/email/${email}`;
  return axios.put(url, data).then(response => response.status);
}

export function getCollaborators(tripId) {
  const url = `${API_URL}/users/${tripId}`;
  return axios.get(url).then(response => response.data);
}

export function getUserPermissions(tripId, userId) {
  const url = `${API_URL}/users/${tripId}/${userId}/permission`;
  return axios.get(url).then(response => response.data);
}

/**
 * Trip
 */

export function getTripList() {
  const userId = localStorage.id_token;
  const url = `${API_URL}/trips/${userId}`;
  return axios.get(url).then(response => response.data);
}

export function createTrip(userId, newTrip) {
  const url = `${API_URL}/trips`;
  const data = {
    trip: {
      name: newTrip.name || '',
      description: newTrip.description || '',
      picture: newTrip.picture || '',
    },
    owner: localStorage.id_token || '',
  };

  return axios.post(url, data).then(response => response.data);
}
