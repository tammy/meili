import axios from 'axios';
import { getAccessToken } from './auth';

const BASE_URL = 'http://localhost:3333';

export {
    getPublicStartupBattles,
    getPrivateStartupBattles,
    getItineraryData,
};

function getPublicStartupBattles() {
  const url = `${BASE_URL}/api/battles/public`;
  return axios.get(url).then(response => response.data);
}

function getPrivateStartupBattles() {
  const url = `${BASE_URL}/api/battles/private`;
  return axios.get(url, { headers: { Authorization: `Bearer ${getAccessToken()}` } }).then(response => response.data);
}

// NOTE: This is a placeholder before the API is settled
function getItineraryData(itineraryId) {
    // TODO: Implement me
    const url = `${BASE_URL}/api/itinerary/${itineraryId}`;

    console.log('Fetching itinerary data');
    return [
        {
            type: 'flight',
            time: '12:30',
        }, {
            type: 'food',
            time: '18:20',
        }, {
            type: 'lodging',
            time: '22:00',
        },

    ];
}