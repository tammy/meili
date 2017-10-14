'use strict';

const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');

const PORT = 3333;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use('/', require('./routes/battles'));

app.listen(PORT, () => {
    console.log('Starting on localhost:', PORT);    
});
