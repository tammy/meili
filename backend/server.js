'use strict';

const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');

const PORT = 3333;
const VERSION = 'v1';

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(`/api/${VERSION}/cards/`, require('./routes/cards'));
app.use(`/api/${VERSION}/trips/`, require('./routes/trips'));

var pubSubReg = {};

const server = app.listen(PORT, () => {
    console.log('Starting on localhost:', PORT);    
});

const io = require('socket.io')(server);

io.on('connection', (socket) => {
    var user = 'unpopulatedUser';
    var trip = 'unknownTrip';

    socket.on('newConnection', (data) => {
        console.log('Connection data requested');
        var userID = data['userID'];
        var tripID = data['tripID'];
        user = userID;
        trip = tripID;

        if (!pubSubReg.hasOwnProperty(tripID)) {
            pubSubReg[tripID] = [];
        }
        pubSubReg[tripID].push(userID);

        console.log('Currently active trips and users:');
        console.log(pubSubReg);

        socket.join(tripID);
        io.in(tripID).emit('newUser', { usersConnected: pubSubReg[tripID] });
    });

    socket.on('disconnect', () => {
        console.log('Disconnect user from pubsub: ' + user);
        var index = pubSubReg[trip].indexOf(user);
        if (index > -1) {
            pubSubReg[trip].splice(index, 1);
        }

        if (pubSubReg[trip].length === 0) {
            delete pubSubReg[trip];
        }

        io.in(trip).emit('userDisconnected', { usersConnected: pubSubReg[trip]});
    })
});


