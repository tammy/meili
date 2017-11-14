'use strict';

const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');

const PORT = 3333;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use('/api/battles/', require('./routes/battles'));
app.use('/api/cards/', require('./routes/cards'));

var pubSubReg = {};
var users = [];

const server = app.listen(PORT, () => {
    console.log('Starting on localhost:', PORT);    
});

const io = require('socket.io')(server);

io.on('connection', (socket) => {
    var user = 'unpopulatedUser';
    socket.emit('newConnection', { usersConnected: users});
    socket.on('subTrip', (data) => {
        console.log(data); 
        var userID = data['userID'];
        var tripID = data['tripID'];
        user = userID;
        users.push(userID);
        console.log(users);
        io.sockets.emit('newUser', { usersConnected: users });
    });

    socket.on('stateChange', (data) => {
        console.log('STATE CHANGE!'); 
    })

    socket.on('disconnect', () => {
        console.log('Disconnect user from pubsub ' + user);
        var index = users.indexOf(user);
        if (index > -1) {
            users.splice(index, 1);
        }
        socket.broadcast.emit('userDisconnected', { usersConnected: users});
    })
});


