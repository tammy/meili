var express = require('express');
var router = express.Router();
var Sequelize = require('sequelize-cockroachdb');
var models = require('../models');
var uuidv4 = require('uuid/v4');

// Returns all messages for a specified thread
router.get('/:threadId', (req, res) => {
    const threadId = req.params.threadId;
    models.Message.findAll({
        where: {threadId: threadId},
        raw: true
    }).then((messages) => {
        res.status(200).send(messages);
    });
});

// Returns a message with a given ID
router.get('/:messageId'), (req, res) => {
    const messageId = req.params.messageId;
    models.Message.findAll({
        where: {id: messageId},
        raw: true
    }).then((message) => {
        res.status(200).send(message);
    });
}

// Create a new message
router.post('/:threadId', (req, res) => {
    const cardId = uuidv4();
    const threadId = req.params.threadId;
    var message = req.body.mesasge;
    const otherMsgs = models.Message.findAll({where: {threadId: threadId}});
    const order = otherMsgs.length + 1;
    message['id'] = cardId;
    message['threadId'] = threadId;
    message['order'] = order;
    models.Message.create(message).then((msg) => {
        res.status(200).send(msg);
    });
});

module.exports = router;
