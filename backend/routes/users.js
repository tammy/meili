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
      attributes: ['userId', 'readOnly'],
      where: {tripId: req.params.tripId},
      raw: true
    }).then((userIds) => {
      uIds = userIds.map(u => u.userId);
      uPerms = userIds.map(u => u.readOnly);
      const filtUsers = users.filter(u => uIds.indexOf(u.id) > -1);
      filtUsers.forEach((u, idx) => u.readOnly = uPerms[idx]);
      res.status(200).send(filtUsers);
    });
  });
});

// Get the permission of a user on a specific trip
router.get('/:tripId/:userId/permission', (req, res) => {
    models.UserTrip.find({
      where: {userId: req.params.userId, tripId: req.params.tripId }
    }).then(userInTripRelation => {
      res.status(200).send(userInTripRelation.readOnly);
    });
});

// Add a user to a given trip
router.put('/:tripId/:userId', (req, res) => {
  users.addUserToTripByUserId(req.params.tripId, req.params.userId, req.body.readOnly, () => {
    res.status(200).send(`User ${req.body.userId} added to ${req.body.tripId}.`);
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
      tripId: req.params.tripId,
      readOnly: req.body.readOnly ? true : false,
    };
    models.UserTrip.find({
      where: {userId: user.id, tripId: req.params.tripId}
    }).then(userInTripRelation => {
      if (userInTripRelation) {
        models.UserTrip.update(newRelation, {where: {userId: user.id, tripId: req.params.tripId}}).then(updatedRelation => {
          res.status(200).send(`User permissions changed for ${req.params.userEmail} for trip ${req.params.tripId} to read only = ${readOnlyPermission}.`);
        });
      } else {
        models.UserTrip.create(newRelation).then(() => {
          res.status(200).send(`User ${req.params.userEmail} added to ${req.params.tripId} by email address.`)
        });
      }
    });
  })
});


// Add a user upon login
router.post('/', (req, res) => {
  const newUser = req.body.user;
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
