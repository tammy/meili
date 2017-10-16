var express = require('express');
var router = express.Router();
var Sequelize = require('sequelize-cockroachdb');
var models = require('../models');

router.get('/', (req, res) => {
    models.Card.findAll({
        raw: true
    }).then((cards) => {
        res.status(200).send(cards);
    });
});

router.get('/:trip_id', (req, res) => {
    models.Card.findAll({
        where: {
            trip: req.params.trip_id
        }, 
        raw: true
    }).then((cards) => {
        res.status(200).send(cards);
    });
});

router.put('/:trip_id/:card_id', (req, res) => {
        var card = JSON.parse(req.body.card);
        models.Card.update(card, { where: {id: card.id}  });
        res.status(200).send();
});

module.exports = router;
