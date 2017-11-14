var express = require('express');
var router = express.Router();
var Sequelize = require('sequelize-cockroachdb');
var models = require('../models');
var uuidv4 = require('uuid/v4');

// Returns all trips
router.get('/', (req, res) => {
    models.Trip.findAll({
        raw: true
    }).then((trips) => {
        res.status(200).send(trips);
    });
});

// Return the contents of a specific trip
router.get('/:tripId', (req, res) => {
    models.Trip.findById(req.params.tripId).then((trip) => {
        res.status(200).send(trip);
    });
});

// Update a trip
router.put('/:tripId', (req, res) => {
        var tripId = req.params.tripId;
        var updatedTrip = req.body.trip;
        if (tripId != updatedTrip.id) {
            res.status(400).send("Trip ID in params does not match ID in object beign updated.");
        }
        models.Trip.update(trip, { where: {id: tripId}  }).then(() => {
            res.status(200).send(trip);
        });
});

// Create a new trip
router.post('/', (req, res) => {
        var tripId = uuidv4();
        var ownerId = req.body.user;

        models.Trip.create({ id: tripId, owner: ownerId }).then(() => {
            models.Trip.findById(tripId).then((trip) => {
                res.status(200).send(trip);
            });
        });
});

module.exports = router;
