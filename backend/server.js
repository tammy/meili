'use strict';

const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');

const PORT = 3333;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use('/api/v1/battles/', require('./routes/battles'));
app.use('/api/v1/cards/', require('./routes/cards'));

var pubSubReg = {};

const server = app.listen(PORT, () => {
    console.log('Starting on localhost:', PORT);    
});

const io = require('socket.io')(server);

io.on('connection', (socket) => {
    var user = 'unpopulated_user';
    socket.emit('new_connection', { hello: 'world'});
    socket.on('sub_trip', (data) => {
        console.log(data); 
        var userID = data['user_id'];
        var tripID = data['trip_id'];
        user = userID;
        socket.broadcast.emit('update_state', { state: 'NEW STATE HERE'});

    });

    socket.on('state_change', (data) => {
        console.log('STATE CHANGE!'); 
    })

    socket.on('disconnect', () => {
        console.log('Disconnect user from pubsub ' + user);
    })
});


