'use strict';

const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const storage = require('./utils/storage');

const PORT = 3333;
const VERSION = 'v1';

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(`/api/${VERSION}/cards/`, require('./routes/cards'));
app.use(`/api/${VERSION}/trips/`, require('./routes/trips'));

const pubSubReg = {};

const server = app.listen(PORT, () => {
    console.log('Starting on localhost:', PORT);
});

const io = require('socket.io')(server);

io.on('connection', (socket) => {
    let userSocket = 'unpopulatedUser';
    let trip = 'unknownTrip';

    socket.on('newConnection', (data) => {
        console.log('Connection data requested');
        console.log(data);
        const userID = data['userID'];
        const tripID = data['tripID'];
        const displayName = data['userName'];
        const profileImageUrl = data['profileImageUrl'];
        userSocket = socket.id;
        trip = tripID;

        if (!pubSubReg.hasOwnProperty(tripID)) {
            pubSubReg[tripID] = {};
        }
        pubSubReg[tripID][socket.id] = {
            userID,
            displayName,
            profileImageUrl,
        };

        console.log('Currently active trips and users:');
        console.log(pubSubReg);

        // FIXME: I feel like maybe this file shouldn't be interacting with the storage layer directly
        // Send trip data to client and subscribe to trip
        storage.withTripDetails(tripID, (trip) => {
            storage.withCardsFromTrip(tripID, (cards) => {
                trip.events = cards;
                socket.emit('tripData', trip);
                socket.join(tripID);
                io.in(tripID).emit('newUser', { usersConnected: pubSubReg[tripID] });
            });
        });
    });

    socket.on('updateCard', (data) => {
        const tripID = data['tripID'];
        const newCard = data['card'];

        storage.updateCard(tripID, newCard, () => {
            socket.to(tripID).emit('updateCard', newCard);
        });
    });

    const handleDisconnect = () => {
        // FIXME: ugly hack: we have to double check whether the user is in the list because we're
        // storing the socket as part of the app state so if the user leaves the site, disconnect will
        // be called regardless of whether the user is actually on a trip page. Consider not storing
        // the socket as Vuex state data on the frontend.
        if (!pubSubReg.hasOwnProperty(trip) || !pubSubReg[trip].hasOwnProperty(userSocket)) {
            console.log('User does not exist!');
            return;
        }
        console.log('Disconnect user from pubsub: ' + userSocket);

        delete pubSubReg[trip][userSocket];

        io.in(trip).emit('userDisconnected', { usersConnected: pubSubReg[trip]});

        if (Object.keys(pubSubReg[trip]).length === 0) {
            delete pubSubReg[trip];
        }

        console.log('Remaining active trips and users:');
        console.log(pubSubReg);
    };

    socket.on('removeConnection', handleDisconnect);

    socket.on('disconnect', handleDisconnect);
});


