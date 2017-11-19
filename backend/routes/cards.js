// TODO: This file must be integrated with websockets (i.e. all endpoints should become event handlers)

var express = require('express');
var router = express.Router();
var uuidv4 = require('uuid/v4');
var storage = require('../utils/storage');

// Endpoint only used for testing
// Fetch all cards
router.get('/', (req, res) => {
    return storage.getAllCards((cards) => {
        res.status(200).send(cards);
    });
});

// Fetch all cards from a trip
router.get('/:tripId', (req, res) => {
    const tripId = req.params.tripId;
    storage.withCardsFromTrip(tripId, (cards) => {
        res.status(200).send(cards);
    });
});

// Update a card for a given trip
router.put('/:tripId', (req, res) => {
    const tripId = req.params.tripId;
    const card = req.body.card;

    storage.updateCard(tripId, card, (newCard) => {
        res.status(200).send(newCard);
    });
});

// Add a card to a trip
router.post('/:tripId', (req, res) => {
    const tripId = req.params.tripId;
    const cardId = uuidv4();

    storage.updateCard(tripId, cardId, (newCard) => {
        res.status(200).send(cards);
    });
});

// Delete all cards from a trip
router.delete('/:tripId', (req, res) => {
    const tripId = req.params.tripId;

    storage.updateCard(tripId, () => {
        res.status(200);
    });
});

module.exports = router;
