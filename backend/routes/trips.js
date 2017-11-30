// TODO: Apply caching to the trip models

var express = require('express');
var router = express.Router();
var Sequelize = require('sequelize-cockroachdb');
var models = require('../models');
var users = require('../models/users');
var uuidv4 = require('uuid/v4');
var storage = require('../utils/storage');

// Fetch all trips
router.get('/', (req, res) => {
    models.Trip.findAll({
        raw: true
    }).then((trips) => {
        res.status(200).send(trips);
    });
});

// Fetch all trips belonging to a certain user
router.get('/:userId', (req, res) => {
  models.Trip.findAll({
    raw: true
  }).then((trips) => {
    models.UserTrip.findAll({
      attributes: ['tripId', 'readOnly'],
      where: {userId: req.params.userId},
      raw: true
    }).then((tripIds) => {
      const tIds = tripIds.map(t => t.tripId);
      const tPerms = tripIds.map(t => t.readOnly);
      const filtTrips = trips.filter(t => tIds.indexOf(t.id) > -1);
      filtTrips.forEach((t, idx) => t.readOnly = tPerms[idx]);
      res.status(200).send(filtTrips);
    })
  });
});

// Fetch the contents of a specific trip
router.get('/:tripId', (req, res) => {
    models.Trip.findById(req.params.tripId).then((trip) => {
        res.status(200).send(trip);
    });
});

// Update a trip
router.put('/:tripId', (req, res) => {
    var tripId = req.params.tripId;
    const newTrip = JSON.parse(req.body.trip);
    if (newTrip.id && tripId != newTrip.id) {
        res.status(400).send("Trip ID in params does not match ID in object beign updated.");
    }
    models.Trip.update(newTrip, { where: {id: tripId}  }).then((trip) => {
        res.status(200).send(trip);
    });
});

// Create a new trip
router.post('/', (req, res) => {
    var tripId = uuidv4();
    const newTrip = req.body.trip;
    const ownerId = req.body.owner;
    newTrip.id = tripId;
    models.Trip.create(newTrip).then(() => {
        users.addUserToTripByUserId(tripId, ownerId, false, () => {
            models.Trip.findById(tripId).then((trip) => {
                res.status(200).send(trip);
            });
        });
    });
});

module.exports = router;
