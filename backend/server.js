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

app.listen(PORT, () => {
    console.log('Starting on localhost:', PORT);    
});
