var Sequelize = require('sequelize-cockroachdb');
var models = require('../models');
var uuidv4 = require('uuid/v4');
var storage = require('../utils/storage');

module.exports.addUserToTripByUserId = (tripId, userId, readOnly, callback) => {
  var readOnlyPermission = readOnly === true;
  const newRelation = {
    userId: userId,
    tripId: tripId,
    readOnly: readOnlyPermission,
  };
  models.UserTrip.create(newRelation).then(callback);
};
