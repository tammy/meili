var express = require('express');
var router = express.Router();
var Sequelize = require('sequelize-cockroachdb');
var models = require('../models');
var uuidv4 = require('uuid/v4');

// Returns all messages for a specified card
router.get('/:cardId', (req, res) => {
    const cardId = req.params.cardId;
    models.Thread.findAll({
        where: {cardId: cardId},
        raw: true
    }).then((threads) => {
        res.status(200).send(threads);
    });
});

// Create a new thread
router.post('/:cardId', (req, res) => {
    const thread = JSON.parse(req.body.thread);
    const owner = JSON.parse(req.body.owner);
    thread['id'] = uuidv4();
    thread['cardId'] = req.params.cardId;
    thread['resolved'] = false;
    thread['ownerId'] = owner ? owner.id : "";
    thread['ownerName'] = owner.name ? owner.name : "";
    thread['ownerPicture'] = owner.picture ? owner.picture : "";
    models.Thread.create(thread).then((createdThread) => {
        res.status(200).send(createdThread);
    });
});

module.exports = router;
