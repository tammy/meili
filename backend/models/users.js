var Sequelize = require('sequelize-cockroachdb');
var models = require('../models');
var uuidv4 = require('uuid/v4');
var storage = require('../utils/storage');

module.exports.addUserToTripByUserId = (tripId, userId, callback) => {
  const newRelation = {
    userId,
    tripId,
  };
  models.UserTrip.create(newRelation).then(callback);
};
