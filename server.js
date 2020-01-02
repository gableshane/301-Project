'use strict';
// DEPENDENCIES
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

// IMPORT MODULES
const renderHome = require('./modules/home.js');
const getAirQuality = require('./modules/airQuality');
const getLocation = require('./modules/location');
const getReviews = require('./modules/restaurants');
const getCrime = require('./modules/crime');

// ROUTES

app.get('/', renderHome); // SHANE

app.get('/location', ( req , res ) => {
  getLocation( req , res ).then( returnLocation => {
    getAirQuality.getAirQuality(returnLocation.location.lat, returnLocation.location.lng).then( aqData => {
      getReviews.getReviews(returnLocation.location.lat, returnLocation.location.lng).then( reviews => {
        getCrime.getCrime().then(seattleCrimeData => {
          console.log('-----------seattleCrimeData');
          let render = new Render(returnLocation.name, aqData.data.AQI, aqData.data.Category.Name, reviews.data, seattleCrimeData);
          res.render('../public/views/pages/results.ejs', { render : render });
        })
      })
    })

  })
});

// CONSTRUCTOR FOR RENDER OBJECT
function Render(location, aqi, aqiCategory, yelpData, crimeData) {
  this.location = location;
  this.aqi = aqi;
  this.aqiCategory = aqiCategory;
  this.yelpData = yelpData;
  this.crimeData = crimeData;
}

// SERVER LISTENS
app.listen(PORT, () => {
  console.log(`listening on ${PORT}`);
});
