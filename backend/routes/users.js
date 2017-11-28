var express = require('express');
var router = express.Router();
var Sequelize = require('sequelize-cockroachdb');
var models = require('../models');
var users = require('../models/users');
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
    });
  });
});

// Add a user to a given trip
router.put('/:tripId/:userId', (req, res) => {
  users.addUserToTripByUserId(req.body.tripId, req.body.userId, () => {
    res.status(200).send(`User ${req.body.userId} added to ${req.body.tripId}`);
  });
});

// Add a user email to a given trip
router.put('/:tripId/email/:userEmail', (req, res) => {
  models.User.find({
    where: {email: req.params.userEmail},
    raw: true
  }).then(user => {
    if (!user) {
      res.status(404).send("User not found");
    }
    const newRelation = {
      userId: user.id,
      tripId: req.params.tripId
    };
    models.UserTrip.create(newRelation).then(() => {
      res.status(200).send(`User ${req.params.userEmail} added to ${req.params.tripId} by email address.`)
    });
  })
});


// Add a user upon login
router.post('/', (req, res) => {
  const newUser = JSON.parse(req.body.user);
  models.User.find({
    where: {id: newUser.id},
    raw: true
  }).then(user => {
    if (user) {
      models.User.update(newUser, {where: {id: newUser.id}} ).then(updatedUser => {
        res.status(200).send(updatedUser);
      }).catch(err => {
        res.status(400).send(err);
      });
    } else {
      models.User.create(newUser).then(createdUser => {
        res.status(200).send(createdUser);
      }).catch( err => {
        res.status(400).send(err);
      });
    }
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

// Remove a user email from a given trip
router.delete('/:tripId/email/:userEmail', (req, res) => {
  models.User.find({
    where: {email: req.params.userEmail},
    raw: true
  }).then(user => {
    if (!user) {
      res.status(404).send("User not found");
    }
    const newRelation = {
      userId: user.id,
      tripId: req.params.tripId
    };
    models.UserTrip.destroy({where: newRelation}).then(() => {
      res.status(200).send(`User ${req.params.userEmail} removed from ${req.params.tripId} by email address.`);
    });
  })
});

module.exports = router;
