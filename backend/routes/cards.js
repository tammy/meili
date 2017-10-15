var express = require('express');
var router = express.Router();
var Sequelize = require('sequelize-cockroachdb');
var models = require('../models');

router.get('/', (req, res) => {
    res.status(200).send('NOM NOM CARDS');
})

router.get('/:trip_id', (req, res) => {
    models.Card.findAll({
        where: {
            trip: req.params.trip_id
        }, 
        raw: true
    }).then((cards) => {
        res.status(200).send(cards);
    });
})

module.exports = router;
