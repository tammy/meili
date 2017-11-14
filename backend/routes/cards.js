var express = require('express');
var router = express.Router();
var Sequelize = require('sequelize-cockroachdb');
var models = require('../models');
var uuidv4 = require('uuid/v4');

router.get('/', (req, res) => {
    models.Card.findAll({
        order: ['order'],
        raw: true
    }).then((cards) => {
        res.status(200).send(cards);
    });
});

router.get('/:tripId', (req, res) => {
    models.Card.findAll({
        where: {
            trip: req.params.tripId
        }, 
        order: ['order'],
        raw: true
    }).then((cards) => {
        res.status(200).send(cards);
    });
});

router.put('/', (req, res) => {
        var card = req.body.card;
        models.Card.update(card, { where: {id: card.id}  }).then(() => {
            res.status(200).send(card);
        });
});

router.post('/:tripId', (req, res) => {
        var cardId = uuidv4();
        var tripId = req.params.tripId;

        models.Card.create({ id: cardId, trip: tripId }).then(() => {
            models.Card.findAll({
                where: {
                    id: cardId
                }, 
                raw: true
            }).then((cards) => {
                res.status(200).send(cards);
            });
        });
});

router.delete('/:tripId', (req, res) => {
    const tripId = req.params.tripId;
    models.Card.destroy({
        where: {
            id: tripId
        }
    }).then(() => {
        res.status(200);
    });
});

module.exports = router;
