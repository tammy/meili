// TODO: Apply caching to the trip models

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
  }).then((trips) => {
    res.status(200).send(trips);
  });
});

// Fetch the contents of a specific trip
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

module.exports = router;
