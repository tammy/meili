var express = require('express');
var router = express.Router();
var Sequelize = require('sequelize-cockroachdb');
var models = require('../models');
var uuidv4 = require('uuid/v4');
var storage = require('../utils/storage');

// Fetch all users
router.get('/', (req, res) => {
  models.User.findAll({
    raw: true
  }).then((users) => {
    res.status(200).send(users);
  });
});

// Fetch the users for a specific trip
router.get('/:tripId', (req, res) => {
  models.User.findAll({
    raw: true
  }).then((users) => {
    models.UserTrip.findAll({
      attributes: ['userId'],
      where: {tripId: req.params.tripId},
      raw: true
    }).then((userIds) => {
      uIds = userIds.map(u => u.userId);
      const filtUsers = users.filter(u => uIds.indexOf(u.id) > -1);
      res.status(200).send(filtUsers);
    })
  });
});

// Add a user to a given trip
router.put('/:tripId/:userId', (req, res) => {
  const newRelation = {
    userId: req.params.userId,
    tripId: req.params.tripId
  };
  models.UserTrip.create(newRelation).then(() => {
    res.status(200).send(`User ${req.params.userId} added to ${req.params.tripId}`)
  });
});

// Remove a user from a given trip
router.delete('/:tripId/:userId', (req, res) => {
  const newRelation = {
    userId: req.params.userId,
    tripId: req.params.tripId
  };
  models.UserTrip.destroy({where: newRelation}).then(() => {
    res.status(200).send(`User ${req.params.userId} removed from ${req.params.tripId}`);
  });
});

module.exports = router;
