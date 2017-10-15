var Sequelize = require('sequelize-cockroachdb');
var models = require('../models');

models.sequelize.sync({force: true}).then(function() {
  // Seed User
  models.User.create({
    id: "a1d2753b-2964-4944-ab03-e6e5c2d6e336",
    name: "Paul",
    email: "pbardea@gmail.com",
    profile_picture: "http://www.example.com"
  });

  models.Trip.create({
    id: "6347f1fc-64d1-4f8b-ac79-44d59d130b6d",
    owner: "a1d2753b-2964-4944-ab03-e6e5c2d6e336",
    name: "Paris vacay",
    description: "La vie est belle."
  });

  // Seed card
  models.Card.create({
    id: "3176daf7-ea72-4444-b2be-7d2f466af8d0",
	trip: "6347f1fc-64d1-4f8b-ac79-44d59d130b6d",
    title: "Card title",
    description: "Card description.",
    location: "Paris, France", 
    duration: 20.0,
    creator: "a1d2753b-2964-4944-ab03-e6e5c2d6e336"
  })

  // Seed thread
  models.Thread.create({
    id: "5b2ab182-cf6a-4f97-ba81-630f29df375d",
    resolved: false,
    topic: "I AM ALERGIC TO FISH!",
    options: "['Go somewhere else', 'Sucks. You gonna starve.']",
    answers: "[2, 34]",
    replies: "['d3f82eb4-44f5-4969-9319-029eb6444e82']"
  });
  models.Thread.create({
    id: "15b4c2d1-9e20-476d-9407-a4b7e80c7e83",
    resolved: false,
    topic: "I WANT TO BE HEARD! THAT IS ALL!",
    replies: "[4ae498bb-fd2a-4e45-acfe-d22bfee7c415]"
  });

  // Seed message
  models.Message.create({
    id: "d3f82eb4-44f5-4969-9319-029eb6444e82",
    owner: "a1d2753b-2964-4944-ab03-e6e5c2d6e336",
    content: "This is a message!"
  });
  models.Message.create({
    id: "4ae498bb-fd2a-4e45-acfe-d22bfee7c415",
    owner: "a1d2753b-2964-4944-ab03-e6e5c2d6e336",
    content: "This is another message!"
  });
});

// FIXME: Hack because I spent over an hour on this and I'm sick of it.
setTimeout(() => process.exit(), 1000);
