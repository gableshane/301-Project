
// DEPENDENCIES
const PORT = process.env.PORT || 3000;
const ejs = require('ejs');
const pg = require('pg');
const cors = require('cors');
require('dotenv').config();
const express = require('express');
const superagent = require('superagent');
const app = express();
app.set('view engine', 'ejs');
app.use(express.static('./public'));
app.use(cors());
app.use(express.urlencoded({extended: true}));
const methodOverride = require('method-override');
app.use(methodOverride('_method'));

// GLOBAL VARIABLES
const GEOCODE_API_KEY = process.env.GEOCODE_API_KEY;
const DATABASE_URL = process.env.DATABASE_URL;
const AQ_API_KEY = process.env.AQ_API_KEY;

// IMPORT MODULES
const renderHome = require('./modules/home.js');
const getAirQuality = require('./modules/airQuality.js');


//DATABASE
const client = new pg.Client(`${DATABASE_URL}`);
client.on('error', error => console.error(error));
client.connect();

app.get('/', renderHome); // SHANE
// app.get('/location', getLocation); // JOSHUA
app.get('/airQuality', getAirQuality); // SHANE
// app.get('/restaurants', getRestaurants); // CRYSTAL
// app.get('/crime', getCrime); // DAESY


// SERVER LISTENS
app.listen(3000, () => {
  console.log('listening on port 3000');
});