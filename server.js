
// DEPENDENCIES
const ejs = require('ejs');
const pg = require('pg');
const cors = require('cors');
const express = require('express');
const superagent = require('superagent');
const app = express();
const methodOverride = require('method-override');
require('dotenv').config();

// CONFIG
app.set('view engine', 'ejs');
app.use(express.static('./public'));
app.use(cors());
app.use(express.urlencoded({extended: true}));
app.use(methodOverride('_method'));

// GLOBAL VARIABLES
const PORT = process.env.PORT || 3000;
const GEOCODE_API_KEY = process.env.GEOCODE_API_KEY;
const DATABASE_URL = process.env.DATABASE_URL;

// IMPORT MODULES
const renderHome = require('./modules/home.js');
const getMeme = require('./modules/getMeme.js');

// DATABASE
const client = new pg.Client(`${DATABASE_URL}`);
client.on('error', error => console.error(error));
client.connect();

// ROUTES

app.get('/', renderHome); // SHANE
// app.get('/location', getLocation); // JOSHUA
app.get('/meme', getMeme); // SHANE
// app.get('/restaurants', getRestaurants); // CRYSTAL
// app.get('/crime', getCrime); // DAESY

// SERVER LISTENS
app.listen(3000, () => {
  console.log('listening on port 3000');
});