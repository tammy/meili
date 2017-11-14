import axios from 'axios';
import { getAccessToken } from './auth';

const BASE_URL = 'http://localhost:3333';
const API_URL = `${BASE_URL}/api/v1`;

export {
    getCards,
    updateCard,
    createCard,
};

function getCards(tripId) {
  const url = `${API_URL}/cards/${tripId}`;
  return axios.get(url).then(response => response.data);
}

function createCard(tripId) {
  const url = `${API_URL}/cards/${tripId}`;
  return axios.post(url).then(response => response.data);
}

function updateCard(card) {
  const cardId = card.id;
  const url = `${API_URL}/cards/`;
  return axios.put(url, {'card': card}).then((response) => {
    response.data;
  });
}
