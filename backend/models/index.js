'use strict';

var Sequelize = require('sequelize-cockroachdb');
var user = 'root';
var db = 'meili';
var sequelize = new Sequelize('meili', 'root', '', {
  dialect: 'postgres',
  port: 26257,
  logging: false,
  pool: { max:1, min: 0, IdleTime: 5000, handleDisconnects: true }
});
var DataTypes = Sequelize.DataTypes;

if (!Sequelize.supportsCockroachDB) {
  throw new Error("CockroachDB dialect for Sequelize not installed");
}



// User
module.exports.User = sequelize.define('user', {
  id: { type: DataTypes.UUID, primaryKey: true  },
  name: { type: DataTypes.STRING },
  email: { type: DataTypes.STRING },
  profile_picture: { type: DataTypes.STRING }
})

// Unsure if we need this. It seems silly that the ORM layer doesn't handle this for you.
// module.exports.userToJSON = function(user) {
//   return {
//     id: parseInt(user.id),
//     name: user.name,
//     email: user.email,
//     profile_picture: user.email,
//   };
// };


// Card
module.exports.Card = sequelize.define('card', {
  id: { type: DataTypes.UUID, primaryKey: true },
  title: { type: DataTypes.STRING },
  description: { type: DataTypes.STRING },
  location: { type: DataTypes.STRING },
  coordinate_lat: { type: DataTypes.DOUBLE },
  coordinate_lon: { type: DataTypes.DOUBLE },
  start_time: { type: DataTypes.DATE },
  duration: { type: DataTypes.DOUBLE },
  creator: { type: DataTypes.UUID }
})


// Thread
module.exports.Thread = sequelize.define('thread', {
  id: { type: DataTypes.UUID, primaryKey: true },
  resolved: { type: DataTypes.BOOLEAN },
  topic: { type: DataTypes.TEXT }
  // options: { type: DataTypes.ARRAY(DataTypes.STRING) },
  // answers: { type: DataTypes.ARRAY(DataTypes.INTEGER) },
  // replies: { type: DataTypes.ARRAY(DataTypes.UUID) }
})


// Message
module.exports.Message = sequelize.define('message', {
  id: { type: DataTypes.UUID, primaryKey: true },
  owner:  { type: DataTypes.UUID },
  content: { type: DataTypes.TEXT }
})


module.exports.sequelize = sequelize;
module.exports.Sequelize = Sequelize;
