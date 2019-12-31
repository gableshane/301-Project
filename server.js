'use strict';
// DEPENDENCIES
// const ejs = require('ejs');
// const pg = require('pg');
const cors = require('cors');
const express = require('express');
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
// const GEOCODE_API_KEY = process.env.GEOCODE_API_KEY;
// const DATABASE_URL = process.env.DATABASE_URL;
// const CENSUS_API_KEY = process.env.CENSUS_API_KEY;

// IMPORT MODULES
const renderHome = require('./modules/home.js');
const getMeme = require('./modules/getMeme.js');
// const getPoverty = require('./modules/poverty.js');
const getAirQuality = require('./modules/airQuality');
const getLocation = require('./modules/shanelocation');
const getReviews = require('./modules/restaurants');

// DATABASE
// const client = new pg.Client(`${DATABASE_URL}`);
// client.on('error', error => console.error(error));
// client.connect();

// ROUTES

// Promise.all()

app.get('/', renderHome); // SHANE

app.get('/location', ( req , res ) => {
  getLocation( req , res ).then( returnLocation => {
    displayAirQual(returnLocation, res);
    // disaplyRestaurantReivews(returnLocation, res);
  })
});

function displayAirQual(locationData, res) {
  getAirQuality.getAirQuality(locationData.location.lat, locationData.location.lng).then( aqData => {
    console.log('******aqData :', aqData);
    let renderData = new Render(locationData.name, aqData.data.AQI, aqData.data.Category.Name);
    console.log('******renderData :', renderData);
    res.render('../public/views/pages/results.ejs', { render : renderData });
  })
}

function disaplyRestaurantReivews(locationData, res) {
  // console.log('**??????? :', getReviews(locationData.location.lat, locationData.location.lng));
  getReviews.getReviews(locationData.location.lat, locationData.location.lng).then( data => {
    console.log('******data :', data);
    // let render = new Render(returnLocation.name, aqData.data.AQI, aqData.data.Category.Name);
    res.render('../public/views/pages/results.ejs');
  })
}


function Render(location, aqi, aqiCategory) {
  this.location = location;
  this.aqi = aqi;
  this.aqiCategory = aqiCategory;
}

// app.get('/airQuality', getAirQuality);
// app.get('/poverty', getPoverty);
// app.get('/meme', getMeme); // SHANE
// app.get('/restaurants', getRestaurants); // CRYSTAL
// app.get('/crime', getCrime); // DAESY

// app.get('/results', (req, res) => {
//   res.render('../public/views/pages/results');
// });


// SERVER LISTENS
app.listen(PORT, () => {
  console.log(`listening on ${PORT}`);
});
