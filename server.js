'use strict';

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

// add validation to confirm we are wired up to our mongo DB
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
    console.log('Mongoose is connected');
});

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3001;

//test if server is working
app.get('/test', (request, response) => {
    response.send('test request received');
});

app.get('*', (request, response) => {
    response.send('No resource found');
});

app.listen(PORT, () => console.log(`listening on ${PORT}`));

