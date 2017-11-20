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
    const card = JSON.parse(req.body.card);

    storage.updateCard(tripId, card, (newCard) => {
        res.status(200).send(newCard);
    });
});

// Add a card to a trip
router.post('/:tripId', (req, res) => {
    var cardId = uuidv4();
    var tripId = req.params.tripId;
    const newCard = JSON.parse(req.body.card);
    newCard.id = cardId;
    newCard.tripId = tripId;

    storage.addCard(tripId, newCard, (newCard) => {
        res.status(200).send(newCard);
    });
});

router.delete('/:tripId/:cardId', (req, res) => {
    const tripId = req.params.tripId;
    const cardId = req.params.cardId;

    console.log(`Deleting card ${cardId}`);
    storage.deleteCard(cardId, tripId, () => {
        res.status(200).send();
    }, () => {
        res.status(404).send(`Card with id ${cardId} was not found.`);
    })
});

module.exports = router;
