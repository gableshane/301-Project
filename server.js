'use strict'

const express = require('express');
const app = express();
const cors = require('cors');
app.use(cors());

const getLocation = require('./modules/location.js');
const getReviews = require('./modules/restaurants.js');

app.get('/', (request,response) => {
  response.send('Home Page is running!');
});

app.get('/location', getLocation);

app.get('/restaurants', getReviews);


app.listen(3000, () => {
  console.log('listening on port 3000');
});