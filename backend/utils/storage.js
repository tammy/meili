let Sequelize = require('sequelize-cockroachdb');
let models = require('../models');
let uuidv4 = require('uuid/v4');
let tripCache = require('./partialWritebackCache');

tripCache.setupExpiryHandler(persistTrip);

function persistTrip(key, value, whatChanged) {
	console.log('[storage.js] Cache entry for trip ' + key + ' expired');
	if (whatChanged.size > 0) {
  	 	for (let card of value) {
			if (whatChanged.has(card.id)) {
				console.log('[storage.js] Writing card ' + card.id + ' to DB');
				models.Card.update(card, { where: {id: card.id} });
			}
  	 	}

  	 	// Put the trip back into the cache
  	 	tripCache.setEntry(key, value);
  	 	return;
  	}
}

// Fetch trip cards
module.exports.withCardsFromTrip = (tripId, callback) => {
	let trip = tripCache.retrieveEntry(tripId);
	if (trip !== undefined) {
		console.log('[storage.js] Fetching trip: trip was cached');
		callback(trip);
		return;
	}

	console.log('[storage.js] Fetching trip from DB and caching it');

	// Pull data from database
	models.Card.findAll({
        where: {
            trip: tripId,
        }, 
        order: ['order'],
        raw: true
    }).then((cards) => {
        tripCache.setEntry(tripId, cards);
        callback(cards);
    });
};

module.exports.updateCard = (tripId, newCard, callback) => {
	module.exports.withCardsFromTrip(tripId, (trip) => {
		// Update cached value
		for (let i = 0; i < trip.length; i++) {
			console.log('[storage.js] ' + trip[i].id);
			if (trip[i].id = newCard.id) {
				console.log('[storage.js] Mutating cached trip list with update for card ' + trip[i].id);
				trip[i] = newCard;
				// TODO: maybe consider passing in a Set instead of a list since the callback passes back a Set
  	 			tripCache.markAsUpdated(tripId, [trip[i].id]);
				break;
			}
  	 	}
  	 	callback(newCard);
	});	
}

module.exports.addCard = (tripId, cardId, callback) => {
	// TODO: implement caching
	storage.invalidateEntry(tripId);

	models.Card.create({ id: cardId, trip: tripId }).then(() => {
        models.Card.findAll({
            where: {
                id: cardId,
            }, 
            raw: true,
        }).then((cards) => {
            callback(cards);
        });
    });
}

module.exports.deleteCard = (tripId, callback) => {
	// TODO: implement caching
	storage.invalidateEntry(tripId);

	models.Card.destroy({
        where: {
            id: tripId,
        }
    }).then(() => {
        callback();
    });
}

module.exports.getAllCards = (callback) => {
	models.Card.findAll({
        order: ['order'],
        raw: true,
    }).then((cards) => {
        callback(cards);
    });
}
