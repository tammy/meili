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
router.post('/:threadId', (req, res) => {
    const threadId = req.params.threadId;
    var thread = req.body.thread;
    thread['id'] = threadId;
    models.Thread.create(thread).then((createdThread) => {
        res.status(200).send(createdThread);
    });
});

module.exports = router;
